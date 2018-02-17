const Router = require('koa-router')
const homeRouter = new Router()

const router = homeRouter.get('/', async ctx => {
  const title = '小辉哥'
  await ctx.render('index', {
    title
  })
})

module.exports = router
