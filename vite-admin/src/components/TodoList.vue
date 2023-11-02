<template>
  <div>
    <span class="dustbin">🗑</span>
    <span>You want to do: </span>
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
    <transition name="modal">
      <div class="info-wrapper" v-if="showModal">
        <div class="info">
        Bro, You don't input anything!
      </div>

  </div>
</transition>
</template>

<script setup>
import { ref, watchEffect, computed, reactive } from "vue";
import { useMouse } from '../utils/mouse'

let { x, y } = useMouse();

let count = ref(1);
let color = ref('red')

function add() {
  count.value++
  color.value = Math.random() > 0.5 ? "blue" : "red";
}

function useTodos() {
  let title = ref("");
  // let todos = ref([{ title: "study Vue", done: false }]);
  // let todos = ref(JSON.parse(localStorage.getItem('todos') || '[{ title: "study Vue", done: false }]'))
  let todos = useStorage('todos', [])

  watchEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  })

  function useStorage(name, value=[]) {
    let data = ref(JSON.parse(localStorage.getItem(name) || value))
    watchEffect(() => {
      localStorage.setItem(name, JSON.stringify(data.value))
    })
    return data
  }

  let showModal = ref(false)

  function addTodo() {
    if (!title.value) {
      showModal.value = true
      setTimeout(() => {
        showModal.value = false
      }, 1500)
      return
    }
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
            color
      :chocolate;
          }

        .info-wrapper {
          position: fixed;
          top: 20px;
          width: 200px;
        }
.info {
        padding: 20px;
  color: white;
  background: #d88986;
}
</style>

<style scoped>
  h3 {
    color:v-bind(color);
  }
</style>
