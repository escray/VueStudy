import { defineConfig } from 'vitest/config'
import PluginVue from '@vitejs/plugin-vue'
import PluginJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
  // 配置插件，用来在测试过程中编译Vue.js的模板语法和JSX语法
  plugins: [PluginVue(), PluginJsx()],
  // 配置测试环境，支持全局变量和浏览器DOM API
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
