const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const amqp = require("amqplib/callback_api"); // Import the amqplib library
const { pool } = require("./db");

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

/* RabbitMQ Connection Setup */
const RABBITMQ_URL = process.env.RABBITMQ_URL;

amqp.connect(RABBITMQ_URL, function (error, connection) {
    if (error) {
        throw error;
    }

    // Create a channel
    connection.createChannel(function (error, channel) {
        if (error) {
            throw error;
        }

        const queue = "order_events";

        // Ensure the queue exists, if not, create it
        channel.assertQueue(queue, {
            durable: true, // Make the queue durable to survive server restarts
        });

        // Listen for incoming messages
        channel.consume(queue, function (message) {
            // handle incoming messages
            const orderData = JSON.parse(message.content.toString());
            console.log("Received message from RabbitMQ:", orderData);
        }, {
            noAck: true, //acknowledgments
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
