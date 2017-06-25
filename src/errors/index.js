let errors = require('restify').errors;
let InvalidArgumentError = errors.InvalidArgumentError;

/**
 * Errors, as more and more errors are created, it make sense to add them here.
 *
 * @type {{InvalidArgumentError: errors.InvalidArgumentError}}
 */
module.exports = {
  InvalidArgumentError: new InvalidArgumentError('Invalid Argument')
};