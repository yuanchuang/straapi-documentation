---
title: 中间件配置- Strapi 开发人员文档
description: Strapi offers a single entry point file for its middlewares configurations.
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.html
---

# 中间件配置

::: strapi Different types of middlewares

在 Strapi 中，2 个中间件概念共存：

- **Strapi 中间件** 被配置并启用为整个 Strapi 服务器应用程序的全局中间件。本文档介绍如何配置 Strapi 中间件。<br/>Strapi 还提供了实现您自己的自定义中间件的功能 (参见 [中间件定制文档](/developer-docs/latest/development/backend-customization/middlewares.md))

- **路由中间件** 的范围更有限，在路由级别被配置并用作中间件。在[路由中间件文档](/developer-docs/latest/development/backend-customization/routes.md#middlewares) 中进行了描述。

:::

`./config/middlewares.js` 文件用于定义 Strapi 服务器应应用的所有 Strapi 中间件。

仅应用 `./config/middlewares.js` 中存在的中间件。加载中间件以特定的[加载顺序](#加载顺序)进行，每个中间件都有一些[命名约定](#命名约定)和[可选配置](#可选配置)。

Strapi 使用内置的内部中间件预填充 `./config/middlewares.js` 文件，这些中间件都有自己的 [配置选项](#internal-middlewares-configuration-reference).

## 加载顺序

`./config/middlewares.js` 文件导出一个数组，其中顺序很重要并控制中间件堆栈的执行顺序：

<code-group>
<code-block title="JAVASCRIPT">

```js
// path: ./config/middlewares.js

module.exports = [
  // The array is pre-populated with internal, built-in middlewares, prefixed by `strapi::`
  'strapi::errors',
  'strapi::security',
  'strapi::cors',

  // custom middleware that does not require any configuration
  'my-custom-node-module', 

  // custom name to find a package or a path
  {
    name: 'my-custom-node-module',
    config: {
      foo: 'bar',
    },
  },

  // custom resolve to find a package or a path
  {
    resolve: '../some-dir/custom-middleware',
    config: {
      foo: 'bar',
    },
  },

  // custom configuration for internal middleware
  {
    name: 'strapi::poweredBy',
    config: {
      poweredBy: 'Some awesome company',
    },
  },

  // remaining internal & built-in middlewares
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

</code-block>

<code-block title="TYPESCRIPT">

```typescript
// path: ./config/middlewares.ts

export default [
  // The array is pre-populated with internal, built-in middlewares, prefixed by `strapi::`
  'strapi::cors',
  'strapi::body',
  'strapi::errors',
  // ...
  'my-custom-node-module', // custom middleware that does not require any configuration
  {
    // custom name to find a package or a path
    name: 'my-custom-node-module',
    config: {
      foo: 'bar',
    },
  },
  {
    // custom resolve to find a package or a path
    resolve: '../some-dir/custom-middleware',
    config: {
      foo: 'bar',
    },
  },
];
```

</code-block>
</code-group>


:::tip
如果您不确定中间件在堆栈中的什么位置放置，请将其添加到列表的末尾。
:::

## 命名约定

Strapi中间件可以根据其来源分为不同的类型，这定义了以下命名约定：

| 中间件类型   | 来源                                                                                                                                                                                                                                  | 命名约定                                                                                                    |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| Internal          | 内置中间件（即 Strapi 附带），自动加载                                                                                                                                                                 | `strapi::middleware-name`                                                                                            |
| Application-level | 从 `./src/middlewares` 文件夹加载                                                                                                                                                                                              | `global::middleware-name`                                                                                            |
| API-level         | 从 `./src/api/[api-name]/middlewares` 文件夹加载                                                                                                                                                                               | `api::api-name.middleware-name`                                                                                      |
| Plugin            | 从 [插件接口的 `middlewares` 属性](/developer-docs/latest/developer-resources/plugin-api-reference/server.md#middlewares) 导出 `strapi-server.js`                                                          | `plugin::plugin-name.middleware-name`                                                                                |
| External          | 可以：<ul><li>任一节点模块安装有[npm](https://www.npmjs.com/search?q=strapi-middleware)</li><li>或本地中间件 （即在本地创建并在 `./config/middlewares.js` 中配置的自定义中间件。</li></ul> | -<br/><br/>由于它们是直接从配置文件配置和解析的，因此它们没有命名约定。 |

## 可选配置

中间件可以具有以下参数的可选配置：

| 参数 | 描述                                                       | 类型     |
|-----------|-------------------------------------------------------------------|----------|
| `config`  | 用于定义或覆盖中间件配置           | `Object` |
| `resolve` | 中间件文件夹的路径（对外部中间件有用） | `String` |

## 内部中间件配置参考

Strapi的核心包括以下内部中间件，主要用于性能，安全性和错误处理：

| 中间件                                                                                  | 默认添加 | 必填 |
| ------------------------------------------------------------------------------------------- | ---------------- | -------- |
| [body](#body)                                                                               | Yes              | Yes      |
| [compression](#compression)                                                                 | No               | No       |
| [cors](#cors)                                                                               | Yes              | Yes      |
| [errors](#errors)                                                                           | Yes              | Yes      |
| [favicon](#favicon)                                                                         | Yes              | Yes      |
| [ip](#ip)                                                                                   | No               | No       |
| [logger](#logger)                                                                           | Yes              | No       |
| [poweredBy](#poweredby)                                                                     | Yes              | No       |
| [query](#query)                                                                             | Yes              | Yes      |
| [response-time](#response-time)                                                             | No               | No       |
| [responses](/developer-docs/latest/development/backend-customization/requests-responses.md) | Yes              | Yes      |
| [public](#public)                                                                           | Yes              | Yes      |
| [security](#security)                                                                       | Yes              | Yes      |
| [session](#session)                                                                         | Yes              | No       |

### `body`

`body` 中间件基于 [koa-body](https://github.com/koajs/koa-body)。它接受以下选项：

| 选项       | 描述                                                                                                                             | 类型                  | 默认值     |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------|-----------------------|-------------|
| `multipart`  | 解析多部分主体                                                                                                                 | `Boolean`             | `true`      |
| `patchKoa`   | 将请求正文添加到 Koa 的 `ctx.request`                                                                                                | `Boolean`             | `true`      |
| `jsonLimit`  | JSON 正文的字节（如果为整数）限制                                                                                           | `String` or `Integer` | `1mb`       |
| `formLimit`  | 表单正文的字节（如果为整数）限制                                                                                       | `String` or `Integer` | `56kb`      |
| `textLimit`  | 文本正文的字节（如果为整数）限制                                                                                        | `String` or `Integer` | `56kb`      |
| `encoding`   | 设置传入表单域的编码                                                                                                 | `String`              | `utf-8`     |
| `formidable` | 传递给 `formidable` 多部分解析器的选项 (参见 [node-formidable 文档](https://github.com/felixge/node-formidable)). | `Object`              | `undefined` |

有关 `koa-body` 的可用选项的完整列表，请查看 [koa-body 文档](https://github.com/koajs/koa-body#options).

::: details 示例：主体中间件的自定义配置

```js
// path: ./config/middlewares.js

module.exports = {
  // ...
  {
    name: 'strapi::body',
    config: {
      jsonLimit: '3mb',
      formLimit: '10mb',
      textLimit: '256kb',
      encoding: 'gbk',
    },
  },
  // ...
}
```

:::

### `compression`

`compression` 中间件基于 [koa-compress](https://github.com/koajs/compress)。它接受以下选项：

| 选项            | 描述                                                                | 类型                  | Default    |
|-------------------|----------------------------------------------------------------------------|-----------------------|------------|
| `threshold`       | Minimum response size in bytes to compress                                 | `String` or `Integer` | `1kb`      |
| `br`              | Toggle Brotli compression                                                  | `Boolean`             | `true`     |
| `gzip`            | Toggle gzip compression                                                    | `Boolean`             | `false`    |
| `deflate`         | Toggle deflate compression                                                 | `Boolean`             | `false`    |
| `defaultEncoding` | Specifies what encoders to use for requests without Accept-Encoding header | `String`              | `identity` |

::: details Example: Custom configuration for the compression middleware

```js
// path: ./config/middlewares.js

module.exports = {
  // ...
  {
    name: 'strapi::compression',
    config: {
      br: false
    },
  },
  // ...
}
```

:::

### `cors`

此安全中间件是关于跨域资源共享 （CORS） 的，并且基于 [@koa/cors](https://github.com/koajs/cors)。它接受以下选项：

| 选项              | 类型                                                      | 描述          | 默认值                                              |
|---------------------|-----------------------------------------------------------|----------------------|------------------------------------------------------------|
| `origin`            | 配置 `Access-Control-Allow-Origin` 协议头        | `String` 或 `Array`  | `'*'`                                                      |
| `maxAge`            | 配置 `Access-Control-Max-Age` 协议头, in seconds | `String` 或 `Number` | `31536000`                                                 |
| `credentials`       | 配置 `Access-Control-Allow-Credentials` 协议头   | `Boolean`            | `true`                                                     |
| `methods`           | 配置 `Access-Control-Allow-Methods` 协议头       | `Array` 或 `String`  | `['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS']`      |
| `headers`           | 配置 `Access-Control-Allow-Headers` 协议头       | `Array` 或 `String`  | 传入的请求协议头 `Access-Control-Request-Headers` |
| `keepHeaderOnError` | 如果引发错误，将设置协议头添加到 `err.header`    | `Boolean`            | `false`                                                    |

::: details 示例：中间件的自定义配置

```js
// path: ./config/middlewares.js

module.exports = {
  // ...
  {
    name: 'strapi::cors',
    config: {
      origin: ['example.com', 'subdomain.example.com', 'someotherwebsite.org'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  // ...
}
```

:::

### `errors`

中间件处理代码引发的错误 [errors](/developer-docs/latest/developer-resources/error-handling.md)。根据错误类型，它将适当的 HTTP 状态设置为响应。默认情况下，任何不应向最终用户公开的错误都将导致 500 HTTP 响应。

中间件没有任何配置选项。

### `favicon`

`favicon` 中间件是基于 [koa-favicon](https://github.com/koajs/favicon) 的 favicon 服务。它接受以下选项：

| 选项   | 描述                                      | 类型      | 默认值   |
|----------|--------------------------------------------------|-----------|-----------------|
| `path`   | 网站图标文件的路径                         | `String`  | `'favicon.ico'` |
| `maxAge` | 缓存控制最大期限指令，以毫秒为单位 | `Integer` | `86400000`      |

::: details 示例：网站图标中间件的自定义配置

```js
// path: ./config/middlewares.js

module.exports = {
  // ...
  {
    name: 'strapi::favicon',
    config: {
      path: './public/uploads/custom-fav-abc123.ico'
    },
  },
  // ...
}
```

:::

#### `ip`

`ip` 中间件是基于 [koa-ip](https://github.com/nswbmw/koa-ip) 的 IP 筛选器中间件。它接受以下选项。它接受以下选项：

| 选项      | 描述     | 类型    | 默认值 |
|-------------|-----------------|---------|---------------|
| `whitelist` | 白名单 IPs | `Array` | `[]`          |
| `blacklist` | 黑名单 IPs | `Array` | `[]`          |

:::tip
`whitelist` 和 `blacklist` 选项支持通配符（例如，`whitelist: ['192.168.0.*', '127.0.0.*']`) 和 (例如， `whitelist: ['192.168.*.[3-10]']`)。
:::

::: details 示例：IP 中间件的自定义配置

```js
// path: ./config/middlewares.js

module.exports = {
  // ...
  {
    name: 'strapi::ip',
    config: {
      whitelist: ['192.168.0.*', '192.168.1.*', '123.123.123.123'],
      blacklist: ['1.116.*.*', '103.54.*.*'],
    },
  },
  // ...
}
```

:::

### `logger`

`logger` 中间件用于记录请求。

要为 `logger` 中间件定义自定义配置，请创建专用配置文件 (`./config/logger.js`)。它应该导出一个对象，该对象必须是完整或部分 [winstonjs](https://github.com/winstonjs/winston) 记录器配置。该对象将在服务器启动时与 Strapi 的默认记录器配置合并。

::: details 示例：记录器中间件的自定义配置

```js
// path: ./config/logger.js

'use strict';

const {
  winston,
  formats: { prettyPrint, levelFilter },
} = require('@strapi/logger');

module.exports = {
  transports: [
    new winston.transports.Console({
      level: 'http',
      format: winston.format.combine(
        levelFilter('http'),
        prettyPrint({ timestamps: 'YYYY-MM-DD hh:mm:ss.SSS' })
      ),
    }),
  ],
};
```

:::

### `poweredBy`

`poweredBy` 中间件添加 `X-Powered-By` 参数到响应协议头。它接受以下选项：

| 选项      | 描述                        | 类型     | 默认值          |
|-------------|------------------------------------|----------|------------------------|
| `poweredBy` | `X-Powered-By` 协议头的值 | `String` | `'Strapi <strapi.io>'` |

::: details 示例：PoweredBy 中间件的自定义配置

```js
// path: ./config/middlewares.js

module.exports = {
  // ...
  {
    name: 'strapi::poweredBy',
    config: {
      poweredBy: 'Some Awesome Company <example.com>'
    },
  },
  // ...
}
```

:::

### `query`

`query` 中间件是基于 [qs](https://github.com/ljharb/qs)。它接受以下选项：

| 选项               | 描述                                                                                                                      | 类型      | 默认值 |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------|-----------|---------------|
| `strictNullHandling` | 区分 null 和空字符串 (参见 [qs 文档](https://github.com/ljharb/qs#handling-of-null-values)) | `Boolean` | `true`        |
| `arrayLimit`         | 解析数组时的最大索引限制 (参见 [qs 文档](https://github.com/ljharb/qs#parsing-arrays))                    | `Number`  | `100`         |
| `depth`              | 解析对象时嵌套对象的最大深度 (参见 [qs documentation](https://github.com/ljharb/qs#parsing-objects))      | `Number`  | `20`          |

::: details 示例：查询中间件的自定义配置

```js
// path: ./config/middlewares.js

module.exports = {
  // ...
  {
    name: 'strapi::query',
    config: {
      arrayLimit: 50,
      depth: 10,
    },
  },
  // ...
}
```

:::

### `response-time`

`response-time` 中间件为响应协议头启用 `X-Response-Time`（以毫秒为单位）。

中间件没有任何配置选项。

### `public`

`public` 中间件是一个提供中间件的静态文件，基于 [koa-static](https://github.com/koajs/static)。它接受以下选项：

| 选项         | 描述                                                                                  | 类型      | 默认值 |
|----------------|----------------------------------------------------------------------------------------------|-----------|---------------|
| `maxAge`       | 缓存控制最大期限指令，以毫秒为单位                                             | `Integer` | `60000`       |
| `hidden`       | 允许传输隐藏文件                                                               | `Boolean` | `false`       |
| `defer`        | 如果为 `true`，则在 `return next()` 之后提供服务，允许任何下游中间件首先响应| `Boolean` | `false`       |
| `index`        | 默认文件名                                                                            | `String`  | `index.html`  |
| `defaultIndex` | 在 `/` 和 `/index.html` 处显示默认索引页                                          | `Boolean` | `true`        |

:::tip
可以通过编辑 [服务器配置文件](/developer-docs/latest/setup-deployment-guides/configurations/required/server.md#available-options) 来自定义公用文件夹的路径。
:::

::: details 示例：公共中间件的自定义配置

```js
// path: ./config/middlewares.js

module.exports = {
  // ...
  {
    name: 'strapi::public',
    config: {
      defer: true,
      index: env('INDEX_PATH', 'index-dev.html')
    },
  },
  // ...
}
```

:::

### `security`

安全中间件基于 [koa-helmet](https://helmetjs.github.io/)。它接受以下选项：

| 选项                      | 描述                                                                                   | 类型                  | 默认值 |
|-----------------------------|-----------------------------------------------------------------------------------------------|-----------------------|---------------|
| `crossOriginEmbedderPolicy` | 将 `Cross-Origin-Embedder-Policy` 协议头设置为 `require-corp`                               | `Boolean`             | `false`       |
| `crossOriginOpenerPolicy`   | 设置 `Cross-Origin-Opener-Policy` 协议头                                                   | `Boolean`             | `false`       |
| `crossOriginOpenerPolicy`   | 设置 `Cross-Origin-Resource-Policy` 协议头                                                 | `Boolean`             | `false`       |
| `originAgentCluster`        | 设置 `Origin-Agent-Cluster` 协议头                                                         | `Boolean`             | `false`       |
| `contentSecurityPolicy`     | 设置 `Content-Security-Policy` 协议头                                                      | `Boolean`             | `false`       |
| `xssFilter`                 | 通过将 `X-XSS-Protection` 协议头设置为 `0` 来禁用浏览器的跨站点脚本筛选器 | `Boolean`             | `false`       |
| `hsts`                      | 设置 HTTP 严格传输安全 （HSTS） 策略的选项。                            | `Object`              | -             |
| `hsts.maxAge`               | HSTS 生效的秒数                                                         | `Integer`             | `31536000`    |
| `hsts.includeSubDomains`    | 将 HSTS 应用于主机的所有子域                                                   | `Boolean`             | `true`        |
| `frameguard`                | 设置 `X-Frame-Options` 协议头以帮助缓解点击劫持攻击，设置为 `false` 以禁用 | `Boolean` or `Object` | -             |
| `frameguard.action`         | 值必须为 `deny` 或 `sameorigin`                                                   | `String`              | `sameorigin`  |

::: tip
使用任何第三方上传提供程序时，通常需要在此处设置自定义配置。请参阅提供程序文档，了解需要哪些配置选项。
:::

::: note
默认指令包括 `dl.airtable.com` 值。此值是为 [应用内市场](/user-docs/latest/plugins/installing-plugins-via-marketplace.md) 设置的，可以安全保存。
:::

::: details 示例：用于使用 AWS-S3 提供程序的安全中间件的自定义配置

```js
// path: ./config/middlewares.js

module.exports = {
  // ...
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'yourBucketName.s3.yourRegion.amazonaws.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'yourBucketName.s3.yourRegion.amazonaws.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  // ...
}
```

:::

### `session`

The `session` 中间件允许使用基于 [koa-session](https://github.com/koajs/session) 的 session。它接受以下选项：

| 选项       | 描述                                                                                                            | 类型                     | 默认值                           |
|--------------|------------------------------------------------------------------------------------------------------------------------|--------------------------|-----------------------------------------|
| `key`        | Cookie key                                                                                                             | `String`                 | `'koa.sess'`                            |
| `maxAge`     | Cookie 的最大生存期（以毫秒为单位）。使用 `'session'` 将在会话关闭时使 Cookie 过期。 | `Integer` 或 `'session'` | `86400000`                              |
| `autoCommit` | 自动提交协议头                                                                                           | `Boolean`                | `true`                                  |
| `overwrite`  | 可以覆盖或不覆盖                                                                                                   | `Boolean`                | `true`                                  |
| `httpOnly`   | 是否为 httponly 或不是。使用 `httpOnly` 有助于缓解跨站点脚本 （XSS） 攻击。                                                      | `Boolean`                | `true`                                  |
| `signed`     | 对 cookies 进行签名                                                                                             | `Boolean`                | `true`                                  |
| `rolling`    | 强制在每个响应上设置会话标识符 Cookie                                                         | `Boolean`                | `false`                                 |
| `renew`      | 在会话即将过期时续订会话，以便用户继续登录。                              | `Boolean`                | `false`                                 |
| `secure`     | 强制使用 HTTPS                                                                                     | `Boolean`                | `true` in production, `false` otherwise |
| `sameSite`   | 将 Cookie 限制在第一方或同一站点上下文中                                                            | `String`                 | `null`                                  |

::: details 示例：会话中间件的自定义配置

```js
// path: ./config/middlewares.js

module.exports = {
  // ...
  {
    name: 'strapi::session',
    config: {
      rolling: true
      renew: true
    },
  },
  // ...
}
```

:::
