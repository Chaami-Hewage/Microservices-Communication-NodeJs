const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

/* Configs */
app.use(cors());
app.use(bodyParser.json());

/* Routes */
const productRouter = require("./routes/product");
app.use("/", productRouter);

/* Mongoose Setup */
const PORT = process.env.PORT || 8073;
const DB_URL = process.env.MONGODB_URL;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
}).then(() => {
    console.log("MongoDB Connection Success!");
}).catch((err) => {
    console.error("MongoDB Connection Error:", err);
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
