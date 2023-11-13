<template>
  <el-form
   style="position: absolute; left: 45%;"
   ref="formRef"
   :model="form"
   label-width="auto"
  >
    <el-form-item label="username">
      <el-input v-model="form.name" size="small"></el-input>
    </el-form-item>

    <el-form-item label="passord">
      <el-input v-model="form.password" type="password" size="small"></el-input>
    </el-form-item>

    <el-form-tiem>
      <el-button type="primary" @click="onSubmit" :loading="loading">Login</el-button>
    </el-form-tiem>
  </el-form>
</template>
<script>

import { ref, reactive, toRefs } from 'vue'
import { login } from '../api/apis'
import { Message } from 'element3'
import { useRouter } from 'vue-router'



</script>
