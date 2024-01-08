// 这是一个加减乘除的函数集合对象
const myMath = {
  //
  add(num1, num2) {
    return num1 + num2;
  },

  subtract(num1, num2) {
    return num1 - num2
  },

  multiply(num1, num2) {
    return num1*num2
  },

  divide(num1, num2) {
    return num1/num2
  }
}
t
const result = myMath.add(1, 2)
const expect = 3

if (result === expect) {
  console.log('myMath.add Test Success');
} else {
  throw Error('myMath.add Test Failed, expect is ${expect}, but fact is {result} ')
}

const allUnitTestResults = []

function unitTest(name, callback) {
  let success = false;
  let error = null;
  try {
    callback()
    success = true
  } catch (err) {
    error = err
  }
  allUnitTestResults.push({
    name, success, error
  })
}

unitTest('Add function', () => {
  const result = myMath.add(1, 2)
  const expect = 3
  if (result === expect) {
    console.log('myMath.add test success');
  } else {
    throw Error('myMath.add test failed, expect: ${expect}, but actual: ${result}')
  }
})

unitTest('Sub Fuction', () => {
  const result = myMath.subtract(3, 2)
  const expect = 1
  if (result === expect) {
    console.log('myMath.sub Subtract test success!')
  } else {
    throw Error('myMath.sub test failed, expect: ${expect}, but actual: ${result}')
  }
})

let successCount = 0
let failCount = 0
allUnitTestResults.forEach((item) => {
  if (item.success === true) {
    successCount++
  } else {
    failCount++
    console.log(item.error)
  }
})

console.log(`total ${allUnitTestResults.length} test case`)
console.log(`success: ${successCount}`)
console.log(`success: ${failCount}`)
