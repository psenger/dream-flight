const filters = require('../filters/v1.0.0/index');
const reducers = require('../reducers/v1.0.0/index');
const validateParametersFilter = require('./handlers/v1.0.0/validateParam');
const transformHandler = require('./handlers/v1.0.0/transformFlight');
const notACodeShareFlightFilter = require('./handlers/v1.0.0/flightFilter')(filters.notQf);
const departSydOrArriveSydFilter = require('./handlers/v1.0.0/flightFilter')(filters.sydney);

module.exports = function (server) {

  server.post({
    path: '/flights',
    version: '1.0.0'
  }, validateParametersFilter, notACodeShareFlightFilter, departSydOrArriveSydFilter, transformHandler(reducers.flattenFlight));

  return server;
};
