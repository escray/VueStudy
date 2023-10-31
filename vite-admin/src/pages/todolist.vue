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

import useFavicon from '../utils/favicon'
let { favicon } = useFavicon()
function loading() {
  favicon.value = '/favicon.ico'
}
</script>
