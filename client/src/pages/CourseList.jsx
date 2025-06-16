import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('');
  const user = JSON.parse(localStorage.getItem("user")); // ✅ Get logged-in user

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/courses/all');
        setCourses(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, []);

  const handleFilter = () => {
    if (!category.trim()) return setFiltered(courses);
    const match = courses.filter(c => c.category.toLowerCase().includes(category.toLowerCase()));
    setFiltered(match);
  };

  const handleEnroll = async (courseId) => {
    try {
      await axios.post('http://localhost:5000/api/enroll/enroll', {
        userId: user.id,
        courseId: courseId
      });
      alert("Enrolled successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment failed");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Courses</h2>

      <div>
        <input
          type="text"
          placeholder="Filter by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {filtered.length > 0 ? (
          filtered.map((course) => (
            <div key={course._id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p><strong>Category:</strong> {course.category}</p>

              {user && (
                <button onClick={() => handleEnroll(course._id)}>
                  Enroll
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
}

export default CourseList;
