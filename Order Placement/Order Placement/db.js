const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();

/* MySQL Setup */
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;

const pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
});

/* Sequelize Setup */
const { Sequelize } = require('sequelize');

const DB_URL = process.env.POSTGRESQL_URL;

const sequelize = new Sequelize(DB_URL, {
    dialect: "postgres",
    // logging: false
});

module.exports = { pool, sequelize };