---
title: Routes - Strapi 开发人员文档
description: Strapi 路由处理对您的内容的请求，并为您的内容类型自动生成。路由可以根据您的需求进行定制。
sidebarDepth: 3
canonicalUrl: https://docs.strapi.io/developer-docs/latest/development/backend-customization/routes.html
---

# Routes

在任何 URL 上发送到 Strapi 的请求都由 Routes 处理。默认情况下，Strapi 为所有 content-types 生成 Routes (参见 [REST API 文档](/developer-docs/latest/developer-resources/database-apis-reference/rest-api.md)). Routes 可以被 [添加](#实现) 或配置：

- [policies](#policies), 可以阻止访问路由
- [middlewares](#middlewares), 控制和更改请求流和请求本身

一旦路由存在，请求路由就会执行一些由控制器处理的代码 (参见 [controllers 文档](/developer-docs/latest/development/backend-customization/controllers.md)).

## 实现

实现新路由包括在 `./src/api/[apiName]/routes` 文件夹内的路由器文件中定义它。 (参见 [project structure](/developer-docs/latest/setup-deployment-guides/file-structure.md)).

有 2 种不同的路由器文件结构，具体取决于用例：

- 配置 [核心路由器](#核心路由器)
- 或创建 [自定义路由器](#创建自定义路由器).

### 配置核心路由器

核心路由器 (即 `find`, `findOne`, `create`, `update`, `delete`) 对应于 Strapi 在创建新的 [内容类型](/developer-docs/latest/development/backend-customization/models.md#model-creation) 时自动创建的 [默认路由器](/developer-docs/latest/developer-resources/database-apis-reference/rest-api.md#endpoints) 

Strapi提供了一个 `createCoreRouter` 工厂功能，可以自动生成核心路由器，并允许：

- 将配置选项传递给每个路由器
- 并禁用某些核心路由器以[创建自定义路由器](#创建自定义路由器).

核心路由器文件是一个 JavaScript 文件，它使用以下参数导出对 `createCoreRouter` 的调用结果：

| 参数 | 描述                                                                                                                 | 类型     |
| ----------| --------------------------------------------------------------------------------------------------------------- | -------- |
| `prefix`  | 允许传入自定义前缀以添加到此型号的所有路由器 (例 `/test`)                                                           | `String` |
| `only`    | 仅加载的核心路由<br /><br/>不在此数组中的任何内容都将被忽略。                                                       | `Array` |
| `except`  | 不应加载的核心路由<br/><br />这个功能与 `only` 参数相反。                                                          | `Array` |
| `config`  | 对于路由要处理的配置 [policies](#policies), [middlewares](#middlewares) 和 [public availability](#public-routes)  | `Object` |

<br/>

<code-group>
<code-block title=JAVASCRIPT>

```js
// path: ./src/api/[apiName]/routes/[routerName].js (e.g './src/api/restaurant/routes/restaurant.js')

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::restaurant.restaurant', {
  prefix: '',
  only: ['find', 'findOne'],
  except: [],
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
    findOne: {},
    create: {},
    update: {},
    delete: {},
  },
});
```

</code-block>

<code-block title=TYPESCRIPT>

```js
// path: ./src/api/[apiName]/routes/[routerName].ts (e.g './src/api/restaurant/routes/restaurant.ts')

import { factories } from '@strapi/strapi'; 

export default factories.createCoreRouter('api::restaurant.restaurant', {
  prefix: '',
  only: ['find', 'findOne'],
  except: [],
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
    findOne: {},
    create: {},
    update: {},
    delete: {},
  },
});
```

</code-block>
</code-group>




<br />

通用实现示例：

<code-group>
<code-block title=JAVASCRIPT>

```js
// path: ./src/api/restaurant/routes/restaurant.js

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::restaurant.restaurant', {
  only: ['find'],
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    }
  }
});
```


</code-block>

<code-block title=TYPESCRIPT>

```js
// path: ./src/api/restaurant/routes/restaurant.ts

import { factories } from '@strapi/strapi'; 

export default factories.createCoreRouter('api::restaurant.restaurant', {
  only: ['find'],
  config: {
    find: {
      auth: false
      policies: [],
      middlewares: [],
    }
  }
});
```

</code-block>
</code-group>



这只允许从核心 `find` [controller](/developer-docs/latest/development/backend-customization/controllers.md) 的 `/restaurants` 路径上发出 `GET` 请求，而无需身份验证。

### 创建自定义路由

创建自定义路由 consists in creating a file that exports an array of objects, each object being a route with the following parameters:

| 参数                  | 描述                                                                      | 类型     |
| -------------------------- | -------------------------------------------------------------------------------- | -------- |
| `method`                   | 与路由关联的方法 (即 `GET`, `POST`, `PUT`, `DELETE` or `PATCH`)  | `String` |
| `path`                     | 到达路由，从根据前缀开始 (例 `/articles`)| `String` |
| `handler`                  | 到达路由时要执行的函数。<br>应遵循以下语法： `<controllerName>.<actionName>` | `String` |
| `config`<br><br>_Optional_ | 对于路由要处理的配置 [policies](policies), [middlewares](middlewares) 和 [public availability](#public-routes) <br/><br/>           | `Object` |

<br/>

可以使用参数和正则表达式创建动态路由。这些参数将在 `ctx.params` 对象中公开。有关更多详细信息，请参阅 [PathToRegex](https://github.com/pillarjs/path-to-regexp) 文档.

::: caution
路由文件按字母顺序加载。要在核心路由之前加载自定义路由，请确保适当地命名自定义路由（例 `01-custom-routes.js` 和 `02-core-routes.js`）。
:::

::: details 使用 URL 参数和路由正则表达式的自定义路由器示例

在以下示例中，自定义路由文件名以 `01-` 为前缀，以确保在核心路由之前到达路由。

```js
// path: ./src/api/restaurant/routes/01-custom-restaurant.js

module.exports = {
  routes: [
    { // Path defined with an URL parameter
      method: 'POST',
      path: '/restaurants/:id/review', 
      handler: 'restaurant.review',
    },
    { // Path defined with a regular expression
      method: 'GET',
      path: '/restaurants/:category([a-z]+)', // Only match when the URL parameter is composed of lowercase letters
      handler: 'restaurant.findByCategory',
    }
  ]
}
```

</code-block>

<code-block title=TYPESCRIPT>

```js
// path: ./src/api/restaurant/routes/custom-restaurant.ts

export default {
  routes: [
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/restaurants/:category/:id',
      handler: 'Restaurant.findOneByCategory',
    },
    { // Path defined with a regular expression
      method: 'GET',
      path: '/restaurants/:region(\\d{2}|\\d{3})/:id', // Only match when the first parameter contains 2 or 3 digits.
      handler: 'Restaurant.findOneByRegion',
    }
  ]
}
```

</code-block>
</code-group>

:::

## 配置

[core routers](#核心路由) 和 [custom routers](#创建自定义路由器) 具有相同的配置选项。路由配置在一个 `config` 对象中定义，该对象可用于处理 [policies](#policies) and [middlewares](#middlewares) or to [make the route public](#public-routes).

### 策略

[Policies](/developer-docs/latest/development/backend-customization/policies.md) 可以添加到路由配置中：

- 通过指向在 `./src/policies` 中注册的策略，无论是否传递自定义配置
- 或者直接声明策略实现，作为一个函数，它将 `policyContext` 用于扩展 [Koa's context](https://koajs.com/#context) (`ctx`) 和 `strapi` 实例作为参数 (参见 [policies 文档](/developer-docs/latest/development/backend-customization/routes.md))

:::: tabs card

::: tab Core router policy

<code-group>
<code-block title=JAVASCRIPT>

```js
// path: ./src/api/restaurant/routes/restaurant.js

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::restaurant.restaurant', {
  config: {
    find: {
      policies: [
        // point to a registered policy
        'policy-name',

        // point to a registered policy with some custom configuration
        { name: 'policy-name', config: {} }, 
        
        // pass a policy implementation directly
        (policyContext, config, { strapi }) => {
          return true;
        },
      ]
    }
  }
});
```

</code-block>

<code-block title=TYPESCRIPT>

```js
// path: ./src/api/restaurant/routes/restaurant.ts

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::restaurant.restaurant', {
  config: {
    find: {
      policies: [
        // point to a registered policy
        'policy-name',

        // point to a registered policy with some custom configuration
        { name: 'policy-name', config: {} }, 
        
        // pass a policy implementation directly
        (policyContext, config, { strapi }) => {
          return true;
        },
      ]
    }
  }
});
```

</code-block>
</code-group>


:::

::: tab Custom router policy

<code-group>
<code-block title=JAVASCRIPT>

```js
// path: ./src/api/restaurant/routes/custom-restaurant.js


module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/articles/customRoute',
      handler: 'controllerName.actionName',
      config: {
        policies: [
          // point to a registered policy
          'policy-name',

          // point to a registered policy with some custom configuration
          { name: 'policy-name', config: {} }, 

          // pass a policy implementation directly
          (policyContext, config, { strapi }) => {
            return true;
          },
        ]
      },
    },
  ],
};
```

</code-block>

<code-block title=TYPESCRIPT>

```js
// path: ./src/api/restaurant/routes/custom-restaurant.ts


export default {
  routes: [
    {
      method: 'GET',
      path: '/articles/customRoute',
      handler: 'controllerName.actionName',
      config: {
        policies: [
          // point to a registered policy
          'policy-name',

          // point to a registered policy with some custom configuration
          { name: 'policy-name', config: {} }, 

          // pass a policy implementation directly
          (policyContext, config, { strapi }) => {
            return true;
          },
        ]
      },
    },
  ],
};
```

</code-block>
</code-group>



:::

::::
  
  
### 中间件

[Middlewares](/developer-docs/latest/development/backend-customization/middlewares.md) 可以添加到路由配置中：

- 通过指向在 `./src/middlewares` 中注册的中间件，无论是否传递自定义配置
- 或者通过直接声明中间件实现，作为将 [Koa's context](https://koajs.com/#context) (`ctx`) 和 `strapi` 实例作为参数的函数：

:::: tabs card

::: tab Core router middleware

<code-group>
<code-block title=JAVASCRIPT>

```js
// path: ./src/api/restaurant/routes/restaurant.js

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::restaurant.restaurant', {
  config: {
    find: {
      middlewares: [
        // point to a registered middleware
        'middleware-name', 

        // point to a registered middleware with some custom configuration
        { name: 'middleware-name', config: {} }, 

        // pass a middleware implementation directly
        (ctx, next) => {
          return next();
        },
      ]
    }
  }
});
```

</code-block>

<code-block title=TYPESCRIPT>

```js
// path: ./src/api/restaurant/routes/restaurant.ts

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::restaurant.restaurant', {
  config: {
    find: {
      middlwares: [
        // point to a registered middleware
        'middleware-name', 

        // point to a registered middleware with some custom configuration
        { name: 'middleware-name', config: {} }, 

        // pass a middleware implementation directly
        (ctx, next) => {
          return next();
        },
      ]
    }
  }
});
```

</code-block>
</code-group>

:::

::: tab Custom router middleware

<code-group>
<code-block title=JAVASCRIPT>

```js
// path: ./src/api/restaurant/routes/custom-restaurant.js

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/articles/customRoute',
      handler: 'controllerName.actionName',
      config: {
        middlewares: [
          // point to a registered middleware
          'middleware-name', 

          // point to a registered middleware with some custom configuration
          { name: 'middleware-name', config: {} }, 

          // pass a middleware implementation directly
          (ctx, next) => {
            return next();
          },
        ],
      },
    },
  ],
};
```

</code-block>

<code-block title=TYPESCRIPT>

```js
// path: ./src/api/restaurant/routes/custom-restaurant.ts

export default  {
  routes: [
    {
      method: 'GET',
      path: '/articles/customRoute',
      handler: 'controllerName.actionName',
      config: {
        middlewares: [
          // point to a registered middleware
          'middleware-name', 

          // point to a registered middleware with some custom configuration
          { name: 'middleware-name', config: {} }, 

          // pass a middleware implementation directly
          (ctx, next) => {
            return next();
          },
        ],
      },
    },
  ],
};
```

</code-block>
</code-group>

:::

::::

### 公共路由

默认情况下，路由受 Strapi 的身份验证系统保护，该系统基于 [API tokens](/developer-docs/latest/setup-deployment-guides/configurations/optional/api-tokens.md) 或使用 [Users & Permissions plugin](/user-docs/latest/plugins/strapi-plugins.md#users-permissions-plugin).

在某些情况下，公开提供路由并控制正常 Strapi 身份验证系统之外的访问可能很有用。这可以通过将路由的 `auth` 配置参数设置为 `false` 来实现：

:::: tabs card

::: tab Core router with a public route

<code-group>
<code-block title=JAVASCRIPT>

```js
// path: ./src/api/restaurant/routes/restaurant.js

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::restaurant.restaurant', {
  config: {
    find: {
      auth: false
    }
  }
});
```

</code-block>

<code-block title=TYPESCRIPT>

```js
// path: ./src/api/restaurant/routes/restaurant.ts

import { factories } from '@strapi/strapi';

export default  factories.createCoreRouter('api::restaurant.restaurant', {
  config: {
    find: {
      auth: false
    }
  }
});
```

</code-block>
</code-group>

:::

::: tab Custom router with a public route

<code-group>
<code-block title=JAVASCRIPT>

```js
// path: ./src/api/restaurant/routes/custom-restaurant.js

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/articles/customRoute',
      handler: 'controllerName.actionName',
      config: {
        auth: false,
      },
    },
  ],
};
```

</code-block>

<code-block title=TYPESCRIPT>

```js
// path: ./src/api/restaurant/routes/custom-restaurant.ts

export default  {
  routes: [
    {
      method: 'GET',
      path: '/articles/customRoute',
      handler: 'controllerName.actionName',
      config: {
        auth: false,
      },
    },
  ],
};
```

</code-block>
</code-group>

:::

::::
