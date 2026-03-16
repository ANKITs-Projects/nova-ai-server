const { userSignUp, userLogin } = require("../controllers/authController");

const router = require("express").Router();


router.post('/auth/signup', userSignUp)
router.post('/auth/login', userLogin)

module.exports = router