export default {
  foo(fn) {
    // error handler method 2
    try {
      fn && fn()
    } catch (e) {

    }
  },
  bar(fn) {
    try {
      fn && fn()
    } catch (e) {

    }
  }
}
