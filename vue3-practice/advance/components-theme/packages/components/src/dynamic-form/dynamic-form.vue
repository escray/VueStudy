<template>
  <div :class="{ [baseClassName]: true }">
    <Form>
      <Form
        ref="formRef"
        :model="internalModel"
        @finish="onFinish"
        @finishFail="onfinishFail"
      >
        <FormItem>

        </FormItem>
      </Form>
    </Form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { prefixName } from '../theme'
import Row from '../row'
import Form from '../form'
import Input from '../input'

</script>
