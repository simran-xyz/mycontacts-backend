const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    name : {
        type : String,
        required : [true, "Please add name of the Contact"]
    },
    email : {
        type : String,
        required : [true, "Please add email of the Contact"]
    },
    phone : {
        type : Number,
        required : [true, "Please add Phone Number of the Contact"]
    }
},
{
    timestamp : true
})

module.exports = mongoose.model("Contact", contactSchema)