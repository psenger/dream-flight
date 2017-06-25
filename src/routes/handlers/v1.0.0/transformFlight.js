const InvalidArgumentError = require('../../../errors/index').InvalidArgumentError;

/**
 * Transform the flight objects and completes the request.
 *
 * @function
 * @public
 * @param {*} req - the request object
 * @param {*} res - the response object
 * @param {function} next - callback function
 * @return {*}
 */
const transformFlight = (req, res, next) => {
  let { log } = req;
  log.info('Enter transformFlight');
  if (req && req.flights && Array.isArray(req.flights)) {
    let { flights } = req;

    let transformedFlights = flights.reduce(function (accumulator, currentValue) {

      let { airline, flightNumber, departure = {}, arrival = {} } = currentValue;

      if (airline === undefined || flightNumber === undefined || departure.airport === undefined
        || arrival.airport === undefined || departure.scheduled === undefined) {
        log.error('One more more expected value(s) missing', currentValue, req.flights);
      }

      accumulator.flights.push({
        flight: (airline || '') + ( flightNumber || ''),
        origin: (departure.airport || ''),
        destination: (arrival.airport || ''),
        departureTime: (departure.scheduled || '')
      });

      return accumulator;

    }, { flights: [] });

    res.send(transformedFlights);
    return next();
  } else {
    return next(InvalidArgumentError);
  }
};

module.exports = transformFlight;
