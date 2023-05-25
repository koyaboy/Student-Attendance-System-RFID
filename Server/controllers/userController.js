const User = require("../models/userModel")
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

        //create a token
        const token = createToken(user._id)

        res.status(200).json({ username, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//view attendance
const viewAttendance = async (req, res) => {
    res.json({ msg: "View attendance" })
}

const complaintsForm = async (req, res) => {
    res.json({ msg: "Complaints Form" })
}




//ADMIN

const addStudent = async (req, res) => {
    res.json({ msg: "add Student" })
}



module.exports = {
    loginUser,
    viewAttendance,
    complaintsForm,
    addStudent
}