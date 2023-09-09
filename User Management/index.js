const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const amqp = require("amqplib/callback_api");
require("dotenv").config();
const pool = require("./db");

/* Configs */
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8074;

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

        const queue = "user_events"; // Define the queue name

        // Ensure the queue exists, if not, create it
        channel.assertQueue(queue, {
            durable: true, // Make the queue durable to survive server restarts
        });

        // Routes
        const userRoutes = require("./routes/user")(pool, channel, queue);
        app.use("/users", userRoutes);

        /* MySQL Setup */
        pool.query("SELECT 1")
            .then(() => {
                console.log("MySQL Connection Success!");
            })
            .catch((err) => {
                console.error("MySQL Connection Error:", err);
            });

        app.listen(PORT, () => {
            console.log(`Server is up and running on port number: ${PORT}`);
        });
    });
});

