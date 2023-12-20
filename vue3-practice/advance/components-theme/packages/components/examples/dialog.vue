<template>
  <button @click="onClick">Open Dialog</button>
</template>

<script setup lang="ts">
import { Dialog } from '../src'

const onClick = () => {
  const dialog = Dialog.createDialog({
    text: 'hello',
    onOk: () => {
      dialog.close()
    }
  })
}
</script>
