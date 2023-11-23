<template>
  <div class="demo-block">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="meta" ref="meta">
      <div class="description" v-if="$slots.default">
      <slot />
      </div>
    </div>
    <div class="highlight">
      <slot name="highlight" />
    </div>
  </div>
  <div
    class="demo-block-control"
    ref="control"
    @click="isExpanded = !isExpanded"
  >
  <span>{{ controlText }}</span>
  </div>
</template>

<script>
import { ref, computed, watchEffect, onMounted } from 'vue'
export default {
  setup() {
    const meta = ref(null)
    const isExpanded = ref(false)
    const controlText = computed(() => isExpanded.value ? 'hidden code' : 'display code')
    const codeAreaHeight = computed(() =>
      [...meta.value.children].reduce((t, i) => i.offsetHeight + t, 56)
    )
    onMounted(() => {
      watchEffect(() => {
        meta.value.style.height = isExpanded.value
          ? `${codeAreaHeight.value}px`
          : '0'
      })
    })

    return { meta, isExpanded, controlText }
  }
}

</script>
