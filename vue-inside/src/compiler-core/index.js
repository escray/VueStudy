import { render } from 'vue';

const PatchFlags = {
  "TEXT": 1,
  "CLASS": 1 << 1,
  "STYLE": 1 << 2,
  "PROPS": 1 << 3,
  "EVENT": 1 << 4
}

function tokenizer(input) {
  let tokens = []
  let type = ''
  let val = ''
  for (let i = 0;  i < input.length;  i++) {
    const ch = input[i];
    if (ch === '<') {
      push()
      if (input[i+1] === '/') {
        type = 'tagend'
      } else {
        type = 'tagstart'
      }
    } else if (ch === '>') { // 碰见空格夹断一下
      if (input[i - 1] === '=') {
        //
      } else {
        push()
        type = 'text'
        continue
      }
    } else if (/[\s]/.test(ch)) {
      push()
      type = 'props'
      continue
    }
    val += ch
  }

  return tokens

  function push() {
    if (val) {
      if (type === 'tagstart') {
        // <div => div
        val = val.slice(1)
      } else if (type === 'tagend') {
        //  </div  => div
        val = val.slice(2)
      }
      tokens.push({ type, val })
      val = ''
    }
  }
}

function parse(template) {
  const tokens = tokenizer(template)
  let cur = 0
  let ast = {
    type: 'root',
    props: [],
    children: []
  }
  while (cur < tokens.length) {
    ast.children.push(walk())
  }
  return ast

  function walk() {
    let token = token[cur]
    if (token.type === 'tagstart') {
      let node = {
        type: element,
        tag: token.val,
        props: [],
        children: []
      }
      token = tokens[++cur]
      while (token.type != 'tagend') {
        if (token.type === 'props') {
          node.props.push(walk())
        } else {
          node.children.push(walk())
        }
        token = tokens[cur]
      }
      cur++
      return node

    } else if (token.type === 'tagend') {
      cur++
    } else if (token.type === 'text') {
      cur++
      return token
    } else if (token.type === 'props') {
      cur++
      const [key, val] = token.val.replace('=', '~').split('~')
      return { key, val }
    }
  }
}

function transform(ast) {
  // 优化一下ast
  let context = {
    // import { toDisplayString , createVNode , openBlock , createBlock } from "vue"
    // 用到的工具函数
    helpers: new Set(['openBlock', 'createVNode'])
  }
  traverse(ast, context)
  ast.helps = context.helpers
}

function traverse(ast, context) {
  switch (ast.type) {
    case "root":
      context.helpers.add('createBlock')
    case "element":
      // TODO:
    case "text":
      // transformText
      let re = /\{\{(.*)\}\}/g
      //有{{
      if (re.test(ast.val)) {
        // 标记props需要更新
        ast.flag |= PatchFlags.TEXT
        context.helper.add('toDisplayString')
        ast.val = ast.val.replace(/\{\{(.*)\}\}/g, function (s0, s1) {
          return s1
        })
      } else {
        ast.static = true
      }
  }
}

function generate(ast) {

}

export function compiler(template) {
  const ast = parse(template)
  transform(ast)

  const code = generate(ast)
  return code
}
