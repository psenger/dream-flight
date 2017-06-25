const InvalidArgumentError = require('../../../errors/index').InvalidArgumentError;

/**
 * Flight filter is a generic function which passes the given function to <code>Array.prototype.filter</code>
 * on the flights array found in <code>req.flights</code>. The filtered results are then put back in the same
 * position of the req object <code>req.flights</code>.
 *
 * This allows us to chain flight filters together, in a composition manner.
 *
 * @public
 * @function
 * @param {function(T=, number=, Array.<T>=)} filterFunction - The function that will be passed to the <code>Array.prototype.filter</code> on flights.
 * @return {function(*, *, *)}
 */
const flightFilter = (filterFunction) => {
  /**
   * A Generic Handler, aware of the filter function that was passed.
   * Assumes, the flights array is loaded in <code>req.flights</code>
   *
   * @public
   * @function
   * @param {*} req - the request object
   * @param {*} res - the response object
   * @param {function({*|null})} next - callback function
   * @return {*}
   */
  return (req, res, next) => {
    let { log } = req;
    // log.info('Enter flightFilter');
    if (req && req.flights && Array.isArray(req.flights)) {
      req.flights = req.flights.filter(filterFunction);

      console.log( 'flightFilter =',JSON.stringify(req.flights,'\t',4) );

      return next();
    } else {
      return next(InvalidArgumentError);
    }
  }
};

module.exports = flightFilter;
