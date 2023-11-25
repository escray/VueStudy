export const patchProp = (
  el,
  key,
  prevValue,
  nextValue,
  isSVG = false,
) => {
  switch (key) {
    case "x":
    case "y":
    case "width":
    case "height":
      el[key] = nextValue
      break;
    case "on":
      Object.keys(nextValue).forEach((eventName) => {
        const callback = nextValue[eventName];
        el.on(eventName, callback)
      })
      break;
    case "texture":
      let texture = PIXI.Texture.from(nextValue)
      el.texture = texture
      break;
  }
}
