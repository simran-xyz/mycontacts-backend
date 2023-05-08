const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please enter the Username"],
    },
    email : {
        type : String,
        required : [true, "Please enter user Email Address"],
        unique   : [true, "Email address already taken"]
    },
    password : {
        type : String,
        required : [true, "Please enter the Password"]
    }
},
{
    timestamps : true
})

module.exports = mongoose.model("User", userSchema);