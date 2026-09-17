"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const Movie_1 = require("./models/Movie");
const Series_1 = require("./models/Series");
const Episode_1 = require("./models/Episode");
const User_1 = require("./models/User");
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
const admin_1 = require("./middleware/admin");
const dotenv_1 = __importDefault(require("dotenv"));
const Request_1 = require("./models/Request");
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const crypto_1 = require("crypto");
const stream_1 = require("stream");
const crypto_2 = __importDefault(require("crypto"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.APP_ENV === "production";
const execFileAsync = (0, util_1.promisify)(child_process_1.execFile);
// تنظیمات امنیتی و پارس کردن داده‌ها
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://alanbin.com",
        "https://www.alanbin.com"
    ],
    credentials: true,
})); // اجازه دسترسی از فرانت
app.use(express_1.default.json()); // خواندن داده‌های JSON
app.use((0, cookie_parser_1.default)());
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/mnt/alanbin/movies");
    },
    filename: (req, file, cb) => {
        const filename = Buffer
            .from(file.originalname, "latin1")
            .toString("utf8");
        cb(null, filename);
    }
});
//poster 
const posterStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/mnt/alanbin/posters");
    },
    filename: (req, file, cb) => {
        const extension = path_1.default
            .extname(file.originalname)
            .toLowerCase();
        const filename = `poster-${(0, crypto_1.randomUUID)()}${extension}`;
        cb(null, filename);
    }
});
const posterUpload = (0, multer_1.default)({
    storage: posterStorage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("فرمت پوستر مجاز نیست"));
        }
        cb(null, true);
    }
});
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        if (ext !== ".mp4") {
            return cb(new Error("فقط فایل MP4 مجاز است"));
        }
        cb(null, true);
    }
});
app.post("/api/admin/storage/upload", auth_middleware_1.default, admin_1.adminMiddleware, upload.single("video"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "فایلی ارسال نشده است"
            });
        }
        res.status(201).json({
            success: true,
            message: "فیلم با موفقیت در Storage آپلود شد",
            filename: req.file.filename,
            size: req.file.size,
            videoUrl: `/videos/${req.file.filename}`
        });
    }
    catch (err) {
        console.error("UPLOAD ERROR:", err);
        res.status(500).json({
            success: false,
            message: err.message || "خطا در آپلود فیلم"
        });
    }
});
//serve video
app.get("/videos/:filename", auth_middleware_1.default, async (req, res) => {
    try {
        const filename = String(req.params.filename);
        if (filename.includes("/") ||
            filename.includes("\\") ||
            filename.includes("..") ||
            !filename.toLowerCase().endsWith(".mp4")) {
            return res.status(400).json({
                message: "نام فایل نامعتبر است"
            });
        }
        res.setHeader("X-Accel-Redirect", `/protected-videos/${encodeURIComponent(filename)}`);
        res.setHeader("Content-Type", "video/mp4");
        res.end();
    }
    catch (err) {
        console.error("VIDEO ERROR:", err);
        res.status(500).json({
            message: "خطا در دریافت ویدیو"
        });
    }
});
// serve poster
app.get("/posters/:filename", auth_middleware_1.default, async (req, res) => {
    try {
        const filename = String(req.params.filename);
        if (filename.includes("/") ||
            filename.includes("\\") ||
            filename.includes("..")) {
            return res.status(400).json({
                message: "نام فایل نامعتبر است"
            });
        }
        const extension = path_1.default
            .extname(filename)
            .toLowerCase();
        const allowedExtensions = [
            ".jpg",
            ".jpeg",
            ".png",
            ".webp"
        ];
        if (!allowedExtensions.includes(extension)) {
            return res.status(400).json({
                message: "فرمت تصویر مجاز نیست"
            });
        }
        res.setHeader("X-Accel-Redirect", `/protected-posters/${encodeURIComponent(filename)}`);
        res.setHeader("Content-Type", extension === ".jpg" || extension === ".jpeg"
            ? "image/jpeg"
            : extension === ".png"
                ? "image/png"
                : "image/webp");
        res.setHeader("Cache-Control", "public, max-age=86400");
        res.end();
    }
    catch (err) {
        console.error("POSTER ERROR:", err);
        res.status(500).json({
            message: "خطا در دریافت پوستر"
        });
    }
});
// ===============================
// LIVE VARZESH STREAM
// ===============================
// ===============================
// LIVE VARZESH STREAM
// ===============================
const VARZESH_NCDN_URL = "https://ncdn.telewebion.net/varzesh/live/108050p/index.m3u8";
const varzeshSessions = new Map();
const VARZESH_SESSION_TTL = 10 * 60 * 1000;
// Resolve current Telewebion origin
async function resolveVarzeshOrigin() {
    const response = await fetch(VARZESH_NCDN_URL, {
        redirect: "manual",
    });
    if (response.status < 300 ||
        response.status >= 400) {
        throw new Error(`NCDN redirect failed: ${response.status}`);
    }
    const location = response.headers.get("location");
    if (!location) {
        throw new Error("NCDN did not return Location header");
    }
    const url = new URL(location);
    const origin = url.origin;
    if (!origin.endsWith(".telewebion.net")) {
        throw new Error("Invalid Telewebion origin");
    }
    console.log("📡 Varzesh origin:", origin);
    return origin;
}
async function isVarzeshOriginHealthy(origin) {
    try {
        const playlistUrl = `${origin}/ek/varzesh/live/108050p/index.m3u8`;
        const response = await fetch(playlistUrl, {
            cache: "no-store",
            headers: {
                Origin: "https://telewebion.net",
                Referer: "https://telewebion.net/",
            },
        });
        if (!response.ok) {
            console.log("❌ Origin playlist unhealthy:", origin, response.status);
            return false;
        }
        const playlist = await response.text();
        const lines = playlist
            .split("\n")
            .map(line => line.trim());
        let latestSegment = null;
        for (let i = 0; i < lines.length - 1; i++) {
            if (lines[i].startsWith("#EXTINF:")) {
                const segment = lines[i + 1];
                if (segment &&
                    !segment.startsWith("#") &&
                    segment.endsWith(".ts")) {
                    latestSegment =
                        segment;
                }
            }
        }
        if (!latestSegment) {
            console.log("❌ No segment found:", origin);
            return false;
        }
        const segmentUrl = `${origin}/ek/varzesh/live/108050p/${latestSegment}`;
        console.log("🩺 Checking live segment:", origin, latestSegment.slice(0, 30));
        const segmentResponse = await fetch(segmentUrl, {
            cache: "no-store",
            headers: {
                Origin: "https://telewebion.net",
                Referer: "https://telewebion.net/",
            },
            signal: AbortSignal.timeout(5000),
        });
        if (!segmentResponse.ok) {
            console.log("❌ Origin segment unhealthy:", origin, segmentResponse.status);
            return false;
        }
        console.log("✅ Origin is healthy:", origin);
        return true;
    }
    catch (error) {
        console.log("❌ Origin health-check failed:", origin, error);
        return false;
    }
}
// Create a playlist session
function createVarzeshSession(origin) {
    const sessionId = crypto_2.default.randomUUID();
    varzeshSessions.set(sessionId, {
        origin,
        createdAt: Date.now(),
        refreshRequested: false,
        failoverCount: 0,
        failedOrigins: new Set(),
    });
    return sessionId;
}
// ===============================
// Get session
// ===============================
function getVarzeshSession(sessionId) {
    const session = varzeshSessions.get(sessionId);
    if (!session) {
        return null;
    }
    if (Date.now() -
        session.createdAt >
        VARZESH_SESSION_TTL) {
        varzeshSessions.delete(sessionId);
        return null;
    }
    // Refresh session lifetime
    session.createdAt =
        Date.now();
    return session;
}
async function refreshVarzeshSession(sessionId) {
    const session = getVarzeshSession(sessionId);
    if (!session) {
        throw new Error("Varzesh session not found");
    }
    if (session.refreshPromise) {
        await session.refreshPromise;
        return session;
    }
    session.refreshPromise =
        (async () => {
            const oldOrigin = session.origin;
            console.log("🔄 Searching for healthy Varzesh origin...");
            /*
             * We only exclude the origin that
             * just failed.
             *
             * Older origins may become healthy again.
             */
            const excludedOrigin = oldOrigin;
            let healthyOrigin = null;
            /*
             * Ask NCDN for several candidate origins.
             */
            for (let attempt = 0; attempt < 8; attempt++) {
                try {
                    const candidate = await resolveVarzeshOrigin();
                    if (candidate ===
                        excludedOrigin) {
                        console.log("⚠️ Skipping failed origin:", candidate);
                        continue;
                    }
                    console.log("🩺 Testing candidate origin:", candidate);
                    const healthy = await isVarzeshOriginHealthy(candidate);
                    if (!healthy) {
                        console.log("❌ Candidate rejected:", candidate);
                        continue;
                    }
                    healthyOrigin =
                        candidate;
                    break;
                }
                catch (error) {
                    console.error("❌ Origin candidate check failed:", error);
                }
            }
            if (!healthyOrigin) {
                throw new Error("No new healthy Varzesh origin found");
            }
            session.origin =
                healthyOrigin;
            session.refreshRequested =
                false;
            session.failoverCount += 1;
            console.log("✅ Healthy Varzesh origin selected:", oldOrigin, "→", healthyOrigin);
        })();
    try {
        await session.refreshPromise;
    }
    finally {
        session.refreshPromise =
            undefined;
    }
    return session;
}
async function buildVarzeshPlaylist(origin, sessionId) {
    const playlistUrl = `${origin}/ek/varzesh/live/108050p/index.m3u8`;
    const response = await fetch(playlistUrl, {
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error(`Origin playlist failed: ${response.status}`);
    }
    const playlist = await response.text();
    const lines = playlist.split("\n");
    const header = lines.filter(line => line.startsWith("#EXTM3U") ||
        line.startsWith("#EXT-X-VERSION") ||
        line.startsWith("#EXT-X-TARGETDURATION"));
    const segments = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith("#EXTINF:")) {
            const segment = lines[i + 1]?.trim();
            if (segment &&
                !segment.startsWith("#")) {
                segments.push(`${line}\n${segment}`);
            }
        }
    }
    // فقط آخرین سگمنت‌ها
    const lastSegments = segments.slice(-10);
    if (!lastSegments.length) {
        throw new Error("No live segments found");
    }
    const firstSegment = lastSegments[0];
    const firstSequence = Number(firstSegment.match(/#EXTINF:[^,]+,(\d+)/)?.[1]);
    const mediaSequence = Number.isFinite(firstSequence)
        ? firstSequence
        : 0;
    let output = [
        ...header,
        `#EXT-X-MEDIA-SEQUENCE:${mediaSequence}`,
        ...lastSegments,
    ].join("\n");
    output =
        output
            .split("\n")
            .map(line => {
            const trimmed = line.trim();
            if (!trimmed ||
                trimmed.startsWith("#")) {
                return line;
            }
            return `/api/live/varzesh/segment/${sessionId}/${encodeURIComponent(trimmed)}`;
        })
            .join("\n");
    return output;
}
// ===============================
// PLAYLIST
// ===============================
app.get("/api/live/varzesh/index.m3u8", async (req, res) => {
    try {
        /*
         * اگر session از قبل داریم،
         * همان session را استفاده کن.
         */
        let sessionId = String(req.query.session || "");
        let session = sessionId
            ? getVarzeshSession(sessionId)
            : null;
        /*
         * اولین درخواست:
         * origin جدید بگیر
         * session بساز
         */
        if (!session) {
            const origin = await resolveVarzeshOrigin();
            sessionId =
                createVarzeshSession(origin);
            session =
                getVarzeshSession(sessionId);
            if (!session) {
                throw new Error("Failed to create session");
            }
        }
        if (session.refreshRequested) {
            console.log("🔄 Refreshing Varzesh origin...");
            session =
                await refreshVarzeshSession(sessionId);
        }
        /*
         * هر بار playlist را
         * دوباره از همان origin بگیر
         */
        const playlist = await buildVarzeshPlaylist(session.origin, sessionId);
        res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
        res.setHeader("Access-Control-Allow-Origin", "https://www.alanbin.com");
        res.setHeader("X-Varzesh-Session", sessionId);
        res.setHeader("Access-Control-Expose-Headers", "X-Varzesh-Session");
        res.send(playlist);
    }
    catch (err) {
        console.error("❌ VARZESH PLAYLIST ERROR:", err);
        res.status(502).json({
            message: "خطا در دریافت پخش زنده شبکه ورزش"
        });
    }
});
// ===============================
// SEGMENTS
// ===============================
app.get("/api/live/varzesh/segment/:sessionId/:segment", async (req, res) => {
    try {
        const sessionId = String(req.params.sessionId);
        const segment = String(req.params.segment);
        const session = getVarzeshSession(sessionId);
        if (!session) {
            return res
                .status(410)
                .json({
                message: "Live session expired"
            });
        }
        if (segment.includes("/") ||
            segment.includes("\\") ||
            segment.includes("..") ||
            !segment.endsWith(".ts")) {
            return res
                .status(400)
                .json({
                message: "Segment نامعتبر است"
            });
        }
        const segmentUrl = `${session.origin}/ek/varzesh/live/108050p/${segment}`;
        console.log("🎬 Varzesh segment:", segment.slice(0, 30), "→", session.origin);
        const response = await fetch(segmentUrl, {
            cache: "no-store",
        });
        if (!response.ok) {
            console.log("⚠️ Segment failed:", response.status, "session:", sessionId, "origin:", session.origin);
            if (response.status === 451) {
                session.failedOrigins.add(session.origin);
                session.refreshRequested =
                    true;
                console.log("🔄 Varzesh failover requested", "failed origin:", session.origin);
            }
            return res
                .status(response.status)
                .end();
        }
        res.setHeader("Content-Type", "video/mp2t");
        res.setHeader("Cache-Control", "no-store");
        res.setHeader("Access-Control-Allow-Origin", "https://www.alanbin.com");
        if (response.headers.has("content-length")) {
            res.setHeader("Content-Length", response.headers.get("content-length"));
        }
        if (!response.body) {
            return res
                .status(502)
                .end();
        }
        stream_1.Readable
            .fromWeb(response.body)
            .pipe(res);
    }
    catch (err) {
        console.error("❌ VARZESH SEGMENT ERROR:", err);
        if (!res.headersSent) {
            res
                .status(502)
                .end();
        }
    }
});
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
}
mongoose_1.default.connect(MONGODB_URI)
    .then(async () => {
    console.log("✅ Mongo connected");
    if (!mongoose_1.default.connection.db) {
        throw new Error("DB undefined");
    }
})
    .catch((err) => {
    console.error("❌ Mongo connection failed:");
    console.error(err);
});
// --- API مربوط به یوزرها ---
//admin API
// 1. دریافت همه یوزرها
app.get('/api/admin/users', auth_middleware_1.default, admin_1.adminMiddleware, async (req, res) => {
    try {
        const users = await User_1.User.find().select('-password');
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: 'خطا در دریافت یوزرها' });
    }
});
// 2. اضافه کردن یوزر جدید
app.post('/api/admin/users', auth_middleware_1.default, admin_1.adminMiddleware, async (req, res) => {
    try {
        const hashedPassword = await bcryptjs_1.default.hash(req.body.password, 10);
        const newUser = new User_1.User({
            ...req.body,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({
                message: err.message
            });
        }
        else {
            res.status(400).json({
                message: "Unknown error"
            });
        }
    }
});
// 3. حذف یوزر
app.delete('/api/admin/users/:id', auth_middleware_1.default, admin_1.adminMiddleware, async (req, res) => {
    try {
        await User_1.User.findByIdAndDelete(req.params.id);
        res.json({ message: 'یوزر با موفقیت حذف شد' });
    }
    catch (err) {
        res.status(500).json({ message: 'خطا در حذف یوزر' });
    }
});
//ادیت یوزر
app.put("/api/admin/users/:id", auth_middleware_1.default, admin_1.adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        // فقط اگر پسورد جدید وارد شده باشد
        if (updateData.password?.trim()) {
            updateData.password = await bcryptjs_1.default.hash(updateData.password, 10);
        }
        else {
            delete updateData.password;
        }
        // فیلدهایی که نباید از فرانت تغییر کنند
        delete updateData.role;
        delete updateData._id;
        delete updateData.__v;
        delete updateData.signUpDate;
        const updatedUser = await User_1.User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            return res.status(404).json({
                message: "کاربر یافت نشد",
            });
        }
        // تبدیل به آبجکت و حذف password بدون استفاده از delete
        const { password, ...safeUser } = updatedUser.toObject();
        res.json(safeUser);
    }
    catch (err) {
        const error = err;
        res.status(500).json({
            message: "خطا در بروزرسانی",
            error: error.message,
        });
    }
});
// 2. اضافه کردن فیلم جدید
app.post("/api/admin/movies", auth_middleware_1.default, admin_1.adminMiddleware, async (req, res) => {
    try {
        const { storageFilename, videoUrl, ...movieData } = req.body;
        let finalVideoUrl = videoUrl;
        /*
         * فیلمی که از Storage انتخاب شده
         */
        if (storageFilename) {
            if (typeof storageFilename !== "string") {
                return res.status(400).json({
                    message: "نام فایل Storage نامعتبر است"
                });
            }
            if (storageFilename.includes("/") ||
                storageFilename.includes("\\") ||
                storageFilename.includes("..")) {
                return res.status(400).json({
                    message: "نام فایل Storage نامعتبر است"
                });
            }
            const extension = path_1.default
                .extname(storageFilename)
                .toLowerCase();
            if (extension !== ".mkv" && extension !== ".mp4") {
                return res.status(400).json({
                    message: "فرمت فایل پشتیبانی نمی‌شود"
                });
            }
            const moviesPath = "/mnt/alanbin/movies";
            const files = await fs_1.default.promises.readdir(moviesPath, { withFileTypes: true });
            /*
             * فایل واقعی را پیدا می‌کنیم
             * بدون حساسیت به بزرگ/کوچک بودن حروف
             */
            const actualFilename = files
                .filter(file => file.isFile())
                .map(file => file.name)
                .find(name => name.toLowerCase() ===
                storageFilename.toLowerCase());
            if (!actualFilename) {
                return res.status(404).json({
                    message: "فایل در Storage پیدا نشد"
                });
            }
            const actualExtension = path_1.default
                .extname(actualFilename)
                .toLowerCase();
            /*
             * اگر MP4 است، مستقیماً استفاده می‌کنیم
             */
            if (actualExtension === ".mp4") {
                finalVideoUrl = `/videos/${actualFilename}`;
            }
            /*
             * اگر MKV است:
             * اول بررسی می‌کنیم MP4 هم‌نام وجود دارد یا نه
             */
            else if (actualExtension === ".mkv") {
                const baseName = path_1.default.basename(actualFilename, path_1.default.extname(actualFilename));
                const mp4Filename = files
                    .filter(file => file.isFile())
                    .map(file => file.name)
                    .find(name => path_1.default.extname(name).toLowerCase() === ".mp4" &&
                    path_1.default.basename(name, path_1.default.extname(name)).toLowerCase() ===
                        baseName.toLowerCase());
                /*
                 * MP4 از قبل وجود دارد
                 */
                if (mp4Filename) {
                    console.log("✅ Existing MP4 found:", mp4Filename);
                    finalVideoUrl =
                        `/videos/${mp4Filename}`;
                }
                /*
                 * MP4 وجود ندارد → تبدیل MKV
                 */
                else {
                    const outputFilename = `${baseName}.mp4`;
                    const inputPath = path_1.default.join(moviesPath, actualFilename);
                    const outputPath = path_1.default.join(moviesPath, outputFilename);
                    console.log("🎬 Converting MKV:", actualFilename);
                    await execFileAsync("ffmpeg", [
                        "-i",
                        inputPath,
                        "-map",
                        "0:v:0",
                        "-map",
                        "0:a:0?",
                        "-c:v",
                        "copy",
                        "-c:a",
                        "aac",
                        "-b:a",
                        "192k",
                        "-movflags",
                        "+faststart",
                        "-y",
                        outputPath
                    ]);
                    console.log("✅ Conversion finished:", outputFilename);
                    finalVideoUrl =
                        `/videos/${outputFilename}`;
                }
            }
        }
        /*
         * اگر از Storage نیامده، باید videoUrl داشته باشیم
         */
        if (!finalVideoUrl) {
            return res.status(400).json({
                message: "آدرس ویدیو مشخص نشده است"
            });
        }
        /*
         * جلوگیری از ثبت دوباره همان فیلم
         */
        const existingMovie = await Movie_1.Movie.findOne({
            videoUrl: finalVideoUrl
        });
        if (existingMovie) {
            return res.status(409).json({
                message: "این فیلم قبلاً به سایت اضافه شده است"
            });
        }
        /*
         * ثبت نهایی فیلم
         */
        const newMovie = new Movie_1.Movie({
            ...movieData,
            videoUrl: finalVideoUrl
        });
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    }
    catch (err) {
        console.error("ADMIN CREATE MOVIE ERROR:", err);
        res.status(500).json({
            message: err.message ||
                "خطا در ثبت فیلم"
        });
    }
});
// 3. حذف فیلم
app.delete('/api/admin/movies/:id', auth_middleware_1.default, admin_1.adminMiddleware, async (req, res) => {
    try {
        await Movie_1.Movie.findByIdAndDelete(req.params.id);
        res.json({ message: 'فیلم با موفقیت حذف شد' });
    }
    catch (err) {
        res.status(500).json({ message: 'خطا در حذف فیلم' });
    }
});
//ادیت فیلم 
app.put('/api/admin/movies/:id', auth_middleware_1.default, admin_1.adminMiddleware, async (req, res) => {
    try {
        const updatedMovie = await Movie_1.Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // نسخه آپدیت شده رو برگردون
            runValidators: true
        });
        if (!updatedMovie) {
            return res.status(404).json({
                message: 'فیلم پیدا نشد'
            });
        }
        res.status(200).json(updatedMovie);
    }
    catch (err) {
        res.status(500).json({
            message: err.message || 'خطا در بروزرسانی فیلم'
        });
    }
});
app.get("/api/admin/movies", auth_middleware_1.default, admin_1.adminMiddleware, async (req, res) => {
    try {
        const movies = await Movie_1.Movie.find().sort({ _id: -1 });
        res.status(200).json({
            success: true,
            movies,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "خطا در دریافت فیلم‌ها",
        });
    }
});
app.get("/api/admin/storage/movies", auth_middleware_1.default, admin_1.adminMiddleware, async (req, res) => {
    try {
        const moviesPath = "/mnt/alanbin/movies";
        const files = await fs_1.default.promises.readdir(moviesPath, { withFileTypes: true });
        const videoFiles = files
            .filter(file => file.isFile() &&
            (file.name
                .toLowerCase()
                .endsWith(".mp4") ||
                file.name
                    .toLowerCase()
                    .endsWith(".mkv")))
            .map(file => file.name);
        /*
         * فیلم‌هایی که قبلاً در سایت ثبت شده‌اند
         *
         * فقط basename را نگه می‌داریم:
         *
         * /videos/atashbas.mp4
         *             ↓
         * atashbas
         */
        const movies = await Movie_1.Movie.find()
            .select("videoUrl title");
        const importedMovies = new Set(movies
            .map(movie => movie.videoUrl)
            .filter(Boolean)
            .map(videoUrl => {
            const filename = videoUrl
                .replace(/^\/videos\//i, "");
            return path_1.default
                .basename(filename, path_1.default.extname(filename))
                .toLowerCase();
        }));
        /*
         * گروه‌بندی MP4 و MKV بر اساس basename
         */
        const groupedMovies = new Map();
        for (const filename of videoFiles) {
            const ext = path_1.default
                .extname(filename)
                .toLowerCase();
            const baseName = path_1.default
                .basename(filename, path_1.default.extname(filename));
            const key = baseName.toLowerCase();
            const existing = groupedMovies.get(key);
            if (!existing) {
                groupedMovies.set(key, {
                    /*
                     * اگر MKV باشد آن را برای نمایش انتخاب می‌کنیم
                     */
                    filename,
                    hasMkv: ext === ".mkv",
                    hasMp4: ext === ".mp4"
                });
            }
            else {
                if (ext === ".mkv") {
                    existing.hasMkv = true;
                    existing.filename = filename;
                }
                if (ext === ".mp4") {
                    existing.hasMp4 = true;
                }
            }
        }
        /*
         * تبدیل Map به خروجی نهایی
         */
        const result = Array.from(groupedMovies.entries()).map(([key, movie]) => ({
            filename: movie.filename,
            imported: importedMovies.has(key)
        }));
        res.json({
            success: true,
            totalFiles: result.length,
            newFiles: result.filter(movie => !movie.imported).length,
            movies: result
        });
    }
    catch (err) {
        console.error("STORAGE SCAN ERROR:", err);
        res.status(500).json({
            success: false,
            message: "خطا در بررسی Storage"
        });
    }
});
app.post("/api/admin/storage/convert", auth_middleware_1.default, admin_1.adminMiddleware, async (req, res) => {
    try {
        const { filename } = req.body;
        if (!filename || typeof filename !== "string") {
            return res.status(400).json({
                success: false,
                message: "نام فایل ارسال نشده است"
            });
        }
        if (filename.includes("/") ||
            filename.includes("\\") ||
            filename.includes("..") ||
            !filename.toLowerCase().endsWith(".mkv")) {
            return res.status(400).json({
                success: false,
                message: "فایل MKV نامعتبر است"
            });
        }
        const inputPath = path_1.default.join("/mnt/alanbin/movies", filename);
        const outputFilename = path_1.default.basename(filename, path_1.default.extname(filename)) + ".mp4";
        const outputPath = path_1.default.join("/mnt/alanbin/movies", outputFilename);
        // بررسی وجود فایل اصلی
        await fs_1.default.promises.access(inputPath);
        // اگر قبلاً تبدیل شده، دوباره تبدیل نکن
        try {
            await fs_1.default.promises.access(outputPath);
            return res.json({
                success: true,
                message: "نسخه MP4 قبلاً وجود دارد",
                filename: outputFilename,
                videoUrl: `/videos/${outputFilename}`
            });
        }
        catch {
            // فایل MP4 وجود ندارد؛ ادامه می‌دهیم
        }
        console.log("🎬 Starting MKV conversion:", filename);
        await execFileAsync("ffmpeg", [
            "-i",
            inputPath,
            "-map",
            "0:v:0",
            "-map",
            "0:a:0",
            // ویدئو H.264 را دوباره encode نمی‌کنیم
            "-c:v",
            "copy",
            // تبدیل صدا به AAC
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            // MP4
            "-movflags",
            "+faststart",
            "-y",
            outputPath
        ]);
        console.log("✅ MKV conversion finished:", outputFilename);
        res.json({
            success: true,
            message: "فیلم با موفقیت به فرمت Web تبدیل شد",
            filename: outputFilename,
            videoUrl: `/videos/${outputFilename}`
        });
    }
    catch (err) {
        console.error("❌ MKV CONVERSION ERROR:", err);
        res.status(500).json({
            success: false,
            message: err.message || "خطا در تبدیل فیلم"
        });
    }
});
app.post("/api/admin/storage/upload-poster", auth_middleware_1.default, admin_1.adminMiddleware, posterUpload.single("poster"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "فایل پوستر ارسال نشده است"
            });
        }
        res.status(201).json({
            success: true,
            message: "پوستر با موفقیت در Storage آپلود شد",
            filename: req.file.filename,
            size: req.file.size,
            posterUrl: `/posters/${req.file.filename}`
        });
    }
    catch (err) {
        console.error("POSTER UPLOAD ERROR:", err);
        res.status(500).json({
            success: false,
            message: err.message ||
                "خطا در آپلود پوستر"
        });
    }
});
// --- API مربوط به فیلم‌ها ---
// 1. دریافت همه فیلم‌ها
const genreMap = {
    Comedy: "کمدی",
    Drama: "درام",
    Action: "اکشن",
    Crime: "جنایی",
    Romance: "عاشقانه",
    Family: "خانوادگی",
};
const productMap = {
    IR: "ایرانی",
};
app.get('/api/movies', async (req, res) => {
    const escapeRegex = (text) => {
        return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };
    try {
        // ---------- Filter ----------
        const query = {};
        if (req.query.genre) {
            const genre = String(req.query.genre);
            query.genre = genreMap[genre] || genre;
        }
        if (req.query.product) {
            const product = String(req.query.product);
            query.product = productMap[product] || product;
        }
        if (req.query.rating) {
            query.rating = {
                $gte: Number(req.query.rating)
            };
        }
        if (req.query.search) {
            const search = escapeRegex(String(req.query.search));
            query.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    aliases: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }
        // پس بخش Filter میشه:
        // ---------- Sort ----------
        let sort = {};
        switch (req.query.sort) {
            case "newest":
                sort.year = -1;
                break;
            case "oldest":
                sort.year = 1;
                break;
            case "highRating":
                sort.rating = -1;
                break;
            case "lowRating":
                sort.rating = 1;
                break;
            default:
                sort.year = -1;
        }
        // ---------- Pagination ----------
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const totalMovies = await Movie_1.Movie.countDocuments(query);
        const allMovies = await Movie_1.Movie.find({})
            .select("title genre product")
            .limit(20);
        const totalPages = Math.max(1, Math.ceil(totalMovies / limit));
        const movies = await Movie_1.Movie.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);
        res.json({
            movies,
            currentPage: page,
            totalPages,
            totalMovies
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "خطا در دریافت فیلم‌ها"
        });
    }
});
//serial
app.post("/api/admin/series", auth_middleware_1.default, admin_1.adminMiddleware, async (req, res) => {
    try {
        const newSeries = new Series_1.Series(req.body);
        const savedSeries = await newSeries.save();
        res.status(201).json({
            success: true,
            message: "سریال با موفقیت اضافه شد",
            series: savedSeries,
        });
    }
    catch (err) {
        console.error("ADMIN CREATE SERIES ERROR:", err);
        res.status(500).json({
            success: false,
            message: err.message || "خطا در ثبت سریال",
        });
    }
});
// episod
app.post("/api/admin/series/:seriesId/episodes", auth_middleware_1.default, admin_1.adminMiddleware, async (req, res) => {
    try {
        const seriesId = String(req.params.seriesId);
        if (!mongoose_1.default.Types.ObjectId.isValid(seriesId)) {
            return res.status(400).json({
                success: false,
                message: "شناسه سریال نامعتبر است",
            });
        }
        const series = await Series_1.Series.findById(seriesId);
        if (!series) {
            return res.status(404).json({
                success: false,
                message: "سریال پیدا نشد",
            });
        }
        const { seasonNumber = 1, episodeNumber, title, videoUrl, duration, } = req.body;
        if (!episodeNumber || !title || !videoUrl) {
            return res.status(400).json({
                success: false,
                message: "شماره قسمت، عنوان و آدرس ویدیو الزامی است",
            });
        }
        const existingEpisode = await Episode_1.Episode.findOne({
            seriesId,
            seasonNumber,
            episodeNumber,
        });
        if (existingEpisode) {
            return res.status(409).json({
                success: false,
                message: "این قسمت قبلاً ثبت شده است",
            });
        }
        const episode = new Episode_1.Episode({
            seriesId,
            seasonNumber,
            episodeNumber,
            title,
            videoUrl,
            duration,
        });
        const savedEpisode = await episode.save();
        res.status(201).json({
            success: true,
            message: "قسمت با موفقیت اضافه شد",
            episode: savedEpisode,
        });
    }
    catch (err) {
        console.error("ADMIN CREATE EPISODE ERROR:", err);
        res.status(500).json({
            success: false,
            message: err.message || "خطا در ثبت قسمت",
        });
    }
});
//showSeries 
app.get("/api/series", async (req, res) => {
    try {
        const series = await Series_1.Series.find().sort({ year: -1 });
        res.json({
            series,
        });
    }
    catch (err) {
        console.error("GET SERIES ERROR:", err);
        res.status(500).json({
            message: "خطا در دریافت سریال‌ها",
        });
    }
});
app.get("/api/series/:id", auth_middleware_1.default, async (req, res) => {
    try {
        const id = String(req.params.id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "شناسه سریال نامعتبر است",
            });
        }
        const series = await Series_1.Series.findById(id);
        if (!series) {
            return res.status(404).json({
                message: "سریال پیدا نشد",
            });
        }
        const episodes = await Episode_1.Episode.find({
            seriesId: id,
        }).sort({
            seasonNumber: 1,
            episodeNumber: 1,
        });
        res.json({
            series,
            episodes,
        });
    }
    catch (err) {
        console.error("GET SERIES ERROR:", err);
        res.status(500).json({
            message: "خطا در دریافت سریال",
        });
    }
});
app.get("/api/movies/top", async (req, res) => {
    try {
        const topMovies = await Movie_1.Movie.find({ topWeek: true });
        res.json(topMovies);
    }
    catch (error) {
        console.error("TOP MOVIES ERROR:", error);
        res.status(500).json({
            message: "خطا در دریافت فیلم‌های برتر",
            error,
        });
    }
});
//فیلم مورد علاقه اضافه کردن یا حذف کردن
app.post("/api/favorites/:movieId", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "احراز هویت نشده"
            });
        }
        const { movieId } = req.params;
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await User_1.User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                message: "کاربر پیدا نشد"
            });
        }
        const exists = user.favoriteTitle.some(id => id.toString() === movieId);
        if (!exists) {
            user.favoriteTitle.push(new mongoose_1.default.Types.ObjectId(movieId));
        }
        else {
            user.favoriteTitle = user.favoriteTitle.filter(id => id.toString() !== movieId);
        }
        await user.save();
        res.json({
            success: true,
            favoriteTitle: user.favoriteTitle
        });
    }
    catch (err) {
        res.status(500).json({
            message: "خطا"
        });
    }
});
//دریافت فیلم مورد علاقه
app.get("/api/favorites", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "احراز هویت نشده"
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await User_1.User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                message: "کاربر پیدا نشد"
            });
        }
        const favoriteMovies = await Movie_1.Movie.find({
            _id: { $in: user.favoriteTitle }
        });
        res.json({
            favoriteMovies
        });
    }
    catch (err) {
        res.status(500).json({
            message: "خطا"
        });
    }
});
//auth 
app.post('/api/auth/register', async (req, res) => {
    try {
        const { fullName, phoneNumber, email, password, country, city } = req.body;
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "ایمیل قبلاً ثبت شده"
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await User_1.User.create({
            fullName,
            phoneNumber,
            email,
            password: hashedPassword,
            country,
            city
        });
        res.status(201).json({
            message: "ثبت نام موفق",
            userId: user._id
        });
    }
    catch (err) {
        res.status(500).json({
            message: "خطا در ثبت نام"
        });
    }
});
//لاگین
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "کاربر یافت نشد"
            });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "رمز عبور اشتباه است"
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, {
            expiresIn: "30d"
        });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
            sameSite: "lax",
            secure: isProduction,
            ...(isProduction && {
                domain: ".alanbin.com",
            }),
        });
        res.json({
            message: "ورود موفق",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (err) {
        res.status(500).json({
            message: "خطا در ورود"
        });
    }
});
//لاگ اوت 
app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: isProduction,
        ...(isProduction && {
            domain: ".alanbin.com",
        }),
        path: "/",
    });
    res.json({
        message: "خروج موفق",
    });
});
//دیتای منو و اکانت 
app.get("/api/auth/me", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                isAuthenticated: false,
                message: "احراز هویت نشده"
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await User_1.User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                isAuthenticated: false,
                message: "کاربر پیدا نشد"
            });
        }
        res.status(200).json({
            isAuthenticated: true,
            user: {
                _id: user._id,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                country: user.country,
                city: user.city,
                role: user.role,
                subscriptionExpireDate: user.subscriptionExpireDate,
                hasActiveSubscription: !!user.subscriptionExpireDate &&
                    new Date(user.subscriptionExpireDate) > new Date(),
            }
        });
    }
    catch (err) {
        res.status(401).json({
            isAuthenticated: false,
            message: "توکن نامعتبر است"
        });
    }
});
//tiecket
// ثبت درخواست‌های کاربر
app.post("/api/requests", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "برای ارسال درخواست باید وارد حساب شوید"
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await User_1.User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                message: "کاربر پیدا نشد"
            });
        }
        const { type, subject, message, movieTitle, page } = req.body;
        // بررسی نوع درخواست
        if (!["bug", "film", "contact"].includes(type)) {
            return res.status(400).json({
                message: "نوع درخواست نامعتبر است"
            });
        }
        // پیام برای همه فرم‌ها اجباری است
        if (!message?.trim()) {
            return res.status(400).json({
                message: "متن پیام الزامی است"
            });
        }
        // درخواست فیلم باید عنوان فیلم داشته باشد
        if (type === "film" && !movieTitle?.trim()) {
            return res.status(400).json({
                message: "نام فیلم الزامی است"
            });
        }
        const newRequest = new Request_1.Request({
            type,
            user: user._id,
            // اطلاعات کاربر از دیتابیس گرفته می‌شود
            name: user.fullName,
            email: user.email,
            subject: subject || "",
            message: message.trim(),
            movieTitle: movieTitle || "",
            page: page || "",
            status: "pending"
        });
        const savedRequest = await newRequest.save();
        res.status(201).json({
            success: true,
            message: "درخواست با موفقیت ثبت شد",
            request: savedRequest
        });
    }
    catch (err) {
        console.error("REQUEST ERROR:", err);
        res.status(500).json({
            message: "خطا در ثبت درخواست"
        });
    }
});
app.get("/api/admin/requests", auth_middleware_1.default, admin_1.adminMiddleware, async (req, res) => {
    try {
        const requests = await Request_1.Request.find()
            .populate("user", "fullName email phoneNumber")
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            requests,
        });
    }
    catch (err) {
        console.error("ADMIN REQUESTS ERROR:", err);
        res.status(500).json({
            success: false,
            message: "خطا در دریافت درخواست‌ها",
        });
    }
});
app.put("/api/admin/requests/:id", auth_middleware_1.default, admin_1.adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const allowedStatuses = [
            "pending",
            "reviewing",
            "resolved",
            "rejected"
        ];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "وضعیت نامعتبر است"
            });
        }
        const updatedRequest = await Request_1.Request.findByIdAndUpdate(id, { status }, {
            new: true,
            runValidators: true
        }).populate("user", "fullName email phoneNumber");
        if (!updatedRequest) {
            return res.status(404).json({
                success: false,
                message: "درخواست پیدا نشد"
            });
        }
        res.status(200).json({
            success: true,
            message: "وضعیت درخواست با موفقیت تغییر کرد",
            request: updatedRequest
        });
    }
    catch (err) {
        console.error("UPDATE REQUEST ERROR:", err);
        res.status(500).json({
            success: false,
            message: "خطا در بروزرسانی درخواست"
        });
    }
});
// حذف درخواست
app.delete("/api/admin/requests/:id", auth_middleware_1.default, admin_1.adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRequest = await Request_1.Request.findByIdAndDelete(id);
        if (!deletedRequest) {
            return res.status(404).json({
                success: false,
                message: "درخواست پیدا نشد"
            });
        }
        res.status(200).json({
            success: true,
            message: "درخواست با موفقیت حذف شد"
        });
    }
    catch (err) {
        console.error("DELETE REQUEST ERROR:", err);
        res.status(500).json({
            success: false,
            message: "خطا در حذف درخواست"
        });
    }
});
// movie 
app.get("/api/movies/:id", auth_middleware_1.default, async (req, res) => {
    try {
        const id = String(req.params.id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID"
            });
        }
        const movie = await Movie_1.Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.json(movie);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// شروع سرور
app.listen(PORT, () => {
    console.log(`🚀 سرور روی پورت ${PORT} در حال اجراست!`);
    console.log(`📍 آدرس API: http://localhost:${PORT}/api/users`);
});
