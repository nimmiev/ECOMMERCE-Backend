require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const productRouter = require('./src/routes/productRouter')
const userRouter = require('./src/routes/userRouter')
const ProductModel = require('./src/models/productModel')
const port = process.env.PORT || 3000
const cors = require('cors')

async function main() {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
}

main()
.then(() => {
    console.log("DB connected..")
})
.catch(err => console.log(err))

// CORS setup
const allowlist = process.env.ALLOWLIST.split(',');
const corsOptionsDelegate = function (req, callback) {
    const corsOptions = allowlist.includes(req.header('Origin'))
        ? { origin: true } // Allow listed origins
        : { origin: false }; // Block other origins
    callback(null, corsOptions);
}

app.use(cors(corsOptionsDelegate));

app.use(express.json())
app.use("/", productRouter);
app.use("/user", userRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})