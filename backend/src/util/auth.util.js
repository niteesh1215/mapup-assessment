
const CONF = require('../conf')
const { UnauthorizedError } = require('./error-handler.util')
const { CreateNamedLogger } = require('./logger.util')

const logger = CreateNamedLogger('auth.util')

const authenticate = (req, _, next) => {
  /** Gettting the key in the header */
  const keyInTheHeader = req.header('authKey')
  logger.info('reqId=%s authenticate authKey=%s', req.reqId, keyInTheHeader)
  if (keyInTheHeader !== CONF.authKey) {
    throw new UnauthorizedError(req.reqId, 'You are unauthorized to access this.')
  }
  next()
}

module.exports = {
  authenticate
}
