<template>
  <form class="zh-form">
    <textarea class="zh-textarea" v-model="state.text" placeholder="information" />
    <div>Chinese character: {{ state.zhCount }}</div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'

function countZhText(txt) {
  const zhRegExp = /[\u4e00-\u9fa5]{1,}/g
  const zhList = txt.match(zhRegExp)
  let count = 0
  zhList.forEach((item) => {
    count += item.length
  })
  return count
}

const defaultText = '今天是2023年12月04日'
const state = reactive({
  text: defaultText,
  zhCount: countZhText(defaultText)
})

watch(
  // 监听 state.text 的变化
  [() => state.text, () => state.zhCount],
  ([text], [prevText]) => {
    // 当监听到state.text 变化，就会触发这个回调函数
    console.log('watching state.text');
    state.zhCount = countZhText(text);
  }
)
</script>

<style>
.zh-form {
  height: 100px;
  width: 200px;
  padding: 1.5em;
}

.zh-textarea {
  height: 100px;
  width: 400px;
  padding: 5px;
}
</style>
