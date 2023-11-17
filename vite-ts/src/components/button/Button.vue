<template>
  <button
  class="el-button"
  :class="[size ? `el-button--${size}` : '',]">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
interface Props {
  size?:""|'small'|'medium'|'large'
}
const props = withDefaults(defineProps<Props>(), {size: ""})
</script>

<style lang="scss">
@include b(button){
  display: inline-block;
  cursor: pointer;
  background: $--button-default-background-color;
  color: $--button-default-font-color;
  @include button-size(
    $--button-padding-vertical,
    $--button-padding-horizontal,
    $--button-font-size,
    $--button-border-radius
  );
  @include m(small) {
    @include button-size(
      $--button-medium-padding-vertical,
      $--button-medium-padding-horizontal,
      $--button-medium-font-size,
      $--button-medium-border-radius
    );
  }
  @include m(large) {
    @include button-size(
      $--button-large-padding-vertical,
      $--button-large-padding-horizontal,
      $--button-large-font-size,
      $--button-large-border-radius
    );
  }
}
</style>
