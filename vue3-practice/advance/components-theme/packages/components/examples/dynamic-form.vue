<!-- eslint-disable no-console -->
<template>
  <div class="example">
    <DynamicForm
      :model="model"
      :fieldList="fieldList"
      @finish="onFinish"
      @finishFail="onFinishFail"
    >
      <Button type="primary">Submit</Button>
    </DynamicForm>
  </div>
</template>

<script setup lang="ts">
import { Button, DynamicForm } from '../src'
import type { DynamicFormField } from '../src'

const model = {
  username: 'Hello',
  phone: '123456',
  address: '',
  service: ''
}

const fieldList: DynamicFormField[] = [
  {
    label: 'User Name',
    name: 'username',
    fieldType: 'Input',
    rule: {
      validator: (val: unknown) => {
        const hasError = /^[a-z]{1,}$/gi.test(`${val || ''}`) !== true
        return {
          hasError,
          message: hasError ? '仅支持a-z的大小写字母' : ''
        }
      }
    }
  },
  {
    label: 'Phone Number',
    name: 'phone',
    fieldType: 'Input',
    rule: {
      validator: (val: unknown) => {
        const hasError = /^[0-9]{1,}$/gi.test(`${val || ''}`) !== true
        return {
          hasError,
          message: hasError ? '仅支持0-9的数字' : ''
        }
      }
    }
  },
  {
    label: 'Delivery Address',
    name: 'address',
    fieldType: 'Input',
    rule: {
      validator: (val: unknown) => {
        const hasError = `${val}`?.length === 0
        return {
          hasError,
          message: hasError ? '地址不能为空' : ''
        }
      }
    }
  },
  {
    label: 'Subscribed Service',
    name: 'service',
    fieldType: 'RadioList',
    options: [
      { name: 'free shipping', value: 'service001' },
      { name: '10% off', value: 'service002' },
      { name: '10 off for order over 80', value: 'service003'}
    ],
    rule: {
      validator: (val: unknown) => {
        const hasError = `${val}`?.length === 0
        return {
          hasError,
          message: hasError ? '优惠不能为空' : ''
        }
      }
    }
  }
]

const onFinish = (e: unknown) => {
  console.log('success = ', e)
}

const onFinishFail = (e: unknown) => {
  console.log('fail = ', e)
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
  padding: 16px;
  margin: 20px auto;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #999999;
  font-size: 14px;
}

.btn {
  height: 32px;
  padding: 0 20px;
  min-width: 100px;
}
</style>
