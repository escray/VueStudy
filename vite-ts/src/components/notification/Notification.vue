<template>
  <div class="el-notification" :style="positionStyle" @click="onClickHandler">
    <div class="el-notification__title">
      {{ title }}
    </div>

    <div class="el-notification__message">
      {{ message }}
    </div>

    <button v-if="showClose" class="el-notification__close-button" @click="onCloseHandler"></button>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, computed } from 'vue'
import { notificationProps } from './props.js'

const instance = getCurrentInstance()

const props = notificationProps

const visible = ref(true)
const verticalOffsetVal = ref(props.verticalOffset)

const typeClass = computed(() => {
  return props.type ? `el-icon-${props.type}` : ''
})

const horizontalClass = computed(() => {
  return props.position.endsWith('right') ? 'right' : 'left'
})

const verticalProperty = computed(() => {
  return props.position.startsWith('top') ? 'top' : 'bottom'
})

const positionStyle = computed(() => {
  return {
    [verticalProperty.value]: `${verticalOffsetVal.value}px`
  }
})

</script>

<style lang="scss">
@import '../styles/mixin';

.el-notification {
  position: fixed;
  right: 10px;
  top: 50px;
  width: 330px;
  padding: 15px 26px 14px 13px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden
}
</style>
