---
title: 请求和响应 - Strapi 开发人员文档
description: 详细了解 Strapi（最流行的无头 CMS）的请求和响应。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/development/backend-customization/requests-responses.html
---

# 请求 & 响应

## 请求

上下文对象 (`ctx`) 包含所有与请求相关的信息。它们可以通过 `ctx.request` 从 [controllers](/developer-docs/latest/development/backend-customization/controllers.md) 和 [policies](/developer-docs/latest/development/backend-customization/policies.md) 访问

Strapi 在 `ctx.request.body` 传递 `body` 和在 `files` 通过 `ctx.request.files` 传递。

有关更多信息，请参阅 [Koa request 文档](http://koajs.com/#request).

## 响应

上下文对象 (`ctx`) 包含用于管理服务器响应的值和函数的列表。它们可以通过 `ctx.response` 访问，从 [controllers](/developer-docs/latest/development/backend-customization/controllers.md) 和 [policies](/developer-docs/latest/development/backend-customization/policies.md)。

有关更多信息，请参阅 [Koa response 文档](http://koajs.com/#response).
