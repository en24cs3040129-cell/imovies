const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userEmail: { type: String, required: true },
  show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
  movieTitle: { type: String, required: true },
  theatre: { type: String, required: true },
  showDate: { type: String, required: true },
  showTime: { type: String, required: true },
  seats: [{ type: String, required: true }],
  seatCategory: { type: String, default: 'Balcony' },
  totalPrice: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);