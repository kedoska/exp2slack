const express = require('express')
const exp2slack = require('../lib/exp2slack')
const app = express()

const url = 'https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

app.get('/', (req, res) => {
  const runTimeError = foo + bar
})

app.use((exp2slack(url)))

app.listen(8080)