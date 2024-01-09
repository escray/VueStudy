import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BoxTest from './index.test.vue'

describe('Box', () => {
  test('className', () => {
    const wrapper = mount(BoxTest)
    const boxDOM = wrapper.find('.my-vue-box')
    // 判断className为my-vue-box的DOM是否存在
    expect(boxDOM).toBeTruthy()

    const slotDOM = boxDOM.find('.hello')
    // 判断className为my-vue-box的DOM内部子节点DOM是否存在
    expect(slotDOM).toBeTruthy()
    expect(slotDOM.text()).toBe('Hello World')
  })
})
