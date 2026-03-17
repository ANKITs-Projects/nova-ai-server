const { userSignUp, userLogin } = require("../controllers/authController");
const { sendMessage } = require("../controllers/messageController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = require("express").Router();

// Auth Router
router.post('/auth/signup', userSignUp)
router.post('/auth/login', userLogin)

// Chat Router
router.post('/chat',authMiddleware, sendMessage)

module.exports = router