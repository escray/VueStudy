<template>
  <div
    v-show="node.isVisable"
    class="el-tree-node"
    :class="{
      'is-expanded': node.isExpanded,
      'is-current': elTree.proxy.dragState.current === node,
      'is-checked': node.isChecked,
      }"
    role="TreeNode"
    ref="TreeNode"
    :id="'TreeNode' + node.id"
    @click.stop="onClickNode"
  >
    <div class="el-tree-node__content">
      <span
        :class="[
          { expanded: node.isExpanded, 'is-leaf': node.isLeaf },
          'el-tree-node__expand-icon',
          elTree.props.iconClass
        ]"
        @click.stop="
          node.isLeaf || (elTree.props.accordion ? node.collapse() : node.expand())
        ">
      </span>

      <el-checkbox
        v-if="elTree.props.showCheckbox"
        :modelValue="node.isChecked"
        @update:modelValue="onChangeCheckbox"
        @click="elTree.emit('check', node, node.isChecked, $event)"
      >
      </el-checkbox>

      <el-node-content
        class="el-tree-node__label"
        :node="node"
      >
      </el-node-content>
    </div>
    <div
      class="el-tree-node__children"
      v-show="node.isExpanded"
      v-if="!elTree.props.renderAfterExpand || node.isRendered"
      role="group"
      :aria-expanded="node.isExpanded"
    >
      <el-tree-node
        v-for="child in node.childNodes"
        :key="child.id"
        :node="child"
      >
      </el-tree-node>
    </div>
  </div>
</template>
<script>

import { inject } from vue
import { TreeNode } from './TreeNode'

export default {
  name: 'ElTreeNode',

  props: {
    node: TreeNode
  },

  setup(props) {
    const elTree = inject('elTree')

    const onClickNode = (e) => {
      !elTree.props.expandOnClickNode ||
        props.node.isLeaf ||
        (elTree.props.accordion ? props.node.collapse() : props.node.expand())

      !elTree.props.checkOnClickNode || props.node.setChecked(undefined, elTree.props.checkStrickly)

      elTree.emit('current-change', props.node, e)
      elTree.emit('current-change', props.node, e)

      props.node.isExpanded
        ? elTree.emit('node-expand', props.node, e)
        : elTree.emit('node-collapse', props.node, e)
    }

    const onChangeCheckbox = (e) => {
      props.node.setchecked(undefined, elTree.props.checkStrictly)
      elTree.emit('check_change', props.node, e)
    }

    return {
      elTree,
      onClickNode,
      onChangeCheckbox
    }
  }
}
</script>
