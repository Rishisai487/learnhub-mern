const express = require('express');
const router = express.Router();
const { addCourse } = require('../controllers/courseController');

router.post('/add', addCourse);
const Course = require('../models/Course');

router.get('/all', async (req, res) => {
  try {
    const all = await Course.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});
module.exports = router;

