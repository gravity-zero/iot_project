'use strict';
const Influxdb = require('influxdb-v2');


const express = require('express');
require('dotenv').config()
const os = require('os');

// Constants
const HOST = process.env.HOST;
const PORT = process.env.PORT;

// App
const app = express();
app.get('/', (req, res) => {
  res.send('WEB SERVICE LAUNCH');
});

app.get('/getFieldByTime/:time', (req, res) => {
  (async () => {
    const query = 'from(bucket: "mqtt_consumer")|> range(start: -' + req.params.time + 'm)|> filter(fn: (r) => r["_field"] == "data_value")'
    const influxdb = new Influxdb({
      host: process.env.INFLUX_HOST,
      token: process.env.INFLUX_TOKEN,
      port: 443,
    });
  
    const result = await influxdb.query(
      { org: process.env.INFLUX_ORG },
      { query: query }
    );
   res.status(200).json(result)
  
  })().catch(error => {
    console.error('\n🐞 An error occurred!', error);
    process.exit(1);
  });
});

app.get('/getFieldByTimeAndTopic/:time/:sensor', (req, res) => {
  (async () => {
    const query = 'from(bucket: "mqtt_consumer")|> range(start: -' + req.params.time + 'm)|> filter(fn: (r) => r["_field"] == "data_value") |> filter(fn: (r) => r["_measurement"] == "'+ req.params.sensor +'")'
    const influxdb = new Influxdb({
      host: process.env.INFLUX_HOST,
      token: process.env.INFLUX_TOKEN,
      port: 443,
    });
  
    const result = await influxdb.query(
      { org: process.env.INFLUX_ORG },
      { query: query }
    );
   res.status(200).json(result)
  
  })().catch(error => {
    console.error('\n🐞 An error occurred!', error);
    process.exit(1);
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
