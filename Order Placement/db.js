const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const DB_URL = process.env.POSTGRESQL_URL;

const sequelize = new Sequelize(DB_URL, {
    dialect: "postgres",
    // logging: false
});

module.exports = sequelize;
