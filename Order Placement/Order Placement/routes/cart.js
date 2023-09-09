const express = require('express');
const router = express.Router();
const { Cart, CartItem } = require('../models/Cart');

// Add an item to the cart
router.post('/', async (req, res) => {
    try {
        const { customerId, unit } = req.body;

        const cart = await Cart.create({ customerId });

        const cartItem = await CartItem.create({
            unit,
            CartId: cart.id,
        });

        res.status(201).json(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Remove an item from the cart
router.delete('/:cartItemId', async (req, res) => {
    try {
        const { cartItemId } = req.params;

        const cartItem = await CartItem.findByPk(cartItemId);

        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        await cartItem.destroy();

        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a cart item
router.put('/:cartItemId', async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const { unit } = req.body;

        const cartItem = await CartItem.findByPk(cartItemId);

        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        await cartItem.update({ unit });

        res.json(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all cart items
router.get('/', async (req, res) => {
    try {
        const cartItems = await CartItem.findAll({
            include: Cart,
        });

        res.json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
