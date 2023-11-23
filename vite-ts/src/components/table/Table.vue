<template>
  <div class="el-table">
    <div class="hidden-columns" ref="hiddenColumns">
      <slot />
    </div>

    <div class="el-table__header_wrapper" ref="headerWrapper">
      <table-header ref="tableHeader" :store="store">
      </table-header>
    </div>

    <div class="el-table__body-wrapper" ref="bodyWrapper">
      <table-body :context="context" :store="store">
      </table-body>
    </div>
  </div>
</template>
<script>

import { getCurrentInstance, computed } from 'vue'
import { debounce } from 'lodash-es'

setup(props) {
  let table = getCurrentInstance()
  const store = createStore(table, {
    rowKey: props.rowKey,
    defaulExpandAll: props.defaultExpandAll,
    selectOnIndeterminate: props.selectOnInterminate,
    intent: props.indent,
    lazy: props.lazy,
    lazyColumnIndentifiier: props.treeProps.hasChildren || 'hasChildren',
    childrenColumnName: props.treeProps.children || 'children',
    data: props.data

  })
  table.store = store
  const layout = new TableLayout({
    store: table.store,
    table,
    fit: props.fit,
    showHeader: props.showHeader
  })

  table.layout = layout
}


// element3/packages/element3/packages/table/src/store/helper.js
function createStore(table, initialState = {}) {
  if (!table) {
    throw new Error('Table is required.')
  }

  const store = Store()
  store.toggleAllSelection = debounce(store._toggleAllSelection, 10)
  Object.keys(initialState).forEach(key) => {
    store.states[key].value = initialState[key]
  }
  return store
}

</script>
