const express = require('express')
const router = express.Router()
const { getCartItems} = require('../controllers/cartController');
const { get } = require('mongoose');


router.get("/", getCartItems);


module.exports = router