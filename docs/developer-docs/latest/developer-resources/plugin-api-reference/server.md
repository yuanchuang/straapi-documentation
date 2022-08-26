---
title: Server API - Strapi 开发人员文档
description: Strapi 的插件服务器 API 允许 Strapi 插件自定义应用程序的后端部分（即服务器）。
sidebarDepth: 3
canonicalUrl: https://docs.strapi.io/developer-docs/latest/developer-resources/plugin-api-reference/server.html
---

# 用于插件的服务 API

一个 Strapi [插件](/developer-docs/latest/plugins/plugins-intro.md) 可以与后端交互或 Strapi 应用程序的 [前端]。服务器 API 是关于后端部分的。

创建和使用与服务器 API 交互的插件包括 2 个步骤:

1. 在 [`strapi-server.js` 入口文件](#入口文件) 中声明并导出插件接口
2. [使用导出的界面](#用法)

## 入口文件

利用服务器 API, 在插件包文件夹的根目录下创建 `strapi-server.js` 文件。此文件导出所需的接口中有提供以下参数：

| 参数类型        | 可用参数                                                                                                                                                                                           |
| -------------  | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 生命周期函数    | <ul><li> [register](#register)</li><li>[bootstrap](#bootstrap)</li><li>[destroy](#destroy)</li></ul>                                                                                                           |
| 配置           | [配置](#配置) 对象                                                                                                                                                                                |
| 自定义后台      | <ul><li>[contentTypes](#content-types)</li><li>[routes](#routes)</li><li>[controllers](#controllers)</li><li>[services](#services)</li><li>[policies](#policies)</li><li>[middlewares](#middlewares)</li></ul> |

## 生命周期函数

### register()

调用此函数来加载插件，在应用程序 [bootstrapped](#bootstrap) 之前，为了注册 [权限](/developer-docs/latest/plugins/users-permissions.md) 或数据库迁移。

**Type**: `Function`

**Example:**

```js
// path ./src/plugins/my-plugin/strapi-server.js

module.exports = () => ({
  register({ strapi }) {
    // execute some register code
  },
});
```

### bootstrap()

[bootstrap](/developer-docs/latest/setup-deployment-guides/configurations/optional/functions.md#bootstrap) 函数在插件 [registered](#register) 之后立即调用。

**Type**: `Function`

**Example:**

```js
// path: ./src/plugins/my-plugin/strapi-server.js

module.exports = () => ({
  bootstrap({ strapi }) {
    // execute some bootstrap code
  },
});
```

### destroy()

当 Strapi 实例被销毁时，调用 [destroy](/developer-docs/latest/setup-deployment-guides/configurations/optional/functions.md#destroy) 生命周期函数来清理插件（关闭连接、删除侦听器...）。

**Type**: `Function`

**Example:**

```js
// path: ./src/plugins/my-plugin/strapi-server.js

module.exports = () => ({
  destroy({ strapi }) {
    // execute some destroy code
  },
});
```

## 配置

`config` 存储默认插件配置。

**Type**: `Object`

| 参数         | 类型                                           | 描述                                                                                         |
| ----------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `default`   | Object, or Function that returns an Object     | 默认插件配置，与用户配置合并                                                                    |
| `validator` | Function                                       | <ul><li>检查将默认插件配置与用户配置合并的结果是否有效</li><li>当生成的配置无效时引发错误</li></ul> |

**Example:**

```js
// path: ./src/plugins/my-plugin/strapi-server.js or ./src/plugins/my-plugin/server/index.js

const config = require('./config');

module.exports = () => ({
  config: {
    default: ({ env }) => ({ optionA: true }),
    validator: (config) => { 
      if (typeof config.optionA !== 'boolean') {
        throw new Error('optionA has to be a boolean');
      }
    },
  },
});
```

定义后，可以访问配置：

* 通过 `strapi.plugin('plugin-name').config('some-key')` 访问特定的配置属性,
* 或通过 `strapi.config.get('plugin.plugin-name')` 访问整个配置对象.

## 自定义后端

### Content-types

插件提供的具有 [content-types](/developer-docs/latest/development/backend-customization/models.md) 的对象。

**Type**: `Object`

:::note
`contentTypes` 对象的 Content-Types keys 应复用架构 [`info`](/developer-docs/latest/development/backend-customization/models.md#model-information) key 中定义的 `singularName`。
:::

**Example:**

```js
// path: ./src/plugins/my-plugin/strapi-server.js

"use strict";

module.exports = require('./server');
```

```js
// path: ./src/plugins/my-plugin/server/index.js

const contentTypes = require('./content-types');

module.exports = () => ({
  contentTypes,
});
```

```js
// path: ./src/plugins/my-plugin/server/content-types/index.js

const contentTypeA = require('./content-type-a');
const contentTypeB = require('./content-type-b');

module.exports = {
  'content-type-a': { schema: contentTypeA }, // should re-use the singularName of the content-type
  'content-type-b': { schema: contentTypeB },
};
```

```js
// path: ./src/plugins/my-plugin/server/content-types/content-type-a.js

module.exports = {
  info: {
    tableName: 'content-type',
    singularName: 'content-type-a', // kebab-case mandatory
    pluralName: 'content-type-as', // kebab-case mandatory
    displayName: 'Content Type A',
    description: 'A regular content-type',
    kind: 'collectionType',
  },
  options: {
    draftAndPublish: true,
  },
  pluginOptions: {
    'content-manager': {
      visible: false,
    },
    'content-type-builder': {
      visible: false,
    }
  },
  attributes: {
    name: {
      type: 'string',
      min: 1,
      max: 50,
      configurable: false,
    },
  }
};
```

### Routes

一组 [Routes](/developer-docs/latest/development/backend-customization/routes.md) 配置。

**Type**: `Object[]`

**Example:**

```js
// path: ./src/plugins/my-plugin/strapi-server.js

"use strict";

module.exports = require('./server');
```

```js
// path: ./src/plugins/my-plugin/server/index.js

const routes = require('./routes');

module.exports = () => ({
  routes,
  type: 'content-api', // can also be 'admin' depending on the type of route
});
```

```js
// path: ./src/plugins/my-plugin/server/routes/index.js

module.exports = [
  {
    method: 'GET',
    path: '/model',
    handler: 'controllerName.action',
    config: {
      policies: ['policyName'],
    },
  },
];
```

### Controllers

带有插件提供的 [controllers](/developer-docs/latest/development/backend-customization/controllers.md) 对象。

**Type**: `Object`

**Example:**


```js
// path: ./src/plugins/my-plugin/strapi-server.js

"use strict";

module.exports = require('./server');
```

```js
// path: ./src/plugins/my-plugin/server/index.js

const controllers = require('./controllers');

module.exports = () => ({
  controllers,
});
```

```js
// path: ./src/plugins/my-plugin/server/controllers/index.js

const controllerA = require('./controller-a');
const controllerB = require('./controller-b');

module.exports = {
  controllerA,
  controllerB,
};
```

```js
// path: ./src/plugins/my-plugin/server/controllers/controller-a.js

module.exports = ({ strapi }) => ({
  doSomething(ctx) {
    ctx.body = { message: 'HelloWorld' };
  },
});
```

### Services

带有插件提供的 [services](/developer-docs/latest/development/backend-customization/services.md) 对象。

服务应该是以 `strapi` 为参数的函数。

**Type**: `Object`

**Example:**

```js
// path: ./src/plugins/my-plugin/strapi-server.js

"use strict";

module.exports = require('./server');
```

```js
// path: ./src/plugins/my-plugin/server/index.js

const services = require('./services');

module.exports = () => ({
  services,
});
```

```js
// path: ./src/plugins/my-plugin/server/services/index.js

const serviceA = require('./service-a');
const serviceB = require('./service-b');

module.exports = {
  serviceA,
  serviceB,
};
```

```js
// path: ./src/plugins/my-plugin/server/services/service-a.js

module.exports = ({ strapi }) => ({
  someFunction() {
    return [1, 2, 3];
  },
});
```

### Policies

带有插件提供的 [policies](/developer-docs/latest/development/backend-customization/policies.md) 对象。

**Type**: `Object`

**Example:**

```js
// path: ./src/plugins/my-plugin/strapi-server.js

"use strict";

module.exports = require('./server');
```

```js
// path: ./src/plugins/my-plugin/server/index.js

const policies = require('./policies');

module.exports = () => ({
  policies,
});
```

```js
// path: ./src/plugins/my-plugin/server/policies/index.js

const policyA = require('./policy-a');
const policyB = require('./policy-b');

module.exports = {
  policyA,
  policyB,
};
```

```js
// path: ./src/plugins/my-plugin/server/policies/policy-a.js

module.exports = (policyContext, config, { strapi }) => {
    if (ctx.state.user && ctx.state.user.isActive) {
      return true;
    }

    return false;
  },
};
```

### Middlewares

带有插件提供的 [middlewares](/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.md) 对象。

**Type**: `Object`

**Example:**

```js
// path: ./src/plugins/my-plugin/strapi-server.js

"use strict";

module.exports = require('./server');
```

```js
// path: ./src/plugins/my-plugin/server/index.js

const middlewares = require('./middlewares');
module.exports = () => ({
  middlewares,
});
```

```js
// path: ./src/plugins/my-plugin/server/middlewares/index.js

const middlewareA = require('./middleware-a');
const middlewareB = require('./middleware-b');

module.exports = {
  middlewareA,
  middlewareB,
};
```

```js
// path: ./src/plugins/my-plugin/server/middlewares/middleware-a.js

module.exports = (options, { strapi }) => {
 return async (ctx, next) => {
    const start = Date.now();
    await next();
    const delta = Math.ceil(Date.now() - start);

    strapi.log.http(`${ctx.method} ${ctx.url} (${delta} ms) ${ctx.status}`);
 };
};
```

## 用法

一旦插件被导出并加载到 Strapi 中，它的功能就可以通过 getters 在代码中访问。Strapi 实例 （`strapi`） 公开了顶级 getter 和全局 getter。

虽然顶级 getter 意味着链接函数，但全局 getter 是语法糖，允许使用功能的 uid 直接访问：

```js
// Access an API or a plugin controller using a top-level getter 
strapi.api['api-name'].controller('controller-name')
strapi.plugin('plugin-name').controller('controller-name')

// Access an API or a plugin controller using a global getter
strapi.controller('api::api-name.controller-name')
strapi.controller('plugin::plugin-name.controller-name')
```

:::details 顶级 getter 语法示例

```js
strapi.plugin('plugin-name').config
strapi.plugin('plugin-name').routes
strapi.plugin('plugin-name').controller('controller-name')
strapi.plugin('plugin-name').service('service-name')
strapi.plugin('plugin-name').contentType('content-type-name')
strapi.plugin('plugin-name').policy('policy-name')
strapi.plugin('plugin-name').middleware('middleware-name')
```

:::

:::details 全局 getter 语法示例

```js
strapi.controller('plugin::plugin-name.controller-name');
strapi.service('plugin::plugin-name.service-name');
strapi.contentType('plugin::plugin-name.content-type-name');
strapi.policy('plugin::plugin-name.policy-name');
strapi.middleware('plugin::plugin-name.middleware-name');
```

:::

::: strapi 实体服务接口
使用 [Entity Service API](/developer-docs/latest/developer-resources/database-apis-reference/entity-service-api.md) 与 content-types 交互
:::
