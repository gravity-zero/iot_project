'use strict';
const Influxdb = require('influxdb-v2');
const express = require('express');
require('dotenv').config()
const os = require('os');
const app = express();
require('./src/routes')(app);

// Constants
const HOST = "localhost"
const PORT = 8080;

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
