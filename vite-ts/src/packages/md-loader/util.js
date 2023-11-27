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

function genInlineComponentText(template, script) {
  const compiled = compiler.compile(template, { prefixIdentifiers: true })
  const code = compiled.code.replace(/return\s+?function\s+?render/, () => {
    return 'function render'
  })

  let demoComponentContent = `${code}`

  script = script.trim()
  if (script) {
    script = script
      .replace(/export\s+default/, 'const democomponentExport =')
      .replace(/import ([,{}\w\s]+) from (['"\w]+)/g, function (s0, s1, s2) {
        if (s2 === `'vue'`) {
          return `const ${s1} = Vue`
        } else if (s2 === `'element3'`) {
          return `const ${s1} = Element3`
        }
      })
  } else {
    script = 'const democomponentExport = {}'
  }

  demoComponentContent = `(function() {
    ${demoComponentContent}
    ${script}
    return {
      mounted(){
        this.$nextTick(()=> {
          const blocks = document.querySelectorAll('pre code:not(.hljs)')
          Array.prototype.forEach.call(blocks, hljs.highlightBlock)
        })
      },
      render,
      ...democomponentExport
    }
  })`
  return demoComponentContent
}

module.export = {
  stripScript,
  stripStyle,
  stripTemplate,
  genInlineComponentText
}


