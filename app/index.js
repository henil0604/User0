const STARTING_TIME = Date.now();
const express = require('express');
const cookieParser = require("cookie-parser");

let app = express();

// Applying bodyParser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Applying cookieParser
app.use(cookieParser())

app.__proto__.__STARTING_TIME = STARTING_TIME;
app.__proto__.express = express;

module.exports = app;
