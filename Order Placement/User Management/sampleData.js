const mysql = require('mysql2/promise');
const dotenv = require("dotenv");
dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

async function main() {
    try {
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_DATABASE,
        });

        console.log('Connected to MySQL database');

        await createAddressesTable(connection);

        await insertExampleAddressData(connection);

        await createUserTable(connection);

        await insertExampleUsers(connection);

        console.log('Database initialization completed successfully');
    } catch (err) {
        console.error('Error:', err);
    }
}

async function createAddressesTable(connection) {
    try {
        const [rows, fields] = await connection.execute(
            `CREATE TABLE IF NOT EXISTS addresses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        street VARCHAR(255) NOT NULL,
        postalCode VARCHAR(255),
        city VARCHAR(255),
        country VARCHAR(255)
      )`
        );
        console.log('Created addresses table');
    } catch (err) {
        console.error('Error creating addresses table:', err);
        throw err;
    }
}

async function createUserTable(connection) {
    try {
        const [rows, fields] = await connection.execute(
            `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        salt VARCHAR(255) NOT NULL,
        phone VARCHAR(255),
        address_id INT,
        FOREIGN KEY (address_id) REFERENCES addresses(id),
        cart JSON,
        wishlist JSON,
        orders JSON
      )`
        );
        console.log('Created users table');
    } catch (err) {
        console.error('Error creating users table:', err);
        throw err;
    }
}

async function insertExampleUsers(connection) {
    try {
        const sql = `
            INSERT INTO users (email, password, salt, phone, address_id, cart, wishlist, orders)
            VALUES
            ('user1@example.com', 'password1', 'salt1', '123-456-7890', 1, '[{"product": {"_id": "1", "name": "Product 1", "banner": "image1.jpg", "price": 10}, "unit": 2}]', '[{"_id": "1", "name": "Product 1", "description": "Description 1", "banner": "image1.jpg", "available": true, "price": 10}]', '[{"_id": "1", "amount": "20", "date": "2023-08-01"}]'),
            ('user2@example.com', 'password2', 'salt2', '987-654-3210', 2, '[{"product": {"_id": "2", "name": "Product 2", "banner": "image2.jpg", "price": 15}, "unit": 3}]', '[{"_id": "2", "name": "Product 2", "description": "Description 2", "banner": "image2.jpg", "available": true, "price": 15}]', '[{"_id": "2", "amount": "45", "date": "2023-08-02"}]'),
            ('user3@example.com', 'password3', 'salt3', '555-123-4567', 3, '[{"product": {"_id": "3", "name": "Product 3", "banner": "image3.jpg", "price": 20}, "unit": 1}]', '[{"_id": "3", "name": "Product 3", "description": "Description 3", "banner": "image3.jpg", "available": true, "price": 20}]', '[{"_id": "3", "amount": "20", "date": "2023-08-03"}]'),
            ('user4@example.com', 'password4', 'salt4', '444-777-8888', 4, '[{"product": {"_id": "4", "name": "Product 4", "banner": "image4.jpg", "price": 25}, "unit": 4}]', '[{"_id": "4", "name": "Product 4", "description": "Description 4", "banner": "image4.jpg", "available": true, "price": 25}]', '[{"_id": "4", "amount": "100", "date": "2023-08-04"}]'),
            ('user5@example.com', 'password5', 'salt5', '777-888-9999', 5, '[{"product": {"_id": "5", "name": "Product 5", "banner": "image5.jpg", "price": 30}, "unit": 2}]', '[{"_id": "5", "name": "Product 5", "description": "Description 5", "banner": "image5.jpg", "available": true, "price": 30}]', '[{"_id": "5", "amount": "60", "date": "2023-08-05"}]'),
            ('user6@example.com', 'password6', 'salt6', '111-222-3333', 6, '[{"product": {"_id": "6", "name": "Product 6", "banner": "image6.jpg", "price": 10}, "unit": 5}]', '[{"_id": "6", "name": "Product 6", "description": "Description 6", "banner": "image6.jpg", "available": true, "price": 10}]', '[{"_id": "6", "amount": "50", "date": "2023-08-06"}]'),
            ('user7@example.com', 'password7', 'salt7', '999-888-7777', 7, '[{"product": {"_id": "7", "name": "Product 7", "banner": "image7.jpg", "price": 15}, "unit": 3}]', '[{"_id": "7", "name": "Product 7", "description": "Description 7", "banner": "image7.jpg", "available": true, "price": 15}]', '[{"_id": "7", "amount": "45", "date": "2023-08-07"}]'),
            ('user8@example.com', 'password8', 'salt8', '555-666-7777', 8, '[{"product": {"_id": "8", "name": "Product 8", "banner": "image8.jpg", "price": 20}, "unit": 2}]', '[{"_id": "8", "name": "Product 8", "description": "Description 8", "banner": "image8.jpg", "available": true, "price": 20}]', '[{"_id": "8", "amount": "40", "date": "2023-08-08"}]'),
            ('user9@example.com', 'password9', 'salt9', '123-789-4560', 9, '[{"product": {"_id": "9", "name": "Product 9", "banner": "image9.jpg", "price": 25}, "unit": 2}]', '[{"_id": "9", "name": "Product 9", "description": "Description 9", "banner": "image9.jpg", "available": true, "price": 25}]', '[{"_id": "9", "amount": "50", "date": "2023-08-09"}]')
        `;

        await connection.execute(sql);
        console.log('Inserted example user data');
    } catch (err) {
        console.error('Error inserting example users:', err);
        throw err;
    }
}


async function insertExampleAddressData(connection) {
    try {
        await connection.execute(`
            INSERT INTO addresses (id, street, postalCode, city, country)
            VALUES
              (1, '123 Main Street', '12345', 'City1', 'Country1'),
              (2, '456 Elm Street', '67890', 'City2', 'Country2'),
              (3, '789 Oak Street', '13579', 'City3', 'Country3'),
              (4, '101 Pine Street', '24680', 'City4', 'Country4'),
              (5, '202 Maple Street', '86420', 'City5', 'Country5'),
              (6, '303 Cedar Street', '97531', 'City6', 'Country6'),
              (7, '404 Birch Street', '31425', 'City7', 'Country7'),
              (8, '505 Redwood Street', '72583', 'City8', 'Country8'),
              (9, '606 Willow Street', '98234', 'City9', 'Country9')
        `);

        console.log('Inserted example address data');
    } catch (err) {
        console.error('Error inserting example address data:', err);
        throw err;
    }
}

main();

// Run the file using Command Prompt or Terminal to create tables and insert example data:
// command:
//     node your-file-name.js
