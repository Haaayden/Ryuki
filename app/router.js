const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const util = require('./util/util')

const router = new Router();

const controllerPath = path.resolve(__dirname, 'controller')
const controllerFiles = fs.readdirSync(controllerPath)
const jsCtrlFiles = controllerFiles.filter(file => {
  return file.endsWith('.js')
})
jsCtrlFiles.forEach(file => {
  const controllerName = util.getFileName(file, 'js')
  const controller = require(`${__dirname}/controller/${file}`)
  if (controllerName === 'home') {
    router.use('/', controller.routes(), controller.allowedMethods())
    return
  }
  router.use(`/${controllerName}`, controller.routes(), controller.allowedMethods())
  console.log(`Add Router ${controllerName} Success!!!`)
})

module.exports = router
