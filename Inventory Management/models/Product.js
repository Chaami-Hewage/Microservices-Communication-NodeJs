const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    desc: String,
    banner: String,
    type: String,
    unit: Number,
    price: Number,
    available: Boolean,
    supplier: String,
    messageId: String,
    eventTimestamp: Date,
});

module.exports = mongoose.model('product', ProductSchema);
