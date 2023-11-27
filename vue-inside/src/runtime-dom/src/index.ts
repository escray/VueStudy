import { isFunction, isString, isHTMLTag, isSVGTag, extend, NOOP } from '@vue/shared'
import {
  createRenderer,
  createHydrationRenderer,
  warn,
  RootRenderFunction,
  Renderer,
  HydrationRenderer,
  App,
  RootHydrationRenderer,
  isRuntimeOnly,
  DeprecationTypes,
  compatUtils
} from '@vue/runtime-core'
// 浏览器dom操作
import { nodeOps } from './nodeOps'
// 浏览器dom属性更新
import { patchProp } from './patchProp'

let renderer: Renderer<Element | ShadowRoot> | HydrationRenderer
let rendererOptions = /*#__PURE__*/ extend({ patchProp }, nodeOps)

export const createApp = ((...args) => {
  const app = ensureRenderer().createApp(...args)
  const { mount } = app

  app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
    const container = normalizeContainer(containerOrSelector)

    if (!container) {
      return
    }

    const component = app._component
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML
    }

    container.innerHTML = ''
    const proxy = mount(container, false, container instanceof SVGElement)
    if (container instanceof Element) {
      container.removeAttribute('v-cloak')
      container.setAttribute('data-v-app', '')
    }
    return proxy
  }
  return app
})

function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container)
  }
  return container
}

function ensureRenderer() {
  return (
    renderer ||
    (renderer = createRenderer<Node, Element | ShadowRoot>(rendererOptions))
  )
}
