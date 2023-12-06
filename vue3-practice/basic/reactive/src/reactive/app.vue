<template>
  <div class="app">
    <div class="text">Count: {{ state.count }}</div>
    <button class="btn" @click="onClick">Add</button>
  </div>
  <form>
    <input v-model="data.name" placeholder="username" />
    <br />
    <textarea v-model="data.info" placehold="userinfo" />
    <div>NAME: {{ data.name }}</div>
    <div>INFO: {{ data.info }}</div>
  </form>
</template>

<script setup>
import { reactive, toRaw } from 'vue'
const state = reactive({
  count: 0,
});
console.log(state)
const onClick = () => {
  state.count++
  console.log(state)
}
const data_s = reactive({
  name: "Ray",
  info: "to Freedom"
})
const data = toRaw(data_s);
</script>

<style>
.app {
  width: 200px;
  padding: 10px;
  margin: 10px auto;
  box-shadow: 0px 0px 9px #00000066;
  text-align: center;
}
.app .text {
  font-size: 28px;
  font-weight: bolder;
  color: #666666;
}
.app .btn {
  font-size: 20px;
  padding: 0 10px;
  height: 32px;
  min-width: 80px;
  cursor: pointer;
}
</style>
