import { isString, ShapeFlags } from '@vue/shared'
// from geekbang playwith vue3 family lesson 30
// vue/core/packages/runtime-core/src/vnode.ts
const vnode = createVNode(
  rootComponent as ConcreteComponent,
  rootProps
)

function _createVNode() {
  // 处理属性和class
  // class & style normalization.
  if (props) {
  }

  const shapeFlag = isString(type)
    ? ShapeFlages.ELEMENT
    : __FEATURES_SUSPENSE__ && isSuspense(type)
      ? ShapeFlags.SUSPENSE
      : isTeleport(type)
        ? ShapeFlags.TELEPORT
        : isObject(type)
          ? ShapeFlags.STATEFUL_COMPONENT
          : isFunction(type)
            ? ShapeFlags.FUNCTIONAL_COMPONENT
            : 0

  return createBaseNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true)
}

function createBaseVNode(type, props, children, ...) {
  const vnode = {
    type, props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    children, shapeFlag, patchFlag, dynamicProps, ...
  } as VNode

  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children)
  } else if (children) {
    // compiled element vnode - if children is passed, only possible types are
    // string or Array.
    vnode.shapeFlag |= isString(children)
      ? ShapeFlags.TEXT_CHILDREN
      : ShapeFlags.ARRAY_CHILDREN
  }
  return vnode
}
