const Winston = require('winston')
const CONF = require('../conf')

/** Getting the ip of the server which will be used to find the request id */
const serverIp = (() => {
  try {
    const os = require('os')
    const netInterfaces = os.networkInterfaces()
    const result = []
    for (const id in netInterfaces) {
      const netFace = netInterfaces[id]
      for (let i = 0; i < netFace.length; i++) {
        const ip = netFace[i]
        if (ip.internal === false && ip.family === 'IPv4') {
          result.push(ip.address)
          break
        }
      }
    }
    if (result && result.length > 0) return result[0].toString()
    else return '127.0.0.1'
  } catch (error) {
    return 'noip'
  }
})()

/** Specifying output source for the logger */
const outputs = (() => {
  const outputs = []
  for (const config of CONF.logger) {
    /** For logging in the console */
    if (config.type === 'CONSOLE') {
      outputs.push(new Winston.transports.Console(config.config))
    } else if (config.type === 'FILE') {
    /** For logging in a file */
      outputs.push(new Winston.transports.File(config.config))
    }
  }
  return outputs
})()

/** Create a new logger instance */
const CreateNamedLogger = function (name) {
  return Winston.createLogger({
    format: Winston.format.combine(
      Winston.format.timestamp(),
      Winston.format.splat(),
      Winston.format.label({
        label: name
      }),
      Winston.format.simple(),
      Winston.format.printf(({ level, message, timestamp }) => {
        return `${timestamp} ${level}: ${message}`
      })
    ),
    transports: outputs
  })
}

class ReqId {
  constructor () {
    this._id = this.generateId()
  }

  /** Generates the request id */
  generateId () {
    const random7Chars = Math.random().toString(36).substring(2, 9)
    return serverIp + '.' + random7Chars + '.' + Date.now()
  }

  toString () {
    return this._id
  }
}

module.exports = {
  CreateNamedLogger,
  ReqId
}
