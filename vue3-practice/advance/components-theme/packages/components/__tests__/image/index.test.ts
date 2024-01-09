/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-console */
import { describe, test, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { Image } from '../../src'

// 模拟重写 img标签，自动触发图片请求操作
window.document.createElement = (function (create) {
  return function () {
    // @ts-ignore
    const element: HTMLElement = create.apply(this, arguments)
    if (element.tagName === 'IMG') {
      // 图片元素渲染后，模拟自动触发图片请求的延时请求操作
      setTimeout(() => {
        const src = element.getAttribute('src')
        if (src?.includes('error.jpg')) {
          // 如果图片链接有带error.jpg，就触发请求错误
          element.dispatchEvent(new CustomEvent('error', { bubbles: true }))
        } else {
          // 其它默认触发请求成功
          element.dispatchEvent(new CustomEvent('load', { bubbles: true }))
        }
      }, 100)
    }
    return element
  }
})(window.document.createElement)

describe('Image', () => {
  test('load', async () => {
    let resolve: Function
    let reject: Function
    new Promise((res, rej) => ((resolve = res), (reject = rej)))
    // 渲染验证图片请求成功
    mount(Image, {
      props: {
        src: './xxx/xxxx.jpg'
      },
      emits: {
        load: (e: Event) => {
          expect(e).toBeTruthy()
          resolve?.()
        },
        error: () => {
          reject?.()
        }
      }
    })
    await flushPromises()
  })

  test('error', async () => {
    let resolve: Function
    let reject: Function
    new Promise((res, rej) => ((resolve = res), (reject = rej)))
    // 渲染验证图片请求失败
    mount(Image, {
      props: {
        src: './xxx/error.jpg'
      },
      emits: {
        load: () => {
          reject?.()
        },
        error: (e: Event) => {
          expect(e).toBeTruthy()
          resolve?.()
        }
      }
    })
    await flushPromises()
  })
})
