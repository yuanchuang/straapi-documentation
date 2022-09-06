---
title: 查询引擎 API 的批量操作 - Strapi 开发人员文档
description: 使用 Strapi 的 Query Engine API 对多个条目执行操作。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/bulk-operations.html
---

# 查询引擎 API：批量操作

:::caution
为避免性能问题，不允许对关系执行批量操作。
:::

## createMany()

创建多个条目。

语法: `createMany(parameters) => { count: number }`

### 参数

| 参数 | 类型       | 描述         |
| --------- | ---------- | ------------------- |
| `data`      | Array of objects | Array of input data |

### 示例

```js
await strapi.db.query('api::blog.article').createMany({
  data: [
    {
      title: 'ABCD',
    },
    {
      title: 'EFGH',
    },
  ],
});

// { count: 2 }
```

## updateMany()

更新与参数匹配的多个条目。

语法: `updateMany(parameters) => { count: number }`

### 参数

| 参数 | 类型                       | 描述         |
| --------- | -------------------------- | ------------------- |
| `where`     | [`WhereParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.md) | [筛选](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.md)            |
| `data`      | Object                   | 输入数据 |

### 示例

```js
await strapi.db.query('api::shop.article').updateMany({
  where: {
    price: 20,
  },
  data: {
    price: 18,
  },
});

// { count: 42 }
```

## deleteMany()

删除与参数匹配的多个条目。

语法: `deleteMany(parameters) => { count: number }`

### 参数

| 参数 | 类型                       | 描述 |
| --------- | -------------------------- | ----------- |
| `where`     | [`WhereParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.md) | [筛选](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.md)              |

### 示例

```js
await strapi.db.query('api::blog.article').deleteMany({
  where: {
    title: {
      $startsWith: 'v3',
    },
  },
});

// { count: 42 }
```

## 聚合

### count()

对与参数匹配的条目进行计数。

语法: `count(parameters) => number`

#### 参数

| 参数 | 类型                       | 描述 |
| --------- | -------------------------- | ----------- |
| `where`     | [`WhereParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.md) | [筛选](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.md)              |

```js
const count = await strapi.db.query('api::blog.article').count({
  where: {
    title: {
      $startsWith: 'v3',
    },
  },
});

// 12
```
