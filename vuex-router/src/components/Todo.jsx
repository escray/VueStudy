import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    level: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    let title = ref('')
    let todos = ref([
      { title: "Study Vue3", done: true },
      { title: "Sleep", done: false }]);
    function addTodo() {
      todos.value.push({
        title: title.value
      })
      title.value = ''
    }

    return () => <div>
      <input type="text" vModel={title.value}></input>
      <button onClick={addTodo}>CLICK</button>
      <ul>
        {
          todos.value.length ? todos.value.map(todo => {
            return <li>{todo.title}</li>
          }) : <li>NO DATA</li>
        }
      </ul>
    </div>
  }
})

export const Button = (props, { slots }) => <button {...props}>slots.default()</button>
export const Input = (props) => <input {...props} />
export const TimeLine = (props) => {
  const timeline = [
    <div class="start">8.21 Start Career</div>,
    <div class="online">10.18 Column Publish</div>
  ]
  if (props.reverse) {
    timeline.reverse()
  }
  return <div>{timeline}</div>
}
