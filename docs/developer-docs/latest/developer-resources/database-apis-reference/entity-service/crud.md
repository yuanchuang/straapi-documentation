---
title: 使用实体服务 API 的 CRUD 操作 - Strapi 开发人员文档
description: Use Strapi's Entity Service API to perform CRUD (create, read, update, delete) operations on your content.
canonicalUrl: https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/entity-service/crud.html
---

# 实体服务 API：CRUD 操作

[实体服务 API](/developer-docs/latest/developer-resources/database-apis-reference/entity-service-api.md) 构建在 [查询引擎 API](/developer-docs/latest/developer-resources/database-apis-reference/entity-service-api.md) 并使用它来对实体执行 CRUD 操作。

## findOne()

查找与参数匹配的第一个条目。

语法: `findOne(uid: string, id: ID, parameters: Params)` ⇒ `Entry`

### 参数

| 参数  | 描述                                                                                                                                            | 类型                                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `fields`   | 要返回的属性                                                                                                                                  | `String[]`                                                                                                                                    |
| `populate` | Relations, components 和 dynamic zones 的 [populate](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/populate.md) | [`PopulateParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/populate.md) |

### 示例

```js
const entry = await strapi.entityService.findOne('api::article.article', 1, {
  fields: ['title', 'description'],
  populate: { category: true },
});
```

## findMany()

查找与参数匹配的条目。

语法: `findMany(uid: string, parameters: Params)` ⇒ `Entry[]`

### 参数

| 参数          | 描述                                                                                                                                                        | 类型                                                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fields`           | 要返回的属性                                                                                                                                               | `String[]`                                                                                                                                            |
| `filters`          | [Filters](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/filter.md) to use                                                      | [`FiltersParameters`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/filter.md)             |
| `start`            | 要跳过的条目数 (参见 [pagination](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/order-pagination.md#pagination))   | `Number`                                                                                                                                              |
| `limit`            | 要返回的条目数 (参见 [pagination](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/order-pagination.md#pagination)) | `Number`                                                                                                                                              |
| `sort`             | [Order](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/order-pagination.md) definition                                       | [`OrderByParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/order-pagination.md) |
| `populate`         | Relations, components 和 dynamic zones 的 [populate](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/populate.md)             | [`PopulateParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/populate.md)         |
| `publicationState` | 发布状态，可以是：<ul><li>`live` 仅返回已发布的条目 (默认)</li><li>`preview` 返回草稿条目和已发布的条目</li></ul>   | `PublicationStateParameter`                                                                                                                           |

### 示例

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  fields: ['title', 'description'],
  filters: { title: 'Hello World' },
  sort: { createdAt: 'DESC' },
  populate: { category: true },
});
```

## create()

创建一个条目并将其返回

语法: `create(uid: string, parameters: Params)` ⇒ `Entry`

### 参数

| 参数  | 描述                                                                                                                                            | 类型                                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `fields`   | 要返回的属性                                                                                                                                   | `String[]`                                                                                                                                    |
| `populate` | Relations, components 和 dynamic zones 的 [populate](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/populate.md) | [`PopulateParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/populate.md) |
| `data`     | 输入数据                                                                                                                                             | `Object`                                                                                                                                      |

### 示例

```js
const entry = await strapi.entityService.create('api::article.article', {
  data: {
    title: 'My Article',
  },
});
```

## update()

更新一个条目并将其返回。

:::note
`update()` 仅执行部分更新，因此不会替换未包含的现有字段。
:::

语法: `update(uid: string, id: ID, parameters: Params)` ⇒ `Entry`

### 参数

| 参数  | 描述                                                                                                                                            | 类型                                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `fields`   | 要返回的属性                                                                                                                                   | `String[]`                                                                                                                                    |
| `populate` | Relations, components 和 dynamic zones 的 [populate](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/populate.md) | [`PopulateParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/populate.md) |
| `data`     | 输入数据                                                                                                                                             | `object`                                                                                                                                      |

### 示例

```js
const entry = await strapi.entityService.update('api::article.article', 1, {
  data: {
    title: 'xxx',
  },
});
```

## delete()

删除一个条目并将其返回。

语法: `delete(uid: string, id: ID, parameters: Params)` ⇒ `Entry`

### 参数

| 参数  | 描述                                                                                                                                            | 类型                                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `fields`   | 要返回的属性                                                                                                                                   | `String[]`                                                                                                                                    |
| `populate` | Relations, components 和 dynamic zones 的 [populate](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/populate.md) | [`PopulateParameter`<Fa-Link color="grey"/>](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/populate.md) |

### 示例

```js
const entry = await strapi.entityService.delete('api::article.article', 1);
```
