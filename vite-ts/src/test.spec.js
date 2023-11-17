function hi() {
  console.log('hello test')
}

function sayHello(name, fn) {
  if (name == 'Sheng') {
    fn()
  }
}

test('test add', () => {
  expect(1+2).toBe(3)
})

test('test function', () => {
  const fn = jest.fn()
  sayHello('Sheng', fn)
  expect(fn).toHaveBeenCalled()
})
