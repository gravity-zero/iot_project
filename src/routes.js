const Influxdb = require('influxdb-v2');

module.exports = function(app){

    const influxdb = new Influxdb({
        host: process.env.INFLUX_HOST,
        token: process.env.INFLUX_TOKEN,
        port: 443,
      });

    app.get('/', (req, res) => {
      res.send('WEB SERVICE LAUNCH');
    });
    
    app.get('/getFieldByTime/:time', (req, res) => {
      (async () => {
        const query = 'from(bucket: "mqtt_consumer")|> range(start: -' + req.params.time + 'm)|> filter(fn: (r) => r["_field"] == "data_value")'
      
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
    
    app.get('/getFieldByRange/:date1/:date2', (req, res) => {
      (async () => {
        const query = 'from(bucket: "mqtt_consumer")|> range(start: ' + req.params.date1 + ', stop:'+ req.params.date2 +')|> filter(fn: (r) => r["_field"] == "data_value")'

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
    
    app.get('/getFieldByRangeAndTopic/:date1/:date2/:sensor', (req, res) => {
      (async () => {
        const query = 'from(bucket: "mqtt_consumer")|> range(start: ' + req.params.date1 + ', stop:'+ req.params.date2 +')|> filter(fn: (r) => r["_field"] == "data_value") |> filter(fn: (r) => r["_measurement"] == "'+ req.params.sensor +'")'

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

    app.get('/getAlertByTimeAndTopic/:time/:sensor', (req, res) => {
        (async () => {
          const query = 'from(bucket: "mqtt_consumer")|> range(start: -' + req.params.time + 'm)|> filter(fn: (r) => r["_field"] == "alert" or r["_field"] == "data_value" ) |> filter(fn: (r) => r["_measurement"] == "'+ req.params.sensor +'")'
        
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

    app.get('/getAverage/:time/:sensor', (req, res) => {
    (async () => {
        const query = 'from(bucket: "mqtt_consumer")|> range(start: -' + req.params.time + 'm)|> filter(fn: (r) => r["_field"] == "data_value") |> mean()'
    
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

    app.get('/getAverageByRange/:date1/:date2/:sensor', (req, res) => {
    (async () => {
        const query = 'from(bucket: "mqtt_consumer")|> range(start: ' + req.params.date1 + ', stop:'+ req.params.date2 +')|> filter(fn: (r) => r["_field"] == "data_value") |> filter(fn: (r) => r["_measurement"] == "'+ req.params.sensor +'") |> mean()'

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
}