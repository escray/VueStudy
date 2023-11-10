<template>




  <div>
    <h1>TodoList</h1>
    <span class="dustbin">🗑</span>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">CLEAR</button>
    <ul v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
      <li v-for="(todo,i) in todos" :key="todo.title">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }">{{ todo.title }}</span>
        <span class="remove-btn" @click="removeTodo($event, i)">❌</span>
      </li>
      </transition-group>
    </ul>
    <div v-else>current no data</div>
    <div>
      ALL<input type="checkbox" v-model="allDone" />
      <span> {{ active }} / {{ all }}</span>
    </div>
  </div>
  <Transition name="modal">
    <div class="info-wrapper" v-if="showModal">
      <div class="info">
        Bro, You input nothing!
      </div>
    </div>
  </Transition>

  <div class="animate-wrap">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="animate" v-show="animate.show">📋</div>
    </transition>
  </div>

</template>

<script setup>
import { ref, computed, reactive } from 'vue';

let animate = reactive({
  show: false,
  el: null
})

function beforeEnter(el) {
  let dom = animate.el
  let rect = dom.getBoundingClientRect()
  let x = window.innerWidth - rect.left - 60
  let y = rect.top - 10
  el.style.transform = `translate(-${x}px, ${y}px)`
}

function enter(el, done) {
  document.body.offsetHeight
  el.style.transform = `translate(0,0)`
  el.addEventListener('transitionend', done)
}

function afterEnter(el) {
  animate.el = false
  el.style.display = 'none'
}

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
  debugger
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

function removeTodo(e, i) {
  animate.el = e.target
  animate.show = true
  todos.value.splice(i, 1)
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

.modal-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}

.modal-enter-active {
  transition: all 0.3s ease;
}

.modal-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}

.modal-leave-active {
  transition: all 0.3 ease;
}

.flip-list-move {
  transition: transform 0.8s ease;
}

.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s ease;
}

.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translatex(30px)
}

.dustbin {
  font-size: 20px;
  position: fixed;
  right: 10px;
  top: 10px
}

.animate-wrap .animate {
  position: fixed;
  right: 10px;
  top: 11px;
  z-index: 100;
  transition: all 0.5s linear;
}
</style>
