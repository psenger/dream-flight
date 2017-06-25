/**
 * JSON formatter as copied from the restify library and modified to produce a custom error.
 *
 * @public
 * @function formatJSON
 * @param    {Object} req  the request object
 * @param    {Object} res  the response object
 * @param    {Object} body response body
 * @param    {Function} cb cb
 * @returns  {String}
 */
module.exports = (req, res, body, cb) => {
  if (body instanceof Error) {
    // snoop for RestError or HttpError, but don't rely on
    // instanceof
    res.statusCode = body.statusCode || 500;

    if (body.body) {
      body = {
        error: body.body.message
      };

    } else {
      body = {
        error: body.message
      };
    }
  } else if (Buffer.isBuffer(body)) {
    body = body.toString('base64');
  }

  let data = JSON.stringify(body);
  res.setHeader('Content-Length', Buffer.byteLength(data));

  return cb(null, data);
};
