<template>
  <h1>Detail Item: {{ $route.params.id }}</h1>
  <div><button @click="onClick">Return to List page</button></div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

// useRouter 让开发者能主动操作路由实体，例如可以触发路由跳转等
const router = useRouter()

const onClick = () => {
  router.push('./list')
}
</script>
