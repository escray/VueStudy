<template>
  <div class="v-info">
    <div>Order Info:</div>
    <div>Address: {{ store.text }}</div>
    <div>Total Price: <span class="v-info-value">{{ totalPrice }}</span></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { store } from '../store'
const totalPrice = ref(0)
watch(store, () => {
  let total = 0
  store.list.forEach((item) => {
    total += item.price * item.count
  })
  totalPrice.value = total
})
</script>

<style>
.v-info {
  width: 400px;
  margin: 20px auto;
  padding: 10px;
  box-shadow: 0px 0px 16px 0px #00000038;
  border: 1px solid #d6d5d5;
  font-size: 20px;
  color: #222222;
  background: #ffffff;
  font-size: 18px;
  text-align: left;
  line-height: 22px;
}
.v-info-value {
  font-size: 24px;
  font-weight: 800;
  color: #fe3030;
}
</style>
