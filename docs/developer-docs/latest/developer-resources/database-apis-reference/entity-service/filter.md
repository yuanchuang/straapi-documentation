---
title: 使用实体服务 API 进行筛选 - Strapi 开发人员文档
description: 使用 Strapi 的实体服务 API 筛选查询结果。
sidebarDepth: 3
canonicalUrl: https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/entity-service/filter.html
---

# 实体服务 API：筛选

[实体服务 API](/developer-docs/latest/developer-resources/database-apis-reference/entity-service-api.md) 提供了过滤使用其 [findMany()](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/crud.md#findmany) 方法找到的结果的功能。

使用 [逻辑运算符](#逻辑运算符) 和 [属性运算符](#属性运算符) 的 `filters` 参数筛选结果。每个运算符都应以 `$` 为前缀。

## 逻辑运算符
 
### `$and`

所有条件都必须为 `true`.

**示例**

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
    $and: [
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

`$and` 在传递具有条件的对象时将隐式使用：

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
    title: 'Hello World',
    createdAt: { $gt: '2021-11-17T14:28:25.843Z' },
  },
});
```

### `$or`

一个或多个条件必须为 `true`。

**示例**

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
    $not: {
      title: 'Hello World',
    },
  },
});
```

:::note
`$not` 可用于：

- 作为逻辑运算符 (例如，在 `filters: { $not: { // conditions… }}`)
- [作为属性运算符](#not-2) (例如，在 `filters: { attribute-name: $not: { … } }`).
:::

:::tip
`$and`, `$or` and `$not` operators are nestable inside of another `$and`, `$or` or `$not` operator.
:::

## 属性运算符

:::caution
根据数据库的实现，使用这些运算符可能会给出不同的结果，因为比较由数据库而不是 Strapi 处理。
:::

### `$not`

否定条件。

**示例**

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
    title: {
      $eq: 'Hello World',
    },
  },
});
```

`$eq` 可以省略：

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
    title: 'Hello World',
  },
});
```

### `$eqi`

属性等于输入值（不区分大小写）。

**示例**

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
    title: {
      $in: ['Hello', 'Hola', 'Bonjour'],
    },
  },
});
```

`$in` 在传递值数组时可以省略：

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
    title: ['Hello', 'Hola', 'Bonjour'],
  },
});
```

### `$notIn`

属性不包含在输入列表中。

**示例**

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
    title: {
      $notContains: 'Hello',
    },
  },
});
```

### `$containsi`

属性包含输入值。`$containsi` 不区分大小写，而 [$contains](#contains) 则不区分大小写。

**示例**

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
    title: {
      $containsi: 'hello',
    },
  },
});
```

### `$notContainsi`

属性不包含输入值。`$notContainsi` 不区分大小写，而 [$notContains](#notcontains) 则区分大小写。

**示例**

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
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
const entries = await strapi.entityService.findMany('api::article.article', {
  filters: {
    title: {
      $notNull: true,
    },
  },
});
```
