<template>
  <footer :class="{ [className]: true }">
    <slot v-if="$slots.default"></slot>
  </footer>
</template>
<script setup lang="ts">
import { prefixName } from '../theme'
// const className = `${prefixName}-header`
const className = `${prefixName}-footer`
</script>
