import { describe, test, expect } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ButtonTest from './index.test.vue'

describe('Button', () => {
  test('click event', async () => {
    // 模拟浏览器渲染组件
    const wrapper = mount(ButtonTest, { props: { num: 123 } })
    // 找到数字文案DOM节点
    const textDOM = wrapper.find('.display-text')
    // 找到按钮DOM节点
    const btnDOM = wrapper.find('.btn-add')
    // 断言验证点击前的文案
    expect(textDOM.text()).toBe('current=123')
    // 触发按钮点击
    btnDOM.trigger('click')
    // 等待DOM变化结束
    await nextTick()
    // 断言验证结果(点击后的文案)
    expect(textDOM.text()).toBe('current=124')
  })
})
