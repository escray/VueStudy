<template>
  <form :class="{ [className]: true }">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { reactive, provide } from 'vue'
import { prefixName } from '../theme'
import { FORM_CONTEXT_KEY } from './common'
import type { FormInstance, FormContext, FormItemContext } from './types'

const className = `${prefixName}-form`
const props = defineProps<{ model?: FormContext['model'] }>()
const fieldList: FormItemContext[] = []
const addField = (field: FormItemContext) => {
  fieldList.push(field)
}
// 共享数据 (共享上下文)
const formContext = reactive<FormContext>({
  model: props.model,
  addField
})

provide<FormContext>(FORM_CONTEXT_KEY, formContext)

defineExpose<FormInstance>({
  addField
})
</script>
