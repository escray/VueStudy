// 极客时间
// 浏览器工作原理与实践
// 07 | 变量提升：JavaScript代码是按顺序执行的吗？

showName()
// console.log(myname)
// var myname = 'geekbang'
var showName = function showName() {
  console.log('function showName execute');
}
// showName()
function showName() {
  console.log('geektime');
}
// showName()

(function () {
  console.log(g)
  if (true) {
    console.log('hello world')
    function g() { return true }
  }
})()
