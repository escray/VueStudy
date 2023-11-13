// geektime play with Vue 3 family lesson 17

// https://github.com/hug-sun/element3/blob/master/packages/element3/packages/loading/directive.js

import { nextTick } from 'vue'



const toggleLoading = (el, binding) => {
  if (binding.value) {
    nextTick(() => {
      let parentEl = document.body
      if (!binding.modifiers.fullscreen) {
        parentEl = el
      }
      addStyle(el.options, parentEl, el.instance)
      el.instance.show()
      parentEl.appendChild(el.mask)
    })
  } else {
    el.instance.close()
  }
}

const loadingDirective = {
  mounted: function (el, binding, vnode) {
    const mask = createComponent(Loading, {
      ...defineOptions,
      onAfterLeave() {
        el.domVisible = false
        const target = binding.modifiers.fullscreen || binding.modifiers.body ? document.body : el
        removeClass(target, 'el-loading-parent--relative')
        removeClass(target, 'el-loading-parent--hidden')
      }
    })
    el.options = options
    el.instance = mask.proxy
    el.mask = mask.proxy.$el
    el.maskStyle = {}
    bingding.value && toggleLoading(el, bindding)
  },
  
  updated: function (el, binding) {
    el.instance.setText(el.getAttribute('element-loading-text'))
    if (binding.oldValue !== binding.value) {
      toggleLoading(el, binding)
    }
  },
  unmounted: function () {
    el.instance && el.instance.close()
  }
}

export default {
  install(app) {
    // if (Vue.prototype.$isServer) return
    app.directive('loading', loadingDirective)
  }
}
