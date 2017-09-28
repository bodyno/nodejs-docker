let config = {}

if (process.env.NODE_ENV == 'dev') {
  config = {
    mq: 'amqp://root:xuzeyu123@localhost',
    mysql: 'mysql://root:xuzeyu123@localhost/nobody_db',
    redis: 'redis://localhost:6379',
  }
}

if (process.env.NODE_ENV == 'prod') {
  config = {
    mq: 'amqp://root:xuzeyu123@mq',
    mysql: 'mysql://root:xuzeyu123@mysql/nobody_db',
    redis: 'redis://redis',
  }
}

module.exports = config