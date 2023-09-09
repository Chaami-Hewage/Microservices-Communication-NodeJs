const express = require('express');
const router = express.Router();
const { Cart, CartItem } = require('../models/Cart');
const {Order, Item} = require("../models/Order");

router.post('/addCart', async (req, res) => {
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

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all carts
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

// Get cart by ID
router.get('/orders/:id', async (req, res) => {
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

// Update cart by ID
router.put('/orders/:id', async (req, res) => {
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

        // Update associated items (you can implement this if needed)

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete cart by ID
router.delete('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Delete associated items first (you can implement this if needed)

        await order.destroy();

        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
