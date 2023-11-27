import {
  Text,
  Fragment,
  Comment,
  VNode,
  createVnode,
  isSameVNodeType,
  Static,
} from './vnode'

export function createRenderer<
  HostNode = RendererNode,
  HostElement = RendererElement
  >(options: RendererOptions<HostNode, HostElement>) {

  return baseCreateRenderer<HostNode, HostElement>(options)
}

function baseCreateRenderer(options) {
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopedId,
    cloneNode: hostCloneNode,
    insertStaticContent: hostInsertStaticContent
  } = options

  // 核心调度逻辑
  // n1和n2是新老虚拟dom元素
  // https://github.com/vuejs/core/blob/main/packages/runtime-core/src/renderer.ts
  const patch: PatchFn = (
    n1,
    n2,
    container,
    anchor = null,
    parentComponent = null,
    parentSuspense = null,
    isSVG = false,
    slotScopeIds = null,
    optimized = __DEV__ && isHmrUpdating ? false : !!n2.dynamicChildren
  ) => {
    // 两次虚拟dom完全一样 啥也不用干
    if (n1 === n2) {
      return
    }

    // 虚拟dom节点类型不一样， unmount老的虚拟dom，并且n1赋值null
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1)
      unmount(n1, parentComponent, parentSuspense, true)
      n1 = null
    }

    // n2是要渲染的虚拟dom，我们获取type，ref和shapeFlag
    const { type, ref, shapeFlag } = n2
    switch (type) {
      // 文本
      case Text:
        processText(n1, n2, container, anchor)
        break
      // 注释
      case Comment:
        processCommentNode(n1, n2, container, anchor)
        break
      // 静态节点
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG)
        } else if (__DEV___) {
          patchStaticNode(n1, n2, container, isSVG)
        }
        break
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent,
          parentSuspense, isSVG, slotScopeIds, optimized)
        break
      default:
        // 运运算判断操作类型
        // html标签
        if (shapeFlag && ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, anchor, parentComponnent,
            parentSuspense, isSVG, slotScopeIds, optimized)
        } else if (shapeFlag && ShapeFlags.COMPONENT) {
          // 组件
          processComponent(n1, n2, container, anchor, parentComponent,
            parentSuspens, isSVG, slotScopeIds, optimized)
        } else if (shapeFlag && ShapeFlags.TELEPORT) {
          ;(type as typeof TeleportImpl).process(
            n1 as TeleportVNode, n2 as TeleportVNode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals
          )
        } else if (__FEATURE_SUSPENS__ && shapeFlag & ShapeFlags.SUSPENSE) {
          ; (type as typeof SuspenseImpl).process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals)
        } else if (__DEV__) {
          warn('Invalid VNode type:', type, `(${typeof type})`)
        }
        break;
    }
    // set ref
    if (ref != null && parentComponent) {
      setupRenderEffect(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2)
    }
   }

  //处理组件
  const processComponent = (
    n1: VNode | null,
    n2: VNode,
    container: RendererElement,
    anchor: RendererNode | null,
    parentComponent: ComponentInternalInstance | null,
    pranetSuspense: SuspenseBoundary | null,
    isSVG: boolean,
    slotScopeIds: string[] | null,
    optimized: boolean
  ) => {
    n2.slotScopeIds = slotScopeIds
    // 老规矩，么有n1就是mount
    if (n1 == null) {
      if (n2.shapeFlag && ShapeFlags.COMPONENT_KEPT_ALIVE) {
        ; (parentComponent!.ctx as KeepAliveContext).activate(
          n2, container, anchor, isSVG, optimized
        )
      } else {
        // 初始化 component
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized)
      }
    } else {
      updateComponent(n1, n2, optimized)
    }
  }

  // 处理文本元素
  const processText = () => { }

  const processCommentNode = () => { }

  // 处理html元素
  const processElement = () => { }

  // 更新组件
  const updateComponent = () => { }

  // 更新
  const updateElement = () => { }

  // 更新html元素
  const unmountComponent = () => { }

  //组件预渲染
  const setupComponent = (
    instance: ComponentInternalInstance,
    isSSR = false
  ) => {
    isInSSRComponentSetup = isSSR

    const { props, children } = instance.vnode
    const isStateful = isStatefulComponent(instance)
    initProps(instance, props, isStateful, isSSR)
    initSlot(instance, children)

    const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : undefined
   }

  // 挂载html元素
  const mountElement = () => { }

  const mountChildren = () => { }

  const patchElement = () => { }

  const patchProps = () => { }


  const mountComponent: MountComponentFn = (
    initialVnode,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    isSVg,
    optimized
  ) => {
    // 2.x compat may pre-create the component instance before actually
    // mounting
    const compatMountInstance = __COMPAT__ && initialVnode.isCompatRoot && initialVnode.component
    const instance: ComponentInternalInstance =
      compatMountInstance ||
      (initialVnode.component = createComponentInstance(
        initialVnode, parentComponent, parentSuspense
      ))

    // resolve props and slots for setup context
    if (!(__COMPAT__ && compatMountInstnce)) {
      setupComponent(instance)
    }

    setupRenderEffect(
      instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized
    )

    if (__DEV__) {
      popWarningContext()
      endMeasure(instance, `mount`)
    }
  }


  const setupRenderEffect = () => { }

  // patch组元素 复杂的逻辑
  const patchChildren = () => { }

  const patchKeyedChildren = () => { }

  const unmount = () => { }


  const render: RootRenderfunction = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true)
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG)
    }
    flushPostFlushCbs()
    container._vnode = vnode
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  }

}
