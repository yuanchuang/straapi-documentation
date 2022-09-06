---
title: 查询引擎 API 筛选操作 - Strapi Developer Docs
description: 使用 Strapi 的查询引擎 API 对结果进行筛选。
sidebarDepth: 3
canonicalUrl: https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.html
---

# 查询引擎 API: 筛选

[查询引擎 API](/developer-docs/latest/developer-resources/database-apis-reference/query-engine-api.md) 对 [findMany()](/developer-docs/latest/developer-resources/database-apis-reference/query-engine/single-operations.md#findmany) 方法提供过滤结果的功能。

使用 [逻辑运算符](#逻辑运算符) 和 [属性运算符](#属性运算符) 的 `where` 参数筛选结果。每个运算符都应以 `$` 为前缀。

## 逻辑运算符

### `$and`

所有条件都必须为 `true`.

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    $and: [
      {
        title: 'Hello World',
      },
      {
        createdAt: { $gt: '2021-11-17T14:28:25.843Z' },
      },
    ],
  },
  },
});
```

`$and` 在传递具有嵌套条件的对象时隐式使用：

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: 'Hello World',
    createdAt: { $gt: '2021-11-17T14:28:25.843Z' },
  },
});
```

### `$or`

一个或多个嵌套条件必须为 `true`。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    $or: [
      {
        title: 'Hello World',
      },
      {
        createdAt: { $gt: '2021-11-17T14:28:25.843Z' },
      },
    ],
  },
});
```

### `$not`

否定条件。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    $not: {
      title: 'Hello World',
    },
  },
});
```

:::note
`$not` 可用于：

- 作为逻辑算符 (例如，在 `where: { $not: { // conditions… }}`)
- or [作为属性运算符](#not-2) (例如，在 `where: { attribute-name: $not: { … } }`).
:::

:::tip
`$and`, `$or` 和 `$not` 运算符可嵌套在另一个 `$and`, `$or` 或 `$not` 运算符中。
:::

## 属性运算符

:::caution
根据数据库的实现，使用这些运算符可能会给出不同的结果，因为比较由数据库而不是 Strapi 处理。
:::

### `$not`

否定嵌套条件。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $not: {
        $contains: 'Hello World',
      },
    },
  },
});
```

### `$eq`

属性等于输入值。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $eq: 'Hello World',
    },
  },
});
```

`$eq` 可以省略：

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: 'Hello World',
  },
});
```

### `$eqi`

属性等于输入值（不区分大小写）。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $eqi: 'HELLO World',
    },
  },
});
```

### `$ne`

属性不等于输入值。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $ne: 'ABCD',
    },
  },
});
```

### `$in`

属性包含在输入列表中。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $in: ['Hello', 'Hola', 'Bonjour'],
    },
  },
});
```

`$in` 传递值数组时可以省略：

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: ['Hello', 'Hola', 'Bonjour'],
  },
});
```

### `$notIn`

属性不包含在输入列表中。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $notIn: ['Hello', 'Hola', 'Bonjour'],
    },
  },
});
```

### `$lt`

属性小于输入值。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    rating: {
      $lt: 10,
    },
  },
});
```

### `$lte`

属性小于或等于输入值。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    rating: {
      $lte: 10,
    },
  },
});
```

### `$gt`

属性大于输入值。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    rating: {
      $gt: 5,
    },
  },
});
```

### `$gte`

属性大于或等于输入值。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    rating: {
      $gte: 5,
    },
  },
});
```


### `$between`

属性介于 2 个输入值之间。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    rating: {
      $between: [1, 20],
    },
  },
});
```


### `$contains`

属性包含输入值（区分大小写）。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $contains: 'Hello',
    },
  },
});
```

### `$notContains`

属性不包含输入值（区分大小写）。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $notContains: 'Hello',
    },
  },
});
```

### `$containsi`

属性包含输入值。`$containsi` 不区分大小写，而 [$contains](#contains) 区分。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $containsi: 'hello',
    },
  },
});
```

### `$notContainsi`

属性不包含输入值。`$notContainsi` 不区分大小写，而 [$notContains](#notcontains) 区分。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $notContainsi: 'hello',
    },
  },
});
```

### `$startsWith`

属性以输入值开头。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $startsWith: 'ABCD',
    },
  },
});
```

### `$endsWith`

属性以输入值结尾。

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $endsWith: 'ABCD',
    },
  },
});
```

### `$null`

属性为 `null`.

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $null: true,
    },
  },
});
```

### `$notNull`

属性不为 `null`.

**示例**

```js
const entries = await strapi.db.query('api::article.article').findMany({
  where: {
    title: {
      $notNull: true,
    },
  },
});
```
