const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const ORDER_SERVICE_URL = "http://localhost:8072"; //Order Placement
const USER_SERVICE_URL = "http://localhost:8074"; //User Management
const INVENTORY_SERVICE_URL = "http://localhost:8073"; //Inventory Management

// Proxy req to Order Placement
app.use("/order", (req, res) => {
    axios({
        method: req.method,
        url: `${ORDER_SERVICE_URL}${req.url}`,
        data: req.body,
        headers: req.headers,
    })
        .then((response) => {
            res.status(response.status).json(response.data);
        })
        .catch((error) => {
            res.status(error.response.status).json(error.response.data);
        });
});

// Proxy req to User Management
app.use("/user", (req, res) => {
    axios({
        method: req.method,
        url: `${USER_SERVICE_URL}${req.url}`,
        data: req.body,
        headers: req.headers,
    })
        .then((response) => {
            res.status(response.status).json(response.data);
        })
        .catch((error) => {
            res.status(error.response.status).json(error.response.data);
        });
});

// Proxy req to Inventory Management
app.use("/", (req, res) => {
    axios({
        method: req.method,
        url: `${INVENTORY_SERVICE_URL}${req.url}`,
        data: req.body,
        headers: req.headers,
    })
        .then((response) => {
            res.status(response.status).json(response.data);
        })
        .catch((error) => {
            res.status(error.response.status).json(error.response.data);
        });
});

app.listen(8070, () => {
    console.log('Gateway is listening on port 8070');
});
