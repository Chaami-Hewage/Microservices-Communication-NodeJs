const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {Sequelize, DataTypes} = require("sequelize");
const {pool} = require("./db");

const app = express();
require("dotenv").config();

/* Configs */
app.use(cors());
app.use(bodyParser.json());

/* Routes */
const orderRoutes = require("./routes/order");
app.use("/order", orderRoutes);
const cartRoutes = require("./routes/cart");
app.use("/cart", cartRoutes);

/* Sequelize Setup */
const PORT = process.env.PORT || 8071;
const DB_URL = process.env.POSTGRESQL_URL;

const sequelize = new Sequelize(DB_URL, {
    dialect: "postgres",
    // logging: false
});

sequelize
    .authenticate()
    .then(() => {
        console.log("PostgreSQL Connection Success!");
    })
    .catch((err) => {
        console.error("PostgreSQL Connection Error:", err);
    });

app.listen(PORT, () => {
    console.log(`Server is up and running on port number : ${PORT}`);
});
