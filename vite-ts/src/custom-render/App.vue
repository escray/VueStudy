<template>
  <div @click="setName('Vue3')" :pos="[10,10,300,300]"
  fill="#eee" >
    <h1 :pos="[20,20,200,100]" fill="red" color="#000">Counter {{ counter }}</h1>
    <span :pos="pos" fill="black">Hello, {{ name }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('vue3 inside')
const pos = ref([20, 120, 200, 100])
const count = ref(1)
const setName = (n) => {
  name.value = n
  pos.value[1] += 20
  count.value += 2
}
</script>
