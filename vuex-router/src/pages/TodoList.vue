<template>
  <div>
    <h1>TodoList</h1>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">CLEAR</button>
    <ul v-if="todos.length">
      <li v-for="todo in todos">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }">{{ todo.title }}</span>
      </li>
    </ul>
    <div v-else>current no data</div>
    <div>
      ALL<input type="checkbox" v-model="allDone" />
      <span> {{ active }} / {{ all }}</span>
    </div>
  </div>
  <div class="info-wrapper" v-if="showModal">
    <div class="info">
      Bro, You input nothing!
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

let count = ref(21)
function add() {
  count.value++
}


let title = ref("")
let todos = ref([
  { title: 'study Vue', done: false },
  { title: 'getup early', done: false },
  { title: 'work hard', done: false }
])

let showModal = ref(false)

function addTodo() {

  if (!title.value) {
    showModal.value = true
    setTimeout(() => {
      showModal.value = false
    }, 1500);
    return
  }

  todos.value.push({
    title: title.value,
    done: false
  })
  title.value = "";
}

function clear() {
  todos.value = todos.value.filter((v) => !v.done)
}

let active = computed(() => {
  return todos.value.filter((v) => !v.done).length
})

let all = computed(() => todos.value.length)

let allDone = computed({
  get: function () {
    return active.value === 0;
  },
  set: function (value) {
    todos.value.forEach((todo) => {
      todo.done = value;
    });
  },
});
</script>

<style>
h1 {
  color: red;
}

.info-wrapper {
  position: fixed;
  top: 20px;
  width: 400px;
}

.info {
  padding: 10px;
  color: white;
  background: #d88986
}
</style>
