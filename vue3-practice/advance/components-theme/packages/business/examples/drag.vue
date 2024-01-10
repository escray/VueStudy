<template>
  <div>
    <Drag
      :horizontal="horizontal"
      :componentMap="componentMap"
      :layoutList="layoutList"
      @change="onChange"
    >
    </Drag>
  </div>
</template>

<script setup lang="ts">
import { Drag } from '../src/index'
import Mod1 from './modules/mod-1.vue'
import Mod2 from './modules/mod-2.vue'
import Mod3 from './modules/mod-3.vue'

const horizontal = false

const componentMap = {
  Mod1: Mod1,
  Mod2: Mod2,
  Mod3: Mod3
}

const layoutList = [
  {
    name: 'Component001',
    componentName: 'Mod1'
  },
  {
    name: 'Component002',
    componentName: 'Mod2'
  },
  {
    name: 'Component003',
    componentName: 'Mod3'
  }
]

const onChange = (e: unknown) => {
  // eslint-disable-next-line no-console
  console.log('onChange ===', e)
}
</script>
