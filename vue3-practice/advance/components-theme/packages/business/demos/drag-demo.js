const dragLayout = document.querySelector('.drag-layout')
// 被拖拽时的子模块DOM所在序号
let activeIndex = -1
// 拖拽到某个子模块上口的序号
let dragToIndex = -1
// 上一次所有子模块顺序的DOM的列表
let prevItems = []

// 根据DOM来获取在父容器里的序号
// The Element.previousElementSibling read-only property returns the Element immediately prior to the specified one in its parent's children list, or null if the specified element is the first one in the list.
function getItemIndex(item) {
  let elem = item
  let index = -1
  if (!elem || !elem.parentElement) {
    return index
  }
  index = 0
  elem = elem.previousElementSibling
  while (elem) {
    index++
    elem = elem.previousElementSibling
  }
  return index
}

// 在父容器上监听 拖拽开始事件
// The addEventListener() method of the EventTarget interface sets up a function that will be called whenever the specified event is delivered to the target.
dragLayout.addEventListener('dragstart', (e) => {
  const dom = e.target
  const isItem = dom.classList.contains('drag-item')
  if (isItem) {
    // why is here is document, why not dom ? watch all page/document?
    const itemDOMs = document.querySelectorAll('.drag-item')
    // The Array.from() static method creates a new, shallow-copied Array instance from an iterable or array-like object.
    prevItems = Array.from(itemDOMs)

    const itemIndex = getItemIndex(dom)
    activeIndex = itemIndex
    dom.classList.add('active')
  }
})

// 根据拖拽的数据重新排序
function resetItems() {
  if (!prevItems[activeIndex]) {
    return
  }
  if (dragToIndex >= 0 && dragToIndex < prevItems.length) {
    // The map() method of Array instances creates a new array populated with the results of calling a provided function on every element in the calling array.
    const newList = prevItems.map((item) => item)
    // The splice() method of Array instances changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
    const [activeItem] = newList.splice(activeIndex, 1)
    if (dragToIndex === 0) {
      // The unshift() method of Array instances adds the specified elements to the beginning of an array and returns the new length of the array.
      newList.unshift(activeItem)
    } else {
      newList.splice(dragToIndex, 0, activeItem)
    }
    Array.from(dragLayout.children).forEach((child) => {
      dragLayout.removeChild(child)
    })
    newList.forEach((item) => {
      dragLayout.appendChild(item)
    })
  }
}

// 监听拖拽过程中的事件，
// 用来计算移动到某个子模块“上空”
dragLayout.addEventListener('dragover', (e) => {
  e.preventDefault()
  const dom = e.target
  const isItem = dom.classList.contains('drag-item')
  if (isItem) {
    const overItemIndex = getItemIndex(dom)
    dragToIndex = overItemIndex
    resetItems()
  }
})

// 渲染结束，更新数据
dragLayout.addEventListener('dragend', (e) => {
  // The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.
  // Calling preventDefault() during any stage of event flow cancels the event, meaning that any default action normally taken by the implementation as a result of the event will not occur.
  e.preventDefault()
  prevItems.forEach((item) => {
    item.classList.remove('active')
  })
  dragToIndex = -1
  activeIndex = -1
})
