const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler(async(req, res, next) => {

    let token;
    let authHeaders = req.headers.authorization || req.headers.Authorization;

    if(authHeaders && authHeaders.startsWith("Bearer")) {
        token = authHeaders.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                res.status(401)
                throw new Error("User not Authorized")
            } 
            req.user = decoded.user
            next()
        })
    }

    if(!token) {
        res.status(401)
        throw new Error("User not Authorized")
    }

})

module.exports = validateToken;