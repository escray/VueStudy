<template>
  <aside :class="{ [className]: true }">
    <slot v-if="$slots.default"></slot>
  </aside>
</template>
<script setup lang="ts">
import { prefixName } from '../theme'
const className = `${prefixName}-sider`
</script>
