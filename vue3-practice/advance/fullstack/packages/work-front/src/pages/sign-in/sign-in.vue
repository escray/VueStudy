<template>
  <DynamicForm
    class="sign-up-form"
    :model="model"
    :fieldList="fieldList"
    @finish="onFinish"
    @finishFail="onFinishFail"
  >
    <div class="btn-groups">
      <Button type="primary">Sign In</Button>
    </div>
  </DynamicForm>
</template>

<script setup lang="ts">
import { DynamicForm, Button, Message } from '@my/components'
import type { DynamicFormField } from '@my/components'
import md5 from 'md5'

interface SignInFormData {
  username: string
  password: string
}

const model: SignInFormData = {
  username: 'admin001',
  password: '12345678'
}

const fieldList: DynamicFormField[] = [
  {
    label: 'User Name',
    name: 'username',
    fieldType: 'Input',
    rule: {
      validator: (val: unknown) => {
        const hasError = (val as string)?.length === 0
        return {
          hasError,
          message: hasError ? 'Username should not be blank' : ''
        }
      }
    }
  },
  {
    label: 'Password',
    name: 'password',
    fieldType: 'InputPassword',
    rule: {
      validator: (val: unknown) => {
        const hasError = (val as string)?.length === 0
        return {
          hasError,
          message: hasError ? 'Password should not be blank' : ''
        }
      }
    }
  }
]

const onFinish = (e: SignInFormData) => {
  fetch('/api/post/account/sign-in', {
    body: JSON.stringify({
      username: e.username,
      password: md5(e.password)
    }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  })
    .then((res) => res.json())
    .then((result: any) => {
      Message.open({
        type: result.success ? 'success' : 'error',
        text: result.message,
        duration: 2000
      })
      if (result.success) {
        setTimeout(() => {
          window.location.href = '/page/manage'
        }, 2000)
      }
    })
    .catch((err: Error) => {
      Message.open({
        type: 'error',
        text: `Sign In Failed [${err.toString()}]`,
        duration: 2000
      })
    })
}

const onFinishFail = (e: unknown) => {
  // eslint-disable-next-line no-console
  console.log('fail = ', e)
}
</script>

<style lang="less">
.sign-up-form {
  width: 420px;
  padding: 16px;
  box-sizing: border-box;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  .btn-groups {
    margin-top: 10px;
    width: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    > button {
      margin: 0 10px;
      padding: 0 40;
    }
  }
}
</style>
