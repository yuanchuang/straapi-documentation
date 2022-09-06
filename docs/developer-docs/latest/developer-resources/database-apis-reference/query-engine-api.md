---
title: 查询引擎 API - Strapi Developer Docs
description: Strapi 提供了一个查询引擎 API，用于在较低级别提供对数据库层的无限制内部访问。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine-api.html
---

# 查询引擎 API

Strapi 提供了一个查询引擎 API，用于在较低级别与数据库层进行交互。它应该主要由插件开发人员和向其应用程序添加自定义业务逻辑的开发人员使用。在大多数用例中，建议改用 [Entity Service API](/developer-docs/latest/developer-resources/database-apis-reference/entity-service-api.md) 。

::: strapi 实体服务 API vs. 查询引擎 API
!!!include(developer-docs/latest/developer-resources/database-apis-reference/snippets/entity-query-knex-callout.md)!!!
:::

## 基本用法

查询引擎可通过 `strapi.db.query` 获得：

```js
strapi.db.query('api::blog.article').findMany({ // uid syntax: 'api::api-name.content-type-name'
  where: {
    title: {
      $startsWith: '2021',
      $endsWith: 'v4',
    },
  },
  populate: {
    category: true,
  },
});
```

## 可用操作

查询引擎允许对数据库条目执行操作，例如：

- [single entries](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/single-operations.md) 或 [multiple entries](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/bulk-operations.md) CRUD
- [filtering entries](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.md), [populating relations](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/populating.md) 和 [ordering and paginating queries results](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/order-pagination.md)
