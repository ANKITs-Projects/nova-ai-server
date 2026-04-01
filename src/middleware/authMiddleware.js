const { decodeToken } = require("../utils/generateToken");

const authMiddleware = async (req, res, next) => {
  try {

    const token = req.cookie;

    if (!token) {
      res.status(400).json({
        success: false,
        message: "Login Again"
      })
      return
    }

    const { userId } = decodeToken(token);

    if (!userId) {
      throw new Error("Token is expire, Please login again...");
    }
    req.user = userId;
    next();

  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { authMiddleware };
