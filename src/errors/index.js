let errors = require('restify').errors;
let InvalidArgumentError = errors.InvalidArgumentError;

module.exports = {
  InvalidArgumentError: new InvalidArgumentError('Invalid Argument')
};