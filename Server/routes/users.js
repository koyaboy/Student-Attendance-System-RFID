const User = require("../models/userModel");
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const restrictToRole = require("../middleware/restrictToRole");

const router = express.Router();

// Controller functions
const {
    loginUser,
    viewAttendance,
    complaintsForm,
    markAttendance,
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
    deleteComplaint,
    getTeacherCourses,
    setupAttendance,
    getAttendance
} = require("../controllers/userController");

router.post("/login", loginUser);

// Middleware
router.use(authMiddleware);

// STUDENT ROUTES
const studentRouter = express.Router();
// studentRouter.use(restrictToRole("S"));
studentRouter.get("/viewattendance", viewAttendance);
studentRouter.get("/courses/:username", getCourses);
studentRouter.post("/attendance", markAttendance)
studentRouter.post("/viewattendance", (req, res) => {
    res.json({ msg: "Attendance uploaded" });
});
studentRouter.post("/complaintsform/:username", complaintsForm);

// ADMIN ROUTES
const adminRouter = express.Router();
// adminRouter.use(restrictToRole("A"));
adminRouter.get("/complaints", getComplaints);
adminRouter.get("/getCourses", adminGetCourses);
adminRouter.get("/getStudents", adminGetStudents);
adminRouter.get("/getTeachers", adminGetTeachers);
adminRouter.get("/activity", getActivity);
adminRouter.get("/complaintsData", getComplaintsData);
adminRouter.post("/addStudent", addStudent);
adminRouter.post("/createCourse", createCourse);
adminRouter.post("/addTeacher", addTeacher);
adminRouter.put("/updateStudent/:studentId", updateStudent);
adminRouter.put("/updateCourse/:courseId", updateCourse);
adminRouter.put("/updateTeacher/:teacherId", updateTeacher);
adminRouter.put("/updateComplaint/:complaintId/:username/:actionBy", updateComplaint);
adminRouter.delete("/deleteStudent/:studentId/:username/:actionBy", deleteStudent);
adminRouter.delete("/deleteCourse/:courseId/:courseCode/:actionBy", deleteCourse);
adminRouter.delete("/deleteTeacher/:teacherId/:username/:actionBy", deleteTeacher);
adminRouter.delete("/deleteComplaint/:complaintId/:actionBy", deleteComplaint);

const teacherRouter = express.Router()
teacherRouter.get("/getTeacherCourses/:username", getTeacherCourses);
teacherRouter.put("/setupAttendance", setupAttendance);
teacherRouter.get("/getAttendance/:courseId/:date", getAttendance);

// Register the student, admin and teacher routers
router.use("/", studentRouter);
router.use("/admin", adminRouter);
router.use("/teacher", teacherRouter);

module.exports = router;
