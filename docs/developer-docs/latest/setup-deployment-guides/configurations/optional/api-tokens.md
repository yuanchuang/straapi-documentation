---
title: API tokens - Strapi 开发人员文档
description: 使用 API 令牌允许以经过身份验证的用户身份在 Strapi 的 REST API 端点上执行请求。
---

# API tokens

Strapi 中的身份验证策略可以基于 [Users & Permissions plugin](/user-docs/latest/users-roles-permissions/introduction-to-users-roles-permissions.md) 的使用，也可以基于内置的 API 令牌功能。

使用 API 令牌允许以经过身份验证的用户身份在 [REST API](/developer-docs/latest/developer-resources/database-apis-reference/rest-api.md) 端点上执行请求。

## 创建

从 [管理面板](/user-docs/latest/settings/managing-global-settings.md#managing-api-tokens) 生成新的 API 令牌

## 使用

当执行对 Strapi 的 [REST API](/developer-docs/latest/developer-resources/database-apis-reference/rest-api.md) 请求时，API token应添加到请求的 `Authorization` 标头中，并使用以下语法： `bearer your-api-token`。

## 配置

新的 API 令牌是使用 salt 生成的。这种 salt 由 Strapi 自动生成，并作为 `API_TOKEN_SALT` 存储在 `.env` 中。

salt 可以定制：

- 通过更新 `./config/admin.js` 的 `apiToken.salt` 字符串值 (参见 [管理面板配置文档](/developer-docs/latest/setup-deployment-guides/configurations/required/admin-panel.md))
- 或者在项目 `.env` 文件创建 `API_TOKEN_SALT` [环境变量](/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.md#strapi-s-environment-variables)

::: caution
更改盐会使所有现有 API 令牌失效。
:::
