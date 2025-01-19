const express = require('express')
const mongoose = require('mongoose')
const app = express()
const productRouter = require('./src/routes/productRouter')
const userRouter = require('./src/routes/userRouter')
const ProductModel = require('./src/models/productModel')
const port = 3000
const cors = require('cors')

async function main() {
    await mongoose.connect('mongodb+srv://nimmiev222:wRUcJUdKKRwPNGvm@ecommerce.gff06.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce')}

main()
.then(() => {
    console.log("DB connected..")
})
.catch(err => console.log(err))

// CORS setup
const allowlist = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const corsOptionsDelegate = function (req, callback) {
  const corsOptions = allowlist.includes(req.header('Origin'))
    ? { origin: true } // Allow listed origins
    : { origin: false }; // Block other origins
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

app.use(express.json())
app.use("/", productRouter)
app.use("/user", userRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})