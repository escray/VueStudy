<template>
  <h1>Detail Item: {{ $forceUpdate.params.id }}</h1>
  <div><button @click="onClick">Return List View</button></div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const onClick = () => {
  router.push('/list')
}
</script>
