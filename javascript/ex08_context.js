var a = 2
// function add() {
//   var b = 10
//   return a+b
// }
// console.log(add())
function add(b, c) {
  return b+c
}

function addAll(b, c) {
  var d = 10
  result = add(b, c)
  return a+result+d
}

console.log(addAll(3, 6))
