---
title: TypeScript 配置 - Strapi 开发人员文档
description: TypeScript 配置的详细信息
sidebarDepth: 3
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/typescript.html
---

# TypeScript 项目配置

[TypeScript](/developer-docs/latest/development/typescript.md) 的 Strapi 应用程序具有特定的 [project structure](/developer-docs/latest/setup-deployment-guides/file-structure.md)，其中包含以下专用文件夹和配置文件：

| 特定于 TypeScript 的目录和文件 | 位置         | 目的                                                                                                                                           |
|-------------------------------------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `./dist` 目录                        | 应用程序根目录 | 添加用于编译项目 JavaScript 源代码的位置。                                                                               |
| `build` 目录                         | `./dist`         | 包含已编译的管理面板 JavaScript 源代码。 该目录在第一个 `yarn build` 或 `npm run build` 命令上创建 |
| `tsconfig.json` 文件                      | 应用程序根目录 | 管理服务器的 TypeScript 编译。                                                                                                  |
| `tsconfig.json` 文件                      | `./src/admin/`   | 管理管理面板的 TypeScript 编译。                                                                                               |
