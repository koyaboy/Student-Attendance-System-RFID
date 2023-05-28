const mongoose = require("mongoose")

const Schema = mongoose.Schema

const complaintsSchema = new Schema({
    selectedCourse: {
        type: String
    },

    dateMissed: {
        type: Date
    },

    reason: {
        type: String
    }
});

module.exports = mongoose.model("Complaints", complaintsSchema)