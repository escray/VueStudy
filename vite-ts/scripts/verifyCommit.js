// const msg = require('fs')
//   .readFileSync('.git/COMMIT_EDITMSG', 'utf-8')
//   .trim()

// const commitRE = /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)((.+))?: .{1,50}/

// const mergeRe = /^(Merge pull request | Merge branch)/

// if (!commitRE.test(msg)) {
//   if (!mergeRe.test(msg)) {
//     console.log('git commit message not verify through')
//     console.error(`git commit message format error, need use title(scope): desc format
//       for example: fix: xxbug
//       feat(test): add new
//       detail verify logic found in scripts/verifyCommit.js
//     `)
//     process.exit(1)
//   }
// } else {
//   console.log('git commit message verify passed!')
// }
