<template>
</template>
<script setup>
console.log("reactive")
import {reactive, computed, watchEffect} from 'vue'
let obj = reactive({
  count:1
})
let double = computed(() => obj.count * 2)
obj.count = 2

watchEffect(() => {
  console.log('data changed', obj.count,)
})
</script>
