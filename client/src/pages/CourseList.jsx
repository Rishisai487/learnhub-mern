import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = 'https://learnhub-backend-qtw7.onrender.com';

function CourseList() {
  const [courses, setCourses]   = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('');
  const [open, setOpen]         = useState(null);        // courseId that is expanded
  const [comments, setComments] = useState({});          // { courseId: [...] }
  const [newTxt , setNewTxt]    = useState('');          // for the active course

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  /* fetch courses once */
  useEffect(() => {
    axios.get(`${API}/api/courses/all`)
      .then(res => { setCourses(res.data); setFiltered(res.data); })
      .catch(err => console.error(err));
  }, []);

  /* ------------ helpers ------------ */
  const toggle = async (courseId) => {
    // close
    if (open === courseId) return setOpen(null);

    // open – fetch comments if we haven’t yet
    if (!comments[courseId]) {
      try {
        const { data } = await axios.get(`${API}/api/comments/${courseId}`);
        setComments(prev => ({ ...prev, [courseId]: data }));
      } catch (e) { console.error(e); }
    }
    setOpen(courseId);
    setNewTxt('');
  };

  const sendComment = async (courseId) => {
    if (!newTxt.trim()) return;

    try {
      const { data } = await axios.post(`${API}/api/comments`, {
        courseId,
        userId: user.id,
        text:   newTxt
      });
      setComments(prev => ({
        ...prev,
        [courseId]: [data, ...(prev[courseId] || [])]
      }));
      setNewTxt('');
    } catch (e) { console.error(e); }
  };

  /* ------------ UI ------------ */
  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      {/* filter box … unchanged … */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtered.map(course => (
          <div key={course._id} className="bg-white p-6 rounded-lg shadow">
            {/* title/desc/file/enroll logic – unchanged – */}

            {/* Comments toggle button */}
            <button
              onClick={() => toggle(course._id)}
              className="mt-3 text-sm text-indigo-600 hover:underline"
            >
              {open === course._id ? 'Hide Comments' : '💬 View Comments'}
            </button>

            {/* ---------- COMMENTS PANEL ---------- */}
            {open === course._id && (
              <div className="mt-3 border-t pt-3 text-sm">
                {/* list */}
                {(comments[course._id] || []).length === 0
                  ? <p className="text-gray-500">No comments yet.</p>
                  : comments[course._id].map(c => (
                      <div key={c._id} className="mb-2">
                        <span className="font-medium">{c.userId.name}: </span>
                        {c.text}
                      </div>
                    ))}

                {/* add */}
                {user && (
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      value={newTxt}
                      onChange={e => setNewTxt(e.target.value)}
                      placeholder="Add comment"
                      className="flex-1 border px-2 py-1 rounded"
                    />
                    <button
                      onClick={() => sendComment(course._id)}
                      className="bg-indigo-600 text-white px-3 py-1 rounded"
                    >
                      Post
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
