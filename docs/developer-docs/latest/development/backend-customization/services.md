---
title: 后端 - 服务 - Strapi 开发人员文档
description: Strapi 服务是一组可重用的功能，可用于简化控制器逻辑。
sidebarDepth: 3
canonicalUrl: https://docs.strapi.io/developer-docs/latest/development/backend-customization/services.html
---

# 服务

服务是一组可重用的函数。它们对于尊重 "don’t repeat yourself" (DRY) 编程概念和简化[控制器](/developer-docs/latest/development/backend-customization/controllers.md) 逻辑特别有用。

## 实现

服务可以[手动生成或添加](#添加新服务)。Strapi提供了一个“createCoreService”工厂功能，该函数自动生成核心服务，并允许构建自定义服务或[扩展或替换生成的服务](#扩展核心服务)。

### 添加新服务

以下方式可以实现新服务：

- 使用 [交互式 CLI 命令 `strapi generate`](/developer-docs/latest/developer-resources/cli/CLI.md#strapi-generate)
- 或通过在相应的文件夹中创建 JavaScript 文件来手动操作 (参见 [project structure](/developer-docs/latest/setup-deployment-guides/file-structure.md)):
  - `./src/api/[api-name]/services/` 用于 API 服务
  - 或 `./src/plugins/[plugin-name]/services/` 用于[插件服务](/developer-docs/latest/developer-resources/plugin-api-reference/server.md#services)

要手动创建服务，请导出返回服务实现的工厂函数（即带有方法的对象）。此工厂函数接收 `strapi` 实例：

<code-group>
<code-block title="JAVASCRIPT">

```js
// path: ./src/api/restaurant/services/restaurant.js

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::restaurant.restaurant', ({ strapi }) =>  ({
  // Method 1: Creating an entirely new custom service
  async exampleService(...args) {
    let response = { okay: true }

    if (response.okay === false) {
      return { response, error: true }
    }

    return response
  },

  // Method 2: Wrapping a core service (leaves core logic in place)
  async find(...args) {  
    // Calling the default core controller
    const { results, pagination } = await super.find(...args);

    // some custom logic
    results.forEach(result => {
      result.counter = 1;
    });

    return { results, pagination };
  },

  // Method 3: Replacing a core service
  async findOne(entityId, params = {}) {
    return strapi.entityService.findOne('api::restaurant.restaurant', entityId, this.getFetchParams(params));
  }
}));
```

</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./src/api/restaurant/services/restaurant.ts

import { factories } from '@strapi/strapi'; 

export default factories.createCoreService('api::restaurant.restaurant', ({ strapi }) =>  ({
  // Method 1: Creating an entirely custom service
  async exampleService(...args) {
    let response = { okay: true }

    if (response.okay === false) {
      return { response, error: true }
    }

    return response
  },

  // Method 2: Wrapping a core service (leaves core logic in place)
  async find(...args) {  
    // Calling the default core controller
    const { results, pagination } = await super.find(...args);

    // some custom logic
    results.forEach(result => {
      result.counter = 1;
    });

    return { results, pagination };
  },

  // Method 3: Replacing a core service
  async findOne(entityId, params = {}) {
    return strapi.entityService.findOne('api::restaurant.restaurant', entityId, this.getFetchParams(params));
  }
}));
```

</code-block>
</code-group>

::: strapi Entity Service API
要开始创建自己的服务，请参阅 [Entity Service API](/developer-docs/latest/developer-resources/database-apis-reference/entity-service-api.md) 文档中的 Strapi 内置函数。
:::

:::: details 电子邮件服务示例

服务的目标是存储可重用的函数。`email` 服务可用于从我们的代码库中的不同函数发送电子邮件：

<code-group>
<code-block title=JAVASCRIPT>

```js
// path: ./src/api/email/services/email.js


const { createCoreService } = require('@strapi/strapi').factories;
const nodemailer = require('nodemailer'); // Requires nodemailer to be installed (npm install nodemailer)

// Create reusable transporter object using SMTP transport.
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'user@gmail.com',
    pass: 'password',
  },
});

module.exports = createCoreService('api::email.email', ({ strapi }) => ({
  send(from, to, subject, text) {
    // Setup e-mail data.
    const options = {
      from,
      to,
      subject,
      text,
    };

    // Return a promise of the function that sends the email.
    return transporter.sendMail(options);
  },
}));
```

</code-block>
<code-block title=TYPESCRIPT>

```js
// path: ./src/api/email/services/email.ts


import { factories } from '@strapi/strapi'; 
const nodemailer = require('nodemailer'); // Requires nodemailer to be installed (npm install nodemailer)

// Create reusable transporter object using SMTP transport.
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'user@gmail.com',
    pass: 'password',
  },
});

export default factories.createCoreService('api::restaurant.restaurant', ({ strapi }) => ({
  send(from, to, subject, text) {
    // Setup e-mail data. 
    const options = {
      from,
      to,
      subject,
      text,
    };

    // Return a promise of the function that sends the email.
    return transporter.sendMail(options);
  },
}));
```

</code-block>
</code-group>

该服务现在可以通过 `strapi.service('api::email.email').send(...args)` 的全局变量。它可以在代码库的另一部分中使用，如在以下控制器中：

<code-group>
<code-block title=JAVASCRIPT>

```js
// path: ./src/api/user/controllers/user.js

module.exports = createCoreController('api::restaurant.restaurant', ({ strapi }) =>  ({
  // GET /hello
  async signup(ctx) {
    const { userData } = ctx.body;

    // Store the new user in database.
    const user = await strapi.service('plugin::users-permissions.user').add(userData);

    // Send an email to validate his subscriptions.
    strapi.service('api::email.email').send('welcome@mysite.com', user.email, 'Welcome', '...');

    // Send response to the server.
    ctx.send({
      ok: true,
    });
  },
}));
```

</code-block>

<code-block title=TYPESCRIPT>

```js
// path: ./src/api/user/controllers/user.ts

export default factories.createCoreController('api::restaurant.restaurant', ({ strapi }) =>  ({
  // GET /hello
  async signup(ctx) {
    const { userData } = ctx.body;

    // Store the new user in database.
    const user = await strapi.service('plugin::users-permissions.user').add(userData);

    // Send an email to validate his subscriptions.
    strapi.service('api::email.email').send('welcome@mysite.com', user.email, 'Welcome', '...');

    // Send response to the server.
    ctx.send({
      ok: true,
    });
  },
}));
```

</code-block>
</code-group>

::::

::: note
当创建新的 [content-type](/developer-docs/latest/development/backend-customization/models.md#content-types) 时，Strapi 会使用占位符代码构建一个通用服务，该代码随时可以自定义。
:::

### 扩展核心服务

核心服务是为每个内容类型创建的，可以由 [controllers](/developer-docs/latest/development/backend-customization/controllers.md) 使用，通过 Strapi 项目执行可重用的逻辑。可以自定义核心服务以实现您自己的逻辑。下面的代码示例应该可以帮助您入门。

:::tip
核心服务可以完全替换为[创建自定义服务](#添加新服务)，并将其命名为与核心服务相同的名称（例如，`find`, `findOne`, `create`, `update`, 或 `delete`）。
:::

::::: details 集合类型示例

:::: tabs card

::: tab find()

```js
async find(params) {
  // some logic here
  const { results, pagination } = await super.find(params);
  // some more logic

  return { results, pagination };
}
```

:::

::: tab findOne()

```js
async findOne(entityId, params) {
  // some logic here
  const result = await super.findOne(entityId, params);
  // some more logic

  return result;
}
```

:::

::: tab create()

```js
async create(params) {
  // some logic here
  const result = await super.create(params);
  // some more logic

  return result;
}
```

:::

::: tab update()

```js
async update(entityId, params) {
  // some logic here
  const result = await super.update(entityId, params);
  // some more logic

  return result;
}
```

:::

::: tab delete()

```js
async delete(entityId, params) {
  // some logic here
  const result = await super.delete(entityId, params);
  // some more logic

  return result;
}
```

:::
::::
:::::

::::: details 单一类型示例
:::: tabs card

::: tab find()

```js
async find(params) {
  // some logic here
  const entity = await super.find(params);
  // some more logic

  return entity;
}
```

:::

::: tab update()

```js
async createOrUpdate({ data, ...params }) {
  // some logic here
  const entity = await super.createOrUpdate({ data, ...params });
  // some more logic

  return entity;
}
```

:::

::: tab delete()

```js
async delete(params) {
  // some logic here
  const entity = await super.delete(params);
  // some more logic

  return entity;
}
```

:::
::::
:::::

## 用法

创建服务后，可以从 [controllers](/developer-docs/latest/development/backend-customization/controllers.md) 或其他服务访问它：

```js
// access an API service
strapi.service('api::apiName.serviceName');
// access a plugin service
strapi.service('plugin::pluginName.serviceName');
```

::: tip
要列出所有可用的服务，请运行 `yarn strapi services:list`.
:::

:::
