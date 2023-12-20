<template>
  <div>
    <button @click="onClick">Open Message</button>
    <button @click="onClickFixed">Open Fixed Message</button>
    <button @click="onClickCloseFixed">Close Fixed Message</button>
  </div>
  <div>
    <button @click="onClickInfo">info message</button>
    <button @click="onClickSuccess">success message</button>
    <button @click="onClickWarn">warn message</button>
    <button @click="onClickError">error message</button>
  </div>
</template>
<script setup lang="ts">
import { Message } from '../src'

const onClick = () => {

  Message.open({
    text: 'Hello, this is default message info.'
    // duration: 1000
  })
}

let msg: { close: () => void } | null = null
const onClickFixed = () => {
  msg = Message.open({
    text: 'hello, this is fixed message, which cannot close automated',
    duration: 0
  })
}

const onClickCloseFixed = () => {
  msg?.close()
}

const onClickInfo = () => {
  Message.open({
    text: 'hello, this is info message',
    type: 'info',
    duration: 1000
  })
}

const onClickSuccess = () => {
  Message.open({
    text: 'hello, this is success message',
    type: 'success',
    duration: 2000
  })
}

const onClickWarn = () => {
  Message.open({
    text: 'hello, this is warn message',
    type: 'warn',
    duration: 1000
  })
}

const onClickError = () => {
  Message.open({
    text: 'hello, this is error message',
    type: 'error',
    duration: 1000
  })
}

</script>
