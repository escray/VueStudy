<template>
  <div>
  <el-button type="primary">Primary Button</el-button>
  <el-button type="success">Success Button</el-button>
  <el-button>Normal Button</el-button>
  <el-button size="small">Small Button</el-button>
  </div>
  <hr />

  <div>
  <el-form ref="myForm" :model="model" :rules="rules">
    <el-form-item label="username:" prop="username">
      <el-input v-model="model.username" />
    </el-form-item>
    <el-form-item label="password:" prop="password">
      <el-input v-model="model.password" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">Login</el-button>
    </el-form-item>
  </el-form>
  </div>
  <hr />
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>
  <hr />

  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        Aside
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
  <hr />
  <el-container>
    <el-aside width="200px">
      Aside
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>

</template>

<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import ElButton from './components/button/Button.vue'
import ElForm from './components/form/Form.vue'

import { ref, reactive } from 'vue'
const comp = ref('form')
import { FormType } from './components/form/type'

const compExamples = ref(['container', 'button', 'form', 'dialog', 'notification'])
const showDialog = ref<boolean>(false)

const model = reactive({
  username: "",
  password: "",
})

const rules = reactive({
  username: [
    {
      required: true,
      message: "please input user name!",
    },
  ],
  password: [
    {
      required: true,
      message: "please input password!",
    },
  ],
})

const myForm = ref<FormType>()
const login = () => {
  myForm.value?.validate((isValid) => {
    if (isValid) {
      console.log(model)
    } else {
      alert("please input correctly format!")
    }
  })
}
</script>

<style scoped>
body {
  width: 1000px;
  margin: 10px auto;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
