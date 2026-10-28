import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const signStreamToken = (userId: string, path: string) =>
    jwt.sign({ id: userId, p: path, k: "stream" }, process.env.JWT_SECRET!, { expiresIn: "8h" });

const checkStreamAccess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const st = typeof req.query.st === "string" ? req.query.st : "";
        const raw = st || req.cookies.token;

        if (!raw) {
            return res.status(401).json({ success: false, code: "AUTH_REQUIRED" });
        }

        const decoded: any = jwt.verify(raw, process.env.JWT_SECRET!);

        if (st && (decoded.k !== "stream" || decoded.p !== decodeURIComponent(req.path))) {
            return res.status(403).json({ success: false, code: "BAD_STREAM_TOKEN" });
        }

        const user = await User.findById(decoded.id);
        if (!user || !user.subscriptionExpireDate || new Date(user.subscriptionExpireDate) < new Date()) {
            return res.status(403).json({ success: false, code: "SUBSCRIPTION_REQUIRED" });
        }

        next();
    } catch {
        return res.status(401).json({ success: false, code: "INVALID_TOKEN" });
    }
};

export default checkStreamAccess;