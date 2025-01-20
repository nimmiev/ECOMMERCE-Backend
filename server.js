require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const productRouter = require('./src/routes/productRouter')
const userRouter = require('./src/routes/userRouter')
const cartRouter = require('./src/routes/cartRouter')
const ProductModel = require('./src/models/productModel')
const cors = require('cors')
const port = process.env.PORT || 3000
const list = process.env.ALLOWLIST || 'https://ecommerce-frontend-theta-flax.vercel.app';


async function main() {
    await mongoose.connect(process.env.MONGO_URI)
}

main()
.then(() => {
    console.log("DB connected..")
})
.catch(err => console.log(err));

// CORS setup
const allowlist = ['http://localhost:5173','http://127.0.0.1:5173','https://ecommerce-frontend-theta-flax.vercel.app'];
const corsOptionsDelegate = function (req, callback) {
    const corsOptions = allowlist.includes(req.header('Origin'))
        ? { origin: true } // Allow listed origins
        : { origin: false }; // Block other origins
    callback(null, corsOptions);
};


app.options('*', cors(corsOptionsDelegate))

app.use(express.json())
app.use("/", productRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
