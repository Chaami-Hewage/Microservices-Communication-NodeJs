const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const orderRouter = require('./routes/order');
app.use('/', orderRouter);

const PORT = process.env.PORT || 8072;

sequelize
    .sync()
    .then(() => {
        console.log('PostgreSQL database connected successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the PostgreSQL database:', error);
    });

app.listen(PORT, () => {
    console.log('Server is up and running on port number:', PORT);
});
