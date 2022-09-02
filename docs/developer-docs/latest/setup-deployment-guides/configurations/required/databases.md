---
title: 数据库配置- Strapi 开发人员文档
描述: Strapi 提供了一个单一的入口点文件来配置其数据库。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/databases.html
---

# 数据库配置

`./config/database.js` 文件（或 TypeScript 的 `./config/database.ts` 文件）用于定义将用于存储应用程序内容的数据库连接。

:::warning
Strapi 应用程序不应连接到预先存在的数据库，不是由 Strapi 应用程序创建的，也不是连接到 Strapi v3 数据库的。Strapi 团队不会支持这样的尝试。尝试连接到不受支持的数据库可能会导致数据丢失，并且很可能会丢失数据。
:::

:::strapi 支持的数据库
CLI 安装指南详细介绍了 [支持的数据库和版本](/developer-docs/latest/setup-deployment-guides/installation/cli.md#preparing-the-installation).
:::

## 配置结构

 `./config/database.js` (或 TypeScript 中的 `./config/database.ts`) 接受 2 个主要配置对象：

- [`connection`](#connection-配置对象) 用于传递给 [Knex.js](https://github.com/knex/knex) 的数据库配置选项
- [`settings`](#settings-配置对象) 对于特定于 Strapi 的数据库设置

### `connection` 配置对象

| 参数                                                | 描述                                                                                           | 类型      | 默认值 |
|----------------------------------------------------------|-------------------------------------------------------------------------------------------------------|-----------|---------|
| `client`                                                 | 用于创建连接的数据库客户端。 `sqlite` 或 `postgres` 或 `mysql`.                          | `String`  | -       |
| `connection`                                             | 数据库 [连接信息](#连接参数)                                             | `Object`  | -       |
| `debug`                                                  | 显示数据库交换和错误                                                                  | `Boolean` | `false` |
| `useNullAsDefault`<br/><br />_Optional, only for SQLite_ | 使用 `NULL` 作为默认值                                                                        | `Boolean` | `true`  |
| `pool`<br /><br />_Optional_                             | [数据库池选项](#数据库池选项)                                                 | `Object`  | -       |
| `acquireConnectionTimeout`<br /><br />_Optional_         | 获取连接时，knex 在抛出超时错误之前将等待多长时间（以毫秒为单位） | `Integer` | `60000` |

#### 连接参数

The `connection.connection` object found in `./config/database.js` (or `./config/database.ts` for TypeScript) is used to pass database connection information and accepts the following parameters:

| 参数  | 描述                                                                                                                   | 类型                  |
|------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------|
| `host`     | 数据库主机名。默认值： `localhost`.                                                                               | `String`              |
| `port`     | 数据库端口                                                                                                                 | `Integer`             |
| `database` | 数据库名                                                                                                                | `String`              |
| `user`     | 用于建立连接的用户名                                                                                     | `String`              |
| `password` | 用于建立连接的密码                                                                                     | `String`              |
| `timezone` | 设置本地时间的默认行为。默认值： `utc` [时区选项](https://www.php.net/manual/en/timezones.php) | `String`              |
| `schema`   | 设置默认数据库架构。**仅用于 Postgres DB**                                                                | `String`              |
| `ssl`      | 对于 SSL 数据库连接。<br/>使用对象将证书文件作为字符串传递。                                         | `Boolean` or `Object` |
  
#### 数据库池选项

在 `./config/database.js` (或 TypeScript 的 `./config/database.ts`) 中可以选择找到的 `connection.pool` 对象用于传递 [Tarn.js](https://github.com/vincit/tarn.js) 数据库池选项并接受以下参数：

::: caution
使用 Docker 时，将 pool `min` 值更改为 `0` ，因为 Docker 将终止任何空闲连接，从而无法保留与数据库的任何打开连接 (有关详细信息，请参阅 [Tarn.js's pool](https://knexjs.org/guide/#pool))。
:::

| 参数                   | 描述                                                                                                                                                                                | 类型       | 默认值 |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|---------|
| `min`                       | 保持连接的最小数据库连接数                                                                                                                                        | `Integer`  | `2`     |
| `max`                       | 保持连接的最大数据库连接                                                                                                                                        | `Integer`  | `10`    |
| `acquireTimeoutMillis`      | 数据库连接超时前的时间（以毫秒为单位） attempt                                                                                                                       | `Integer`  | `60000` |
| `createTimeoutMillis`       | 创建查询超时前的时间（以毫秒为单位） attempt                                                                                                                              | `Integer`  | `30000` |
| `destroyTimeoutMillis`      | 销毁查询超时前的时间（以毫秒为单位） attempt                                                                                                                             | `Integer`  | `5000`  |
| `idleTimeoutMillis`         | 空闲数据库连接前的时间（以毫秒为单位）destroyed                                                                                                                        | `Integer`  | `30000` |
| `reapIntervalMillis`        | 检查空闲数据库连接的时间（以毫秒为单位） destroy                                                                                                                     | `Integer`  | `1000`  |
| `createRetryIntervalMillis` | 重试失败创建之前空闲时间（以毫秒为单位）actions                                                                                                                         | `Integer`  | `200`   |
| `afterCreate`               | 回调函数，用于在池获取新连接时执行自定义逻辑。<br/><br/>有关详细信息，请参阅 [Knex.js documentation](https://knexjs.org/#Installation-pooling) | `Function` | -       |

### `settings` 配置对象

在 `./config/database.js`（或 TypeScript 的 `./config/database.ts`）中找到的 `settings` 对象用于配置 Strapi 特定的数据库设置，并接受以下参数：

| 参数        | 描述                                      | 类型      | 默认值 |
|------------------|--------------------------------------------------|-----------|---------|
| `forceMigration` | 启用或禁用强制数据库迁移。| `Boolean` | `true`  |

<!-- TODO: Open and track a feature request for autoMigration as it doesn't exist in v4 -->

### 配置示例

::::: tabs card

:::: tab PostgreSQL

```js
// path: ./config/database.js

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      schema: env('DATABASE_SCHEMA', 'public'), // Not required
      ssl: {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates
      },
    },
    debug: false,
  },
});
```

:::caution
Strapi 意识到有关服务器**SSL支持**的问题。
为了修复它，您必须将 `ssl:{}` 对象设置为布尔值才能禁用它。例如，请参阅以下内容：

```js
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      ...
      ssl: env('DATABASE_SSL', false)
    },
  },
});
```

:::

请注意，如果您需要客户端 SSL CA 验证，则需要将 `ssl:{}` 对象与 fs 模块结合使用，以将 CA 证书转换为字符串。您可以在下面看到一个示例：

```js
const fs = require('fs');

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      ...
      ssl: {
        ca: fs.readFileSync(`${__dirname}/path/to/your/ca-certificate.crt`).toString(),
      },
    },
  },
});
```

::::

:::: tab MySQL/MariaDB

```js
// path: ./config/database.js

module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates
      },
    },
    debug: false,
  },
});
```

::::

:::: tab SQLite
<code-group>

<code-block title="JAVASCRIPT">

```js
// path: ./config/database.js

module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: env('DATABASE_FILENAME', '.tmp/data.db'),
    },
    useNullAsDefault: true,
    debug: false,
  },
});
```

</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./config/database.ts

import path from 'path';

export default ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: path.join(
        __dirname,
        '..',
        '..',
        env('DATABASE_FILENAME', path.join('.tmp', 'data.db'))
      ),
    },
    useNullAsDefault: true,
  },
});
```

</code-block>

</code-group>

::::

:::::

## 数据库中的配置

配置文件对多服务器不友好。若要更新生产中的配置，可以使用数据存储来获取和设置设置。

### 获取 settings

- `environment` (string): 设置要在其中存储数据的环境。默认情况下，它是当前环境（如果您的配置与环境无关，则可以是空字符串）。
- `type` (string): 设置您的配置是针对 `api`、`plugin` 还是 `core`。默认情况下，它是`core`
- `name` (string): 如果 `type` 是 `api` 或 `plugin` ，则必须设置插件或 api 名称。
- `key` (string, required): 要存储的密钥的名称。

```js
// strapi.store(object).get(object);

// create reusable plugin store variable
const pluginStore = strapi.store({
  environment: strapi.config.environment,
  type: 'plugin',
  name: 'users-permissions',
});

await pluginStore.get({ key: 'grant' });
```

### 设置 settings

- `value` (any, required): 要存储的值。

```js
// strapi.store(object).set(object);

// create reusable plugin store variable
const pluginStore = strapi.store({
  environment: strapi.config.environment,
  type: 'plugin',
  name: 'users-permissions'
});

await pluginStore.set({
  key: 'grant',
  value: {
    ...
  }
});
```

## 数据库安装指南

Strapi 您提供了为您的项目选择最合适的数据库的选项。它目前支持 **PostgreSQL**，**SQLite**，**MySQL** 和 **MariaDB**。

以下文档介绍了如何在本地安装 SQLite（用于开发目的）：

<DatabasesLinks>
</DatabasesLinks>

:::caution
其他数据库（MySQL，MariaDB）的安装指南正在重做。你可以为此做出一份 [贡献](https://github.com/strapi/documentation/blob/main/CONTRIBUTING.md) 。
:::
