const express = require('express');
const CV = require('../models/CV');

const router = express.Router();

// Get all CVs (we probably don't want to expose this to everyone without auth, but for now we'll just return an empty array or limit it, actually let's just return all for simplicity or remove it if not used by frontend)
router.get('/', async (req, res) => {
  try {
    const cvs = await CV.find({}).sort({ updated_at: -1 }).limit(100);
    res.json(cvs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get a single CV by ID
router.get('/:id', async (req, res) => {
  try {
    const cv = await CV.findOne({ _id: req.params.id });
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
      { _id: req.params.id },
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
    const cv = await CV.findOneAndDelete({ _id: req.params.id });
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
