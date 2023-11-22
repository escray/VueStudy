import Notification from './Notification.vue'
import { mount } from "@vue/test-utils"
import { notificationProps } from './props'

describe("Notification", () => {

  const props = notificationProps

  it("Render title", () => {
    const title = "this is a title"
    const wrapper = mount(Notification, {
      props: { title }
    })
    expect(wrapper.get('.el-notification__title').text()).toContain(title)
  })

  it("Render message", () => {
    const message = "this is a message"
    const wrapper = mount(Notification, {
      props: { message }
    })
    expect(wrapper.get('.el-notification__content').text()).toContain(message)
  })

  it('Render position', () => {
    const position = 'bottom-right'
    const wraper = mount(Notification, {
      props: { position }
    })
    expect(wrapper.find('.el-notification').classes()).toContain('right')
    expect(wrapper.vm.verticalProperty).toBe('bottom')
    expect(wrapper.find('.el-notification').element.style.bottom).toBe('0px')
  })

  it('position offset', () => {
    const verticalOffset = 50
    const wrapper = mount(Notification, {
      props: { verticalOffset }
    })
    expect(wrapper.vm.verticalProperty).toBe('top')
    expect(wrapper.find('.el-notification').element.style.top).toBe(`${verticalOffset}px`)
  })

  it('set the showClose', () => {
    const showClose = true
    const wrapper = mount(Notification, {
      props: { showClose }
    })
    expect(wrapper.find('.el-notification__closeBtn').exists()).toBe(true)
    expect(wrapper.find('.el-icon-close').exists()).toBe(true)
  })

  it('click close button', async () => {
    const showClose = true
    const wrapper = mount(Notification, {
      props: { showClose }
    })
    const closeBtn = wrapper.get('.el-notification__closeBtn')
    await closeBtn.trigger('click')
    expect(wrapper.get('.el-notification').isVisible()).toBe(false)
  })

  it ('auto close after duration time', async () => {
    jest.useFakeTimers()

    const wrapper = mount(Notification, {
      props: { duration: 1000 }
    })
    jest.runTimesToTime(1000)
    await flushPromises()
    expect(wrapper.get('.el-notification').isVisible()).toBe(false)
  })




})
