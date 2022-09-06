---
title: 查询引擎 API 排序 & 分页  - Strapi 开发人员文档
description: 使用 Strapi 的查询引擎 API 对查询结果进行排序和分页。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/order-pagination.html
---

# 查询引擎 API: 排序 & 分页

[Query Engine API](/developer-docs/latest/developer-resources/database-apis-reference/query-engine-api.md) 提供了[排序](#排序)和[分页](#分页)结果的功能。

## 排序

若要对查询引擎返回的结果进行排序，请使用 `orderBy`参数。结果可以基于[单个字段](#单个字段)或[多个字段](#多个字段) 属性进行排序，也可以使用[关系排序](#关系排序)。

### 单个字段

```js
strapi.db.query('api::article.article').findMany({
  orderBy: 'id',
});

// single with direction
strapi.db.query('api::article.article').findMany({
  orderBy: { id: 'asc' },
});
```

### 多个字段

```js
strapi.db.query('api::article.article').findMany({
  orderBy: ['id', 'name'],
});

// multiple with direction
strapi.db.query('api::article.article').findMany({
  orderBy: [{ title: 'asc' }, { publishedAt: 'desc' }],
});
```

### 关系排序

```js
strapi.db.query('api::article.article').findMany({
  orderBy: {
    author: {
      name: 'asc',
    },
  },
});
```

## 分页

若要对查询引擎 API 返回的结果进行分页，请使用 `offset` 和 `limit` 参数：

```js
strapi.db.query('api::article.article').findMany({
  offset: 15, 
  limit: 10,
});
```
