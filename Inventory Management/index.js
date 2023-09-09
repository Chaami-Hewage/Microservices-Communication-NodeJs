const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const amqp = require("amqplib/callback_api");
require("dotenv").config();

/* Configs */
app.use(cors());
app.use(bodyParser.json());

/* Routes */
const productRouter = require("./routes/product")(amqp); // Pass amqp for rabbitmq integration
app.use("/products", productRouter);

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

        const queue = "product_events";

        // Ensure the queue exists, if not, create it
        channel.assertQueue(queue, {
            durable: true, // Make the queue durable to survive server restarts
        });

        // Listen for incoming messages
        channel.consume(queue, function (message) {
            // Handle incoming messages here (e.g., update product inventory)
            const productData = JSON.parse(message.content.toString());
            console.log("Received message from RabbitMQ:", productData);

        }, {
            noAck: true, //acknowledgments
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
