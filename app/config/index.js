let config = {}
if (process.env.NODE_ENV == 'dev') {
  config = {
    mq: 'amqp://root:xuzeyu123@localhost',
    mysql: 'mysql://root:xuzeyu123@localhost/nobody_db',
    redis: 'redis://localhost:6379',
  }
}

module.exports = config