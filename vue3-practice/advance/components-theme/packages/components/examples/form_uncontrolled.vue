<template>
  <h1>form with uncontrolled components</h1>
  <form @submit="onSubmit">
    <div>
      <span>User Name:</span>
      <input ref="inputUserName" name="username" type="text" />
    </div>
    <div>
      <span>Password</span>
      <input ref="inputPassword" name="password" type="text" />
    </div>
    <div>
      <span>Reconfirm Password</span>
      <input ref="inputConfirmPassord" name="confirmPassword" type="password" />
    </div>
    <div><button>Submit</button></div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputUserName = ref<HTMLInputElement>()
const inputPassword = ref<HTMLInputElement>()
const inputConfirmPassord = ref<HTMLInputElement>()

const onSubmit = (e: Event) => {
  e.preventDefault()
  const formData = {
    userName: inputUserName?.value?.value,
    password: inputPassword?.value?.value,
    confirmPassword: inputConfirmPassord?.value?.value
  }
  window.alert(`Submit Data: ${JSON.stringify(formData)}`)
}
</script>
