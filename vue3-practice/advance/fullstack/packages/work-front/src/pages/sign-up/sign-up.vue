<template>
  <DynamicForm
    class="sign-up-form"
    :model="model"
    :fieldList="fieldList"
    @finish="onFinish"
    @finishFail="onFinishFail"
  >
    <div class="btn-groups">
      <Button type="primary">Sign Up</Button>
    </div>
  </DynamicForm>
</template>
<script setup lang="ts">
import { DynamicForm, Button, Message } from '@my/components'
import md5 from 'md5'
import type { DynamicFormField } from '@my/components'

interface SignUpFormData {
  username: string
  password: string
  confirmPassword: string
}

const model: SignUpFormData = {
  username: 'admin001',
  password: '123456',
  confirmPassword: '123456'
}

const fieldList: DynamicFormField[] = [
  {
    label: 'User Name',
    name: 'username',
    fieldType: 'Input',
    rule: {
      validator: (val: unknown) => {
        const hasError = /^[0-9a-z\-._]{4,16}$/.test(`${val || ''}`) !== true
        return {
          hasError,
          message: hasError
            ? 'Username shoulde be a combination of 4～16 characters of 0-9a-z'
            : ''
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
        const hasError = /^[0-9a-zA-Z]{6,16}$/gi.test(`${val || ''}`) !== true
        return {
          hasError,
          message: hasError
            ? 'Password should be a combination of 6~16 characters of 0-9a-zA-Z'
            : ''
        }
      }
    }
  },
  {
    label: 'ConfirmPassword',
    name: 'confirmPassword',
    fieldType: 'InputPassword',
    rule: {
      validator: (val: unknown) => {
        const hasError = /^[0-9a-zA-Z]{6,16}$/gi.test(`${val || ''}`) !== true
        return {
          hasError,
          message: hasError
            ? 'Password should be a combination of 6~16 characters of 0-9a-zA-Z'
            : ''
        }
      }
    }
  }
]

const onFinish = (e: SignUpFormData) => {
  if (e.password !== e.confirmPassword) {
    Message.open({
      type: 'error',
      text: 'ConfirmPassword is not same as Password',
      duration: 2000
    })
    return
  }

  fetch('/api/post/account/sign-up', {
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
          window.location.href = '/page/sign-in'
        }, 2000)
      }
    })
    .catch((err: Error) => {
      Message.open({
        type: 'error',
        text: `Sign up failed [${err.toString()}]`,
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
