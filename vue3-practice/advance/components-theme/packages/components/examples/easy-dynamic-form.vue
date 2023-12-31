<template>
  <form class="easy-dynamic-form" @submit="onSubmit">
    <div class="easy-dynamic-form-title">{{ schema.title }}</div>
    <div
      class="easy-dynamic-form-field"
      v-for="(field, index) in schema.fieldList"
      v-bind:key="index"
    >
      <div class="easy-dynamic-form-label">{{ field.label }}:</div>
      <div v-if="field.fieldType === 'input'" class="easy-dynamic-form-item">
        <input v-model="model[field.name]" />
      </div>
      <div
        v-else-if="field.fieldType === 'radio'"
        class="easy-dynamic-form-item"
      >
        <span
          v-for="(option, index) in field.options"
          v-bind:key="index"
          class="easy-dynamic-form-option"
        >
          <input
            type="radio"
            :id="option.value"
            :name="field.name"
            :value="option.value"
            :checked="model[field.name] === option.value"
            @change="
              onRadioChange({ fieldName: field.name, value: option.value })
            "
          />
          <label :for="option.value">{{ option.name }}</label>
        </span>
      </div>
      <div v-else class="easy-dynamic-form-item"></div>
    </div>
    <div>
      <button class="easy-dynamic-form-btn" type="submit">Submit</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, toRaw } from 'vue'

// const schema = {
//   title: 'regular user info',
//   fieldList: [
//     {
//       label: 'user name',
//       name: 'username',
//       fieldType: 'input'
//     },
//     {
//       label: 'phone number',
//       name: 'phone',
//       fieldType: 'input'
//     },
//     {
//       label: 'address',
//       name: 'address',
//       fieldType: 'input'
//     }
//   ]
// }
const schema = {
  title: 'subscribed user info',
  fieldList: [
    {
      label: 'username',
      name: 'username',
      fieldType: 'input'
    },
    {
      label: 'phone',
      name: 'phone',
      fieldType: 'input'
    },
    {
      label: 'Member discount',
      name: 'service',
      fieldType: 'radio',
      options: [
        { name: '10% off', value: 'service01' },
        { name: 'free shipping', value: 'service02' },
        { name: '10 off for orders over 80', value: 'service03' }
      ]
    },
    {
      label: 'address',
      name: 'address',
      fieldType: 'input'
    }
  ]
}

const model = reactive<{ [key: string]: unknown }>({})
schema.fieldList.forEach((field) => {
  model[field.name] = ''
})

const onRadioChange = (data: { fieldName: string; value: string }) => {
  model[data.fieldName] = data.value
}

const onSubmit = (e: Event) => {
  e.preventDefault()
  const data = toRaw(model)
  window.alert(JSON.stringify(data))
}
</script>

<style lang="less">
.easy-dynamic-form {
  width: 400px;
  padding: 16px;
  margin: 20px auto;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #999999;
  font-size: 14px;
}
.easy-dynamic-form-title {
  font-size: 20px;
  color: #666666;
}

.easy-dynamic-form-field {
  display: flex;
  flex-direction: row;
  margin: 4px 0;
}
.easy-dynamic-form-label {
  width: 120px;
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.easy-dynamic-form-item {
  width: 280px;
  display: flex;
  input {
    width: 280px;
    height: 36px;
  }
  input[type='radio'] {
    width: 20px;
    height: 20px;
  }
}

.easy-dynamic-form-btn {
  height: 32px;
  padding: 0 20px;
  min-width: 100px;
}

.easy-dynamic-form-option {
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-right: 4px;
}
</style>
