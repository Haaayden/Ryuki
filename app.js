const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const views = require('koa-views')
const log4js = require('koa-log4')
const router = require('./app/router')
const config = require('./config')
const errorHandler = require('./app/middleware/errorHandler')

const port = config.port

const app = new Koa()
const log = log4js.getLogger('App')
const staticPath = './app/public'
const viewsPath = './app/view'
const logPath = './log'

global.$config = config

// 生成log目录
try {
  fs.mkdirSync(path.join(__dirname, logPath))
} catch (err) {
  if(err.code !== 'EEXIST') {
    log.error('Could not create log directory', err)
    process.exit(1)
  }
}

log.level = 'info'

app.use(errorHandler)
app.use(bodyParser())
app.use(static(path.join(__dirname, staticPath)))
app.use(views(path.join(__dirname, viewsPath), {
  extension: 'ejs'
}))

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

app.on('error', async (err, ctx, next) => {
  log.error('=== app on error log ===', err)
  ctx.body = {
    code: err.statusCode || err.status || 500,
    result: err
  }
})

app.listen(port, () => {
  log.info(`Server is listening on port ${port}...`)
})
