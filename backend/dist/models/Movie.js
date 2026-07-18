"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const movieSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: String,
    poster: String,
    rating: { type: Number, min: 0, max: 10 },
    topWeek: { type: Boolean, default: false },
    genre: [String],
    year: Number,
    product: String,
    duration: Number
});
exports.Movie = mongoose_1.default.model('Movie', movieSchema);
