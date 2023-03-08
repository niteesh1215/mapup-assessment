const express = require('express')
const { authenticate } = require('../util/auth.util')
const router = express.Router()
const lineRouter = require('./line.router')

/** Add the authentication to all the routes that matches /line */
router.use('/line', authenticate)
router.use('/line', lineRouter)

module.exports = router
