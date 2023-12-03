// const path = require('path');
const { join } = require('path')
// const fs = import('fs');
const { readFileSync } = require('fs')
const { babel } = require('@rollup/plugin-babel');
const vue = require('rollup-plugin-vue');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const replace = require('@rollup/plugin-replace');
const html = require('@rollup/plugin-html');
// const serve = require('rollup-plugin-serve');

const serve = (...args) => import('rollup-plugin-serve').then(({ default: serve }) => serve(...args));

const babelOptions = {
  "presets": ['@babel/preset-env'],
  'babelHelpers': 'bundled'
}

module.exports = {
  input: join(__dirname, 'src/index.js'),
  output: {
    file: join(__dirname, 'dist/index.js'),
    type: "module"
  },
  plugins: [
    vue(),
    postcss({ extract: true, plugins: [] }),
    nodeResolve(),
    commonjs(),
    babel(babelOptions),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      preventAssignment: true
    }),
    html({
      fileName: 'index.html',
      template: () => {
        const htmlFilePath = join(__dirname, 'index.html')
        const html = readFileSync(htmlFilePath, { encoding: 'utf8' })
        return html
      }
    }),
    process.env.NODE_ENV === 'development' ? serve({
      port: 6001,
      contentBase: 'dist'
    }) : null
  ]
}
