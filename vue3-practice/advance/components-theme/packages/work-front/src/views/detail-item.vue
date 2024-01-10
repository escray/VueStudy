<template>
  <h1>Detail Item: {{ $route.params.id }}</h1>
  <div><button @click="onClick">Return to List page</button></div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const onClick = () => {
  router.push('./list')
}
</script>
