<template>
  <div>
    <h3 @click="add">No. {{count}}</h3>
    <span>I want to do: </span>
    <input type="text" v-model="title" @keydown.enter="addTodo" />

    <button v-if="active < all" @click="clear">clear</button>

    <ul v-if="todos.length">
      <li v-for="todo in todos">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }"> {{ todo.title }}</span>
      </li>
    </ul>
    <div v-else>no data</div>

    <div>
      all select<input type="checkbox" v-model="allDone" />
      <span>{{ active }}/{{ all }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";

import { useMouse } from '../utils/mouse'

// let title = ref("");
// let todos = ref([
//   { title: 'study Vue', done: false },
//   { title: 'sleep', done: false }]);

// function addTodo() {

//   if (!title.value) {
//     alert("no value")
//   }

//   todos.value.push({
//     title: title.value,
//     done: false,
//   });

//   title.value = "";
// }

// function clear() {
//   todos.value = todos.value.filter((v) => !v.done);
// }

// let active = computed(() => {
//   return todos.value.filter((v) => !v.done).length
// });

// let all = computed(() => todos.value.length);

// let allDone = computed({
//   get: function () {
//     return active.value === 0;
//   },
//   set: function (value) {
//     todos.value.forEach((todo) => {
//       todo.done = value;
//     });
//   },
// });

let { x, y } = useMouse();

let count = ref(1);
let color = ref('red')

function add() {
  count.value++
  color.value = Math.random() > 0.5 ? "blue" : "red";
}



function useTodos() {
  let title = ref("");
  let todos = ref([{ title: "study Vue", done: false }]);

  function addTodo() {
    todos.value.push({
      title: title.value,
      done: false,
    });
    title.value = "";
  }

  function clear() {
    todos.value = todos.value.filter((v) => !v.done);
  }

  let active = computed(() => {
    return todos.value.filter((v) => !v.done).length;
  });

  let all = computed(() => todos.value.length);

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
  return { title, todos, addTodo, clear, active, all, allDone };
}

let { title, todos, addTodo, clear, active, all, allDone } = useTodos();

</script>

<style>
  h3 {
    color:chocolate;
  }
</style>

<style scoped>
  h3 {
    color:v-bind(color);
  }
</style>
