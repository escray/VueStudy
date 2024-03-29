;(function () {
  const { h, ref, toDisplayString } = window.Vue
  const Counter = {
    setup() {
      const num = ref(0)
      const click = () => {
        num.value += 1
      }
      return () => {
        return h('div', { class: 'v-counter' }, [
          h('div', { class: 'v-text' }, toDisplayString(num.value)),
          h('button', { class: 'v-btn', onClick: click }, 'click to add 1')
        ])
      }
    }
  }
  window['counter-increase'] = Counter
})()
