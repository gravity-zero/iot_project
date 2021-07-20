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
    const query = 'from(bucket: "mqtt_consumer")|> range(start: -' + req.params.time + 'm)|> filter(fn: (r) => r["_measurement"] == "GH6")|> filter(fn: (r) => r["_field"] == "data_value")'
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

app.get('/getFieldByTimeAndTopic/:time/:topic', (req, res) => {
  (async () => {
    const query = 'from(bucket: "mqtt_consumer")|> range(start: -' + req.params.time + 'm)|> filter(fn: (r) => r["_measurement"] == "GH6")|> filter(fn: (r) => r["_field"] == "data_value") |> filter(fn: (r) => r["topic"] == "WEB2-GROUPE16/6465/'+ req.params.topic +'")'
    const influxdb = new Influxdb({
      host: 'eu-central-1-1.aws.cloud2.influxdata.com',
      token: 'zl8vyvkEf8pmCvkGbNtZWaYbxrG9nwljXvC_A1be4U7xgAbgVRk6I746okasoyx0NtdaBfQjooQt5uN0fvRJZg==',
      port: 443,
    });
  
    const result = await influxdb.query(
      { org: 'e65d4be7f29550bf' },
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
