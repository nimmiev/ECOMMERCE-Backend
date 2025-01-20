const express = require('express')
const router = express.Router()
const {CreateUserController, LoginController, VerifyOTPController} = require('../controllers/userController')

router.post("/register", CreateUserController)
router.post("/login", LoginController)
router.post("/verify-otp", VerifyOTPController)

module.exports = router