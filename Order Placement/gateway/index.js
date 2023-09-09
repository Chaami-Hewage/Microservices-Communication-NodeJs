const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/order", proxy("http://localhost:8072"));
app.use("/user", proxy("http://localhost:8074"));
app.use("/", proxy("http://localhost:8073"));

app.listen(8070, () => {
    console.log('Gateway is listening on port 8070');
});