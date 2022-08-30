---
title: 后端定制 - Strapi 开发人员文档
description: Strapi 后端的所有元素，例如 routes, policies, middlewares, controllers, services, models, requests, responses, webhooks 都能定制
canonicalUrl: https://docs.strapi.io/developer-docs/latest/development/backend-customization.html
---

# 后端定制

Strapi 运行在 [Koa](https://koajs.com/) 的 HTTP 服务器，这是一个后端 JavaScript 框架。

:::strapi 什么是 Koa?
如果您不熟悉 Koa 后端框架，我们强烈建议您阅读 [Koa 的文档介绍](http://koajs.com/#introduction).
:::

Strapi 后端的每个部分都可以定制:

- [requests](/developer-docs/latest/development/backend-customization/requests-responses.md#requests) 由 Strapi 服务器接收

- [routes](/developer-docs/latest/development/backend-customization/routes.md) 处理请求并触发其控制器处理程序的执行

- [policies](/developer-docs/latest/development/backend-customization/policies.md) 可以阻止对路由的访问

- [middlewares](/developer-docs/latest/development/backend-customization/middlewares.md) 可以在继续之前控制请求流和请求

- [controllers](/developer-docs/latest/development/backend-customization/controllers.md) 一旦到达路由，就会执行代码

- [services](/developer-docs/latest/development/backend-customization/services.md) 用于构建可由控制器重用的自定义逻辑

- [models](/developer-docs/latest/development/backend-customization/models.md) 是内容数据结构的表示形式

- [responses](/developer-docs/latest/development/backend-customization/requests-responses.md#responses) 发送到发送请求的应用程序

- [webhooks](/developer-docs/latest/development/backend-customization/webhooks.md) 用于将发生的事件通知其他应用程序。
