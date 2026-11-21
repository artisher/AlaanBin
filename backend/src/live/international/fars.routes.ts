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

const WORKER_HOST = "corsply-v0s4.cfbanana.workers.dev";
const TELEWEBION_HOST = "live-aburayhan1106.telewebion.ir";

function getSourceUrl(): URL {
    const source = process.env.FARS_HLS_URL;

    if (!source) {
        throw new Error("FARS_HLS_URL is not configured");
    }

    const url = new URL(source);

    if (url.protocol !== "https:" || url.hostname !== WORKER_HOST) {
        throw new Error("Invalid Fars source URL");
    }

    return url;
}

function validateResourceUrl(rawUrl: string, baseUrl: URL): URL {
    const resolved = new URL(rawUrl, baseUrl);

    if (
        resolved.protocol !== "https:" ||
        resolved.hostname !== WORKER_HOST
    ) {
        throw new Error("Unsupported Fars resource URL");
    }

    const target = resolved.searchParams.get("url");

    if (!target) {
        throw new Error("Missing Telewebion resource URL");
    }

    const targetUrl = new URL(target);

    if (
        targetUrl.protocol !== "https:" ||
        targetUrl.hostname !== TELEWEBION_HOST
    ) {
        throw new Error("Unsupported Telewebion resource host");
    }

    return resolved;
}

function registerResource(rawUrl: string, baseUrl: URL): string {
    const resolved = validateResourceUrl(rawUrl, baseUrl);

    const id = createHash("sha256")
        .update(resolved.href)
        .digest("hex");

    resources.set(id, {
        url: resolved.href,
        expiresAt: Date.now() + RESOURCE_TTL,
    });

    return `/api/live/fars/resource/${id}`;
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
                signal: AbortSignal.timeout(20000),
                cache: "no-store",
            });

            if (!upstream.ok) {
                throw new Error(`Fars upstream returned ${upstream.status}`);
            }

            const playlist = await upstream.text();

            if (!playlist.trimStart().startsWith("#EXTM3U")) {
                throw new Error("Invalid Fars HLS playlist");
            }

            cleanExpiredResources();

            const rewritten = rewritePlaylist(playlist, sourceUrl);

            res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
            res.setHeader("Cache-Control", "private, no-store, no-cache, must-revalidate");
            res.setHeader("X-Content-Type-Options", "nosniff");

            return res.status(200).send(rewritten);
        } catch (error) {
            console.error("FARS PLAYLIST ERROR:", error);

            return res.status(502).json({
                success: false,
                message: "خطا در دریافت پخش زنده استان فارس",
            });
        }
    }
);

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

            if (req.headers.range) {
                headers.Range = req.headers.range;
            }

            const upstream = await fetch(upstreamUrl, {
                headers,
                signal: AbortSignal.timeout(30000),
                cache: "no-store",
            });

            if (!upstream.ok) {
                throw new Error(`Fars resource returned ${upstream.status}`);
            }

            const contentType =
                upstream.headers.get("content-type") ||
                "application/octet-stream";

            if (
                contentType.toLowerCase().includes("mpegurl") ||
                upstreamUrl.pathname.toLowerCase().endsWith(".m3u8")
            ) {
                const body = await upstream.text();

                if (!body.trimStart().startsWith("#EXTM3U")) {
                    throw new Error("Invalid nested HLS playlist");
                }

                const rewritten = rewritePlaylist(body, upstreamUrl);

                res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
                res.setHeader("Cache-Control", "private, no-store, no-cache, must-revalidate");

                return res.status(200).send(rewritten);
            }

            res.status(upstream.status);
            res.setHeader("Content-Type", contentType);
            res.setHeader("Cache-Control", "private, no-store");

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

            return Readable.fromWeb(upstream.body as any).pipe(res);
        } catch (error) {
            console.error("FARS RESOURCE ERROR:", error);

            if (res.headersSent) {
                return res.destroy();
            }

            return res.status(502).json({
                success: false,
                message: "خطا در دریافت بخش ویدیو استان فارس",
            });
        }
    }
);

export default router;
