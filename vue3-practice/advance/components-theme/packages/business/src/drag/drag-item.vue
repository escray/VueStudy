<template>
  <div
    ref="domItem"
    :className="baseClassName"
    draggable="true"
    data-drag-item="yes"
    @dragstart="onDragItem"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { DRAG_CONTEXT_KEY, getElementIndex } from './common'
import { prefixName } from '../theme/index'
import type { DragContext } from './common'

const baseClassName = `${prefixName}-drag-item`
const domItem = ref<HTMLDivElement>()
// 当子容器触发 dragstart 事件时，通过 inject 拿到共享的响应式数据，
// 来传递拖拽选中的组件序号位置
const dragContext: DragContext | undefined =
  inject<DragContext>(DRAG_CONTEXT_KEY)

// the stopPropagation() method of the Event interface prevents further propagation of the current event in the capturing and bubbling phases. It does not, however, prevent any default behaviors from occurring; for instance, clicks on links are still processed. If you want to stop those behaviors, see the preventDefault() method. It also does not prevent propagation to other event-handlers of the current element. If you want to stop those, see stopImmediatePropagation().
const onDragItem = (e: DragEvent) => {
  e.stopPropagation()
  const index = getElementIndex(domItem?.value || null)
  if (dragContext && dragContext?.activeIndex >= -1) {
    dragContext.activeIndex = index
  }
}
</script>
