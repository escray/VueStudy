<template>
  <header :class="{ [className]: true }">
    <slot v-if="$slots.default"></slot>
  </header>
</template>
<script setup lang="ts">
import { prefixName } from '../theme'
const className = `${prefixName}-header`
</script>
