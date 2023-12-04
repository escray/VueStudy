import { defineComponent } from 'vue'
import Counter from './counter'
import './app.css'

const App = defineComponent({
  components: { 'Counter': Counter },

  setup() { return {} },

  render() {
    return ( <div class="app"><Counter /></div> )
  }
})

export default App
