---
title: 使用实体服务 API 进行排序和分页 - Strapi 开发人员文档
description: 使用 Strapi 的实体服务 API 对查询结果进行排序和分页。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/entity-service/order-pagination.html
---

# 实体服务 API：排序和分页

[实体服务 API](/developer-docs/latest/developer-resources/database-apis-reference/entity-service-api.md) 提供了 [排序](#排序) 和 [分页](#pagination) 结果的能力，可以通过其 [findMany()](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/crud.md#findmany) 方法。

## 排序

要对实体服务 API 返回的结果进行排序，请使用 `sort` 参数。结果可以基于[单个字段](#单个字段)或[多个字段](#多个字段)属性进行排序，也可以使用[关系排序](#关系排序)。

### 单个字段

要按单个字段对结果进行排序，只需将其传递给 `sort` 参数：

- 作为字符串以默认升序排序
- 或作为一个对象来定义字段名称和顺序（即 `'asc'` 表示升序或 `'desc'` 表示降序）

```js
strapi.entityService.findMany('api::article.article', {
  sort: 'id',
});

// single with direction
strapi.entityService.findMany('api::article.article', {
  sort: { id: 'desc' },
});
```

### 多个字段

要按多个字段对结果进行排序，请将这些字段作为数组传递给 `sort` 参数：

- 作为字符串数组，使用默认升序对多个字段进行排序
- 或作为对象数组来定义字段名称和顺序（即 `'asc'` 表示升序或 `'desc'` 表示降序）

```js
strapi.entityService.findMany('api::article.article', {
  sort: ['publishDate', 'name'],
});

// multiple with direction
strapi.entityService.findMany('api::article.article', {
  sort: [{ title: 'asc' }, { publishedAt: 'desc' }],
});
```

### 关系排序

字段也可以根据关系中的字段进行排序：

```js
strapi.entityService.findMany('api::article.article', {
  sort: {
    author: {
      name: 'asc',
    },
  },
});
```

## 分页

要对实体服务 API 返回的结果进行分页，请使用 `start` 和 `limit` 参数：

```js
strapi.entityService.findMany('api::article.article', {
  start: 10,
  limit: 15,
});
```
