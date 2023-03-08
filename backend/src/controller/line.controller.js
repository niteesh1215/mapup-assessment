const turf = require('@turf/turf')
const { CreateNamedLogger } = require('../util/logger.util')
const logger = CreateNamedLogger('line.controller.js')

const lines = require('../data/lines.json')
const { BadRequestError } = require('../util/error-handler.util')

/**
 * Gets the intersection points between the long line in the body and pre-defined the scattered lines
 * Example result
    [
        {
            "_id": "L43",
            "points": [
                {
                    "type": "Point",
                    "coordinates": [
                        127.43478260869566,
                        -15.782608695652174
                    ]
                }
            ]
        }
    ]
*/
const intersections = (req, res) => {
  /** The long line for which to check the intersections */
  const longLine = req.body

  if (!longLine) throw new BadRequestError('Body missing')
  if (longLine.type !== 'LineString') throw new BadRequestError(req.reqId, 'GeoJSON type [LineString] expected')

  const result = [] // Will contain all the intersecting lines number with intersection points
  let longLineString

  try {
    longLineString = turf.lineString(longLine.coordinates)
  } catch (err) {
    /** If there's any error in parsing the lineString then that means the coordinates are invalid */
    throw new BadRequestError('Invalid coordinates ' + String(err))
  }

  /** For each pre-defined specified lines check the intersection with the long line. */
  lines.forEach((l, i) => {
    const shortLineString = turf.lineString(l.line.coordinates)
    const intersects = turf.lineIntersect(longLineString, shortLineString)
    if (intersects.features.length > 0) {
      const intersectionResult = {
        /* Line id, handles the case where the line number is a single digit so that the line id is L01 and not L1 */
        _id: `L${('0' + (i + 1)).slice(-2)}`,
        points: [] // points of intersections
      }

      intersects.features.forEach((f) => {
        intersectionResult.points.push(f.geometry)
      })

      result.push(intersectionResult)
    }
  })

  logger.info('reqId=%s line.controller.intersections result=%j', req.reqId, result)

  return res.json(result)
}

module.exports = {
  intersections
}
