<!-- <script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  // 已启用类型推断
  const count = ref(1)
  count.value.split('')
})
</script> -->

<script setup lang="ts">
import { computed, reactive, ref, Ref } from '@vue/runtime-core'
interface GeektimeCourse {
  name: string,
  price: number
}
const msg= ref('') //  根据输入参数推导字符串类型
const msg1 = ref<string>('') //  可以通过范型显示约束
const obj = reactive({})
const course = reactive<GeektimeCourse>({ name: 'playwith Vue3', price: 129 })
const msg2 = computed(() => '') // 默认参数推导
const course2 = computed<GeektimeCourse>(() => {
  return {name: 'playwith Vue3', price: 129 }
})

const props = defineProps < {
  title: string
  value?: number
}>()

const emit = defineEmits < {
  (e: 'update', value: number): void
}>()

interface Todo {
  title: string,
  done: boolean
}

let todos: Ref<Todo[]> = ref([{ title: 'study Vue', done: false}])

import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [ ]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

// export default router

// export declare type RouteRecordRaw = RouteRecordSingleView | RouteRecordMultipleViews | RouteRecordRedirect;
// declare interface RouteRecordSingleView extends _RouteRecordBase {
//   /**
//    * Component to display when the URL matches this route.
//    */
//   component: RowRouteComponent;
//   components?: never;
//   /**
//    * Allow passing down params as props to the component rendered by `router-view`.
//    */
//   props?: _RouteRecordProps;
// }
</script>
