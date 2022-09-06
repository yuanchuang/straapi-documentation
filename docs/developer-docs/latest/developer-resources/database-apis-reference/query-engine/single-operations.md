---
title: 查询引擎 API的单一操作 - Strapi 开发人员文档
description: 使用 Strapi的 Query Engine API 对单个条目执行操作。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/single-operations.html
---

# 查询引擎 API：单个操作

## findOne()

查找与参数匹配的第一个条目。

语法: `findOne(parameters) ⇒ Entry`

### 参数

| 参数  | 类型                                                                                                                                         | Description                                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `select`   | String, or Array of strings                                                                                                                  | 返回 [属性](/developer-docs/latest/development/backend-customization/models.md#model-attributes) |
| `where`    | [`WhereParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.md)          | [筛选](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.md)                                                                                                                 |
| `offset`   | Integer                                                                                                                                       | 要跳过的条目数                                                                                                |
| `orderBy`  | [`OrderByParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/order-pagination.md) | [排序](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/order-pagination.md) 定义 |
| `populate` | [`PopulateParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/populating.md)      | 要[填充](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/populating.md)的关系

### 示例

```js
const entry = await strapi.db.query('api::blog.article').findOne({
  select: ['title', 'description'],
  where: { title: 'Hello World' },
  populate: { category: true },
});
```

## findMany()

查找与参数匹配的条目。

语法: `findMany(parameters) ⇒ Entry[]`

### Parameters

| 参数 | 类型                           | 描述                                |
| --------- | ------------------------------ | ------------------------------------------ |
| `select`   | String, or Array of strings                                                                                                                  | 返回 [属性](/developer-docs/latest/development/backend-customization/models.md#model-attributes) |
| `where`    | [`WhereParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.md)          | [筛选](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.md)                                                                                                                 |
| `limit`     | Integer                       | 要返回的条目数               |
| `offset`   | Integer                                                                                                                                       | 要跳过的条目数                                                                                                |
| `orderBy`  | [`OrderByParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/order-pagination.md) | [排序](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/order-pagination.md) 定义 |
| `populate` | [`PopulateParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/populating.md)      | 要[填充](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/populating.md)的关系

### 示例

```js
const entries = await strapi.db.query('api::blog.article').findMany({
  select: ['title', 'description'],
  where: { title: 'Hello World' },
  orderBy: { publishedAt: 'DESC' },
  populate: { category: true },
});
```

## findWithCount()

查找与参数匹配的条目并对其进行计数。

语法: `findWithCount(parameters) => [Entry[], number]`

### Parameters

| 参数 | 类型                           | 描述                                |
| --------- | ------------------------------ | ------------------------------------------ |
| `select`   | String, or Array of strings                                                                                                                  | 返回 [属性](/developer-docs/latest/development/backend-customization/models.md#model-attributes) |
| `where`    | [`WhereParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.md)          | [筛选](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.md)                                                                                                                 |
| `limit`     | Integer                       | 要返回的条目数               |
| `offset`   | Integer                                                                                                                                       | 要跳过的条目数                                                                                                |
| `orderBy`  | [`OrderByParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/order-pagination.md) | [排序](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/order-pagination.md) 定义 |
| `populate` | [`PopulateParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/populating.md)      | 要[填充](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/populating.md)的关系
|

### 示例

```js
const [entries, count] = await strapi.db.query('api::blog.article').findWithCount({
  select: ['title', 'description'],
  where: { title: 'Hello World' },
  orderBy: { title: 'DESC' },
  populate: { category: true },
});
```

## create()

创建一个条目并返回该条目。

语法: `create(parameters) => Entry`

### Parameters

| 参数 | 类型                           | 描述                                |
| --------- | ------------------------------ | ------------------------------------------ |
| `select`   | String, or Array of strings                                                                                                                  | 返回 [属性](/developer-docs/latest/development/backend-customization/models.md#model-attributes) |
| `populate` | [`PopulateParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/populating.md)      | 要[填充](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/populating.md)的关系
| data      | Object                      | 输入数据                                 |

### 示例

```js
const entry = await strapi.db.query('api::blog.article').create({
  data: {
    title: 'My Article',
  },
});
```

## update()

更新一个条目并将其返回。

语法: `update(parameters) => Entry`

### Parameters

| 参数 | 类型                           | 描述                                |
| --------- | ------------------------------ | ------------------------------------------ |
| `select`   | String, or Array of strings                                                                                                                  | 返回 [属性](/developer-docs/latest/development/backend-customization/models.md#model-attributes) |
| `populate` | [`PopulateParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/populating.md)      | 要[填充](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/populating.md)的关系
| `where`    | [`WhereParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.md)          | [筛选](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.md)                                                                                                                 |
| `data`      | Object                      | 输入数据                                 |

### 示例

```js
const entry = await strapi.db.query('api::blog.article').update({
  where: { id: 1 },
  data: {
    title: 'xxx',
  },
});
```

## delete()

删除一个条目并将其返回。

语法: `delete(parameters) => Entry`

### Parameters

| 参数 | 类型                           | 描述                                |
| --------- | ------------------------------ | ------------------------------------------ |
| `select`   | String, or Array of strings                                                                                                            | 返回 [属性](/developer-docs/latest/development/backend-customization/models.md#model-attributes) |
| `populate` | [`PopulateParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/populating.md)      | 要[填充](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/populating.md)的关系
| `where`    | [`WhereParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.md)          | [筛选](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.md)                                      |

### 示例

```js
const entry = await strapi.db.query('api::blog.article').delete({
  where: { id: 1 },
});
```
