---
title: 管理面板配置- Strapi 开发人员文档
description: Strapi 的管理面板为其配置提供了一个入口点文件。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/admin-panel.html
---

# 管理面板配置

`./config/admin.js` 用于定义 Strapi 应用程序的管理面板配置。

## 可用选项

`./config/admin.js` 文件可以包含以下参数：

| 参数                         | 描述                                                                                                                                                                                              | 类型          | 默认值                                                                                                                          |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `apiToken.salt`                   | 用于生成 [API tokens](/developer-docs/latest/setup-deployment-guides/configurations/optional/api-tokens.md) 的盐                                                                                  | string        | Random string                                                                                    |
| `auth`                            | 身份验证配置                                                                                                                                                                             | object        | -                                                                                                                                |
| `auth.secret`                     | 用于对 JWT tokens 进行编码的密钥                                                                                                                                                                         | string        | `undefined`                                                                                                                      |
| `auth.options`                    | 传递给 [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) 的选项对象                                                                                                                    | object        | -                                                                                                                      |
| `auth.options.expiresIn`          | JWT 在 [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) 中使用的过期时间                                                                                                                        | object        | `30d`                                                                                                                            |
| `auth.events`                     | 为身份验证注册的所有事件订阅者的记录                                                                                                                                   | object        | `{}`                                                                                                                             |
| `auth.events.onConnectionSuccess` | 管理员用户成功登录到管理面板时调用的函数                                                                                                                       | function      | `undefined`                                                                                                                      |
| `auth.events.onConnectionError`   | 管理员用户登录管理面板失败时调用的函数                                                                                                                           | function      | `undefined`                                                                                                                      |
| `url`                             | 管理面板的网址。默认值：`/admin`。注意：如果网址是相对的，它将与 `url` 连接。                                                                                    | string        | `/admin`                                                                                                                         |
| `autoOpen`                        | 启用或禁用在启动时打开的管理。                                                                                                                                                    | boolean       | `true`                                                                                                                           |
| `watchIgnoreFiles`                | 添加在开发过程中不应监视的自定义文件。查看更多 [这里](https://github.com/paulmillr/chokidar#path-filtering) (属性 `ignored`).                                              | array(string) | `[]`                                                                                                                             |
| `host`                            | 为管理面板使用其他主机。仅与 `strapi develop --watch-admin` 一起使用                                                                                                             | string        | `localhost`                                                                                                                      |
| `port`                            | 为管理面板使用其他端口。仅与 `strapi develop --watch-admin` 一起使用                                                                                                          | string        | `8000`                                                                                                                           |
| `serveAdminPanel`                 | 如果为 false，则不会提供管理面板。注意 `index.html` 仍将被服务。参见 [defaultIndex 选项](/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.md) | boolean       | `true`                                                                                                                           |
| `forgotPassword`                  | 自定义忘记密码电子邮件的设置 (参见 [忘记密码电子邮件](/developer-docs/latest/development/admin-customization.md#forgotten-password-email))                             | object        | {}                                                                                                                               |
| `forgotPassword.emailTemplate`    | 电子邮件模板，如 [email plugin](/developer-docs/latest/plugins/email.md#using-the-sendtemplatedemail-function) 中所定义                                                                                                  | object        | [Default template](https://github.com/strapi/strapi/blob/main/packages/core/admin/server/config/email-templates/forgot-password.js) |
| `forgotPassword.from`             | 发件人邮件地址                                                                                                                                                                                      | string        | Default value defined in your [provider configuration](/developer-docs/latest/development/providers.md#configuring-providers)             |
| `forgotPassword.replyTo`          | 要求接收方回复的一个或多个默认地址                                                                                                                                         | string        | Default value defined in your [provider configuration](/developer-docs/latest/development/providers.md#configuring-providers)             |

## 配置

`./config/admin.js` 文件至少应包含具有身份验证和 [API tokens](/developer-docs/latest/setup-deployment-guides/configurations/optional/api-tokens.md) 所需参数的最小配置。对于完整配置，可以包含其他参数。

:::note
[环境配置](/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.md) (即，使用 `env()` 帮助程序）不需要包含所有值，只要它们存在于默认的 `./config/server.js` 中。
:::

:::: tabs card

::: tab Minimal configuration

使用任何新项目创建的默认配置至少应包括以下内容：

<code-group>

<code-block title="JAVASCRIPT">

```js
// path: ./config/admin.js

module.exports = ({ env }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT', 'someRandomLongString'),
  },
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'someSecretKey'),
  },
});

```

</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./config/admin.ts

module.exports = ({ env }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT', 'someRandomLongString'),
  },
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'someSecretKey'),
  },
});
```

</code-block>

</code-group>

:::

::: tab Full configuration

<code-group>

<code-block title="JAVASCRIPT">

```js
// path: ./config/admin.js

module.exports = ({ env }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT', 'someRandomLongString'),
  },
  auth: {
    events: {
      onConnectionSuccess(e) {
        console.log(e.user, e.provider);
      },
      onConnectionError(e) {
        console.error(e.error, e.provider);
      },
    },
    options: {
      expiresIn: '7d',
    },
    secret: env('ADMIN_JWT_SECRET', 'someSecretKey'),
  },
  url: env('PUBLIC_ADMIN_URL', '/dashboard'),
  autoOpen: false,
  watchIgnoreFiles: [
    './my-custom-folder', // Folder
    './scripts/someScript.sh', // File
  ],
  host: 'localhost', // Only used for --watch-admin
  port: 8003, // Only used for --watch-admin
  serveAdminPanel: env.bool('SERVE_ADMIN', true),
  forgotPassword: {
    from: 'no-reply@example.com',
    replyTo: 'no-reply@example.com',
  },
});

```

</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./config/admin.js

module.exports = ({ env }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT', 'someRandomLongString'),
  },
  auth: {
    events: {
      onConnectionSuccess(e) {
        console.log(e.user, e.provider);
      },
      onConnectionError(e) {
        console.error(e.error, e.provider);
      },
    },
    options: {
      expiresIn: '7d',
    },
    secret: env('ADMIN_JWT_SECRET', 'someSecretKey'),
  },
  url: env('PUBLIC_ADMIN_URL', '/dashboard'),
  autoOpen: false,
  watchIgnoreFiles: [
    './my-custom-folder', // Folder
    './scripts/someScript.sh', // File
  ],
  host: 'localhost', // Only used for --watch-admin
  port: 8003, // Only used for --watch-admin
  serveAdminPanel: env.bool('SERVE_ADMIN', true),
  forgotPassword: {
    from: 'no-reply@example.com',
    replyTo: 'no-reply@example.com',
  },
});
```

</code-block>

</code-group>
