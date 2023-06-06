const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    department: { type: String, required: true },
    title: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
});

module.exports = mongoose.model('Course', courseSchema);
