'use strict';

const express = require('express');
require('dotenv').config()

// Constants
const PORT = 8080;
const HOST = '193.70.84.157';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('WEB SERVICE LAUNCH');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
