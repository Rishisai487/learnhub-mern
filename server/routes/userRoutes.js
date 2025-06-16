const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { registerUser, loginUser } = require('../controllers/userController');


router.post('/register', registerUser);
router.post('/login', loginUser);
const Course = require('../models/Course');

router.get('/:id/courses', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('enrolledCourses');
    res.json(user.enrolledCourses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get enrolled courses' });
  }
});

module.exports = router;
