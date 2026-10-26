const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  likes: { type: Number, default: 0 }
}, { timestamps: true });

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  posterUrl: { type: String, required: true },
  bannerUrl: { type: String },
  trailerUrl: { type: String, required: true },
  releaseDate: { type: String, required: true },
  runtime: { type: String, required: true },
  genres: [String],
  certification: { type: String, default: 'UA' },
  cast: [{
    name: String,
    role: String,
    photoUrl: String
  }],
  reviews: [reviewSchema]
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);