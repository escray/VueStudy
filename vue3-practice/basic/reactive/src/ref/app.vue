<template>
  <div class="app">
    <div class="text">Count: {{ count }}</div>
    <div>{{ state.count }}</div>
    <button class="btn" @click="onClick">Add</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const count = ref(0);
const state = ref({ count: 2 })
console.log(count);
console.log(state);
const onClick = () => {
  count.value++
  state.count++

  console.log(count);
  console.log(state);
}

const data = {
  _value: 1,
  get value() {
    console.log("listen read operation, return 1");
    return this._value
  },
  set value(val) {
    console.log("listen write operation, set new value: " + val);
    this._value = val
  }
}

data.value
data.value = 21
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
