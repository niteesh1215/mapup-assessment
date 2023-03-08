const express = require('express')
const router = express.Router()
const LineController = require('../controller/line.controller')

/** Specify all the routes related to line */
router.post('/get-intersections', LineController.intersections)

module.exports = router
