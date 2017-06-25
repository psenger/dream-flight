const InvalidArgumentError = require('../../../errors/index').InvalidArgumentError;

/**
 * Validate the Parameters.
 * Stores the flights found in body into the req.flights namespace.
 *
 * @function
 * @param {*} req - the request object
 * @param {*} res - the response object
 * @param {function} next - callback function
 * @return {*}
 */
const validateParam = (req, res, next) => {
  let { log } = req;
  if (req && req.body && Array.isArray(req.body.flights)) {
    req.flights = req.body.flights;
    return next();
  } else {
    return next(InvalidArgumentError);
  }
};

module.exports = validateParam;
