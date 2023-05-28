const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
});

module.exports = mongoose.model('Course', courseSchema);
