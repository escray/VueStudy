/* eslint-disable no-console */
// 编译后的 Vue.js 代码或者是“非编译模式”的 Vue.js 代码：
import { createElementVNode, ref, toDisplayString } from 'vue'

const Counter = {
  // setup() {
  //   const num = ref(2)
  //   const click = () => {
  //     num.value += 1
  //   }

  //   return () => {
  //     return createElementVNode('div', { class: 'v-counter' }, [
  //       createElementVNode(
  //         'div',
  //         { class: 'v-text' },
  //         toDisplayString(num.value)
  //       ),
  //       createElementVNode(
  //         'button',
  //         { class: 'v-btn', onClick: click },
  //         'click to add 1'
  //       )
  //     ])
  //   }
  // }

  setup() {
    // 这是浏览器创建DOM的 JavaScript API
    // Node.js环境不存在
    const div = document.createElement('div')
    console.log(div)

    return () => {
      return createElementVNode(
        'div',
        { class: 'v-counter' },
        'test should be error'
      )
    }
  }
}

export default Counter
