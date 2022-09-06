---
title: REST API - Strapi Developer Docs
description: Interact with your Content-Types using the REST API endpoints Strapi generates for you.
sidebarDepth: 3
canonicalUrl: https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html
---

# REST API

REST API 允许通过 API 端点访问 [content-types](/developer-docs/latest/development/backend-customization/models.md) 。Strapi 在创建内容类型时自动创建 [API endpoints](#端点) 。[API parameters](/developer-docs/latest/developer-resources/database-apis-reference/rest/api-parameters.md) 可以在查询 API 端点以优化结果时使用。

::: note
默认情况下，REST API 不会填充任何关系、媒体字段、组件或动态区域。使用 [`populate` parameter](/developer-docs/latest/developer-resources/database-apis-reference/rest/populating-fields.md) 来填充特定字段。
:::

## 端点

对于每个内容类型，将自动生成以下端点：

<style lang="stylus">
#endpoint-table
  table
    display table
    width 100%

  tr
    border none
    &:nth-child(2n)
      background-color white

  tbody
    tr
      border-top 1px solid #dfe2e5

  th, td
    border none
    padding 1.2em 1em
    border-right 1px solid #dfe2e5
    &:last-child
      border-right none

</style>

:::: tabs card

::: tab Collection type

<div id="endpoint-table">

| Method   | URL                             | Description                           |
| -------- | ------------------------------- | ------------------------------------- |
| `GET`    | `/api/:pluralApiId`             | [Get a list of entries](#get-entries) |
| `POST`   | `/api/:pluralApiId`             | [Create an entry](#create-an-entry)   |
| `GET`    | `/api/:pluralApiId/:documentId` | [Get an entry](#get-an-entry)         |
| `PUT`    | `/api/:pluralApiId/:documentId` | [Update an entry](#update-an-entry)   |
| `DELETE` | `/api/:pluralApiId/:documentId` | [Delete an entry](#delete-an-entry)   |

</div>

:::

::: tab Single type

<div id="endpoint-table">

| Method   | URL                   | Description                                |
| -------- | --------------------- | ------------------------------------------ |
| `GET`    | `/api/:singularApiId` | [Get an entry](#get-an-entry)              |
| `PUT`    | `/api/:singularApiId` | [Update/Create an entry](#update-an-entry) |
| `DELETE` | `/api/:singularApiId` | [Delete an entry](#delete-an-entry)        |

</div>

:::

::::

::::: details Examples:

:::: tabs card

::: tab Collection type

`Restaurant` **Content type**

<div id="endpoint-table">

| Method | URL                      | Description               |
| ------ | ------------------------ | ------------------------- |
| GET    | `/api/restaurants`       | Get a list of restaurants |
| POST   | `/api/restaurants`       | Create a restaurant       |
| GET    | `/api/restaurants/:id`   | Get a specific restaurant |
| DELETE | `/api/restaurants/:id`   | Delete a restaurant       |
| PUT    | `/api/restaurants/:id`   | Update a restaurant       |

</div>

:::

::: tab Single type

`Homepage` **Content type**

<div id="endpoint-table">

| Method | URL             | Description                        |
| ------ | --------------- | ---------------------------------- |
| GET    | `/api/homepage` | Get the homepage content           |
| PUT    | `/api/homepage` | Update/create the homepage content |
| DELETE | `/api/homepage` | Delete the homepage content        |

</div>

:::
::::
:::::

::: note
[Components](/developer-docs/latest/development/backend-customization/models.md#components) 没有 API 端点。
:::

## 请求

请求将响应作为对象返回，该对象通常包含以下键：

- `data`: 响应数据本身，可以是：
  - 单个条目，作为具有以下键的对象
    - `id` (number)
    - `attributes` (object)
    - `meta` (object)
  - 条目列表，作为对象数组
  - 自定义响应

- `meta` (object): 有关分页、发布状态、可用区域设置等的信息。

- `error` (object, _optional_): 有关请求引发的任何 [error](/developer-docs/latest/developer-resources/error-handling.md) 的信息

::: note
某些插件（包括用户和权限和上传）可能不遵循此响应格式。
:::
### Get entries

返回与查询筛选器匹配的条目（请参阅 [API 参数](/developer-docs/latest/developer-resources/database-apis-reference/rest/api-parameters.md) 文档）。

:::: api-call

::: request Example request

`GET http://localhost:1337/api/restaurants`

:::

::: response Example response

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Restaurant A",
        "description": "Restaurant A's description"
      },
      "meta": {
        "availableLocales": []
      }
    },
    {
      "id": 2,
      "attributes": {
        "title": "Restaurant B",
        "description": "Restaurant B's description"
      },
      "meta": {
        "availableLocales": []
      }
    },
  ],
  "meta": {}
}

```

:::

::::

### Get an entry

返回按 `id` 的条目。

:::: api-call

::: request Example request

`GET http://localhost:1337/api/restaurants/1`

:::

::: response Example response

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Restaurant A",
      "description": "Restaurant A's description"
    },
    "meta": {
      "availableLocales": []
    }
  },
  "meta": {}
}

```

:::

::::

### Create an entry

创建一个条目并返回其值。

如果安装了 [Internationalization (i18n) plugin](/developer-docs/latest/plugins/i18n.md)，则可以使用 POST 请求对 REST API 来 [创建本地化条目](/developer-docs/latest/plugins/i18n.md#creating-a-new-localized-entry).

:::: api-call

::: request Example request

`POST http://localhost:1337/api/restaurants`

```json
{
  "data": {
    "title": "Hello",
    "relation": 2,
    "relations": [2, 4],
    "link": {
      "id": 1,
      "type": "abc"
    }
  }
}
```

:::

::: response Example response

```json
{
  "data": {
    "id": 1,
    "attributes": { … },
    "meta": {}
  },
  "meta": {}
}
```

:::

::::

### Update an entry

按 `id` 部分更新条目并返回其值。

未在查询中发送的字段不会在数据库中更改。发送 `null` 值以清除字段。

:::: api-call

::: request Example request

`PUT http://localhost:1337/api/restaurants/1`

```json
{
  "data": {
    "title": "Hello",
    "relation": 2,
    "relations": [2, 4],
  }
}
```

:::

::: response Example response

```json
{
  "data": {
    "id": 1,
    "attributes": {},
    "meta": {}
  },
  "meta": {}
}
```

::::

:::note
即使安装了 [Internationalization (i18n) plugin](/developer-docs/latest/plugins/i18n.md)，目前也无法 [更新本地条目](/developer-docs/latest/plugins/i18n.md#updating-an-entry).
:::

### Delete an entry

删除按 `id` 排列的条目并返回其值。

:::: api-call

::: request Example request

`DELETE http://localhost:1337/api/restaurants/1`

:::

::: response Example response

```json
{
  "data": {
    "id": 1,
    "attributes": {},
    "meta": {}
  },
  "meta": {}
}
```

:::
::::
