const express = require('express')
const os = require('os')
const Redis = require('ioredis')
const mysql = require('mysql')
const amqp = require('amqplib')
const config = require('./config')

const redis = new Redis(config.redis)

const connection = mysql.createConnection(config.mysql)
function connectMysql () {
  connection.connect((err) => {
    if (err) {
      console.error('mysql failed')
      setTimeout(connectMysql, 1000)
      return
    }
    console.log('mysql connected')
  })
}
connectMysql()

function connectMq () {
  amqp.connect(config.mq).then(conn => {
    console.log('mq connected')
  }).catch(err => {
    console.error('mq failed')
    setTimeout(connectMq, 1000)
  })
}
connectMq()

// Constants
const PORT = 8080

// App
const app = express()
app.get('/', function (req, res) {
  redis.incr('counter').then(counter => {
    res.send(`Hello world ${os.hostname()}  redis: ${counter}`)
  })
})

app.listen(PORT)
console.log('Running on http://localhost:' + PORT)
