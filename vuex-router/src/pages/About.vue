<template>
  <h1>About</h1>
<Heading :level="3">Hello World!</Heading>

  <hr />
  <Timeline />
  <hr />
  <Timeline :reverse="true" />

</template>

<script setup>
import Heading from '../components/Head.jsx'
// import { Timeline } from '../components/Todo.jsx'
// import { Timeline } from '../components/timeline.jsx'
</script>
