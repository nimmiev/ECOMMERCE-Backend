const express = require('express')
const router = express.Router()
const { productList, productDetails, createProduct} = require('../controllers/productController')


router.get("/", productList);
router.post("/", createProduct);
router.get('/products/:id', productDetails);


module.exports = router