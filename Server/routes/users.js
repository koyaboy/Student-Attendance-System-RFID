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
    getComplaints } = require("../controllers/userController")


// STUDENT ROUTES

router.post("/login", loginUser)


//Middleware

router.use(authMiddleware)

router.get("/viewattendance", viewAttendance)

router.post("viewattendance", (req, res) => {
    res.json({ msg: "Attendance uploaded" })
})

router.post("/complaintsform/:username", complaintsForm)

router.get("/courses/:username", getCourses)





//ADMIN ROUTES

router.get("/admin/complaints", getComplaints)
router.post("/admin/addStudent", addStudent)

module.exports = router