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
    getActivity } = require("../controllers/userController")



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
router.post("/admin/addStudent", addStudent)
router.post("/admin/createCourse", createCourse)
router.post("/admin/addTeacher", addTeacher)


module.exports = router