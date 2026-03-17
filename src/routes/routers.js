const { userSignUp, userLogin } = require("../controllers/authController");
const { sendMessage } = require("../controllers/messageController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = require("express").Router();


router.post('/auth/signup', userSignUp)
router.post('/auth/login', userLogin)
router.post('/chat',authMiddleware, sendMessage)

module.exports = router