/* eslint-disable no-console */
import process from 'node:process'
import path from 'node:path'
import fs from 'node:fs'
import * as vueCompiler from 'vue/compiler-sfc'
import glob from 'fast-glob'
import { Project } from 'ts-morph'
import type { CompilerOptions, SourceFile } from 'ts-morph'
import { resolveProjectPath, resolvePackagePath } from './util'

const tsWebBuildConfigPath = resolveProjectPath('tsconfig.web.build.json')

// 检查项目的类型是否正确
function checkPackageType(project: Project) {
  const diagnostics = project.getPreEmitDiagnostics()
  if (diagnostics.length > 0) {
    console.error(project.formatDiagnosticsWithColorAndContext(diagnostics))
    const err = new Error('TypeScript类型描述文件构建失败！')
    console.error(err)
    throw err
  }
}

// 将*.d.ts文件复制到指定格式模块目录里
async function copyyDts(pkgDirName: string) {
  const dtsPaths = await glob(['**/*.d.ts'], {
    cwd: resolveProjectPath('dist', 'types', 'packages', pkgDirName, 'src'),
    absolute: false,
    onlyFiles: true
  })

  dtsPaths.forEach((dts: string) => {
    const dtsPath = resolveProjectPath(
      'dist',
      'types',
      'packages',
      pkgDirName,
      'src',
      dts
    )
    const cjsPath = resolvePackagePath(pkgDirName, 'dist', 'cjs', dts)
    const esmPath = resolvePackagePath(pkgDirName, 'dist', 'esm', dts)
    const content = fs.readFileSync(dtsPath, { encoding: 'utf8' })
    fs.writeFileSync(cjsPath, content)
    fs.writeFileSync(esmPath, content)
  })
}

// 添加源文件到项目里
async function addSourceFiles(project: Project, pkgSrcDir: string) {
  project.addSourceFileAtPath(resolveProjectPath('env.d.ts'))

  const globSourceFile = '**/*.{js?(x),ts?(x),vue}'
  const filePaths = await glob([globSourceFile], {
    cwd: pkgSrcDir,
    absolute: true,
    onlyFiles: true
  })
}
