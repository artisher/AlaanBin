import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema(
  {
    seriesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Series",
      required: true,
    },

    seasonNumber: {
      type: Number,
      default: 1,
    },

    episodeNumber: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    duration: Number,
  },
  {
    timestamps: true,
  }
);

episodeSchema.index({
  seriesId: 1,
  seasonNumber: 1,
  episodeNumber: 1,
});

export const Episode = mongoose.model("Episode", episodeSchema);