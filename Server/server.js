require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")

const userRoutes = require("./routes/users")

const app = express();




app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

// Routes
app.use("/", userRoutes)


//Connect to db

mongoose.connect("mongodb://127.0.0.1:27017/mydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(4000, () => {
            console.log("Connected to DB and listening on port 4000");
        })
    })

    .catch((err) => {
        console.log(err);
    })

