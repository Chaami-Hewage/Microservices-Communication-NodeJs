const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const ORDER_SERVICE_URL = "http://localhost:8072"; // Order Placement
const USER_SERVICE_URL = "http://localhost:8074"; // User Management
const INVENTORY_SERVICE_URL = "http://localhost:8073"; // Inventory Management

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
            console.error("Error proxying request to Order Placement:", error);
            if (error.response) {
                res.status(error.response.status).json(error.response.data);
            } else {
                res.status(500).json({message: "Internal server error"});
            }
        });
});

// Proxy req to User Management
app.use("/users", (req, res) => {
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
            console.error("Error proxying request to User Management:", error);
            if (error.response) {
                res.status(error.response.status).json(error.response.data);
            } else {
                res.status(500).json({message: "Internal server error"});
            }
        });
});

// Proxy req to Inventory Management
app.use("/products", (req, res) => {
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
            console.error("Error proxying request to Inventory Management:", error);
            if (error.response) {
                res.status(error.response.status).json(error.response.data);
            } else {
                res.status(500).json({message: "Internal server error"});
            }
        });
});

app.listen(8070, () => {
    console.log('Gateway is listening on port 8070');
});
