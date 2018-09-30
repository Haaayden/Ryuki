// 错误处理
module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const response = error
    ctx.body = {
      code: error.statusCode || error.status || 500,
      result: response
    }
  }
}
