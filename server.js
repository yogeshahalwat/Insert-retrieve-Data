const express=require("express");
const mongoose=require("mongoose");
const app=express();
const ejs=require("ejs");

app.set("view engine" ,"ejs")

mongoose.connect("mongodb+srv://yogesh:wgLs5wP8zYA0x8mX@cluster0.0rnu3.mongodb.net/assignment?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

//creating a schema 
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

//creating a model
const userModel = mongoose.model("userModel", user)





app.get("/",(req,res)=>{
   userModel.find({},function(err,usermodels){
       res.render("index",{
           Details:usermodels

       })
   })
})
app.listen(80,function(){
    console.log("server is running")

})





