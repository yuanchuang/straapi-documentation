---
title: 21YunBox 部署 - Strapi 开发人员文档
description: Learn in this guide how to update an existing Strapi project so it can be deployed on 21YunBox.
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/21yunbox.html
---

# 21YunBox

!!!include(developer-docs/latest/setup-deployment-guides/deployment/snippets/deployment-guide-not-updated.md)!!!

本指南解释了如何更新现有的 Strapi 项目，以便它可以部署在 [21YunBox](https://www.21yunbox.com) 上。

21YunBox 提供中文 CDN，持续部署，一键式 HTTPS 和 [托管数据库和后端Web服务等其他服务](https://www.21yunbox.com/docs/#/)，允许在中国启动 Web 项目。

借助永久磁盘和托管的 PostgreSQL 数据库，21YunBox 为您提供了多种不同的方法来存储内容。21YunBox 服务带有完全托管的 SSL，因此不再需要设置代理服务器来保护您的 Strapi 应用程序。由于 21YunBox 服务在没有响应时会自动重新启动，因此您也不需要使用像 `pm2` 这样的进程管理器。


::: tip
有关更多信息，请参阅 [21YunBox的部署 Strapi 指南](https://www.21yunbox.com/docs/#/deploy-strapi).
:::

:::prerequisites

本指南假定您已经有一个要部署的 Strapi 项目。如果你需要一个项目，使用[快速入门](/developer-docs/latest/getting-started/quick-start.md) 来开始或 fork 21YunBox's Strapi 示例：
- [Strapi with SQLite Starter](https://gitee.com/eryiyunbox-examples/hello-strapi-sqlite)
- [Strapi with Postgres Starter](https://gitee.com/eryiyunbox-examples/hello-strapi-postgres)

:::
## 安装

请按照以下步骤在21YunBox上设置 Strapi CMS：

1. 创建一个 21YunBox 帐户。如果您还没有，请访问 [21YunBox dashboard](https://https://www.21yunbox.com/u/signup/).
2. 在 21YunBox 上创建一个新的 Web 服务，并授予 21YunBox 访问 GitHub 或 Gitee 存储库的权限。
3. 在创建过程中使用以下值：

   | 设置               | 值                                                 |
   | --------------------- | ------------------------------------------------ |
   | **Environment**       | `Node 12.19`                                    |
   | **Build Command**     | `yarn && yarn build` (或您自己的构建命令) |
   | **Publish Directory** | `rsync -a public/ /data/public/ && yarn start` (或您自己的输出目录)        |

4. 添加以下环境变量：

   | 设置               | 值                                                 |
   | --------------------- | ------------------------------------------------ |
   | **NODE_ENV**       | `production`                                    |
   | **DATABASE_FILENAME**     | 如果使用 SQLite 数据库，请使用 `/data/strapi.db`|
   | **DATABASE_URL**     | 如果您使用 Postgres 数据库，请将数据库 URL 粘贴到此处（如果您不确定，我们在下面有演示视频）|

5. 单击 `部署` 按钮。

就是这样！一旦构建完成，您的网站将在您的 21YunBox URL（例如 `yoursite.21yunbox.com`）上生效。


::: tip TIP
如果您不确定上述步骤，21YunBox 为每个步骤创建了一个网络广播：

- 部分 1: [演示如何在生产环境中使用 SQLite 部署 Strapi](https://www.bilibili.com/video/BV1fK4y1j7U8?zw)
- 部分 2: [演示如何进入开发模式并在 Strapi 上创建内容](https://www.bilibili.com/video/BV1Ta4y1W7bD?zw)
- 部分 3: [演示如何在生产环境中使用数据库部署 Strapi](https://www.bilibili.com/video/BV1Nf4y1k7ZP/)

:::

## 持续部署

现在 21YunBox 已连接到您的存储库，它将在您推送到 Gitee 或 GitHub 时自动构建和发布您的网站。

## 自定义 domains

使用 21YunBox 的 [自定义 domains](https://www.21yunbox.com/docs/#/custom-domains) 指南轻松将您自己的 domains 添加到您的网站。
