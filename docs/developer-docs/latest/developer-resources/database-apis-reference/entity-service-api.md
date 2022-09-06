---
title: 实体服务 API - Strapi 开发人员文档
description: 实体服务是处理 Strapi 的复杂数据结构（如组件和动态区域）的层，并在后台使用查询引擎 API 来执行数据库查询。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/entity-service-api.html
---

# 实体服务 API

Strapi 提供了一个实体服务 API，构建在 [Query Engine API](/developer-docs/latest/developer-resources/database-apis-reference/query-engine-api.md) 之上。实体服务是处理 Strapi 的复杂数据结构（如 [components](/developer-docs/latest/development/backend-customization/models.md#components) 和 [dynamic zones](/developer-docs/latest/development/backend-customization/models.md#dynamic-zones) 的层，并在后台使用查询引擎 API 来执行数据库查询。

::: strapi 实体服务 API vs. 查询引擎 API
!!!include(developer-docs/latest/developer-resources/database-apis-reference/snippets/entity-query-knex-callout.md)!!!
:::

## 基本用法

实体服务 可通过 `strapi.entityService` 获得：

```js
const entry = await strapi.entityService.findOne('api::article.article', 1, {
  populate: { someRelation: true },
});
```

## 可用操作

实体服务 API 允许：

- [entities 的 CRUD 操作](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/crud.md) (例如: `findOne`, `findMany`, `create`, `update`, `delete`) 具有 [filter](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/filter.md), [order and paginate results](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/order-pagination.md), 和 [populate relations, components and dynamic zones](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/populate.md)
- the [creation and update of components and dynamic zones](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/components-dynamic-zones.md)
