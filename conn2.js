const Influxdb = require('influxdb-v2');

(async () => {

  const query = 'from(bucket: "mqtt_consumer")|> range(start: -5m)|> filter(fn: (r) => r["_measurement"] == "GH6")|> filter(fn: (r) => r["_field"] == "data_value")'

  const influxdb = new Influxdb({
    host: 'eu-central-1-1.aws.cloud2.influxdata.com',
    token: 'zl8vyvkEf8pmCvkGbNtZWaYbxrG9nwljXvC_A1be4U7xgAbgVRk6I746okasoyx0NtdaBfQjooQt5uN0fvRJZg==',
    port: 443,
  });

  const result = await influxdb.query(
    { org: 'e65d4be7f29550bf' },
    { query: query
      }
  );
  console.log(result);

})().catch(error => {
  console.error('\n🐞 An error occurred!', error);
  process.exit(1);
});