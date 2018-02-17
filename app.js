const Koa = require('koa')
const app = new Koa()
const router = require('./app/router')
const config = require('./config')

const port = config.port

// X-Response-Time
// app.use(async (ctx, next) => {
//   const start = Date.now()
//   await next()
//   const ms = Date.now() - start
//   ctx.set('X-Response-Time', `${ms}ms`)
// })

// // Logger
// app.use(async (ctx, next) => {
//   const start = Date.now()
//   await next()
//   const ms = Date.now() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// // Response
// app.use(async ctx => {
//   ctx.body = 'Hello World'
// })

app.use(router.routes()).use(router.allowedMethods())

app.on('error', err => {
  log.error('Server Error', err)
});

app.listen(port, () => {
  log.info(`Server is listening on port ${port}...`)
})
