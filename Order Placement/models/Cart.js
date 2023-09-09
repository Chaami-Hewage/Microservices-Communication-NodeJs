const { DataTypes } = require('sequelize');
const db = require('../db');

const Cart = db.define('Cart', {
    customerId: {
        type: DataTypes.STRING,
    },
});

const CartItem = db.define('CartItem', {
    unit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

module.exports = { Cart, CartItem };