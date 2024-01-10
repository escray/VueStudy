<template>
  <h1>Detail View</h1>
  <div>{{ $route.params.id }}</div>
  <RouterView />
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
