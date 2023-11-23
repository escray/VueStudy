<template>
  <div class="el-tree">
    <el-tree-node v-for="child in tree.root.childNodes" :node="child" :key="child.id"></el-tree-node>
  </div>
</template>

<script>
import ElTreeNode from './TreeNode.vue'
import { reactive, provide, getCurrentInstance, onMounted, watchEffect } from 'vue'

const instance = getCurrentInstance()
const tree = new Tree(porps.data, props.defaultNodeKey, {
  asyncLoadFn: props.asyncLoadFn,
  isAsync: props.async
})

const state = reactive({tree})
provide('elTree', instance)
useTab()
useExpand(props, state)

function useExpand(props, state) {
  const instance = getCurrentInstance()
  const { emit } = instance

  if (props.defaultExpandAll) {
    state.tree.expandAll()
  }

  watchEffect(() => {
    emit('update:expanded', state.tree.expanded)
  })

  watchEffect(() => {
    state.tree.setExpandedByIdList(porps.expanded, true)
  })

  onMounted(() => {
    state.tree.root.expand(true)
  })
}
</script>
