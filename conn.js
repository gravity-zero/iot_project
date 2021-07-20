const {InfluxDB} = require('@influxdata/influxdb-client')
const influxDB = new InfluxDB("eu-central-1-1.aws.cloud2.influxdata.com", "zl8vyvkEf8pmCvkGbNtZWaYbxrG9nwljXvC_A1be4U7xgAbgVRk6I746okasoyx0NtdaBfQjooQt5uN0fvRJZg==")
console.log(influxDB)

const fluxQuery =
  'from(bucket:"mqtt_consummer") |> range(start: -1h)'

function queryExample(fluxQuery) {
    console.log('\n*** QUERY ***')
    const queryApi = influxDB.getQueryApi("e65d4be7f29550bf")
    queryApi.queryRows(fluxQuery, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row)
        if (o.example){
          // custom output for example query
          console.log(
            `${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`
          )
        } else {
          // default output
          console.log(JSON.stringify(o, null, 2))
        }
      },
      error(error) {
        console.log('QUERY FAILED', error)
      },
      complete() {
        console.log('QUERY FINISHED')
      },
    })
}

queryExample(fluxQuery);