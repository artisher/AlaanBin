import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
const isProduction = process.env.APP_ENV === "production";
const checkSubscription = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                code: "AUTH_REQUIRED",
                message: "ابتدا وارد حساب شوید",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as {
            id: string;
        };

        const user = await User.findById(decoded.id);

        if (!user) {
            res.clearCookie("token", {
                httpOnly: true,
                sameSite: "lax",
                secure: isProduction,
                ...(isProduction && {
                    domain: ".alanbin.com",
                }),
                path: "/",
            });

            return res.status(401).json({
                success: false,
                code: "ACCOUNT_DELETED",
                message: "حساب کاربری حذف شده است",
            });
        }

        if (
            !user.subscriptionExpireDate ||
            new Date(user.subscriptionExpireDate) < new Date()
        ) {
            return res.status(403).json({
                success: false,
                code: "SUBSCRIPTION_REQUIRED",
                message: "اشتراک شما منقضی شده است",
            });
        }

        next();
    } catch (err) {
        console.error("checkSubscription error:", err);

        return res.status(401).json({
            success: false,
            code: "INVALID_TOKEN",
            message: "توکن نامعتبر است",
        });
    }
};

export default checkSubscription;