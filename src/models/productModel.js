const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    image: String,
    title: String,
    price: Number,
    discount: Number
  });

const ProductModels = mongoose.model('product', ProductSchema)

module.exports = ProductModels