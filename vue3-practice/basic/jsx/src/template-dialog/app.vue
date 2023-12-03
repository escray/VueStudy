<template>
  <div class="app">
    <button class="btn" @click="onClickOpenDialog">Open Dialog</button>
  </div>
  <Dialog
    :show="showDialog"
    :text="showText"
    @onOk="onDialogOk"
  />
</template>
<script setup>
import { ref } from 'vue'
import Dialog from './dialog.vue'

const showDialog = ref(false)
const showCount = ref(0)
const showText = ref('this is a dialog')
const onClickOpenDialog = () => {
  showDialog.value = true;
  showCount.value += 1;
  showText.value = `this is the ${showCount.value} time open dialog`
}
const onDialogOk = () => {
  showDialog.value = false
}

</script>
<style>
.app {
  width: 200px;
  padding: 10px;
  margin: 10px auto;
  box-shadow: 0px 0px 9px #00000066;
  text-align: center;
}
.app .btn {
  font-size: 20px;
  padding: 0 10px;
  height: 32px;
  min-width: 80px;
  cursor: pointer;
}
</style>
