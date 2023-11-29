import {
  Text,
  Fragment,
  Comment,
  VNode,
  createVnode,
  isSameVNodeType,
  Static,
} from './vnode'

import {
  filterSingleRoot,
  renderComponentRoot,
  shouldUpdateComponent,
  updateHOCHostEl
} from './componentRenderUtils'

import {
  EMPTY_OBJ,
  EMPTY_ARR,
  isReservedProp,
  ShapeFlags,
  PatchFlags,
  NOOP,
  invokeArrayFns,
  isArray,
  getGlobalThis
} from '@vue/shared'

// Renderer Node can technically be any object in the context of core renderer
// logic - they are never directly operated on and always passed to the node op
// functions provided via options, so the internal constraint is really just
// a generic object.
export interface RendererNode {
  [key: string]: any
}

export interface RendererElement extends RendererNode { }

export interface RendererOptions<
  HostNode = RendererNode,
  HostElement = RendererElement
  > { }

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
          processElement(n1, n2, container, anchor, parentComponent,
            parentSuspense, isSVG, slotScopeIds, optimized)
        } else if (shapeFlag && ShapeFlags.COMPONENT) {
          // 组件
          processComponent(n1, n2, container, anchor, parentComponent,
            parentSuspense, isSVG, slotScopeIds, optimized)
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
  const updateComponent = (
    n1: VNode,
    n2: VNode,
    optimized: boolean
  ) => {
    const instance = (n2.component = n1.component)!
    if (shoudUpdateComponent(n1, n2, optimized)) {
      // normal update
      instance.next = n2
      // in case the child component is also queued, remove it to avoid
      // double updating the same child component in the same flush.
      invalidateJob(instance.update)
      // instance.update is the reactive effect.
      instannce.update()
    } else {
      // no update needed. just copy over properties
      n2.component = n1.component
      n2.el = n1.el
      instance.vnode = n2
    }
  }

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
    isInSSRComponentSetup = false
    return setupResult
  }

  function setupStatefulCompnent(
    instance: ComponentInternalInstance,
    isSSR: boolean
  ) {
    const Component = instance.type as ComponentOptions
    // execute setup
    const { setup } = Component
    if (setup) {
      const setupContext = (instance.setupContext =
        setup.length > 1 ? createSetupContext(instance) : null)
      setCurrentInstance(instance)
      pauseTracking()
      const setupResult = callWithErrorHandling(
        setup,
        instance,
        ErrorCodes.SETUP_FUNCTION,
        [instance.props, setupContext]
      )
      if (isPromise(setupResult)) {
        setupResult.then(unsetCurrentInstance, unsetCurrentInstance)
      } else {
        handleSetupResult(instance, setupResult, isSSR)
      }
    } else {
      finishComponentSetup(instance, isSSR)
    }
  }

  // 挂载html元素
  const mountElement = () => { }

  const mountChildren = () => { }

  const patchElement = (
    n1: VNode,
    n2: VNode,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    isSVG: boolean,
    slotScopeIds: string[] | null,
    optimized: boolean
  ) => {
    const el = (n2.el = n1.el!)
    let { patchFlag, dynamicChildren, dirs } = n2
    patchFlag |= n1.patchFlag & PatchFlags.FULL_PROPS

    const oldProps = n1.props || EMPTY_OBJ
    const newProps = n2.props || EMPTY_OBJ


    patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false)

    if (patchFlag > 0) {
      // the presence of a patchFlag means this element's render code was
      // generated by the compiler and can take the fast path.
      // in this path old node and new node are guaranteed to have the same shape
      // (i.e. at the exact same position in the source template)
      if (patchFlag & PatchFlags.FULL_PROPS) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG)
      } else {
        // class是动态的
        // class
        // this flag is matched when the element has dynamic class bindings.
        if (patchFlag & PatchFlags.CLASS) {
          if (oldProps.class != newProps.class) {
              hostPatchProp(el, 'class', null, newProps.class, isSVG)
          }
        }
        // style样式是动态的
        // style
        // this flag is matched when the element has dynamic style bindings
        if (patchFlag & PatchFlags.STYLE) {
          hostPatchProp(el, 'style', oldProps.style, newProps.style, isSVG)
        }

        // 属性需要diff
        // props
        // This flag is matched when the element has dynamic prop/attr bindings
        // other than class and style. The keys of dynamic prop/attrs are saved for
        // faster iteration.
        // Note dynamic keys like :[foo]="bar" will cause this optimization to
        // bail out and go through a full diff because we need to unset the old key
        if (patchFlag & PatchFlags.PROPS) {
          const propsToUpdate = n2.dynamicProps!
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key]
            const next = newProps[key]
            // #1471 force patch value
            if (next !== prev || key === 'value') {
              hostPatchProp(el, key, prev, next, isSVG, n1.children as VNode[], prarentComponent, parentSuspense, unMountChildren)
            }
          }
        }
      }

      //文本是动态的
      // text
      // This flag is matched when the element has only dynamic text children.
      if (patchFlag && PatchFlags.TEXT) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children as string)
        }
      }
    } else if (!optimized && dynamicChildren === null) {
      // unoptimized, full diff
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG)
    }

  }


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

// vue/core/packages/runtime-core/src/renderer.ts
  const setupRenderEffect: SetupRenderEffectFn = (
    instance,
    initialVNode,
    container,
    anchor,
    parentSuspense,
    isSVG,
    optimized
  ) => {
    const componentUpdateFn = () => {
      // //首次渲染
      if (!instance.isMounted) {
        patch(null, subTree, container, anchor, instance, parentSuspense, isSVG)
      } else {
        // updateComponent
        // This is triggered by mutation of component's own state (next: null)
        // OR parent calling processComponent (next: VNode)
        let { next, bu, u, parent, vnode } = instance
        if (next) {
          next.el = vnode.el
          updateComponentPreRender(instance, next, optimized)
        } else {
          next = vnode
        }

        const nextTree = renderComponentRoot(instance)
        patch(prevTree, nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(preTree.el!)!,
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance, parentSuspense, isSVG)

        next.el = nextTree.el
      }
    }

    // create reactive effect for rendering
    // 注册effect函数
    const effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(instance.update),
      instance.scope // track it in component's effect scope
    )

    const update = (instance.update = effect.run.bind(effect) as SchedulerJob)
    update.id = instance.uid
    update()
  }

  const updateComponentPreRender = (
    instance: ComponentInternalInstance,
    nextVNode: VNode,
    optimized: boolean
  ) => {
    nextVNode.component = instance
    const prevProps = instance.vnode.props
    instance.vnode = nextVNode
    instance.next = null
    updateProps(instance, nextVNode.props, prevProps, optimized)
    updateSlots(instance, nextVNode.children, optimized)

    pauseTracking()
    // props update may have triggered pre-flush watchers.
    // flush them before the render update.
    flushPreFlushCbs(undefined, instance.update)
    resetTracking()
  }

  type PatchChildrenFn = (
    n1: VNode | null,
    n2: VNode,
    container: RendererElement,
    anchor: RendererNode | null,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    isSVG: boolean,
    slotScopeIds: string[] | null,
    optimized: boolean
  ) => void

  // patch组元素 复杂的逻辑
  const patchChildren: PatchChildrenFn = (
    n1,
    n2,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds,
    optimized = false
  ) => {
    const c1 = n1 && n1.children
    const prevShapeFlag = n1 ? n1.shapeFlag : 0
    const c2 = n2.children

    const { patchFlag, shapeFlag } = n2
    // fast path
    if (patchFlag > 0) {
      if (patchFlag & PatchFlags.KEYED_FRAGMENT) {
        // this could be either fully-keyed or mixed (some keyed some not)
        // presence of patchFlag means children are guaranteed to be arrays
        patchKeyedChildren(
          c1 as VNode[],
          c2 as VNodeArrayChildren,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
        return
      } else if (patchFlag & PatchFlags.UNKEYED_FRAGMENT) {
        // unkeyed
        patchUnkeyedChildren(
          c1 as VNode[],
          c2 as VNodeArrayChildren,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
        return
      }
    }

    // children has 3 possibilities: text, array or no children.
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // text children fast path
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        unmountChildren(c1 as VNode[], parentComponent, parentSuspense)
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2 as string)
      }
    } else {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        if (shapeFlag && ShapeFlags.ARRAY_CHILDREN) {


          // prev children was array
          patchKeyedChildren(
            c1 as VNode[],
            c2 as VNodeArrayChildren,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          )
        } else {
          // no new children, just unmount old
          unmountChildren(c1 as VNode[], parentComponent, parentSuspense, true)
        }
      } else {
        // prev children was text OR null
        // new children is array OR null
        if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
          hostSetElementText(container, '')
        }
        // mount new if array
        if (ShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          mountChildren(
            c2 as VNodeArrayChildren,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          )
        }
      }
    }
  }

  const patchKeyedChildren = (
    c1: VNode[],
    c2: VNodeArrayChildren,
    container: RendererElement,
    parentAnchor: RendererNode | null,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    isSVG: boolean,
    slotScopeIds: string[] | null,
    optimized: boolean
  ) => {
    let i = 0
    const l2 = c2.length
    let e1 = c1.length - 1 // prev ending index
    let e2 = l2 - 1 // next ending index

    // 1. sync from start
    // (a b) c
    // (a b) d e
    while (i <= e1 && i <= e2) {

    }

    // 2. sync from end
    // a (b c)
    // d e (b c)
    while (i <= e1 && i <= e2) {

    }

    // 3. common sequence + mount
    // (a b)
    // (a b) c
    // i = 2, e1 = 1, e2 = 2
    // (a b)
    // c (a b)
    // i = 0, e1 = -1, e2 = 0
    if (i > e1) {

    }

    // 4. common sequence + unmount
    // (a b) c
    // (a b)
    // i = 2, e1 = 2, e2 = 1
    // a (b c)
    // (b c)
    // i = 0, e1 = 0, e2 = -1
    else if ( i > e2 ) {

    }

    // 5. unknown sequence
    // [i ... e1 + 1]: a b [c d e] f g
    // [i ... e2 + 1]: a b [e d c h] f g
    // i = 2, e1 = 4, e2 = 5
    else {
      const s1 = i // prev starting index
      const s2 = i // next starting index

      // 5.1 build key:index map for newChildren
      const keyToNewIndexMap: Map<String | number | symbol, number> = new Map()

      // 5.2 loop through old children left to be patched and try to patch
      // matching nodes & remove nodes that are no longer present
      let j
      let patched = 0
      const toBePatched = e2 - s2 + 1
      let moved = false
      // used to track whether any node has moved
      let maxNewIndexSoFar = 0
      // works as Map<newIndex, oldIndex>
      // Note that oldIndex is offset by +1
      // and oldIndex = 0 is a special value indicating the new node has
      // no corresponding old node.
      // used for determining longest stable subsequence
      const newIndexToOldIndexMap = new Array(toBePatched)

      // 5.3 move and mount
      // generate longest stable subsequence only when nodes have moved
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR
      j = increasingNewIndexSequence.length - 1
      // looping backwards so that we can use last patched node as anchor
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2+i
        const nextChild = c2[nextIndex] as VNode
        const anchor = nextIndex + 1 < l2 ? (c2[nextIndex + 1] as VNode).el : parentAnchor
        if (newIndexToOldIndexMap[i] == 0) {
          // mount new
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized)
        } else if (moved) {
          // move if:
          // There is no stable subsequence (e.g. a reverse)
          // OR current node is not among the stable sequence
          if (j < 0 || i != increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, MoveType.REORDER)
          } else {
            j--
          }
        }
      }


    }

  }

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

// https://github.com/vuejs/core/blob/main/packages/runtime-core/src/errorHandling.ts
export function callwithErrorHandling(
  fn: Function,
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  args?: unknown[]
) {
  let res
  try {
    res = args ? fn(...args) : fn()
  } catch (err) {
    handleError(err, instance, type)
  }

  return res
}

// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function getSequence(arr: number[]): number[] {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (let i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push[i]
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (c + v) >> 2
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }

      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u-1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}
