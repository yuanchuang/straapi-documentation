---
title: 后端 - 控制器 - Strapi 开发人员文档
description: Strapi 控制器是包含客户端根据请求的路线访问的一组方法的文件，可以根据您的需要进行自定义。
sidebarDepth: 3
canonicalUrl: https://docs.strapi.io/developer-docs/latest/development/backend-customization/controllers.html
---

# 控制器

控制器是JavaScript文件，其中包含一组称为操作的方法，由客户端根据请求的 [route](/developer-docs/latest/development/backend-customization/routes.md) 访问。 每当客户端请求路由时，该操作都会执行业务逻辑代码并返回 [response](/developer-docs/latest/development/backend-customization/requests-responses.md#responses). 控制器表示 model-view-controller （MVC） 模式中的 C。

在大多数情况下，控制器将包含项目业务逻辑的大部分。但是随着控制器的逻辑变得越来越复杂，使用 [services](/developer-docs/latest/development/backend-customization/services.md) 将代码组织成可重用部分是一种很好的做法。

## 实现


控制器可以 [generated or added manually](#添加新控制器)。Strapi提供了一个 `createCoreController` 工厂功能，可以自动生成核心控制器，并允许构建自定义控制器或[扩展或替换生成的控制器](#扩展核心控制器)。


### 添加新控制器

以下方式可以实现新的控制器：

- 使用 [交互式命令 CLI 命令 `strapi generate`](/developer-docs/latest/developer-resources/cli/CLI.md#strapi-generate)
- 或通过创建 JavaScript 文件手动：
  - 在 API 控制器的 `./src/api/[api-name]/controllers/` 中（这个位置很重要，因为 Strapi 从那里自动加载控制器）
  - 或者在插件控制器的 `./src/plugins/[plugin-name]/server/controllers/` 这样的文件夹中，只要插件接口正确导出到 `strapi-server.js` 文件中，就可以在其他地方创建它们 (参见 [Server API for Plugins 文档](/developer-docs/latest/developer-resources/plugin-api-reference/server.md))

<code-group>
<code-block title=JAVASCRIPT>

```js
// path: ./src/api/restaurant/controllers/restaurant.js

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::restaurant.restaurant', ({ strapi }) =>  ({
  // Method 1: Creating an entirely custom action
  async exampleAction(ctx) {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },

  // Method 2: Wrapping a core action (leaves core logic in place)
  async find(ctx) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: 'en' }
    
    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    // some more custom logic
    meta.date = Date.now()

    return { data, meta };
  },

  // Method 3: Replacing a core action
  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service('api::restaurant.restaurant').findOne(id, query);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));
```

</code-block>

<code-block title=TYPESCRIPT>

```js
// path: ./src/api/restaurant/controllers/restaurant.ts

import { factories } from '@strapi/strapi'; 

export default factories.createCoreController('api::restaurant.restaurant', ({ strapi }) =>  ({
  // Method 1: Creating an entirely custom action
  async exampleAction(ctx) {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },

  // Method 2: Wrapping a core action (leaves core logic in place)
  async find(ctx) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: 'en' }
    
    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    // some more custom logic
    meta.date = Date.now()

    return { data, meta };
  },

  // Method 3: Replacing a core action
  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service('api::restaurant.restaurant').findOne(id, query);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));
```


</code-block>
</code-group>



每个控制器操作都可以是 `async` 或 `sync` 功能。每个操作都会接收一个上下文对象 （`ctx`） 作为参数。`ctx` 包含 [request context](/developer-docs/latest/development/backend-customization/requests-responses.md#requests) 和 [response context](/developer-docs/latest/development/backend-customization/requests-responses.md#responses).

::: details 实例：GET /hello 路由调用基本控制器

定义了一个特定的 `GET /hello` [route](/developer-docs/latest/development/backend-customization/routes.md)，路由器文件的名称 (即 `index`) 用于调用控制器处理程序(即 `index`)。每次向服务器发送 `GET /hello` 请求时, Strapi 都会在 `hello.js` 控制器中调用 `index` 操作并返回 `Hello World!`：

<code-group>
<code-block title=JAVASCRIPT>

```js
// path: ./src/api/hello/routes/hello.js

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/hello',
      handler: 'hello.index',
    }
  ]
}
```

```js
// path: ./src/api/hello/controllers/hello.js

module.exports = {
  async index(ctx, next) { // called by GET /hello 
    ctx.body = 'Hello World!'; // we could also send a JSON
  },
};
```

</code-block>

<code-block title=TYPESCRIPT>

```js
// path: ./src/api/hello/routes/hello.ts

export default {
  routes: [
    {
      method: 'GET',
      path: '/hello',
      handler: 'hello.index',
    }
  ]
}
```

```js
// path: ./src/api/hello/controllers/hello.ts

export default {
  async index(ctx, next) { // called by GET /hello 
    ctx.body = 'Hello World!'; // we could also send a JSON
  },
};
```

</code-block>
</code-group>

:::

::: note
当创建新的 [content-type](/developer-docs/latest/development/backend-customization/models.md#content-types) 时, Strapi 会使用占位符代码构建一个通用控制器，该控制器可供自定义。
:::

### 扩展核心控制器

将为每个内容类型创建默认控制器和操作。这些默认控制器用于返回对 API 请求的响应（例如，当访问 `GET /api/articles/3` 时，将调用 "Article" 内容类型的默认控制器的 `findOne` 操作）。可以自定义默认控制器以实现您自己的逻辑。下面的代码示例应该可以帮助您入门。

:::tip
来自核心控制器的操作可以完全替换为 [创建自定义操作](#添加新控制器) 并将操作命名为与原始操作相同的操作（例如 `find`, `findOne`, `create`, `update`, 或 `delete`）。
:::

::::: details 集合类型示例

:::: tabs card

::: tab find()

```js
async find(ctx) {
  // some logic here
  const { data, meta } = await super.find(ctx);
  // some more logic

  return { data, meta };
}
```

:::

::: tab findOne()

```js
async findOne(ctx) {
  // some logic here
  const response = await super.findOne(ctx);
  // some more logic

  return response;
}
```

:::

::: tab create()

```js
async create(ctx) {
  // some logic here
  const response = await super.create(ctx);
  // some more logic

  return response;
}
```

:::

::: tab update()

```js
async update(ctx) {
  // some logic here
  const response = await super.update(ctx);
  // some more logic

  return response;
}
```

:::

::: tab delete()

```js
async delete(ctx) {
  // some logic here
  const response = await super.delete(ctx);
  // some more logic

  return response;
}
```

:::
::::
:::::

::::: details Single type examples
:::: tabs card

::: tab find()

```js
async find(ctx) {
  // some logic here
  const response = await super.find(ctx);
  // some more logic

  return response;
}
```

:::

::: tab update()

```js
async update(ctx) {
  // some logic here
  const response = await super.update(ctx);
  // some more logic

  return response;
}
```

:::

::: tab delete()

```js
async delete(ctx) {
  // some logic here
  const response = await super.delete(ctx);
  // some more logic

  return response;
}
```

:::
::::
:::::

## 用途

控制器已声明并附加到路由。调用路由时会自动调用控制器，因此通常不需要显式调用控制器。但是 [services](/developer-docs/latest/development/backend-customization/services.md) 可以调用控制器，在这种情况下，应使用以下语法：

```js
// access an API controller
strapi.controller('api::api-name.controller-name');
// access a plugin controller
strapi.controller('plugin::plugin-name.controller-name');
```

::: tip
要列出所有可用的控制器，请运行 `yarn strapi controllers:list`.
:::
