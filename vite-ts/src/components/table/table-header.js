// vite-ts/src/components/table/table-header.js
import { getCurrentInstance, ref } from 'vue'

function useEvent(props, emit) {
  const instance = getCurrentInstance()
  const parent = instance.parent
  const storeData = parent.store.states
  const filterPanels = ref({})

  const {
    tableLayout,
    onColumnsChange,
    onScrollableChange
  } = userLayoutObserver(parent)

  const hasGutter = computed(() => {
    return !props.fixed && tableLayout.gutterWidth
  })

  onMounted(() => {
    nextTick(() => {
      const { prop, order } = props.defaultSort
      const init = true
      parent.store.commit('sort', { prop, order, init })
    })
  })

  const {
    handleHeaderClick,
    handleHeaderContextMenu,
    handleMouseDown,
    handleMouseMove,
    handleMouseOut,
    handleSortClick,
    handleFilterClick
  } = useEvent(props.emit)

  const {
    getHeaderRowStyle,
    getHeaderRowClass,
    getHeaderCellStyle,
    getHeaderCellClass
  } = useStyle(props)

  const { isGroup, toggleAllSelection, columnRows } = useUtils(props)

  instance.state = {
    onColumnsChange,
    onScrollableChange
  }

  // eslint-disable-next-line
  instance.filterPanels = filterPanels
}

//

render() {
  return h(
    'table',
    {
      class: 'el-table__body',
      cellspacing: '0',
      cellpadding: '0',
      border: '0'
    },
    [
      hColgroup(this.store.states.columns.value),
      h('tbody', {}, [
        data.reduce((acc, row) => {
          return acc.concat(this.wrappedRowRender(row, acc.length))
        }, []),
        h(
          ElTootip,
          {
            modelValue: this.tooltipVisible,
            content: this.tooltipContent,
            manual: true,
            effect: this.$parent.tooltipEffect,
            placement: 'top'
          },
          {
            default: () => this.tooltipTrigger
          }
        )
      ])
    ]
  )
}


