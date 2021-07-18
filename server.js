'use strict';

const express = require('express');
require('dotenv').config()
const os = require('os');
const config = require('config');

// Constants
const HOST = os.hostname();
const PORT = config.get('PORT');

// App
const app = express();
app.get('/', (req, res) => {
  res.send('WEB SERVICE LAUNCH');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
