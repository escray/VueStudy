// @ts-check
const { app } = require('./app')

function foo() {
  bar("hello world")
  app()
}

/**
 * bar
 * @param {string} str
 */
function bar(str) {
  console.log(str)
}


