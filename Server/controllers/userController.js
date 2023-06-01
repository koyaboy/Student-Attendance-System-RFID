const User = require("../models/userModel")
const Attendance = require("../models/Attendance")
const Course = require("../models/Course")
const Complaints = require("../models/Complaints")
const Activity = require("../models/Activity")
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
    try {
        const { firstname, lastname, username, password, department, role, level, actionBy } = req.body

        const student = await User.create({
            firstname, lastname, username, password, department, level, role
        })

        //Update Activity Table
        const activity = await Activity.create({
            timestamp: Date.now(),
            action: `Student ${username} created Successfully`,
            actionBy: actionBy
        })

        res.status(200).json(student)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to create student" })
    }


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

const createCourse = async (req, res) => {
    try {
        const { department, title, code, description, instructor, actionBy } = req.body

        const course = await Course.create({
            department,
            title,
            code,
            description,
            instructor
        })

        //Update Activity Table
        const activity = await Activity.create({
            timestamp: Date.now(),
            action: `Course ${code} created Successfully`,
            actionBy: actionBy
        })


        res.status(200).json({ msg: course })


    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" })
    }
}

const adminGetCourses = async (req, res) => {
    try {
        const courses = await Course.find({})
        res.status(200).json(courses)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to retrieve courses' });
    }
}

const adminGetStudents = async (req, res) => {
    try {
        const students = await User.find({ role: "S" })
        res.status(200).json(students)

    } catch (error) {
        console.log(error)
    }
}

const adminGetTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: "T" }).populate("courses")
        res.status(200).json(teachers)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to retrieve Teachers' });
    }
}

const addTeacher = async (req, res) => {
    try {
        const { title, firstname, lastname, username, password, department, role, actionBy } = req.body

        const teacher = await User.create({
            title, firstname, lastname, username, password, department, role
        })

        const activity = await Activity.create({
            timestamp: Date.now(),
            action: `Teacher ${title}. ${firstname} ${lastname} created Successfully`,
            actionBy: actionBy
        })

        res.status(200).json(teacher)


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to create Teacher" })
    }
}

const getActivity = async (req, res) => {
    try {
        const activities = await Activity.find()
        res.status(200).json(activities)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to retrieve Recent Activities" })
    }
}

const updateStudent = async (req, res) => {
    try {
        const { id, firstname, lastname, username, password, level, department, role, actionBy } = req.body
        const student = await User.findById(id)

        if (!student) {
            return res.status(404).json({ message: 'Student not found' })
        }

        student.firstname = firstname;
        student.lastname = lastname;
        student.username = username;
        student.password = password;
        student.level = level;
        student.department = department;
        student.role = role;

        // Save the updated student
        await student.save();

        //Update Activity table


        const activity = await Activity.create({
            timestamp: Date.now(),
            action: `Student ${username} Information Updated`,
            actionBy: actionBy
        })

        res.status(200).json({ message: "Student Updated Successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to Update Student" })
    }
}

const deleteStudent = async (req, res) => {
    const { studentId, username, actionBy } = req.params

    try {
        const result = await User.deleteOne({ _id: studentId })


        if (result.deletedCount == 1) {
            res.status(200).json({ message: "Student successfully deleted" })
        } else {
            res.status(404).json({ message: "Student Not Found" })
        }

        //Update Activity table
        const activity = await Activity.create({
            timestamp: Date.now(),
            action: `Student ${username} Deleted`,
            actionBy: actionBy
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to delete student" })
    }
}



module.exports = {
    loginUser,
    viewAttendance,
    complaintsForm,
    addStudent,
    getCourses,
    complaintsForm,
    getComplaints,
    createCourse,
    adminGetCourses,
    adminGetStudents,
    adminGetTeachers,
    addTeacher,
    getActivity,
    updateStudent,
    deleteStudent
}

//6472269d27849edf3ecbe348 (csc 424)
//6473c306809776f16dc4c6e8 (csc 446)


