import { effect } from './effect'
import { reactive, shallowReactive } from './reactive'

describe('reactive test', () => {
  it('test', () => {
    expect(1+2).toBe(3)
  })

  it('reactive basic usage', () => {
    const ret = reactive({ num: 0 })
    let val
    effect(() => {
      val = ret.num
    })
    expect(val).toBe(0)
    ret.num++
    expect(val).toBe(1)
    ret.num = 10
    expect(val).toBe(10)
  })

  it('property of one reactive object used in multiple effect', () => {
    const ret = reactive({ num: 0 })
    let val, val2
    effect(() => {
      val = ret.num
    })
    effect(() => {
      val2 = ret.num
    })
    expect(val).toBe(0)
    expect(val2).toBe(0)
    ret.num++
    expect(val).toBe(1)
    expect(val2).toBe(1)
    ret.num = 10
    expect(val).toBe(10)
    expect(val).toBe(10)
  })

  it('shallowReactive basic usage', () => {
    const ret = shallowReactive({ num: 0 })
    let val
    effect(() => {
      val = ret.num
    })
    expect(val).toBe(0)
    ret.num++
    expect(val).toBe(1)
    ret.num = 10
    expect(val).toBe(10)
  })

  it('reactive nest', () => {
    const ret = reactive({
      name: 'play with vue3',
      info: {
        price: 129,
        type: 'f2e'
      }
    })
    let price
    effect(() => {
      price = ret.info.price
    })
    expect(price).toBe(129)
    ret.info.price++
    expect(price).toBe(130)
  })

  it('shallowReactive shallow usage', () => {
    const ret = shallowReactive({
      name: 'playwith vue3',
      info: {
        price: 129,
        type: 'f2e'
      }
    })
    let price
    effect(() => {
      price = ret.info.price
    })
    expect(price).toBe(129)
    ret.info.price++
    // 嵌套的没有响应式效果
    expect(price).toBe(129)
  })
})
