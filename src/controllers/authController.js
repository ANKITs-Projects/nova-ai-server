const { generateToken } = require("../utils/generateToken");
const User = require("./../models/userModel");
const bcrypt = require("bcrypt");


const userSignUp = async (req, res) => {
  try {
    // checking user already exist
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      res.status(400).json({
        message: "User Already Exists",
        success: false,
      });
    }

    // encrypt the password
    const saltRound = +process.env.BCRYPT_SALT_ROUNDS
    const hashpasword = await bcrypt.hash(
      req.body.password,
      saltRound,
    );

    const user = { ...req.body, password: hashpasword };

    // creating new user
    const newUser = new User(user);
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
}

const userLogin = async (req,res) => {
    try {
        // Check user exist or not
        const user = await User.findOne({email : req.body.email}).select("+password")

        if(!user){
            res.status(400).json({
                message : "User not exist",
                success : false
            })
        }
        
        // check password
        const isValied = await bcrypt.compare(req.body.password, user.password) 
        if(!isValied) {
            res.status(400).json({
                message : "Password is incorrect",
                success : false
            })
        }

        // generate token
        const token = generateToken({userId : user._id})

        res.status(200).json({
            message : "Loggin successfully!",
            success : true,
            token
        })

    } catch (error) {
        res.status(400).json({
            message : error.message,
            success : false
        })
    }
}

module.exports = {userSignUp, userLogin}