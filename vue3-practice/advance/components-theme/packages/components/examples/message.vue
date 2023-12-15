<template>
  <div>
    <button @click="onClick">Open Message</button>
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
</script>
