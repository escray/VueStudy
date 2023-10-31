<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
</script> -->

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <div>
      <router-link to="/">Home Page</router-link> |
      <router-link to="/rate">Rate</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view></router-view>
  </div>
  <!-- <HelloWorld msg="Vite + Vue start a new world, why don't need to refresh browser" /> -->
    <div class="box" :style="{ width: width + 'px' }"></div>
    <button @click="change">click</button>
          <div class="box1"></div>
</template>

<script setup>
import { ref } from 'vue'

let width = ref(100)
function change() {
  width.value += 100
}
</script>

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

.box{
  background: #d88986;
  height:30px;
  /* transition time is 1s */
  transition: width 1s linear;
}

.box1{
  width: 30px;
  height: 30px;
  position: relative;
  background: #d88986;
  animation: move 2s linear infinite;
}

@keyframes move {
  0% {left: 0px}
  50% {left: 200px}
  100% {left: 0}
}
</style>
