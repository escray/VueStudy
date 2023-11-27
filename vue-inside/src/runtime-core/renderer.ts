

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
  const patch = () => { }

  //处理组件
  const processComponent = () => { }

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
  const setupComponent = () => { }

  // 挂载html元素
  const mountElement = () => { }

  const mountChildren = () => { }

  const patchElement = () => { }

  const patchProps = () => { }


  const mountComponent = () => { }


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
