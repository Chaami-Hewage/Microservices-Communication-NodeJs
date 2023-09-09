const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Cart = sequelize.define('Cart', {
    customerId: {
        type: DataTypes.STRING,
    },
});

const CartItem = sequelize.define('CartItem', {
    unit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

module.exports = { Cart, CartItem };
