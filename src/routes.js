const Influxdb = require('influxdb-v2');

module.exports = function(app){

    const influxdb = new Influxdb({
        host: process.env.INFLUX_HOST,
        token: process.env.INFLUX_TOKEN,
        port: 443,
      });

      const org = process.env.INFLUX_ORG;

    app.get('/', (req, res) => {
      res.send('WEB SERVICE LAUNCH');
    });
    
    app.get('/getFieldByTime/:time', (req, res) => {
        (async () => {
        const query = 'from(bucket: "mqtt_consumer")|> range(start: -' + req.params.time + 'm)|> filter(fn: (r) => r["_field"] == "data_value")'
        
        const result = await influxdb.query(
            { org: org },
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
            { org: org },
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
            { org: org },
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
            { org: org },
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
          const query = 'from(bucket: "mqtt_consumer")|> range(start: -' + req.params.time + 'm)|> filter(fn: (r) => r["_field"] == "alert") |> filter(fn: (r) => r["_measurement"] == "'+ req.params.sensor +'")'
        
          const result = await influxdb.query(
            { org: org },
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
            const query = 'from(bucket: "mqtt_consumer")|> range(start: -' + req.params.time + 'm)|> filter(fn: (r) => r["_field"] == "data_value") |> filter(fn: (r) => r["_measurement"] == "'+ req.params.sensor +'") |> mean()'
        
            const result = await influxdb.query(
            { org: org },
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
            { org: org },
            { query: query }
            );
            res.status(200).json(result)
        
        })().catch(error => {
            console.error('\n🐞 An error occurred!', error);
            process.exit(1);
        });
    });

    app.get('/getAverageQuality/:time', (req, res) => {
        (async () => {
            const query = 'from(bucket: "mqtt_consumer")|> range(start: -' + req.params.time + 'm)|> filter(fn: (r) => r["_field"] == "data_value") |> filter(fn: (r) => r["_measurement"] == "Sulfate" or r["_measurement"] == "Sodium" or r["_measurement"] == "Chlorure" or r["_measurement"] == "Potassium") |> mean()'

            const result = await influxdb.query(
            { org: org },
            { query: query }
            );
            
            res.status(200).json(result)
        
        })().catch(error => {
            console.error('\n🐞 An error occurred!', error);
            process.exit(1);
        });
    });

    app.get('/getQuality/:time', (req, res) => {
        (async () => {
            const query = 'from(bucket: "mqtt_consumer")|> range(start: -' + req.params.time + 'd)|> filter(fn: (r) => r["_field"] == "data_value") |> filter(fn: (r) => r["_measurement"] == "Sulfate" or r["_measurement"] == "Sodium" or r["_measurement"] == "Chlorure" or r["_measurement"] == "Potassium") |> limit(n:30)'

            const result = await influxdb.query(
            { org: org },
            { query: query }
            );

            res.status(200).json(result)
        
        })().catch(error => {
            console.error('\n🐞 An error occurred!', error);
            process.exit(1);
        });
    });

    app.get('/getPh/:time', (req, res) => {
        (async () => {
            const query = 'from(bucket: "mqtt_consumer")|> range(start: -' + req.params.time + 'd)|> filter(fn: (r) => r["_field"] == "data_value") |> filter(fn: (r) => r["_measurement"] == "PH") |> limit(n:30)'

            const result = await influxdb.query(
            { org: org },
            { query: query }
            );

            res.status(200).json(result)
        
        })().catch(error => {
            console.error('\n🐞 An error occurred!', error);
            process.exit(1);
        });
    });

    app.get('/getConsumption/:time', (req, res) => {
        (async () => {
        const query = 'from(bucket: "mqtt_consumer")|> range(start: -' + req.params.time + 'm)|> filter(fn: (r) => r["_field"] == "data_value") |> filter(fn: (r) => r["_measurement"] == "Debimetre")'
        
        const result = await influxdb.query(
            { org: org },
            { query: query }
        );

        var litre = 0;
        var prix = 0;

        for (var i = 0; i < result[0].length; i++) {
            if(i == 0){
                i++;
            }
            var time1 = new Date(result[0][i]['_time']);
            var time2 = new Date(result[0][i-1]['_time']);
            
            var diff = time1 - time2;
            var minutes = ((diff % 60000) / 1000) / 60;
            litre = litre + result[0][i]['_value'] * minutes;
            prix += litre * 0.003;
        }

        res.status(200).json(prix)
        
        })().catch(error => {
        console.error('\n🐞 An error occurred!', error);
        process.exit(1);
        });
    });
}