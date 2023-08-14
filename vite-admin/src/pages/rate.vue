<template>
  <Rate :value="score"></Rate>
  <Rate :value="4" theme="red"></Rate>
  <Rate :value="1" theme="green"></Rate>
</template>
<script setup>
import { ref } from 'vue'
import Rate from '../components/rate.vue'
let score = ref(3)
</script>
