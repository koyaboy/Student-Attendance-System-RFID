const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    department: { type: String, required: true },
    title: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },

    startTime: { type: String },
    endTime: { type: String }
});

module.exports = mongoose.model('Course', courseSchema);
