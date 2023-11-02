import { createStore } from 'vuex'
const store = createStore({
  state() {
    return {
      count: 21
    }
  },

  mutations: {
    add(state) {
      state.count++
    }
  }
})

export default store
