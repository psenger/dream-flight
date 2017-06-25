const restify = require('restify'),
  path = require('path'),
  app = require('../package.json'),
  bunyan = require('bunyan'),
  json = require('./formatters/json');

let server = restify.createServer({
  formatters: {
    'application/json': json
  },
  log: bunyan.createLogger({
    src: ( process.env.NODE_ENV === 'development' ),
    name: app.name,
    streams: [
      {
        level: 'info',
        stream: process.stdout // log INFO and above to stdout
      }, {
        level: 'error',
        path: path.join(__dirname, '..', 'log', 'error.log')  // log ERROR and above to a file
      },
      {
        level: 'debug',
        path: path.join(__dirname, '..', 'log', 'debug.log')  // log ERROR and above to a file
      }
    ]
  }),
  version: '1.0.0', // Default version of all routes, if the   Accept-Version   header is not specified.
  name: app.name
});

server.use(restify.CORS());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.gzipResponse());
server.use(restify.bodyParser({ mapParams: true }));

server = require('./routes/flights')(server);

module.exports = server;
