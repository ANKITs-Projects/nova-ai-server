const { decodeToken } = require("../utils/generateToken");

const authMiddleware = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            // without login conversation logic
        }

        const {userId} = decodeToken(token)

        if(!userId) {
            throw new Error("Token is expire, Please login again...")
        }
        req.body.userId = userId
        next()

    } catch (error) {
        res.status(500).json({
            message : error.message,
            success : false
        })
    }
}

module.exports = {authMiddleware}