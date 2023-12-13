<template>
  <Box class="my-biz-counter">
    <Box class="num-value">{{ num }}</Box>
    <Button @click="onClick">Click sub 1</Button>
  </Box>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@my/Components/esm/button'
import Box from '@my/components/esm/box'

const num = ref<number>(100)
const onClick = () => {
  num.value -= 1
}
</script>
