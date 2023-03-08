const { CreateNamedLogger, ReqId } = require('./logger.util')

const logger = CreateNamedLogger('error-handler.util')

/** Base class for handling HTTP Errors */
class HttpError extends Error {
  isDefinedError = true
  constructor (reqId, statusCode, message) {
    super(message)
    this.reqId = reqId
    this.statusCode = statusCode
  }

  /** Get the error data in the json format */
  toJSON () {
    return {
      reqId: this.reqId.toString(),
      message: this.message
    }
  }
}

class BadRequestError extends HttpError {
  constructor (reqId, message) {
    super(reqId, 400, message)
    logger.info('reqId=%s BadRequestError message=%s stack=%o', reqId, message, this.stack)
  }
}

class UnauthorizedError extends HttpError {
  constructor (reqId, message) {
    super(reqId, 401, message)
    logger.info('reqId=%s UnauthorizedError message=%s stack=%o', reqId, message, this.stack)
  }
}

/** Main error handler for the application, here all the errors application errors will be handled */
const errorHandler = (err, req, res, _) => {
  /** Checking if the error is a defindedError e.g. HttpError, BadRequestError etc. specified above */
  if (!(err && err.isDefinedError)) {
    logger.error('reqId=%s ErrorHandler Error %o', req.reqId, err)
    /** Since the error is not a defined error create a defined error. */
    err = new HttpError(req.reqId || new ReqId(), res.statusCode || 500, String(err) || 'Internal server error')
  }

  res.statusCode = err.statusCode
  return res.json(err.toJSON())
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  errorHandler
}
