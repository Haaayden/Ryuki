const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
const defaultConfig = require('./config.default')
const envConfig = require(`./config.${env}`)
module.exports = {
  ...defaultConfig,
  ...envConfig
}
