const { DataTypes } = require('sequelize');
const db = require('../db');

const Order = db.define('Order', {
    orderId: {
        type: DataTypes.STRING,
    },
    customerId: {
        type: DataTypes.STRING,
    },
    amount: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.STRING,
    },
    txnId: {
        type: DataTypes.STRING,
    },
});

const Item = db.define('Item', {
    unit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Order.hasMany(Item);
Item.belongsTo(Order);

module.exports = { Order, Item };
