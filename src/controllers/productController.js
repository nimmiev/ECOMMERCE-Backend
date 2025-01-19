const productModel = require('../models/productModel')

const productList = (req, res) => {
    productModel.find().exec()
    .then((products) => {
        if(products){
            res.status(200).json(products)
        }else{
            res.json({message: "No products found"}, status = 404)
        }
    })
}

const productDetails = (req, res) => {
    // console.log(req.params.id)
    let productId = req.params.id
    productModel.findById(productId).exec()
    .then((product) => {
        if(product){
            res.status(200).json(product)
        }else{
            res.status(404).json({message: "Product not found"})
        }
    })
    .catch((err) => {
        res.status(400).json({message: "Product not found"})
    })
}

const createProduct = (req, res) => {
    const product = new productModel(req.body)
    product.save()
    .then((product) => {
        console.log(product)
        res.send("Product created")
    })
    // res.send("Product created")
}

module.exports = {productList, productDetails, createProduct}