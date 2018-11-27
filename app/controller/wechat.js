const Router = require('koa-router')
const request = require('request-promise-native')
const qs = require('qs')
const proxyDomain = require('../util/proxyDomain')
const sign = require('../service/sign')

const wechatRouter = new Router()

wechatRouter.get('/signature', async ctx => {
  // const { location='' } = ctx.query
  // let res
  // if (location.length > 0) {
  //   const result = await request(`${proxyDomain.weather}weather/now.json?key=${$config.weatherKey}&language=zh-Hans&unit=c&location=${location}`)
  //   res = {
  //     code: 1,
  //     result: JSON.parse(result)
  //   }
  // } else {
  //   res = {
  //     code: 0,
  //     result: {
  //       msg: '坐标不合法'
  //     }
  //   }
  // }
  // ctx.body = res

  const { url = '' } = ctx.query
  let res = {}

  //检查页面链接对应的签名是否可用
  var isInvalidate = false
  var signindex = null
  // 检查已有签名是否有效
  global.$wechat.signs.forEach((item, index) => {
    if (item.url === url) {
      signindex = index
      if (item.deadline && new Date().getTime() - item.deadline < 6000000) {
        isInvalidate = true
        res = {
          code: 1,
          result: {
            sign: item
          }
        }
      }
    }
  })


  //当签名不可用时，检测jsapi_ticket是否可用，来决定是直接请求签名还是先请求jsapi_ticket再请求签名
  if (!isInvalidate) {
    try {
      if (!(global.$wechat.deadline && new Date().getTime() - global.$wechat.deadline < 6000000)) {
        // ticket 过期时更新ticket
        await updateTicket()
      }

      // 调用计算签名方法
      let signatureObj = sign(global.$wechat.jsapi_ticket, url)
      // 签名生成时间戳,记录是否过期用
      signatureObj.deadline = new Date().getTime()
      // 缓存签名
      if (typeof(signindex) === 'number') {
        global.$wechat.signs.splice(signindex, 1, signatureObj)
      } else {
        global.$wechat.signs.push(signatureObj)
      }

      res = {
        code: 1,
        result: {
          sign: signatureObj
        }
      }
    } catch (error) {
      res = {
        code: 0,
        result: {
          msg: error
        }
      }
    }
  }


  ctx.body = res
})

async function updateTicket(params) {
  // 1. 获取token
  const tokenRes = await request(`${proxyDomain.wechatToken}?grant_type=client_credential&appid=${$config.wechatPublicAppID}&secret=${$config.wechatPublicAppSecret}`)
  const bodyToken = JSON.parse(tokenRes)
  global.$wechat.access_token = bodyToken.access_token
  // 2. 获取ticket
  const ticketRes = await request(`${proxyDomain.wechatTicket}?access_token=${bodyToken.access_token}&type=jsapi`)
  const bodyTicket = JSON.parse(ticketRes)
  global.$wechat.jsapi_ticket = bodyTicket.ticket
  // 3. 计算signature
  // 存当前时间戳,记录token ticket过期用
  global.$wechat.deadline = new Date().getTime()
}


module.exports = wechatRouter
