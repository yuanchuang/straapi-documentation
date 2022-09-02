---
title: API 配置 - Strapi 开发人员文档
description: Strapi 的默认 API 参数可以配置。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/api.html
---

# API 配置

General settings for API calls can be set in the `./config/api.js` file:

| 属性                      | 描述                                                                                                                                                                                                                                          | 类型         | 默认值 |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------- |
| `responses`                   | 全局 API 响应配置                                                                                                                                                                                                                    | Object       | -       |
| `responses.privateAttributes` | 要视为私有的全局定义的属性集                                                                                                                                                                                   | String array | `[]`    |
| `rest`                        | REST API 配置                                                                                                                                                                                                                               | Object       | -       |
| `rest.prefix`                 | API 前缀                       | String      | `/api`   |
| `rest.defaultLimit`           | API 调用中使用的默认 `limit` 参数 `limit` (参见 [REST API documentation](/developer-docs/latest/developer-resources/database-apis-reference/rest/sort-pagination.md#pagination-by-offset))                                                                      | Integer      | `25`    |
| `rest.maxLimit`               | 可请求作为 `limit` 请求的最大允许数量 (参见 [REST API documentation](/developer-docs/latest/developer-resources/database-apis-reference/rest/sort-pagination.md#pagination-by-offset)). | Integer      | `100`   |

**例子:**

<code-group>
<code-block title="JAVASCRIPT">


```js
// path: ./config/api.js

module.exports = ({ env }) => ({
  responses: {
    privateAttributes: ['_v', 'id', 'created_at'],
  },
  rest: {
    prefix: '/v1',
    defaultLimit: 100,
    maxLimit: 250,
  },
});
```


</code-block>

<code-block title="TYPESCRIPT">


```js
// path: ./config/api.ts

export default ({ env }) => ({
  responses: {
    privateAttributes: ['_v', 'id', 'created_at'],
  },
  rest: {
    prefix: '/v1',
    defaultLimit: 100,
    maxLimit: 250,
  },
});
```


</code-block>
</code-group>
