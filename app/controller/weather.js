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

weatherRouter.post('/faiz/test', async ctx => {
  console.log('11111111')
  try {
    console.log('22222222222')
    const res = await equest({
      url: 'http://test2.saas.17shihui.com/v1/pms/client/fee/submitV404',
      json: true,
      method: 'POST',
      headers: {
        "Authorization": 'MAuth b2be4af5c4ac8333a28d71965d6d207d13f90f9ec049641bff7c7698ae85849d',
        "Content-Type": "application/json"
      },
      body: {
        paramId: 10708,
        propertyFeeType: 1,
        gid: 570254,
        cityId: 1,
        serviceId: 1087028,
        app_id: 6,
        groupId: 570254,
        userId: 10684032,
        channelId: 11285,
        source: "WE_CHAT",
        pay: 13,
        payFeeReturnStrArray: ["234_2017/12/25-2017/12/31"]
      }
    })
    console.log('3333333333')
    ctx.response.status = 500
    ctx.body = 'qqqqqqqq'
  } catch (error) {
    console.log('4444444444', error)
    throw(error)
  }
  console.log('55555555', res)
  ctx.response.status = 500
  ctx.body = 'qqqqqqqq'
  // request({
  //   url: `${proxy.sass}/v1/pms/client/fee/submitV404`,
  //   json: true,
  //   method: 'POST',
  //   headers: {
  //     "Authorization": 'MAuth ' + encode(10684032),
  //     "Content-Type": "application/json"
  //   },
  //   body: {
  //     paramId: 10708,
  //     propertyFeeType: 1,
  //     gid: 570254,
  //     cityId: 1,
  //     serviceId: 1087028,
  //     app_id: 6,
  //     groupId: 570254,
  //     userId: 10684032,
  //     channelId: 11285,
  //     source: "WE_CHAT",
  //     pay: 13,
  //     payFeeReturnStrArray: ["234_2017/12/25-2017/12/31"]
  //   }
  // }, (error, response, body) => {
  //   if (!error && response.statusCode == 200) {
  //     res.json(response.body)
  //   }else {
  //     res.json(error)
  //   }
  // })
})

module.exports = weatherRouter
