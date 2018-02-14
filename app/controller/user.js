const Router = require('koa-router')
const userRouter = new Router()

userRouter.get('/', ctx => {
  ctx.body = 'Hello User Router!'
})

module.exports = userRouter
