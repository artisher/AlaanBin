import { Router, Request, Response } from "express";
import { createHash } from "crypto";
import { Readable } from "stream";
import checkSubscription from "../../middleware/auth.middleware";

const router = Router();

const RESOURCE_TTL = 30 * 60 * 1000;

type ResourceEntry = {
    url: string;
    expiresAt: number;
};

const resources = new Map<string, ResourceEntry>();

function getSourceUrl(): URL {
    const source = process.env.FIFA_HLS_URL;

    if (!source) {
        throw new Error("FIFA_HLS_URL is not configured");
    }

    const url = new URL(source);

    if (url.protocol !== "https:") {
        throw new Error("FIFA source must use HTTPS");
    }

    return url;
}

function registerResource(rawUrl: string, baseUrl: URL): string {
    const resolved = new URL(rawUrl, baseUrl);

    // جلوگیری از تبدیل Proxy به یک Open Proxy
    if (
        resolved.protocol !== "https:" ||
        resolved.hostname !== baseUrl.hostname
    ) {
        throw new Error("Unsupported FIFA resource URL");
    }

    const id = createHash("sha256")
        .update(resolved.href)
        .digest("hex");

    resources.set(id, {
        url: resolved.href,
        expiresAt: Date.now() + RESOURCE_TTL,
    });

    return `/api/live/fifa/resource/${id}`;
}

function rewritePlaylist(content: string, baseUrl: URL): string {
    return content
        .split(/\r?\n/)
        .map((line) => {
            const trimmed = line.trim();

            if (!trimmed) return line;

            if (trimmed.startsWith("#")) {
                return line.replace(
                    /URI="([^"]+)"/g,
                    (_, uri: string) =>
                        `URI="${registerResource(uri, baseUrl)}"`
                );
            }

            return registerResource(trimmed, baseUrl);
        })
        .join("\n");
}

function cleanExpiredResources() {
    const now = Date.now();

    for (const [id, resource] of resources) {
        if (resource.expiresAt <= now) {
            resources.delete(id);
        }
    }
}

// ===============================
// FIFA PLAYLIST
// ===============================

router.get(
    "/index.m3u8",
    checkSubscription,
    async (_req: Request, res: Response) => {
        try {
            const sourceUrl = getSourceUrl();

            const upstream = await fetch(sourceUrl, {
                headers: {
                    Accept: "application/vnd.apple.mpegurl, application/x-mpegURL, */*",
                },
                signal: AbortSignal.timeout(15000),
                cache: "no-store",
            });

            if (!upstream.ok) {
                throw new Error(`FIFA upstream returned ${upstream.status}`);
            }

            const playlist = await upstream.text();

            if (!playlist.trimStart().startsWith("#EXTM3U")) {
                throw new Error("Invalid FIFA HLS playlist");
            }

            cleanExpiredResources();

            const rewritten = rewritePlaylist(playlist, sourceUrl);

            res.setHeader(
                "Content-Type",
                "application/vnd.apple.mpegurl"
            );

            res.setHeader(
                "Cache-Control",
                "private, no-store, no-cache, must-revalidate"
            );

            res.setHeader("X-Content-Type-Options", "nosniff");

            return res.status(200).send(rewritten);
        } catch (error) {
            console.error("FIFA PLAYLIST ERROR:", error);

            return res.status(502).json({
                success: false,
                message: "خطا در دریافت پخش زنده FIFA",
            });
        }
    }
);

// ===============================
// FIFA SEGMENTS / NESTED PLAYLISTS
// ===============================

router.get(
    "/resource/:id",
    checkSubscription,
    async (req: Request, res: Response) => {
        try {
            const id = String(req.params.id);

            if (!/^[a-f0-9]{64}$/.test(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid resource ID",
                });
            }

            const resource = resources.get(id);

            if (!resource || resource.expiresAt <= Date.now()) {
                resources.delete(id);

                return res.status(404).json({
                    success: false,
                    message: "Stream resource expired",
                });
            }

            const upstreamUrl = new URL(resource.url);
            const headers: Record<string, string> = {};

            // پشتیبانی از درخواست‌های Range برای پخش و Seek
            if (req.headers.range) {
                headers.Range = req.headers.range;
            }

            const upstream = await fetch(upstreamUrl, {
                headers,
                signal: AbortSignal.timeout(30000),
                cache: "no-store",
            });

            if (!upstream.ok && upstream.status !== 206) {
                throw new Error(`FIFA resource returned ${upstream.status}`);
            }

            const contentType =
                upstream.headers.get("content-type") ||
                "application/octet-stream";

            // اگر منبع یک Playlist تو در تو باشد، URIهای آن را هم بازنویسی کن.
            if (
                contentType.toLowerCase().includes("mpegurl") ||
                upstreamUrl.pathname.toLowerCase().endsWith(".m3u8")
            ) {
                const body = await upstream.text();

                if (!body.trimStart().startsWith("#EXTM3U")) {
                    throw new Error("Invalid nested HLS playlist");
                }

                const rewritten = rewritePlaylist(body, upstreamUrl);

                res.setHeader(
                    "Content-Type",
                    "application/vnd.apple.mpegurl"
                );

                res.setHeader(
                    "Cache-Control",
                    "private, no-store, no-cache, must-revalidate"
                );

                return res.status(200).send(rewritten);
            }

            res.status(upstream.status);

            res.setHeader("Content-Type", contentType);

            res.setHeader(
                "Cache-Control",
                "private, no-store"
            );

            // هدرهای مهم برای پخش و درخواست Range
            for (const header of [
                "content-length",
                "content-range",
                "accept-ranges",
            ]) {
                const value = upstream.headers.get(header);

                if (value) {
                    res.setHeader(header, value);
                }
            }

            if (!upstream.body) {
                return res.end();
            }

            return Readable
                .fromWeb(upstream.body as any)
                .pipe(res);
        } catch (error) {
            console.error("FIFA RESOURCE ERROR:", error);

            if (res.headersSent) {
                return res.destroy();
            }

            return res.status(502).json({
                success: false,
                message: "خطا در دریافت بخش ویدیو FIFA",
            });
        }
    }
);

export default router;
