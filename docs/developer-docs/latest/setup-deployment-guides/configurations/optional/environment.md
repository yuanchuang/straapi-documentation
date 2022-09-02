---
title: 环境配置和变量 - Strapi 开发人员文档
description: 如果您需要为特定环境提供特定的静态配置，则可以为每个环境创建配置。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.html
---

# 环境配置和变量

Strapi 提供了可在配置文件中使用的环境变量。`env()` 实用程序可用于 [检索环境变量的值](#检索环境变量的值) 和 [将变量转换为不同的类型](#转换环境变量), 并且可以创建特定的 [针对不同环境的配置](#环境配置)

## Strapi 的环境变量

Strapi 提供以下环境变量：

| 设置                                                    | 描述                                                                                                                                                                                                                                                                                                | 类型   | 默认值   |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------- |
| `STRAPI_DISABLE_UPDATE_NOTIFICATION`                       | 不要在终端中显示有关更新 strapi 的通知消息                                                                                | `Boolean` | `false`         |
| `STRAPI_HIDE_STARTUP_MESSAGE`                              | 不在终端中显示启动消息                                                                                                                                                                                                                                                        | `Boolean` | `false`         |
| `STRAPI_TELEMETRY_DISABLED`                                | 不要将遥测使用情况数据发送到 Strapi                                                                                                                                                                                                                                                         | `Boolean` | `false`         |
| `STRAPI_LICENSE`                                           | 用于激活企业版的许可证密钥                                                                                                                                                                                                                                                         | `String`  | `undefined`     |
| `NODE_ENV`                                                 | 运行应用程序的环境类型。<br/><br/>`production` 启用特定行为 (要了解细节，参见 [Node.js 文档](https://nodejs.dev/learn/nodejs-the-difference-between-development-and-production))                                                                               | `String`  | `'development'` |
| `BROWSER`                                                  | 启动后在浏览器中打开管理面板                                                                                                                                                                                                                                                          | `Boolean` | `true`          |
| `ENV_PATH`                                                 | 包含环境变量的文件的路径                                                                                                                                                                                                                                                  | `String`  | `'./.env'`      |
| `STRAPI_PLUGIN_I18N_INIT_LOCALE_CODE` <br/><br/>_Optional_ | 应用程序的初始化区域设置，如果 [Internationalization (i18n) 插件](/developer-docs/latest/plugins/i18n.md) 在内容类型上安装并启用 (参见 [在生产环境中配置 i18n](/developer-docs/latest/plugins/i18n.md#configuration-of-the-default-locale))      | `String`  | `'en'`          |
| `FAST_REFRESH`                                             | 使用 [react-refresh](https://github.com/pmmmwh/react-refresh-webpack-plugin) 在开发 Strapi 管理面板时启用 "Fast Refresh" 以获得近乎即时的反馈。panel.                                                                                                                                       | `boolean` | `true`          |


## 检索环境变量的值

在大多数用例中，环境之间会有不同的配置（例如数据库凭据）。

无需将这些凭据写入配置文件，而是可以在应用程序根目录的 `.env`文件中定义变量：

```sh
# path: .env

DATABASE_PASSWORD=acme
```

To customize the path of the `.env` file to load, set an environment variable called `ENV_PATH` before starting the application:

```sh
$ ENV_PATH=/absolute/path/to/.env npm run start
```

在 `.env` 文件中定义的变量可以使用 `process.env.{variableName}` 访问在配置和应用程序文件中的任意位置。

在配置文件中，`env()` 实用程序允许定义默认值和[转换环境变量](#转换环境变量)：

<code-group>

<code-block title="JAVASCRIPT">

```js
// path: ./config/database.js

module.exports = ({ env }) => ({
  connections: {
    default: {
      settings: {
        password: env('DATABASE_PASSWORD'),
      },
    },
  },
});
```

</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./config/database.ts

export default ({ env }) => ({
  connections: {
    default: {
      settings: {
        password: env('DATABASE_PASSWORD'),
      },
    },
  },
});
```

</code-block>

</code-group>

### 转换环境变量

`env()` 实用程序可用于将环境变量转换为不同类型的变量：

```js
// Returns the env if defined without casting it
env('VAR', 'default');

// Cast to integer (using parseInt)
env.int('VAR', 0);

// Cast to float (using parseFloat)
env.float('VAR', 3.14);

// Cast to boolean (check if the value is equal to 'true')
env.bool('VAR', true);

// Cast to JS object (using JSON.parse)
env.json('VAR', { key: 'value' });

// Cast to array (syntax: ENV_VAR=[value1, value2, value3] | ENV_VAR=["value1", "value2", "value3"])
env.array('VAR', [1, 2, 3]);

// Cast to date (using new Date(value))
env.date('VAR', new Date());
```

## 环境配置

可以使用以下命名和结构约定创建配置：`./config/env/{environment}/{filename}`。当您需要针对特定环境的特定静态配置并且使用环境变量不是最佳解决方案时，这很有用。

这些配置将合并到 `./config` 文件夹中定义的基本配置中。
环境基于 `NODE_ENV` 环境变量，该变量默认为 `development`。

当以 `NODE_ENV=production` 启动 Strapi 时，它将从 `./config/*` 和 `./config/env/production/*` 加载配置。在生产配置中定义的所有内容都将覆盖默认配置。与环境变量结合使用时，此模式变得非常强大。

例如，使用以下配置文件将为您提供启动服务器的各种选项：

<code-group>
<code-block title="JAVASCRIPT">

```js
// path: ./config/server.js

module.exports = {
  host: '127.0.0.1',
};


// path: ./config/env/production/server.js

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
});
```

</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./config/server.ts

export default ({ env }) => ({
  host: '127.0.0.1',
});


// path: ./config/env/production/server.ts

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
});
```

</code-block>
</code-group>

使用这些配置文件，服务器将根据传递的环境变量在各个端口上启动：

```bash
yarn start                                   # uses host 127.0.0.1
NODE_ENV=production yarn start               # uses host defined in .env. If not defined, uses 0.0.0.0
HOST=10.0.0.1 NODE_ENV=production yarn start # uses host 10.0.0.1
```
