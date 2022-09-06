---
title: 查询引擎 API 填充 - Strapi 开发人员文档
description: 使用 Strapi 的查询引擎 API 在查询您的内容时填充关系。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/populating.html
---

# 查询引擎 API: Populating

关系和组件具有用于填充它们的统一 API。

要填充所有根级别关系，请使用 `populate: true`：

```js
strapi.db.query('api::article.article').findMany({
  populate: true,
});
```

通过传递属性名称数组来选择要填充的数据：

```js
strapi.db.query('api::article.article').findMany({
  populate: ['componentA', 'relationA'],
});
```

可以传递对象以进行更高级的用法：

```js
strapi.db.query('api::article.article').findMany({
  populate: {
    componentB: true,
    dynamiczoneA: true,
    relation: someLogic || true,
  },
});
```

复杂的填充也可以通过应用 `where` 过滤器并选择或填充嵌套关系来实现：

```js
strapi.db.query('api::article.article').findMany({
  populate: {
    relationA: {
      where: {
        name: {
          $contains: 'Strapi',
        },
      },
    },

    repeatableComponent: {
      select: ['someAttributeName'],
      orderBy: ['someAttributeName'],
      populate: {
        componentRelationA: true,
      },
    },

    dynamiczoneA: true,
  },
});
```
