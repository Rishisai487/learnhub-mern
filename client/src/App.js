import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar'; 
import CourseUpload from './pages/CourseUpload';
import CourseList from './pages/CourseList';
import MyCourses from './pages/MyCourses';


function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Always visible on top */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<CourseUpload />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/my-courses" element={<MyCourses />} />
      </Routes>
    </Router>
  );
}
export default App;
