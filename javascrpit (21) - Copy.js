const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Show = require('../models/Show');
const auth = require('../middleware/authMiddleware');

// Create Booking
router.post('/', auth, async (req, res) => {
  try {
    const { showId, movieTitle, theatre, showDate, showTime, seats, seatCategory, totalPrice } = req.body;

    const show = await Show.findById(showId);
    if (!show) return res.status(404).json({ message: 'Show not found' });

    // Conflict check
    const alreadyBooked = seats.some(seat => show.occupiedSeats.includes(seat));
    if (alreadyBooked) {
      return res.status(400).json({ message: 'One or more selected seats have already been booked.' });
    }

    // Reserve seats
    show.occupiedSeats.push(...seats);
    await show.save();

    // Create booking record
    const booking = new Booking({
      user: req.user.id,
      userEmail: req.user.email,
      show: showId,
      movieTitle,
      theatre,
      showDate,
      showTime,
      seats,
      seatCategory,
      totalPrice
    });
    await booking.save();

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Current User Bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Bookings (Admin)
router.get('/all', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;