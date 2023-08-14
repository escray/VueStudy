<template>
  <h1>ABOUT</h1>
  <h4 @click="toggle">click to fullscreen</h4>
</template>
<script setup>
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, enter, exit, toggle } = useFullscreen()
</script>
