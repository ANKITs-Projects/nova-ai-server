const { decodeToken } = require("../utils/generateToken");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized - No token",
        success: false,
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      // without login conversation logic
    }

    const { userId } = decodeToken(token);

    if (!userId) {
      throw new Error("Token is expire, Please login again...");
    }
    req.user = userId;
    next();
  } catch (error) {
    console.log("middleware");
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { authMiddleware };
