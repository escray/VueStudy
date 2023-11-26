module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', //这个是jest的默认配置
    // .vue文件用 vue-jest 处理
    // '^.+\\.vue$': 'vue-jest',
    //typescript转换
    // '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/?(*.)+(spec).[jt]s?(x)'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageReporters: ["json", "html"]
}
