import { effect } from './effect'
import { ref } from './ref'

describe('ref test', () => {
  it('ref basic usage', () => {
    const r = ref(0)
    let val
    effect(() => {
      val = r.value
    })
    expect(val).toBe(0)
    r.value++
    expect(val).toBe(1)
  })

  it('ref complex data using reactive', () => {
    const r = ref({name: "play with vue3"})
    let val
    effect(() => {
      val = r.value.name
    })
    expect(val).toBe("play with vue3")
    r.value.name = 'relearn frontend'
    expect(val).toBe('relearn frontend')
  })
})
