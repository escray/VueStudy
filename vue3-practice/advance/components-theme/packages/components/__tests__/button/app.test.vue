<template>
  <div class="display-text">current={{ num }}</div>
  <Button class="btn-add" @click="onClick">click to add 1</Button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../../src/index'

const num = ref<number>(123)
const onClick = () => {
  num.value++
}
</script>
