const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const axios = require("axios");

// Create a new product
router.post("/addProduct", async (req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            desc: req.body.desc,
            banner: req.body.banner,
            type: req.body.type,
            unit: req.body.unit,
            price: req.body.price,
            available: req.body.available,
            supplier: req.body.supplier,
            messageId: req.body.messageId,
            eventTimestamp: req.body.eventTimestamp,
        });

        const savedProduct = await newProduct.save();

        const orderData = {
            orderId: "ORDER123",
            customerId: "CUSTOMER123",
            amount: req.body.price * req.body.unit,
            status: "PENDING",
            txnId: "TXN123",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const orderResponse = await axios.post("http://localhost:8072/order/addOrder", orderData);

        if (orderResponse.status === 201) {
            res.json(savedProduct);
        } else {
            res.status(500).json({error: "Unable to create the order"});
        }
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({error: "Unable to create the product"});
    }
});

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({error: "Unable to fetch products"});
    }
});

// Get a specific product by ID
router.get("/:productId", async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({error: "Product not found"});
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({error: "Unable to fetch the product"});
    }
});

// Update a specific product by ID
router.put("/:productId", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            req.body,
            {new: true}
        );
        if (!updatedProduct) {
            return res.status(404).json({error: "Product not found"});
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({error: "Unable to update the product"});
    }
});

// Delete a specific product by ID
router.delete("/:productId", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndRemove(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).json({error: "Product not found"});
        }

        res.json({message: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({error: "Unable to delete the product"});
    }
});

module.exports = router;
