'use strict';

const express = require('express');
require('dotenv').config()
const os = require('os');

// Constants
const HOST = 'localhost';
const PORT = 8081;

// App
const app = express();
app.get('/', (req, res) => {
  res.send('WEB SERVICE LAUNCH');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
