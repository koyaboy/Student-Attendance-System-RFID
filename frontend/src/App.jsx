import { useState, useEffect } from 'react'
import './styles/App.css'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from "./pages/Login"
import { useAuthContext } from './hooks/useAuthContext'

/*STUDENT*/

import Dashboard from "./pages/Student/Dashboard"
import ViewAttendance from "./pages/Student/ViewAttendance"
import ComplaintsForm from './pages/Student/ComplaintsForm'
import Home from './pages/Student/Home'

/*TEACHER*/

import TeacherDashboard from "./pages/Teacher/TeacherDashboard"
import SetupAttendance from './pages/Teacher/SetupAttendance'
import UploadAttendance from './pages/Teacher/UploadAttendance'
import TeacherHome from "./pages/Teacher/TeacherHome"

/*ADMIN*/
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminHome from "./pages/Admin/AdminHome"
import Complaints from "./pages/Admin/Complaints"
import ManageCourses from "./pages/Admin/ManageCourses"
import ManageStudents from "./pages/Admin/ManageStudents"
import ManageTeachers from "./pages/Admin/ManageTeachers"
import AddCourse from "./pages/Admin/AddCourse"
import AddStudent from "./pages/Admin/AddStudent"
import AddTeacher from "./pages/Admin/AddTeacher"
import UpdateStudent from './pages/Admin/UpdateStudent';
import UpdateCourse from "./pages/Admin/UpdateCourse";
import UpdateTeacher from "./pages/Admin/UpdateTeacher"

function App() {
  const { user } = useAuthContext();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking authentication status
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    // Show loading state while checking authentication
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {user ? (
          <Route path="/" element={<Dashboard />}>
            <Route path="" element={<Home />} />
            <Route path="/viewattendance" element={<ViewAttendance />} />
            <Route path="/complaintsform" element={<ComplaintsForm />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}

        {user ? (
          <Route path="/teacher" element={<TeacherDashboard />}>
            <Route path="/teacher" element={<TeacherHome />} />
            <Route path="/teacher/setupattendance" element={<SetupAttendance />} />
            <Route path="/teacher/uploadattendance" element={<UploadAttendance />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}

        {user ? (
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/complaints" element={<Complaints />} />
            <Route path="/admin/managecourses" element={<ManageCourses />} />
            <Route path="/admin/managestudents" element={<ManageStudents />} />
            <Route path="/admin/manageteachers" element={<ManageTeachers />} />
            <Route path="/admin/addcourse" element={<AddCourse />} />
            <Route path="/admin/addstudent" element={<AddStudent />} />
            <Route path="/admin/addteacher" element={<AddTeacher />} />
            <Route path="/admin/updateStudent/:studentId" element={<UpdateStudent />} />
            <Route path="/admin/updateCourse/:courseId" element={<UpdateCourse />} />
            <Route path="/admin/updateTeacher/:teacherId" element={<UpdateTeacher />} />


          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;