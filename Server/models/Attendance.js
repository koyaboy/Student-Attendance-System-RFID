const mongoose = require("mongoose")

const Schema = mongoose.Schema

const attendanceSchema = new Schema({
    username:
    {
        type: Schema.Types.ObjectId, ref: "User",
        required: true
    },
    course_id:
    {
        type: Schema.Types.ObjectId, ref: "Course"
    },

    date: {
        type: Date,
        default: Date.now
    },
    present: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Attendance", attendanceSchema)