import { useState, useEffect } from 'react'
import './styles/App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
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


function App() {
  const { user } = useAuthContext()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate checking authentication status
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    // Show loading state while checking authentication
    return <div>Loading...</div>
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {user ? (
            <Route
              path="/"
              element={<Dashboard />}
            >
              <Route path="" element={<Home />} />
              <Route path="/viewattendance" element={<ViewAttendance />} />
              <Route path="/complaintsform" element={<ComplaintsForm />} />
            </Route>
          ) : (
            <Navigate to="/login" />
          )}

          {user ? (
            <Route
              path="/teacher"
              element={<TeacherDashboard />}
            >
              <Route path="/teacher" element={<TeacherHome />} />
              <Route path="/teacher/setupattendance" element={<SetupAttendance />} />
              <Route path="/teacher/uploadattendance" element={<UploadAttendance />} />
            </Route>
          ) : (
            <Navigate to="/login" />
          )}

          {user ? (
            <Route
              path="/admin"
              element={<AdminDashboard />}
            >
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/admin/complaints" element={<Complaints />} />
              <Route path="/admin/managecourses" element={<ManageCourses />} />
              <Route path="/admin/managestudents" element={<ManageStudents />} />
              <Route path="/admin/manageteachers" element={<ManageTeachers />} />
            </Route>
          ) : (
            <Navigate to="/login" />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
