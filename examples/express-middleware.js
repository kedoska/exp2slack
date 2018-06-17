const express = require('express')
const exp2Slack = require('../index')
const app = express()

const url = 'https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

app.get('/', (req, res) => {
  const runTimeError = foo + bar
})

app.use((exp2Slack(url)))

app.listen(8080)