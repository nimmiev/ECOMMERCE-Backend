const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId("user")},
    product: {type: mongoose.Types.ObjectId("product")},
    count: Number
  });

const CartModels = mongoose.model('cart', CartSchema)

module.exports = CartModels