<template>

</template>
<script setup>
console.log("defineProperty")
let getDouble = n => n*2
let obj = {}
let count = 1
let double = getDouble(count)

Object.defineProperty(obj, 'count', {
  get() {
    return count
  },
  set(val) {
    count = val
    double = getDouble(val)
  }
})

console.log(double)
obj.count = 2
console.log(double)

// delete obj.count
// console.log(double)
</script>
