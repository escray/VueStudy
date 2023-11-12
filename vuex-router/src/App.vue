<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
</script> -->

<template>
<el-container>
  <el-header>
    <!-- Header
    <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    </div> -->
    <el-menu
    :default-active="1"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    >
    <el-menu-item index="1">File</el-menu-item>
    <el-submenu index="2">
      <template v-slot:title>Dashboard</template>
      <el-menu-item index="2-1">Choice1</el-menu-item>
      <el-menu-item index="2-2">Choice2</el-menu-item>
      <el-menu-item index="2-3">Choice3</el-menu-item>
      <el-submenu index="2-4">
        <template v-slot:title>Choice4</template>
        <el-menu-item index="2-4-1">SubChoice41</el-menu-item>
        <el-menu-item index="2-4-2">SubChoice42</el-menu-item>
        <el-menu-item index="2-4-3">SubChoice43</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3">Message</el-menu-item>
    <el-menu-item index="4"><a href="https://element3-ui.com" target="_blank">Order</a></el-menu-item>
  </el-menu>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <div>
        <router-link to="/">Home</router-link>
      </div>
      <div>
        <router-link to="/about">About</router-link>
      </div>
      <div>
        <router-link to="/counter">Counter</router-link>
      </div>
      <div>
        <router-link to="/todolist">TodoList</router-link>
      </div>
    </el-aside>
    <el-container>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="route" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</el-container>



  <!-- <div>

        <p>
          <router-link to="/">Home</router-link> |
          <router-link to="/counter">Counter</router-link> |
          <router-link to="/todolist">TodoList</router-link> |
          <router-link to="/about">About</router-link>
        </p>
        <router-view v-slot="{ Component }">
          <transition name="route" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
    </div> -->

<!-- <HelloWorld msg="Vite + Vue" /> -->


</template>

<style scoped>
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

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
