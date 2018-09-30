const Router = require('koa-router')
const clockData = require('../public/clockAnnotatedAfterFormat.json')

const clockRouter = new Router()

clockRouter.get('/', ctx => {
  ctx.body = 'clock router'
})

clockRouter.get('/timeMsg/:time', ctx => {
  const { time } = ctx.params
  let data = {}
  if (time) {
    const allTimeTextArray = clockData[time]
    const _arrIndex = Math.floor(Math.random() * allTimeTextArray.length)
    data = allTimeTextArray[_arrIndex]
  }
  ctx.body = {
    apistatus: 1,
    result: { time, data }
  }
})

module.exports = clockRouter
