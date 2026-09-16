const express = require('express');
const CV = require('../models/CV');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Apply auth middleware to all CV routes
router.use(authMiddleware);

// Get all CVs for the logged in user
router.get('/', async (req, res) => {
  try {
    const cvs = await CV.find({ user_id: req.user.userId }).sort({ updated_at: -1 });
    res.json(cvs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get a single CV by ID
router.get('/:id', async (req, res) => {
  try {
    const cv = await CV.findOne({ _id: req.params.id, user_id: req.user.userId });
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.json(cv);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new CV
router.post('/', async (req, res) => {
  try {
    const newCV = new CV({
      user_id: req.user.userId,
      ...req.body
    });
    await newCV.save();
    res.status(201).json(newCV);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a CV
router.put('/:id', async (req, res) => {
  try {
    const cv = await CV.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.userId },
      { ...req.body, updated_at: Date.now() },
      { new: true }
    );
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.json(cv);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a CV
router.delete('/:id', async (req, res) => {
  try {
    const cv = await CV.findOneAndDelete({ _id: req.params.id, user_id: req.user.userId });
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
