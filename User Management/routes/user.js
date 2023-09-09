module.exports = (pool, channel, queue) => {
    const express = require("express");
    const router = express.Router();
    const db = require("../db");

    // Add a new user
    router.post("/", async (req, res) => {
        try {
            const newUser = req.body;
            const connection = await pool.getConnection();

            await connection.execute("INSERT INTO users SET ?", [newUser]);

            connection.release();

            //message to rabbitmq
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(newUser)), {
                persistent: true, // Ensure the message is not lost even if RabbitMQ restarts
            });

            res.json({ message: "User added successfully" });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    // Get a user by ID
    router.get("/:userId", async (req, res) => {
        try {
            const userId = req.params.userId;
            const connection = await pool.getConnection();

            const [rows] = await connection.execute(
                "SELECT * FROM users WHERE id = ?",
                [userId]
            );

            connection.release();
            const message = 'User Found!';
            channel.sendToQueue(queue, Buffer.from(message));

            if (rows.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            const user = rows[0];
            res.json(user);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    // Update a user by ID
    router.put("/:userId", async (req, res) => {
        try {
            const userId = req.params.userId;
            const updatedUserData = req.body;
            const connection = await pool.getConnection();

            await connection.execute(
                "UPDATE users SET ? WHERE id = ?",
                [updatedUserData, userId]
            );

            connection.release();

            //message to rabbitmq
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(updatedUserData)), {
                persistent: true,
            });

            res.json({ message: "User updated successfully" });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    // Get customer's wishlist by user ID
    router.get("/:userId/wishlist", async (req, res) => {
        try {
            const userId = req.params.userId;
            const connection = await pool.getConnection();

            const [rows] = await connection.execute(
                "SELECT wishlist FROM users WHERE id = ?",
                [userId]
            );

            connection.release();

            if (rows.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            const wishlist = rows[0].wishlist;
            res.json(wishlist);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    // Update customer's address by user ID
    router.put("/:userId/address", async (req, res) => {
        try {
            const userId = req.params.userId;
            const newAddress = req.body;
            const connection = await pool.getConnection();

            await connection.execute(
                "UPDATE users SET address_id = ? WHERE id = ?",
                [newAddress.address_id, userId]
            );

            connection.release();

            //message to rabbitmq
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(newAddress)), {
                persistent: true,
            });

            res.json({ message: "Address updated successfully" });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    // Delete a user by ID
    router.delete("/:userId", async (req, res) => {
        try {
            const userId = req.params.userId;
            const connection = await pool.getConnection();

            // Check if the user exists
            const [userRows] = await connection.execute(
                "SELECT * FROM users WHERE id = ?",
                [userId]
            );
            if (userRows.length === 0) {
                connection.release();
                return res.status(404).json({ message: "User not found" });
            }

            // Delete the user
            await connection.execute("DELETE FROM users WHERE id = ?", [userId]);
            connection.release();

            //message to rabbitmq
            channel.sendToQueue(queue, Buffer.from(JSON.stringify({ userId })), {
                persistent: true,
            });

            res.json({ message: "User deleted successfully" });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    return router;
};
