import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
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

export const Movie = mongoose.model('Movie', movieSchema);