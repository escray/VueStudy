<template>
  <div>
    <h3 @click="add">No. {{count}}</h3>
  </div>
</template>

<script setup>
import { ref } from "vue";

let count = ref(1)
function add() {
  count.value++
}
</script>

<style>
  h3 {
    color:chocolate;
  }
</style>
