const express = require("express");
const router = express.Router();
const db = require("../db");
const axios = require("axios");

// Get a user by ID
router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);

        if (rows.length === 0) {
            return res.status(404).json({message: "User not found"});
        }

        const user = rows[0];
        res.json(user);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({message: "Internal server error"});
    }
});

// Update a user by ID
router.put("/updateUser/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedUserData = req.body;
        await db.query("UPDATE users SET ? WHERE id = ?", [updatedUserData, userId]);

        res.json({message: "User updated successfully"});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({message: "Internal server error"});
    }
});

// Delete a user by ID
router.delete("/removeUser/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const [userRows] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);

        if (userRows.length === 0) {
            return res.status(404).json({message: "User not found"});
        }

        await db.query("DELETE FROM users WHERE id = ?", [userId]);
        res.json({message: "User deleted successfully"});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({message: "Internal server error"});
    }
});

// Add a new user
router.post("/addUser", async (req, res) => {
    try {
        // Extract user data from the request body
        const newUser = req.body;

        // Initialize cart, wishlist, and orders as empty JSON arrays
        newUser.cart = JSON.stringify([]);
        newUser.wishlist = JSON.stringify([]);
        newUser.orders = JSON.stringify([]);

        // Insert the new user into the User Management microservice's database
        const [result] = await db.query("INSERT INTO users SET ?", [newUser]);
        const userId = result.insertId;

        // data for order in the Order Placement microservice
        const orderData = {
            orderId: `ORDER_${userId}`, // Unique order ID,
            customerId: userId,
            amount: 100,
            status: "PROCESSING",
            txnId: `TXN_${userId}`, // Unique transaction ID
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const orderResponse = await axios.post("http://localhost:8072/order/addOrder", orderData);


        res.json({
            message: "User added successfully",
            userId,
            orderResponseData: orderResponse.data,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({message: "Internal server error"});
    }
});


module.exports = router;
