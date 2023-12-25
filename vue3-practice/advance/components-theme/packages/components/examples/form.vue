<!-- eslint-disable no-console -->
<template>
  <div class="example">
    <Form
      ref="formRef"
      :model="model"
      @finish="onFinish"
      @finishFail="onFinishFail"
    >
      <FormItem label="data1" name="data1" :rule="rule1">
        <input v-model="model.data1" />
      </FormItem>
      <FormItem label="data2" name="data2" :rule="rule2">
        <input v-model="model.data2" />
      </FormItem>
      <FormItem>
        <button html-type="submit">Submit</button>
        <button @click="onReset">Reset</button>
      </FormItem>
    </Form>
    <div>
      <div>data1: {{ model.data1 }}</div>
      <div>data2: {{ model.data2 }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Form } from '../src'
import { FormInstance } from '../src'

const { FormItem } = Form
const formRef = ref<FormInstance>()
const model = reactive<{ data1: string; data2: string }>({
  data1: '123',
  data2: 'Data-abc'
})

const onReset = () => {
  formRef.value?.resetFields()
}

const rule1 = {
  validator: (val: string) => {
    const hasError = /^[0-9]{1,}$/gi.test(`${val || ''}`) !== true
    return {
      hasError,
      message: hasError ? 'only 0-9 number should be' : ''
    }
  }
}

const rule2 = {
  validator: (val: string) => {
    const hasError = /^[a-z]{1,}$/gi.test(`${val || ''}`) !== true
    return {
      hasError,
      message: hasError ? 'only a-z character should be' : ''
    }
  }
}

const onFinish = (e: unknown) => {
  console.log('success =', e)
}

const onFinishFail = (e: unknown) => {
  console.log('fail =', e)

}
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
}
.example {
  width: 400px;
  margin: 100px auto;
  box-sizing: border-box;
  background: #f0f0f0;
}
</style>
