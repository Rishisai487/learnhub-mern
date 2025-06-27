import React, { useState } from 'react';
import axios from 'axios';

function CourseUpload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState('');
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('userId', user.id);
    formData.append('file', file);
    formData.append('isPaid', isPaid);
    if (isPaid) {
      formData.append('price', price);
    }

    try {
      await axios.post('https://learnhub-backend-qtw7.onrender.com/api/courses/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ Course uploaded!');
      setTitle('');
      setDescription('');
      setCategory('');
      setFile(null);
      setIsPaid(false);
      setPrice('');
    } catch (err) {
      alert('❌ Failed to upload course');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-indigo-700">
          📤 Upload Course
        </h2>

        <input
          type="text"
          placeholder="Course Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded-md focus:ring focus:ring-indigo-300"
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-4 py-2 rounded-md focus:ring focus:ring-indigo-300"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-4 py-2 rounded-md focus:ring focus:ring-indigo-300"
        />

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isPaid}
            onChange={() => setIsPaid(!isPaid)}
            className="form-checkbox"
          />
          <label className="text-sm text-gray-700">Is this a paid course?</label>
        </div>

        {isPaid && (
          <input
            type="number"
            placeholder="Price (₹)"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border px-4 py-2 rounded-md focus:ring focus:ring-indigo-300"
          />
        )}

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border px-4 py-2 rounded-md bg-white"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default CourseUpload;
