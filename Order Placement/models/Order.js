const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Order = sequelize.define('Order', {
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
},{
    tableName: 'Order',
});

const Item = sequelize.define('Item', {
    unit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Order.hasMany(Item);
Item.belongsTo(Order);

module.exports = { Order, Item };
