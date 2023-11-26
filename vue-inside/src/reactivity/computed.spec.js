import { ref } from './ref'
import { reactive } from './reactive'
import { computed } from './computed'

describe('compute test', () => {
  it('computed basic usage', () => {
    const ret = reactive({ count: 1})
    const num = ref(2)
    const sum = computed(() => num.value + ret.count)
    expect(sum.value).toBe(3)
  })

  it('computed property update', () => {
    const author = ref('hug-sun')
    const course = ref('play with vue3')
    const title = computed({
      get() {
        return author.value + ":" + course.value
      },
      set(val) {
        [author.value, course.value] = val.split(':')
      }
    })
    expect(title.value).toBe('hug-sun:play with vue3')

    author.value = 'winter'
    course.value = 'relearn frontend'
    expect(title.value).toBe('winter:relearn frontend')

    title.value = 'zheng:datastructure'
    expect(author.value).toBe('zheng')
    expect(course.value).toBe('datastructure')
  })
})
