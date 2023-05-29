const User = require("../models/userModel")
const Attendance = require("../models/Attendance")
const Course = require("../models/Course")
const Complaints = require("../models/Complaints")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" })
}


//STUDENT

//login user
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.login(username, password)

        const userdetails = await User.findOne({ username })
        const firstname = userdetails.firstname;
        const lastname = userdetails.lastname

        //create a token
        const token = createToken(user._id)

        res.status(200).json({ username, token, firstname, lastname })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//view attendance
const viewAttendance = async (req, res) => {
    try {
        const { username, courseId } = req.params

        //Retrieve the User document based on the username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const attendanceData = await Attendance.find({
            username: user.username,
            course_id: courseId
        });

        res.status(200).json(attendanceData);
    } catch (error) {
        res.status(500).json({ msg: "Failed to Fetch attendance" })
    }
}

const complaintsForm = async (req, res) => {

    const { username } = req.params
    const { selectedCourse, dateMissed, reason } = req.body

    const newComplaint = {
        username,
        selectedCourse: selectedCourse,
        dateMissed: dateMissed,
        reason: reason
    }

    try {
        const complaint = await Complaints.create(newComplaint)
        res.status(200).json({ message: complaint })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" })
    }



}

const getCourses = async (req, res) => {

    try {
        const { username } = req.params

        //Retrieve the User document based on the username
        const user = await User.findOne({ username }).populate("courses")
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userCourses = user.courses;
        res.json(userCourses);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}




//ADMIN

const addStudent = async (req, res) => {
    res.json({ msg: "add Student" })
}

const getComplaints = async (req, res) => {

    try {
        const complaints = await Complaints.find({}).populate("selectedCourse")
        res.status(200).json(complaints)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to retrieve complaints' });

    }

}



module.exports = {
    loginUser,
    viewAttendance,
    complaintsForm,
    addStudent,
    getCourses,
    complaintsForm,
    getComplaints
}

//6472269d27849edf3ecbe348 (csc 424)