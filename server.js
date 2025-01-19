require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const productRouter = require('./src/routes/productRouter')
const userRouter = require('./src/routes/userRouter')
const ProductModel = require('./src/models/productModel')
const cors = require('cors')
const port = process.env.PORT || 3000
const list = process.env.ALLOWLIST || 'https://ecommerce-frontend-theta-flax.vercel.app';


async function main() {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
}

main()
.then(() => {
    console.log("DB connected..")
})
.catch(err => console.log(err))

// CORS setup
const allowlist = list.split(',');
const corsOptionsDelegate = (req, callback) => {
    const origin = req.header('Origin');
    const corsOptions = allowlist.includes(origin)
        ? { origin: true }
        : { origin: false };
    console.log(`Origin: ${origin} - Allowed: ${corsOptions.origin}`);
    callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

app.use(express.json())
app.use("/", productRouter);
app.use("/user", userRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
