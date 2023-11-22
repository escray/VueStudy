import { Notification } from './Notification.js'
import { h } from 'vue'

describe('Notifictaion.js', () => {
  afterEach(async () => {
    Notification.closeAll()
  })

  it('should have close function in the notification instance', () => {
    const instanceProxy = Notification('foo')
    expect(instanceProxy.close).toBeTruthy()
  })

  it('default options', () => {
    const instanceProxy = Notification('foo')

    expect(instanceProxy.$props.position).toBe('top-right')
    expect(instanceProxy.$props.message).toBe('foo')
    expect(instanceProxy.$props.duration).toBe(4500)
    expect(instanceProxy.$props.vericalOffset).toBe(16)
  })

  it('message.info', () => {
    const instanceProxy = Notification.info('foo')
    expect(instanceProxy.$props.type).toBe('info')
    expect(instanceProxy.$props.message).toBe('foo')
  })

  it('message.success', () => {
    const instanceProxy = Notification.success('foo')

    expect(instanceProxy.$props.type).toBe('success')
    expect(instanceProxy.$props.message).toBe('foo')
  })

  it('message.warning', () => {
    const instanceProxy = Notification.warning('foo')

    expect(instanceProxy.$props.type).toBe('warning')
    expect(instanceProxy.$props.message).toBe('foo')
  })

  it('message.error', () => {
    const instanceProxy = Notification.error('foo')

    expect(instanceProxy.$props.type).toBe('error')
    expect(instanceProxy.$props.message).toBe('foo')
  })
})
