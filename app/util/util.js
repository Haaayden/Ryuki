/**
 * 提取文件名（去除文件名后缀）
 * @param {String} nameCompolete 完整文件名
 * @param {String} suffix 文件名后缀不带.   如js
 * @return {String} 过滤后的文件名
 * @example getFileName('home.js', 'js')  ==>  home
 */
const getFileName = function(nameCompolete, suffix) {
  const reg = new RegExp(`\.${suffix}$`)
  return nameCompolete.replace(reg, '')
}

module.exports = {
  getFileName
}
