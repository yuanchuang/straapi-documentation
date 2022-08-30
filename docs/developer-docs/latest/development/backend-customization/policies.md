---
title: 策略 - 后端 - Strapi 开发人员文档
description: Strapi 策略是在每个请求到达控制器之前对每个请求执行特定逻辑的函数。策略可根据您的需求定制
sidebarDepth: 3
canonicalUrl: https://docs.strapi.io/developer-docs/latest/development/backend-customization/policies.html
---

# 策略

策略是在每个请求到达 [controller](/developer-docs/latest/development/backend-customization/controllers.md) 之前对每个请求执行特定逻辑的函数 。它们主要用于保护业务逻辑。

Strapi 项目的每个 [route](/developer-docs/latest/development/backend-customization/routes.md) 都可以与一系列 策略相关联。例如，名为 `is-admin` 的 策略可以检查请求是否由管理员用户发送，并限制对关键路由的访问。

策略可以是全局的，也可以是限定范围的。[全局 policies](#global-policies) 可以关联到项目中的任何工艺路线。作用域内 策略仅适用于特定的 [API](#api-policies) 或 [plugin](#plugin-policies)。

## 实现

一个新的 policy 可以被实现：

- 使用 [交互式 CLI 命令 `strapi generate`](/developer-docs/latest/developer-resources/cli/CLI.md#strapi-generate) 
- 或通过在相应的文件夹中创建 JavaScript 文件来手动操作 (参见 [project structure](/developer-docs/latest/setup-deployment-guides/file-structure.md)):
  - `./src/policies/` 全局 policies
  - `./src/api/[api-name]/policies/` API policies
  - `./src/plugins/[plugin-name]/policies/` 插件 policies

<br/>

全局策略实现示例：

<code-group>
<code-block title="JAVASCRIPT">


```js
// path: ./src/policies/is-authenticated.js

module.exports = (policyContext, config, { strapi }) => {
  if (policyContext.state.user) { // if a session is open
    // go to next policy or reach the controller's action
    return true;
  }

  return false; // If you return nothing, Strapi considers you didn't want to block the request and will let it pass
};
```


</code-block>

<code-block title="TYPESCRIPT">


```js
// path: ./src/policies/is-authenticated.ts

export default (policyContext, config, { strapi }) => {
  if (policyContext.state.user) { // if a session is open
    // go to next policy or reach the controller's action
    return true;
  }

  return false; // If you return nothing, Strapi considers you didn't want to block the request and will let it pass
};
```

</code-block>
</code-group>


`policyContext` 是围绕 [controller](/developer-docs/latest/development/backend-customization/controllers.md) 上下文的包装器。它添加了一些逻辑，这些逻辑对于为 REST 和 GraphQL 实现策略非常有用。

<br/>

可以使用 `config` 对象配置策略：

<code-group>
<code-block title="JAVASCRIPT">


```js
// path: .src/api/[api-name]/policies/my-policy.js

module.exports = (policyContext, config, { strapi }) => {
    if (policyContext.state.user.role.code === config.role) { // if user's role is the same as the one described in configuration
      return true;
    }

    return false; // If you return nothing, Strapi considers you didn't want to block the request and will let it pass
};
```

</code-block>

<code-block title="TYPESCRIPT">


```js
// path: .src/api/[api-name]/policies/my-policy.ts

export default (policyContext, config, { strapi }) => {
    if (policyContext.state.user.role.code === config.role) { // if user's role is the same as the one described in configuration
      return true;
    }

    return false; // If you return nothing, Strapi considers you didn't want to block the request and will let it pass
  }
};
```

</code-block>
</code-group>


## 用法

要将策略应用于路由，请将其添加到其配置对象 (参见 [routes 文档](/developer-docs/latest/development/backend-customization/routes.md#policies)).

策略根据其范围以不同的方式称为：

- 使用 `global::policy-name` 对于 [全局策略](#全局策略)
- 使用 `api::api-name.policy-name` 对于 [API 策略](#api-策略)
- 使用 `plugin::plugin-name.policy-name` 对于 [插件策略](#插件策略)

::: tip
要列出所有可用策略，请运行 `yarn strapi policies:list`.
:::

### 全局策略

全局策略可以关联到项目中的任何路由。

<code-group>
<code-block title="JAVASCRIPT">

```js
// path: ./src/api/restaurant/routes/router.js

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/restaurants',
      handler: 'Restaurant.find',
      config: {
        /**
          Before executing the find action in the Restaurant.js controller,
          we call the global 'is-authenticated' policy,
          found at ./src/policies/is-authenticated.js.
         */
        policies: ['global::is-authenticated']
      }
    }
  ]
}
```

</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./src/api/restaurant/routes/router.ts

export default {
  routes: [
    {
      method: 'GET',
      path: '/restaurants',
      handler: 'Restaurant.find',
      config: {
        /**
          Before executing the find action in the Restaurant.js controller,
          we call the global 'is-authenticated' policy,
          found at ./src/policies/is-authenticated.js.
         */
        policies: ['global::is-authenticated']
      }
    }
  ]
}
```

</code-block>
</code-group>



### 插件策略

[Plugins](/developer-docs/latest/plugins/plugins-intro.md) 可以添加策略并将其公开给应用程序。例如，[Users & Permissions plugin](/user-docs/latest/users-roles-permissions/introduction-to-users-roles-permissions.md) 附带了策略，以确保用户经过身份验证或有权执行操作：

<code-group>
<code-block title="JAVASCRIPT">


```js
// path: ./src/api/restaurant/routes/router.js

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/restaurants',
      handler: 'Restaurant.find',
      config: {
        /**
          The `isAuthenticated` policy prodived with the `users-permissions` plugin 
          is executed before the `find` action in the `Restaurant.js` controller.
        */
        policies: ['plugins::users-permissions.isAuthenticated']
      }
    }
  ]
}
```

</code-block>

<code-block title="TYPESCRIPT">


```js
// path: ./src/api/restaurant/routes/router.ts

export default {
  routes: [
    {
      method: 'GET',
      path: '/restaurants',
      handler: 'Restaurant.find',
      config: {
        /**
          The `isAuthenticated` policy prodived with the `users-permissions` plugin 
          is executed before the `find` action in the `Restaurant.js` controller.
        */
        policies: ['plugins::users-permissions.isAuthenticated']
      }
    }
  ]
}
```

</code-block>
</code-group>


### API 策略

API 策略与已声明这些策略的 API 中定义的路由相关联。

<code-group>
<code-block title="JAVASCRIPT">

```js

// path: ./src/api/restaurant/policies/is-admin.js.

export default (policyContext, config, { strapi }) => {
  if (policyContext.state.user.role.name === 'Administrator') {
    // Go to next policy or will reach the controller's action.
    return true;
  }

  return false;
};


// path: ./src/api/restaurant/routes/router.ts

export default {
  routes: [
    {
      method: 'GET',
      path: '/restaurants',
      handler: 'Restaurant.find',
      config: {
        /**
          The `is-admin` policy found at `./src/api/restaurant/policies/is-admin.js`
          is executed before the `find` action in the `Restaurant.js` controller.
         */
        policies: ['is-admin']
      }
    }
  ]
}

```

</code-block>

<code-block title="TYPESCRIPT">

```js

// path: ./src/api/restaurant/policies/is-admin.ts.

module.exports = async (policyContext, config, { strapi }) => {
  if (policyContext.state.user.role.name === 'Administrator') {
    // Go to next policy or will reach the controller's action.
    return true;
  }

  return false;
};


// path: ./src/api/restaurant/routes/router.ts

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/restaurants',
      handler: 'Restaurant.find',
      config: {
        /**
          The `is-admin` policy found at `./src/api/restaurant/policies/is-admin.ts`
          is executed before the `find` action in the `Restaurant.js` controller.
         */
        policies: ['is-admin']
      }
    }
  ]
}

```

</code-block>
</code-group>



To use a policy in another API, reference it with the following syntax: `api::[apiName].[policyName]`:

<code-group>
<code-block title="JAVASCRIPT">

```js
// path: ./src/api/category/routes/router.js

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/categories',
      handler: 'Category.find',
      config: {
        /**
          The `is-admin` policy found at `./src/api/restaurant/policies/is-admin.js`
          is executed before the `find` action in the `Restaurant.js` controller.
        */
        policies: ['api::restaurant.is-admin']
      }
    }
  ]
}
```

</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./src/api/category/routes/router.ts

export default {
  routes: [
    {
      method: 'GET',
      path: '/categories',
      handler: 'Category.find',
      config: {
        /**
          The `is-admin` policy found at `./src/api/restaurant/policies/is-admin.ts`
          is executed before the `find` action in the `Restaurant.js` controller.
        */
        policies: ['api::restaurant.is-admin']
      }
    }
  ]
}
```

</code-block>
</code-group>


