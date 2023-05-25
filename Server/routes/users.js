const User = require("../models/userModel")
const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()



//controller functions
const { loginUser,
    viewAttendance,
    complaintsForm,
    addStudent } = require("../controllers/userController")


// STUDENT ROUTES

router.post("/login", loginUser)


//Middleware

router.use(authMiddleware)

router.get("/viewattendance", viewAttendance)

router.post("/complaintsForm", (req, res) => {
    res.json({ msg: "Complaints" })
})





//ADMIN ROUTES

router.post("/admin/addStudent", addStudent)

module.exports = router