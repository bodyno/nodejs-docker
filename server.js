const express = require('express')
const os = require('os')
const Redis = require('ioredis')

const redis = new Redis({
  host: 'redis'
})

// Constants
const PORT = 8080

// App
const app = express()
app.get('/', function (req, res) {
  const counter = redis.incr('counter')
  console.log(counter)
  res.send(`Hello world ${os.hostname()}  redis: ${counter}`)
})

app.listen(PORT)
console.log('Running on http://localhost:' + PORT)