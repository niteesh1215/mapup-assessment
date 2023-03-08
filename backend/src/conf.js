const ENV = (() => {
  let ENV = 'local'
  if (!process.env.KAREVOL_API) {
    console.log(`ENV is not provided
    Set Environment variable as
        export ASSESMENT_APP=prod
        export ASSESMENT_APP=local
    Using local ENV`)
  } else {
    ENV = process.env.ASSESMENT_APP
  }
  return ENV
})()

module.exports = require(`../settings.${ENV}.json`)
