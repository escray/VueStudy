// https://github.com/hug-sun/element3/blob/master/packages/element3/src/composables/component.js
import { h, render } from 'vue'

const MOUNT_COMPONENT_REF = 'el_component'
const COMPONENT_CONTAINER_SYMBOL = Symbol('el_component_container')

export function createComponent(Component, props, children) {
  const vnode = h(Component, { ...props, ref: MOUNT_COMPONENT_REF }, children)
  const container = document.createElement('div')
  vnode[COMPONENT_CONTAINER_SYMBOL] = container
  render(vnode, container)
  return vnode.component
}

export function unmountComponent(ComponentInstance) {
  render(undefined, ComponentInstance.vnode[COMPONENT_CONTAINER_SYMBOL])
}
