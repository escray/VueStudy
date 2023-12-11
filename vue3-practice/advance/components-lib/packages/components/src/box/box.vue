<template>
  <div :class="{ [baseClassName]: true }">
    <slot v-if="$slots.default"></slot>
  </div>
</template>

<script setup>
import { prefixName } from '../theme/index'
const baseClassName = `${prefixName}-box`
</script>
