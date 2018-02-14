const Router = require('koa-router')
const homeRouter = new Router()

const router = homeRouter.get('/', ctx => {
  ctx.body = 'Hello Home Router!'
})

module.exports = router
