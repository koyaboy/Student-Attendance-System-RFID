const User = require("../models/userModel")
const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()



//controller functions
const { loginUser,
    viewAttendance,
    complaintsForm,
    addStudent,
    getCourses,
    getComplaints,
    createCourse,
    adminGetCourses,
    adminGetStudents,
    adminGetTeachers,
    addTeacher,
    getActivity,
    getComplaintsData,
    updateStudent,
    updateCourse,
    updateTeacher,
    updateComplaint,
    deleteStudent,
    deleteCourse,
    deleteTeacher,
    deleteComplaint } = require("../controllers/userController")



router.post("/login", loginUser)


//Middleware

router.use(authMiddleware)


// STUDENT ROUTES

router.get("/viewattendance", viewAttendance)
router.get("/courses/:username", getCourses)

router.post("viewattendance", (req, res) => {
    res.json({ msg: "Attendance uploaded" })
})

router.post("/complaintsform/:username", complaintsForm)


//ADMIN ROUTES

router.get("/admin/complaints", getComplaints)
router.get("/admin/getCourses", adminGetCourses)
router.get("/admin/getStudents", adminGetStudents)
router.get("/admin/getTeachers", adminGetTeachers)
router.get("/admin/activity", getActivity)
router.get("/admin/complaintsData", getComplaintsData)

router.post("/admin/addStudent", addStudent)
router.post("/admin/createCourse", createCourse)
router.post("/admin/addTeacher", addTeacher)

router.put("/admin/updateStudent/:studentId", updateStudent)
router.put("/admin/updateCourse/:courseId", updateCourse)
router.put("/admin/updateTeacher/:teacherId", updateTeacher)
router.put("/admin/updateComplaint/:complaintId/:username/:actionBy", updateComplaint)

router.delete("/admin/deleteStudent/:studentId/:username/:actionBy", deleteStudent)
router.delete("/admin/deleteCourse/:courseId/:courseCode/:actionBy", deleteCourse)
router.delete("/admin/deleteTeacher/:teacherId/:username/:actionBy", deleteTeacher)
router.delete("/admin/deleteComplaint/:complaintId/:actionBy", deleteComplaint)

module.exports = router