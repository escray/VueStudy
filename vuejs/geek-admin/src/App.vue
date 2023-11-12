<script setup>
import HelloWorld from './components/HelloWorld.vue'
import eCharts from './components/eCharts.vue'
import { ref } from 'vue'

// function fib(n) {
//   if (n <= 1) {
//     return 1
//   }
//   return fib(n-1) + fib(n-2)
// }

function fib(n) {
  let arr = [1, 1]
  let i = 2
  while (i <= n) {
    arr[i] = arr[i - 1] + arr[i - 2]
    i++
  }
  return arr[n]
}

let timing = window.performance && window.performance.timing
let navigation = window.performance && window.performance.navigation
// DNS 解析：
let dns = timing.domainlookupEnd - timing.domainLookupStart
// 总体网络交互耗时：
let network = timing.responseEnd - timing.navigationStart
// 渲染处理：
let processing = (timing.domComplete || timing.domLoading) - timing.domLoading
// 可交互：
let active = timing.domInteractive - timing.navigationStart

let count = ref(fib(38))

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <hr />
  <eCharts style="height: 500px" ref="charRef"></eCharts>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
