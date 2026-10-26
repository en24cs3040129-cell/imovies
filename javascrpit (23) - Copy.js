const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const auth = require('../middleware/authMiddleware');

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new movie (Admin)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add review to movie
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment, username } = req.body;
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    movie.reviews.unshift({
      userId: req.user.id,
      username: username || 'Verified User',
      rating,
      comment
    });

    await movie.save();
    res.status(201).json(movie.reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;