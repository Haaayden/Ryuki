const fs = require('fs')
const readline = require('readline')

const readFile = async (filePath) => {
  let fileContentArr = []
  const fileReadStream = fs.createReadStream(filePath, { encoding: 'utf8' })
  const rl = readline.createInterface({
    input: fileReadStream
  })
  rl.on('line', lineData => {
    fileContentArr.push(lineData)
  })

  await onReadlineClose(rl)
  const copyFileContentArr = [...fileContentArr]

  // 存放不合法项索引
  let indexArr = []
  copyFileContentArr.forEach((item, index) => {
    if (!/^\d{2}:\d{2}\|+/.test(item)) {
      indexArr.push(index)
    }
  })

  // 找出目标操作项索引
  const dealIndexArr = addParams(indexArr)

  // 将不合法项数据添加到目标项
  dealIndexArr.forEach(item => {
    const { originIndex, dealIndex } = item
    copyFileContentArr[dealIndex] = copyFileContentArr[dealIndex] + copyFileContentArr[originIndex]
  })

  // 删除不需要的违法元素,逆向循环
  for (let i = dealIndexArr.length - 1; i >= 0; i--) {
    const { originIndex, dealIndex } = dealIndexArr[i]
    copyFileContentArr.splice(originIndex, 1)
  }

  const str = JSON.stringify(copyFileContentArr)
  fs.writeFile(path.resolve(__dirname, '../public/clockAnnotated.json'), str, err => {
    if (err) {
      console.log('=== write file err ===', err)
      return
    }
    console.log('=== write file success ===')
  })
  return copyFileContentArr
}

function onReadlineClose(rl) {
  return new Promise((resolve, reject) => {
    rl.on('close', () => {
      console.log('=== end ===')
      resolve('end')
    })
  })
}

/**
 *处理索引数组,添加实际需要操作的数组项索引
 * @param {Array} originArr
 * addParams([474, 475, 476, 1442]) --> [ { originIndex: 474, dealIndex: 473 }, { originIndex: 475, dealIndex: 473 }, { originIndex: 476, dealIndex: 473 }, { originIndex: 1442, dealIndex: 1441 } ]
 */
function addParams(originArr = []) {
  return originArr.map((item, index) => {
    let newItem = { originIndex: item, dealIndex: item - 1 > 0 ? item - 1 : item }
    if (index === 0 || (index - 1 >= 0 && item - 1 !== originArr[index - 1])) {
      return newItem
    }
    let tmpIndex = 0
    for (let i = index - 1; i >= 0; i--) {
      if (originArr[i] === item) {
        tmpIndex = i
        break
      }
    }
    return {
      ...newItem,
      dealIndex: originArr[tmpIndex] - 1 > 0 ? originArr[tmpIndex] - 1 : 0
    }
  })
}

module.exports = readFile
