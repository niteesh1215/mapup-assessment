const express = require('express')
const cors = require('cors')
const CONF = require('./conf')
const { CreateNamedLogger, ReqId } = require('./util/logger.util')
const router = require('./router/main.router')
const { errorHandler } = require('./util/error-handler.util')
/** logger */
const logger = CreateNamedLogger('app.js')
const app = express()

/** Enable cross origin */
app.use(cors())
/** Enable json body parsing, set the body payload limit to 5mb */
app.use(express.json({ limit: '5mb' }))
/** use qs library to parse urlencoded data */
app.use(express.urlencoded({ extended: true }))

/** logging middleware for all requests */
app.use((req, _, next) => {
  req.reqId = new ReqId()
  logger.info('req=%s %s header=%j query=%j param=%j body=%j', req.reqId, req.originalUrl, req.headers, req.query, req.params, req.body)
  next()
})

/** main router */
app.use('/api/v1', router)

/** Handling errrors */
app.use(errorHandler)

app.listen(CONF.port, () => {
  logger.info('Listening on port %s ', CONF.port)
})
