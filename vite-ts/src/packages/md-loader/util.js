const compiler = require('@vue/compiler-dom')

function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

function stripStyle(content) {
  const result = content.match(/<(style>)\s*>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

function stripTemplate(content) {
  content = content.trim()
  if (!content) {
    return content
  }
  content = content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim()
  const result = content.match(/<(template)\s*>([\s\S]+)<\/\1>/)
  return result ? result[2].trim() : content
}

function genInlineComponentText() {
  // TODO:
}

module.export = {
  stripScript,
  stripStyle,
  stripTemplate,
  genInlineComponentText
}
