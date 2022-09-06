---
title: 具有实体服务 API 的组件和动态区域 - Strapi 开发人员文档
description: 使用 Strapi 的实体服务创建和更新组件和动态区域。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/entity-service/components-dynamic-zones.html
---

# 实体服务 API：组件和动态区域

[Entity Service](/developer-docs/latest/developer-resources/database-apis-reference/entity-service-api.md) 是处理 [组件](/developer-docs/latest/development/backend-customization/models.md#components) 和 [动态区域](/developer-docs/latest/development/backend-customization/models.md#dynamic-zones) 逻辑的层。使用实体服务 API，可以在创建或更新条目时[创建](#创建)和[更新](#更新)组件和动态区域。

## 创建

在使用实体服务 API 创建条目时，可以创建 [组件](/developer-docs/latest/development/backend-customization/models.md#components)：

```js
strapi.entityService.create('api::article.article', {
  data: {
    myComponent: {
      foo: 'bar',
    },
  },
});
```

在使用实体服务 API 创建条目时，可以创建 [动态区域](/developer-docs/latest/development/backend-customization/models.md#dynamic-zones)（即组件列表）：

```js
strapi.entityService.create('api::article.article', {
  data: {
    myDynamicZone: [
      {
        __component: 'compo.type',
        foo: 'bar',
      },
      {
        __component: 'compo.type2',
        foo: 'bar',
      },
    ],
  },
});
```

## 更新

在使用实体服务 API 更新条目时，可以更新 [组件](/developer-docs/latest/development/backend-customization/models.md#components) 。如果指定了组件 `id`，则会更新该组件，否则将删除旧组件并创建一个新组件：

```js
strapi.entityService.update('api::article.article', 1, {
  data: {
    myComponent: {
      id: 1, // will update component with id: 1 (if not specified, would have deleted it and created a new one)
      foo: 'bar',
    },
  },
});
```

[dynamic zone](/developer-docs/latest/development/backend-customization/models.md#dynamic-zones)（即组件列表）可以在使用实体服务 API 更新条目时进行更新。如果指定了组件 `id`，则会更新该组件，否则将删除旧组件并创建一个新组件：

```js
strapi.entityService.update('api::article.article', 1, {
  data: {
    myDynamicZone: [
      {
        // will update
        id: 2,
        __component: 'compo.type',
        foo: 'bar',
      },
      {
        // will add a new & delete old ones
        __component: 'compo.type2',
        foo: 'bar2',
      },
    ],
  },
});
```
