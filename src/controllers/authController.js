const { generateToken } = require("../utils/generateToken");
const { generateHashPass, comparePassword } = require("../utils/hashPassword");
const User = require("./../models/userModel");

const userSignUp = async (req, res) => {
  try {
    // checking user already exist
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      res.status(400).json({
        message: "User Already Exists",
        success: false,
      });
      return;
    }

    // encrypt the password
    const hashpasword = await generateHashPass(req.body.password);

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
};

const userLogin = async (req, res) => {
  try {
    // Check user exist or not
    const user = await User.findOne({ email: req.body.email }).select(
      "+password",
    );

    if (!user) {
      res.status(400).json({
        message: "User not exist",
        success: false,
      });
      return;
    }

    // check password
    const isValied = await comparePassword(req.body.password, user.password);
    if (!isValied) {
      res.status(400).json({
        message: "Password is incorrect",
        success: false,
      });
      return;
    }

    // generate token
    const token = generateToken({ userId: user._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // 🔥 true on Vercel
      sameSite: "none", // 🔥 required for cross-origin
    });
    res.status(200).json({
      message: "Loggin successfully!",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const userLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logout success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout fail",
    });
  }
};
module.exports = { userSignUp, userLogin, userLogout };
