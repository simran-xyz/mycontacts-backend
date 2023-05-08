const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
//@desc Register a user
//@route Post api/users/register
//access PUBLIC
const registerUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body
    if(!username || !email || !password ){
        res.status(400)
        throw new Error("All fields are required")
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable) {
        res.status(400)
        throw new Error("User already registered")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password : hashedPassword
    });

    if(user) {
        res.status(200).json({_id:user.id, email:user.email})
    } else {
        res.status(400)
        throw new Error("Error in user data")
    }
})

//@desc Login user
//@route Post api/users/login
//access PUBLIC
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        res.status(400)
        throw new Error("All fields are Mandatory!")
    }
    const user = await User.findOne({email})
    if(user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            user : {
                username : user.username,
                email    : user.email,
                id       : user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn :"60m"})

        res.status(200).json({
            accessToken
        })
    } else {
        res.status(401)
        throw new Error("Invalid Credentials")
    }
})

//@desc Get Current User details
//@route Get api/users/current
//access Private
const currentUser = asyncHandler(async(req, res) => {
    res.status(200).json(req.user)
})

module.exports = {registerUser, loginUser, currentUser}