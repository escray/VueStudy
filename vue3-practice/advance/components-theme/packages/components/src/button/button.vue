<template>
  <button
    :class="{
      [baseClassName]: true,
      [btnClassName]: true,
      [disabledClassName]: props.disabled
    }"
  >
    <slot v-if="$slots.default"></slot>
  </button>
</template>

<script setup lang="ts">
import { prefixName } from '../theme/index'

type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger'
type ButtonVariant = 'contained' | 'outlined'

const btnType: ButtonType = 'default'
const btnVariant: ButtonVariant = 'contained'

const props = withDefaults(
  defineProps<{
    type?: ButtonType
    variant?: ButtonVariant
    disabled?: boolean
  }>(),
  {
    type: btnType,
    variant: btnVariant,
    disabled: false
  }
)

const baseClassName = `${prefixName}-button`
const btnClassName = `${baseClassName}-${props.type}-${props.variant}`
const disabledClassName = `${baseClassName}-disabled`
</script>
