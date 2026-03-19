const { userSignUp, userLogin } = require("../controllers/authController");
const { sendMessage, getAllChat } = require("../controllers/messageController");
const { createProject } = require("../controllers/projectController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = require("express").Router();

// Auth Router
router.post('/auth/signup', userSignUp)
router.post('/auth/login', userLogin)

// Chat Router
router.post('/chat',authMiddleware, sendMessage)
router.get('/allchat',authMiddleware, getAllChat)

// Project Router
router.post('/project',authMiddleware, createProject)
router.post('/project/:projectId',authMiddleware, sendMessage)
router.get('/project/:projectId',authMiddleware, getAllChat)

module.exports = router