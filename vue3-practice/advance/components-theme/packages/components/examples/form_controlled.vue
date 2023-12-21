<template>
  <h1>form with controlled components</h1>
  <form @submit="onSubmit">
    <div>
      <span>Username:</span>
      <input v-model="state.userName" type="text" />
    </div>
    <div>
      <span>Password:</span>
      <input v-model="state.password" type="password" />
    </div>
    <div>
      <span>Confirm:</span>
      <input v-model="state.confirmPassword" type="password" />
    </div>
    <div><button>Submit</button></div>
  </form>
</template>

<script setup lang="ts">
import { reactive, toRaw } from 'vue'
const state = reactive({
  userName: '',
  password: '',
  confirmPassword: ''
})

const onSubmit = (e: Event) => {
  e.preventDefault()
  const formData = toRaw(state)
  window.alert(`submit Data: ${JSON.stringify(formData)}`)
}
</script>
