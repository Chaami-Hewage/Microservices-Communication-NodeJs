const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const app = express();
require("dotenv").config();
const pool = require("./db");

/* Configs */
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8074;

/* MySQL Setup */
pool.query("SELECT 1")
    .then(() => {
        console.log("MySQL Connection Success!");
    })
    .catch((err) => {
        console.error("MySQL Connection Error:", err);
    });

/* Routes */
const userRoutes = require("./routes/user");
app.use("/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
