<template>
  <!-- 在 template 内部使用 component 组件动态渲染 -->
  <component :is="comp"></component>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from '../grouter/index'

// 使用 useRouter 获取当前路由的实例
let router = useRouter()

const comp = computed(() => {
  // 通过当前的路由，也就是 router.current.value 的值，在用户路由配置 route 中计算出匹配的组件
  const route = router.routes.find(
    (route) => route.path === router.current.value
  )
  // 通过计算属性返回 comp 变量
  return route ? route.component : null
})
</script>
