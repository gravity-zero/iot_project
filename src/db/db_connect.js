const {InfluxDB} = require('@influxdata/influxdb-client')
require('dotenv').config()

// You can generate a Token from the "Tokens Tab" in the UI
const token = process.env.DB_API_KEY
const org = 'gravity.neo@gmail.com'
const bucket = 'gravity.neo\'s Bucket'

const client = new InfluxDB({url: 'https://eu-central-1-1.aws.cloud2.influxdata.com', token: token})

