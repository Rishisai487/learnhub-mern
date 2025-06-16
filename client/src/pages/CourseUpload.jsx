import React, { useState } from 'react';
import axios from 'axios';

function CourseUpload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("user")); // ✅ get current user
  try {
    await axios.post('http://localhost:5000/api/courses/add', {
      title,
      description,
      category,
      userId: user.id // ✅ send user ID to backend
    });
    alert('Course uploaded!');
    setTitle('');
    setDescription('');
    setCategory('');
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to upload course');
  }
};


  return (
    <div>
      <h2>Upload Course</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default CourseUpload;
