---
title: 服务配置- Strapi 开发人员文档
description: Strapi 为其服务器配置提供了一个入口点文件。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/server.html
---

# 服务配置

`./config/server.js`用于定义 Strapi 应用程序的服务器配置。

::: caution
对 `server.js` 文件进行更改需要重建管理面板。保存修改后的文件后，在终端中运行 `yarn build` 或 `npm run build` 来实现更改。
:::

## 可用选项

`./config/server.js` 文件可以包含以下参数：

<!-- TODO: add admin jwt config option -->

| 参数                           | 描述                                                                                                                                                                                                                                                                                                                                                                 | 类型              | 默认值             |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------- |
| `host`<br/><br/>❗️ _Mandatory_       | 主机名                                                                                                                                                                                                                                                                                                                                                                   | string            | `localhost`         |
| `port`<br/><br/>❗️ _Mandatory_       | 服务器应在其上运行的端口                                                                                                                                                                                                                                                                                                                                 | integer           | `1337`              |
| `app.keys`<br/><br/>❗️ _Mandatory_   | 声明会话密钥 (基于 [Koa session](https://github.com/koajs/session/blob/master/Readme.md)), 它由 `session` 中间件用于用户和权限插件以及文档                                                                                                                                                           | string            | `undefined`         |
| `socket`                            | 侦听套接字。当提供此选项时，主机和端口是装饰性的，同样在使用此选项时使用 `url` 来生成正确的 URL。此选项对于在不公开端口和在同一台计算机上使用代理服务器的情况下运行服务器非常有用 (例如， [Heroku nginx buildpack](https://github.com/heroku/heroku-buildpack-nginx#requirements-proxy-mode)) | string \| integer | `/tmp/nginx.socket` |
| `emitErrors`                        | 启用在发生错误时向 `koa` 发出错误，以便附加自定义逻辑或使用错误报告服务。                                                                                                                                                                                                                                                      | boolean           | `false`             |
| `url`                               | 服务器的公共网址。许多不同功能（例如：重置密码，第三个登录提供程序等）是必需的。还启用了代理支持，例如 Apache 或 Nginx，例如：`https://mywebsite.com/api`。url 可以是相对的，如果是这样，则与 `http://${host}:${port}` 一起使用作为基本 url。但是，建议使用绝对 URL。                          | string            | `''`                |
| `proxy`                             | 设置 koa 变量 `app.proxy`。当 `true` 时，代理标头字段将受信任。                                                                                                                                                                                                                                                                                          | boolean           | `false`             |
| `cron`                              | Cron 配置 ([`node-schedule`](https://github.com/node-schedule/node-schedule) 提供)                                                                                                                                                                                                                                                                           | object            |                     |
| `cron.enabled`                      | 启用或禁用 [CRON jobs](/developer-docs/latest/setup-deployment-guides/configurations/optional/cronjobs.md) 在特定位置安排作业 dates.                                                                                                                                                                                                                       | boolean           | `false`             |
| `cron.tasks`                        | 声明 [CRON jobs](/developer-docs/latest/setup-deployment-guides/configurations/optional/cronjobs.md) 以特定方式运行 dates.                                                                                                                                                                                                                                        | object            |                     |
| `dirs`                              | Strapi 使用的不同目录的路径配置。                                                                                                                                                                                                                                                                                                                  | object            |                     |
| `dirs.public`                       | 自定义公用文件夹的路径。                                                                                                                                                                                                                                                                                                                                   | string            | `./public`          |

## 配置

`./config/server.js` 文件至少应包含带有 `host` 和 `port` 参数的最小配置。对于完整配置，可以包含其他参数。

:::note
[环境配置](/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.md) (即使用 `env()` 帮助程序) 不需要包含所有值，只要它们存在于默认的 `./config/server.js` 中。
:::

::::: tabs card

:::: tab Minimal configuration

使用任何新项目创建的默认配置至少应包括以下内容：

<code-group>
<code-block title="JAVASCRIPT">

```js
// path: ./config/server.js

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
```

</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./config/server.ts

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
```

</code-block>
</code-group>

::::

:::: tab Full configuration

以下是完整配置文件的示例。并非所有这些键都是必需的（请参阅[可用选项](#可用选项)）。

<code-group>
<code-block title="JAVASCRIPT">

```js
// path: ./config/server.js

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  socket: '/tmp/nginx.socket', // only use if absolutely required
  emitErrors: false,
  url: env('PUBLIC_URL', 'https://api.example.com'),
  proxy: env.bool('IS_PROXIED', true),
  cron: {
    enabled: env.bool('CRON_ENABLED', false),
  },
});
```

</code-block>
<code-block title="TYPESCRIPT">

```js
// path: ./config/server.ts

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  socket: '/tmp/nginx.socket', // only use if absolutely required
  emitErrors: false,
  url: env('PUBLIC_URL', 'https://api.example.com'),
  proxy: env.bool('IS_PROXIED', true),
  cron: {
    enabled: env.bool('CRON_ENABLED', false),
  },
});
```
</code-block>
</code-group>

::::

:::::
