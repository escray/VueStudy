<template>
  <div :class="{ [className]: true }">
    <slot v-if="$slots.default"></slot>
  </div>
</template>
<script setup lang="ts">
import { prefixName } from '../theme'
const className = `${prefixName}-row`
</script>
