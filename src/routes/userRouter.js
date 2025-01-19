const express = require('express')
const router = express.Router()
const {CreateUserController, LoginController} = require('../controllers/userController')

router.post("/register", CreateUserController)
router.post("/login", LoginController)

module.exports = router