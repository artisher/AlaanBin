import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["bug", "film", "contact"],
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        name: {
            type: String,
            default: "",
        },

        email: {
            type: String,
            default: "",
        },

        subject: {
            type: String,
            default: "",
        },

        message: {
            type: String,
            required: true,
        },

        movieTitle: {
            type: String,
            default: "",
        },

        page: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["pending", "reviewing", "resolved", "rejected"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

export const Request = mongoose.model("Request", requestSchema);