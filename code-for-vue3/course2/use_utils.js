// 用户侧代码

import utils from 'utils.js'

// error process method 1
// user execute try...catch
utils.foo(() => {
  try {

  } catch (e) {

  }
})

// 注册错误处理程序
utils.registerErrorHandler((e) => {
  console.log(e)
})

utils.foo(() => { })
utils.bar(() => { })
