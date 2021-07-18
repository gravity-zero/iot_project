'use strict';

const express = require('express');
require('dotenv').config()

// Constants
const PORT = 9090;
const HOST = process.env.HOST

// App
const app = express();
app.get('/', (req, res) => {
  res.send('WEB SERVICE LAUNCH');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
