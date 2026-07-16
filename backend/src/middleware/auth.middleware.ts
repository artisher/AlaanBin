import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const checkSubscription = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "ابتدا وارد حساب شوید"
            });
        }

        const decoded = jwt.verify(
            token,
            "alanbin-secret-key"
        ) as {
            id: string;
        };

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "کاربر پیدا نشد"
            });
        }

        if (
            !user.subscriptionExpireDate ||
            new Date(user.subscriptionExpireDate) < new Date()
        ) {
            return res.status(403).json({
                message: "اشتراک شما منقضی شده است"
            });
        }

        next();

    } catch (err) {
        return res.status(401).json({
            message: "توکن نامعتبر است"
        });
    }
};

export default checkSubscription;