**目录说明**

* 根目录的 package.json 主要是用来声明公共的操作脚本和公共的开发编译所需的 npm 模块；
* packages/* 目录用来管理多个子项目，每个子项目都有各自的 package.json 项目声明文件；
* pnpm-workspace.yaml 是 pnpm 管理项目的配置文件；
* scripts/* 目录是用来存放项目通用编译脚本的；
* tsconfig.json 是用来声明 TypeScript 的项目配置的。

# 第8课

## 快速启动

```sh
# 使用 pnpm 来管理项目
pnpm i
```

## 开发模式

### 基础组件开发模式

```sh
npm run dev:components
```

### 业务组件开发模式

```sh
npm run dev:business
```

## 生产模式

```sh
npm run build
```
