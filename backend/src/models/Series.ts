import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    aliases: {
      type: [String],
      default: [],
    },

    description: String,

    poster: String,

    rating: {
      type: Number,
      min: 0,
      max: 10,
    },

    topWeek: {
      type: Boolean,
      default: false,
    },

    genre: [String],

    year: Number,

    product: String,
  },
  {
    timestamps: true,
  }
);

export const Series = mongoose.model("Series", seriesSchema);