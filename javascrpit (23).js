const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  theatre: { type: String, required: true },
  showDate: { type: String, required: true },
  showTime: { type: String, required: true },
  prices: {
    balcony: { type: Number, default: 250 },
    middle: { type: Number, default: 180 },
    lower: { type: Number, default: 100 }
  },
  occupiedSeats: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Show', showSchema);