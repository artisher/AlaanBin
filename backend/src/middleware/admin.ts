import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const adminMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "احراز هویت نشده",
            });
        }

        const decoded = jwt.verify(
            token,
            "alanbin-secret-key"
        ) as {
            id: string;
            role: string;
        };

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "کاربر پیدا نشد",
            });
        }

        if (user.role !== "admin") {
            return res.status(403).json({
                message: "دسترسی غیرمجاز",
            });
        }

        next();
    } catch (err) {
        return res.status(401).json({
            message: "توکن نامعتبر است",
        });
    }
};