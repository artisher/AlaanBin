"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const adminMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "احراز هویت نشده",
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, "alanbin-secret-key");
        const user = await User_1.User.findById(decoded.id);
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
    }
    catch (err) {
        return res.status(401).json({
            message: "توکن نامعتبر است",
        });
    }
};
exports.adminMiddleware = adminMiddleware;
