const express = require('express')
const os = require('os')
const Redis = require('ioredis')
const mysql = require('mysql')
const amqp = require('amqplib')

amqp.connect('amqp://mq').then((conn) => {
  console.log('mq connected')
}).catch(err => {
  console.log('mq failed')
  console.log(err)
})

const redis = new Redis({
  host: 'redis'
})

const connection = mysql.createConnection('mysql://root:xuzeyu123@mysql/nobody_db')

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }

  console.log('connected as id ' + connection.threadId)
})

// Constants
const PORT = 8080

// App
const app = express()
app.get('/', function (req, res) {
  redis.incr('counter').then(counter => {
    console.log(counter)
    res.send(`Hello world ${os.hostname()}  redis: ${counter}`)
  })
})

app.listen(PORT)
console.log('Running on http://localhost:' + PORT)