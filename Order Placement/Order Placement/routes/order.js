const express = require('express');
const router = express.Router();
const { Order, Item } = require('../models/Order');
const amqp = require("amqplib/callback_api");

// Create an order
router.post('/addOrder', async (req, res) => {
    try {
        const { orderId, customerId, amount, status, txnId, items } = req.body;

        const order = await Order.create({
            orderId,
            customerId,
            amount,
            status,
            txnId,
        });

        // Create associated items
        await Item.bulkCreate(items.map(item => ({
            unit: item.unit,
            OrderId: order.id, // Associate with the order
        })));

        //message to rabbitmq
        const channel = await amqp.createChannel();
        const exchange = "order_exchange";
        channel.assertExchange(exchange, "fanout", { durable: true });
        channel.publish(exchange, "", Buffer.from(JSON.stringify(order)));

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: Item, // Include associated items
        });

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get order by ID
router.get('/order/:id', async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: Item, // Include associated items
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update order by ID
router.put('/updateOrder/:id', async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const { orderId, customerId, amount, status, txnId, items } = req.body;

        await order.update({
            orderId,
            customerId,
            amount,
            status,
            txnId,
        });

        //message to rabbitmq
        const channel = await amqp.createChannel();
        const exchange = "order_exchange";
        channel.assertExchange(exchange, "fanout", { durable: true });
        channel.publish(exchange, "", Buffer.from(JSON.stringify(order)));

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete order by ID
router.delete('/deleteOrder/:id', async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        await order.destroy();

        //message to rabbitmq
        const channel = await amqp.createChannel();
        const exchange = "order_exchange";
        channel.assertExchange(exchange, "fanout", { durable: true });
        channel.publish(exchange, "", Buffer.from(JSON.stringify(order)));

        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

