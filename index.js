const express = require("express")
const app = express();
const mongoose = require("mongoose");

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://yogesh:wgLs5wP8zYA0x8mX@cluster0.0rnu3.mongodb.net/assignment",
{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true

    }).then(() => {     //handle the promise
        console.log("DB connection succesful");
    });

//create schema
const user = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter the name"]
    },
    email: {
        type: String,
        required: [true, "please enter the emai ID"],
        unique: true
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        male: { type: Boolean, default: true },
        female: { type: Boolean, default: true }

    },
    address: {
        type: String,
        required: [true, "please enter the address"]
    }
})

//creating model
const userModel = mongoose.model("userModel", user)

//app.get
app.get("/", (req, res) => {
    res.sendFile(__dirname +"/form.html")
})

//app.post
app.post("/", (req, res) => {
    console.log(req.body)
    let newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        dob: req.body.dob,
        gender: req.body.gender,
        address: req.body.address

    });
    newUser.save().then(
        () => {
            res.redirect("/")
        })
        .catch(() => {
            res.status(400).send("not saved")
        });
})
//listening to server
app.listen(80, () => {
    console.log("server is running")
})






























