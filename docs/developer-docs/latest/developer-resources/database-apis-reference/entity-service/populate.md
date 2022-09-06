---
title: 实体服务 API - Populating - Strapi 开发人员文档
description: 使用 Strapi 的实体服务 API 填充查询中的关系。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/entity-service/populate.html
---

# 实体服务 API: Populating

[实体服务 API](/developer-docs/latest/developer-resources/database-apis-reference/entity-service-api.md) 默认情况下，不会填充关系、元件或动态区域。

## 基本 populating

要填充所有根级别关系，请使用 `populate: '*'`:
```js
const entries = await strapi.entityService.findMany('api::article.article', {
  populate: '*',
});
```

通过传递属性名称数组来填充各种组件或关系字段：

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  populate: ['componentA', 'relationA'],
});
```

## 高级 populating

可以传递对象以进行更高级的填充：

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  populate: {
    relationA: true,
    repeatableComponent: {
      fields: ['fieldA'],
      filters: {},
      sort: 'fieldA:asc',
      populate: {
        relationB: true,
      },
    },
  },
});
```

复杂的填充可以通过使用 [`filters` 参数](/developer-docs/latest/developer-resources/database-apis-reference/entity-service/filter.md) 并选择或填充嵌套关系或组件来实现：

```js
const entries = await strapi.entityService.findMany('api::article.article', {
  populate: {
    relationA: {
      filters: {
        name: {
          $contains: 'Strapi',
        },
      },
    },

    repeatableComponent: {
      fields: ['someAttributeName'],
      sort: ['someAttributeName'],
      populate: {
        componentRelationA: true,
      },
    },
  },
});
```
