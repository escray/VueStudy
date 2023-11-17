// Unit Test
function add(x, y) {
  if (Number(x) == x && Number(y) == y) {
    return Number(x) + Number(y)
  } else if (typeof x == 'object' && typeof y == 'object') {
    return Object.assign({}, x, y)
  }
  return x + y
}

function expect(ret) {
  return {
    toBe(arg) {
      if (ret !== arg) {
        throw Error(`预计和实际不符,预期仕${arg}，实际是${ret}`)
      }
    },
    toEqual(arg) {
      const argString = JSON.stringify(arg)
      const retString = JSON.stringify(ret)
      if (retString !== argString) {
        throw Error(`预计和实际不符,预期仕${argString}，实际是${retString}`)
      }
    }
  }
}

function test(title, fn) {
  try {
    fn()
    console.log(title, 'test pass!')
  } catch (e) {
    console.log(e)
    console.error(title, 'test failed')
  }
}

test('test add function', () => {
  expect(add(1,2)).toBe(3)
})

test('test num add string', () => {
  expect(add(1, '2')).toBe(3)
})

test('test string add string', () => {
  expect(add('1', '2')).toBe(3)
})

test('object add object', () => {
  expect(add({ name: 'kkb', }, { age: 7 })).toEqual({name:'kkb', age: 7})
})
