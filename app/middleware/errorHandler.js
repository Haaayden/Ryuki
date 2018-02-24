// 错误处理
module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const response = error
    ctx.body = {
      code: 0,
      result: response
    }
  }
}