<template>
  <Box class="my-biz-counter">
    <Box class="num-value">{{ num }}</Box>
    <Button @click="onClick">Click sub 1</Button>
  </Box>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Box from '@my/components/esm/box'
import Button from '@my/components/esm/button'
const num = ref<number>(100)
const onClick = () => {
  num.value -= 1
}
</script>
