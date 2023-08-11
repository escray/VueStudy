<template>
  <h1>HOME</h1>
  <TodoList />
  <br />
  <defineProperty />
  <br />
  <Proxy />
  <br />
  <Reactive />
  <br />
  <GetSet />
  <button @click="loading">change icon</button>
</template>

<script setup>
import TodoList from '../components/Todolist.vue';
import defineProperty from '../components/definePropertyDemo.vue';
import Proxy from '../components/proxyDemo.vue'
import Reactive from '../components/reactiveDemo.vue'
import GetSet from '../components/getsetDemo.vue'

import useFavicon from '../utils/favicon'
let { favicon } = useFavicon()
function loading() {
  favicon.value = '/favicon.ico'
}
</script>
