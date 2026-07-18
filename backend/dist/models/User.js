"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    hasActiveSubscription: {
        type: Boolean,
        default: false
    },
    signUpDate: {
        type: Date,
        default: Date.now
    },
    subscriptionExpireDate: Date,
    favoriteTitle: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Movie"
        }
    ],
    country: String,
    city: String
});
exports.User = mongoose_1.default.model('User', userSchema);
