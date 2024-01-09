import { defineConfig } from 'vitest/config'
import PluginVue from '@vitejs/plugin-vue'
import PluginJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
  // 配置插件，用来在测试过程中编译Vue.js的模板语法和JSX语法
  plugins: [PluginVue(), PluginJsx()],
  // 配置测试环境，支持全局变量和浏览器DOM API
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      // 覆盖率统计工具
      provider: 'v8',
      // 覆盖率的分母，packages/ 目录里
      // 所有src的源文件作为覆盖率统计的分母
      include: ['packages/*/src/**/*'],
      // 全量覆盖率计算
      all: true
    }
  }
})
