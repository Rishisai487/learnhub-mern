const Course = require('../models/Course');
const User = require('../models/User');

const addCourse = async (req, res) => {
  const { title, description, category, userId } = req.body;

  try {
    const user = await User.findById(userId);
    console.log("User uploading course:", user?.email, "| role:", user?.role); // 👀 debug log

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can upload courses' });
    }

    const newCourse = await Course.create({ title, description, category });
    res.status(201).json(newCourse);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: 'Failed to add course' });
  }
};

module.exports = { addCourse };
