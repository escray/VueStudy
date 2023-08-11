<template>

</template>
<script setup>
console.log("Proxy")
let getDouble = n => n*2
let obj = {
  count: 1,
}
// let count = 1;
let double = 1;
// let double = getDouble(count)

// Object.defineProperty(obj, 'count', {
//   get() {
//     return count
//   },
//   set(val) {
//     count = val
//     double = getDouble(val)
//   }
// })

let proxy = new Proxy(obj, {
  get: function (target, prop) {
    return target[prop];
  },
  set: function (target, prop, value) {
    target[prop] = value;
    if (prop === 'count') {
      double = getDouble(value)
    }
  },
  deleteProperty(target, prop) {
    delete target[prop]
    if (prop === 'count') {
      double = NaN
    }
  }
})

console.log(obj.count, double)
// proxy.count = 2
console.log(obj.count, double)
// // delete proxy.count

// console.log(obj.count, double)

</script>
