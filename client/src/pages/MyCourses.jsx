import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${user.id}/courses`);
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to load enrolled courses");
      }
    };
    fetchEnrolled();
  }, [user.id]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Enrolled Courses</h2>
      {courses.length > 0 ? (
        courses.map(course => (
          <div key={course._id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p><strong>Category:</strong> {course.category}</p>
          </div>
        ))
      ) : (
        <p>No courses enrolled yet.</p>
      )}
    </div>
  );
}

export default MyCourses;
