---
title: 后端 - 中间件 - Strapi 开发人员文档
description : Strapi 中间件是为整个 Strapi 服务器应用程序配置和启用的。中间件可以根据您的需求进行定制。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/development/backend-customization/middlewares.html
---

# 中间件

::: strapi 不同类型的中间件

在 Strapi 中，有 2 个中间件概念共存：

- **Strapi middlewares** [已配置并启用](/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.md) 用于整个 Strapi 服务器应用程序。这些中间件可以在应用程序级别或 API 级别应用。<br/>本文档介绍如何实现它们。<br/>插件也可以添加 Strapi 中间件 (参见 [Server API 文档](/developer-docs/latest/developer-resources/plugin-api-reference/server.md#middlewares))。

- **Route middlewares** 的范围更有限，在路由级别被配置并用作中间件。它们在 [routes 文档](/developer-docs/latest/development/backend-customization/routes.md#middlewares)。 

:::

## 实现

可以实现新的应用程序级或 API 级中间件：
- 使用 [交互式 CLI 命令 `strapi generate`](/developer-docs/latest/developer-resources/cli/CLI.md#strapi-generate)
- 或通过在相应的文件夹中创建 JavaScript 文件来手动操作 (参见 [project structure](/developer-docs/latest/setup-deployment-guides/file-structure.md)):
  - `./src/middlewares/` 用于应用程序级中间件
  - `./src/api/[api-name]/middlewares/` 用于 API 级中间件
  - `./src/plugins/[plugin-name]/middlewares/` 用于 [插件中间件](/developer-docs/latest/developer-resources/plugin-api-reference/server.md#middlewares)

使用 REST API 的中间件具有以下函数：

<code-group>
<code-block title=JAVASCRIPT>

```js
// path: ./src/middlewares/my-middleware.js or ./src/api/[api-name]/middlewares/my-middleware.js

module.exports = (config, { strapi })=> {
  return (context, next) => {};
};
```

</code-block>

<code-block title=TYPESCRIPT>

```js
// path: ./src/middlewares/my-middleware.js or ./src/api/[api-name]/middlewares/my-middleware.ts

export default (config, { strapi })=> {
  return (context, next) => {};
};
```

</code-block>
</code-group>

创建后，应将自定义中间件添加到 [middlewares 配置文件](/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.md#loading-order) 中，否则 Strapi 将不会加载它们。

::: details 自定义计时器中间件的示例

<code-group>
<code-block title=JAVASCRIPT>

```js
// path: /config/middlewares.js
module.exports = () => {
  return async (ctx, next) => {
    const start = Date.now();

    await next();

    const delta = Math.ceil(Date.now() - start);
    ctx.set('X-Response-Time', delta + 'ms');
  };
};
```

</code-block>

<code-block title=TYPESCRIPT>

```js
// path: /config/middlewares.ts

export default () => {
  return async (ctx, next) => {
    const start = Date.now();

    await next();

    const delta = Math.ceil(Date.now() - start);
    ctx.set('X-Response-Time', delta + 'ms');
  };
};
```

</code-block>
</code-group>

:::

GraphQL 插件还允许使用不同的语法 [实现自定义中间件](/developer-docs/latest/plugins/graphql.md#middlewares)

## 用法

中间件根据其范围以不同的方式称为：

- 使用 `global::middleware-name` 对于应用级别中间件
- 使用 `api::api-name.middleware-name` 对于 API 级别中间件
- 使用 `plugin::plugin-name.middleware-name` 对于插件中间件

::: tip
要列出所有已注册的中间件，请运行 `yarn strapi middlewares:list`.
:::
