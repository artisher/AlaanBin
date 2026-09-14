"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const checkSubscription = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                code: "AUTH_REQUIRED",
                message: "ابتدا وارد حساب شوید",
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await User_1.User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                code: "USER_NOT_FOUND",
                message: "کاربر پیدا نشد",
            });
        }
        if (!user.subscriptionExpireDate ||
            new Date(user.subscriptionExpireDate) < new Date()) {
            return res.status(403).json({
                success: false,
                code: "SUBSCRIPTION_REQUIRED",
                message: "اشتراک شما منقضی شده است",
            });
        }
        next();
    }
    catch (err) {
        console.error("checkSubscription error:", err);
        return res.status(401).json({
            success: false,
            code: "INVALID_TOKEN",
            message: "توکن نامعتبر است",
        });
    }
};
exports.default = checkSubscription;
