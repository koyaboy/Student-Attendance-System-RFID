const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,

    },

    password: {
        type: String,
        required: true,
    },

    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    courses: {
        type: [Schema.Types.ObjectId],
        ref: "Course",
    },

    department: {
        type: String
    },

    level: {
        type: String,
    },

    title: {
        type: String
    },
    role: {
        type: String,
        required: true
    }
})

// static addStudent method

userSchema.statics.addStudent = async (username, password, course, level, role) => {
    const exists = await this.findOne({ username })

    if (exists) {
        throw Error("Username already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, password: hash, course, level, role })

    return user
}

// static login method

userSchema.statics.login = async function (username, password) {

    if (!username || !password) {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({ username })

    if (!user) {
        throw Error("Incorrect details")
    }

    // const match = await bcrypt.compare(password, user.password)

    // if (!match) {
    //     throw Error("Incorrect password")
    // }

    return user
}

module.exports = mongoose.model("User", userSchema)