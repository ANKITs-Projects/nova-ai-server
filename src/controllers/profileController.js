const User = require("./../models/userModel");

const profile = async (req,res) => {
    try {
        const user = await User.findById(req.user)

    res.status(200).json({
        success: true,
        message: "User detail..",
        user
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }    
}

module.exports = profile