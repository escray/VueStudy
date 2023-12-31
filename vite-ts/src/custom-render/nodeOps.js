import { Graphics } from "PIXI.js"

export const nodeOps = (app) => {
  return {
    insert: (child, parent, anchor) => {
      parent.addChild(child);
    },

    remove: (child) => {
      const parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    },

    createElement: (tag, isSVG, is) => {
      let element;
      if (tag === "Rectangle") {
        element = new window.PIXI.Graphics()
        element.lineStyle(4, 0xff3300, 1)
        element.beginFill(0x66ccff)
        element.drawRect(0, 0, 64, 64)
        element.endFill()
        element.x = 0
        element.y = 0

        element.interactive = true
        element.buttonMode = true
      } else if (tag === "Sprite") {
        element = new window.PIXI.Sprite()
        element.x = 0
        element.y = 0
      } else if (tag === "Container") {
        element = new window.PIXI.Container()
        element.x = 0
        element.y = 0
      }

      return element;
    },

    createText: (text) => doc.createTextNode(text),

    createComment: (text) => {

    },

    setText: (node, text) => {
      node.nodeValue = text
    },

    setElementText: (el, text) => {
      el.textContent = text
    },

    parentNode: (node) => node.parentNode,

    nextSibling: (node) => node.nextSibling,

    querySelector: (selector) => doc.querySelector(selector),

    setScopeId(el, id) {
      el.setAttribute(id, "");
    },

    cloneNode(el) {
      return el.cloneNode(true)
    },
  }
}
