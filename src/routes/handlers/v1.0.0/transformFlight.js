const InvalidArgumentError = require('../../../errors/index').InvalidArgumentError;

/**
 * Transform the flight objects and completes the request.
 *
 * @function
 * @public
 * @param {function()} reducer - An Array.prototype.reducer function
 * @param {*} accumulator - The object Literal that will transform the data.
 * @return {function(*=, *, *)}
 */
const transformFlight = (reducer, accumulator) => {

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
  return (req, res, next) => {
    let { log } = req;
    log.info('Enter transformFlight');
    if (req && req.flights && Array.isArray(req.flights)) {
      let { flights } = req;

      let transformedFlights = flights.reduce(reducer, accumulator);

      res.send(transformedFlights);
      return next();
    } else {
      return next(InvalidArgumentError);
    }
  };
};

module.exports = transformFlight;
