const { userSignUp, userLogin, userLogout } = require("../controllers/authController");
const { sendMessage, getAllChat, getChatMessage } = require("../controllers/messageController");
const profile = require("../controllers/profileController");
const { createProject, getProjects } = require("../controllers/projectController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = require("express").Router();

// Profile check
router.get("/profile",authMiddleware, profile)

// Auth Router
router.post('/auth/signup', userSignUp)
router.post('/auth/login', userLogin)
router.get('/auth/logout', userLogout)

// Chat Router
router.post('/chat',authMiddleware, sendMessage)
router.post('/chat/:chatId',authMiddleware, sendMessage)
router.get('/message/:chatId',authMiddleware, getChatMessage)
router.get('/allchat',authMiddleware, getAllChat)

// Project Router
router.post('/project',authMiddleware, createProject)
router.post('/project/:projectId',authMiddleware, sendMessage)
router.get('/project', authMiddleware, getProjects)
router.get('/project/:projectId',authMiddleware, getAllChat)

module.exports = router