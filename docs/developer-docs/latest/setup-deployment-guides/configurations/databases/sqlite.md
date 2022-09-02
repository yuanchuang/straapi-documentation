---
title: SQLite - Strapi 开发人员文档
description: 了解如何将 SQLite 用于您的 Strapi 应用程序。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/databases/sqlite.html
---

# SQLite 安装

SQLite是默认的([Quick Start](/developer-docs/latest/getting-started/quick-start.md))和推荐的数据库，用于在本地快速创建应用程序。

## 在本地安装 SQLite

只需使用以下命令之一。

<code-group>

<code-block title="NPM">
```sh
npx create-strapi-app@latest my-project --quickstart
```
</code-block>

<code-block title="YARN">
```sh
yarn create strapi-app my-project --quickstart
```
</code-block>

</code-group>

这将创建一个新项目并在浏览器中启动它。

::: tip
[快速入门指南](/developer-docs/latest/getting-started/quick-start.md) 是一个完整的分步骤教程。
:::

## 其他 SQL 数据库  (PostgreSQL, MySQL)

请参阅 [配置部分](/developer-docs/latest/setup-deployment-guides/configurations/required/databases.md) ，了解使用 SQL 数据库设置 Strapi 的所有受支持选项。

::: tip
大多数云服务提供商都提供托管 SQL 数据库服务，这是启动和运行数据库的一种轻松方式。若要在本地启动和运行，可能需要尝试使用 Docker 容器。
:::
