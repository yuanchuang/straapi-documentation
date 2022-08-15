---
title: CLI安装 - Strapi 开发人员文档
description: Fast-track local install for getting Strapi running on your computer in less than a minute.
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/installation/cli.html
---

# CLI 安装

Strapi CLI (Command Line Interface) 安装脚本是让 Strapi 在本地运行的最快方式。下面的指南是 Strapi 最推荐的安装选项。

## 准备安装

!!!include(developer-docs/latest/developer-resources/cli/snippets/installation-prerequisites.md)!!!

任何 Strapi 项目都需要一个数据库。Strapi 目前支持以下数据库:

| 数据库     | 最低版本 |
| ---------- | -------- |
| SQLite     | 3        |
| PostgreSQL | 10       |
| MySQL      | 5.7.8    |
| MariaDB    | 10.2.7   |

## 创建 Strapi 项目

::: strapi CLI 安装选项
以下安装指南介绍了最基本 CLI 的选项。当你创建一个新的 Strapi 项目时，还有其他的选项可以使用：

- 使用 `--quickstart` 选项在快速启动模式下创建项目。
- 使用 `--template` 选项创建一个带有预设的 Strapi 配置的项目 (参见 [Templates](templates.md)).
- 使用 `--typescript` 选项 (或简短选项 `--ts`) 来创建一个支持 [TypeScript](/developer-docs/latest/development/typescript.md) 的项目.
- 使用 `--no-run` 选项将阻止 Strapi 自动启动服务器 (结合 `--quickstart` 使用)

有关更多可用选项，请参阅我们的 [CLI 文档](/developer-docs/latest/developer-resources/cli/CLI.md).

Strapi 还为初学者提供了一个 CLI 来创建一个带有预先制作的前端应用程序的项目 (参见 [我们的博客文章](https://strapi.io/blog/announcing-the-strapi-starter-cli)).
:::

1. 在终端中执行如下命令:

<code-group>

<code-block title="NPM">
```sh
npx create-strapi-app@latest my-project
```
</code-block>

<code-block title="YARN">
```sh
yarn create strapi-app my-project
```
</code-block>

</code-group>

2. 选择安装方式:

   - `Quickstart (recommended)` 使用默认数据库 (SQLite)
   - `Custom (manual settings)` 允许选择你更喜爱的数据库

3. (仅自定义安装类型) 在数据库列表中，为你的 Strapi 项目选择一个数据库。

4. (仅自定义安装类型) 为你的项目数据库起个名字。

## 运行 Strapi

启动 Strapi 应用程序，在项目文件夹下运行如下命令:

<code-group>

<code-block title="NPM">
```bash
npm run develop
```
</code-block>

<code-block title="YARN">
```sh
yarn develop
```
</code-block>

</code-group>
