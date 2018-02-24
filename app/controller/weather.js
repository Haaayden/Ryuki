const Router = require('koa-router')
const request = require('request-promise-native')
const qs = require('qs')
const proxyDomain = require('../util/proxyDomain')

const weatherRouter = new Router()

weatherRouter.get('/now', async ctx => {
  const { location='' } = ctx.query
  let res
  if (location.length > 0) {
    const result = await request(`${proxyDomain.weather}weather/now.json?key=${$config.weatherKey}&language=zh-Hans&unit=c&location=${location}`)
    res = {
      code: 1,
      result: JSON.parse(result)
    }
  } else {
    res = {
      code: 0,
      result: {
        msg: '坐标不合法'
      }
    }
  }
  ctx.body = res
})

module.exports = weatherRouter
