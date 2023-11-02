<template>
  <h1>你的评分 {{ score }}</h1>
  <Rate :value="score" @update-rate="update"></Rate>

  <Rate :value="4" theme="red"></Rate>
  <Rate :value="1" theme="green"></Rate>
  <Rate :value="3.5"></Rate>
</template>
<script setup>
import { ref } from 'vue'
import Rate from '../components/rate.vue'

let score = ref(3.5)

function update(num) {
  score.value = num
}
</script>
