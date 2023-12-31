module.exports = {
  transform: {
    //  用 `vue-jest` 处理 `*.vue` 文
    '^.+\\.vue$': '@vue/vue3-jest', //vue-jest 处理.vue
    '^.+\\.jsx?$': 'babel-jest', // babel jest处理js or jsx
    '^.+\\.tsx?$': 'ts-jest', // ts-jest 处理.ts.tsx
  },
  testMatch: ['**/?(*.)+(spec).[jt]s?(x)'],
  collectCoverage: true,
  coverageReporters: ["json", "html"],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"]
  }
}
