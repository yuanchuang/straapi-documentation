---
title: Heroku 部署 - Strapi 开发人员文档
description: 在本指南中了解如何在 Heroku 上部署 Strapi 应用程序。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/heroku.html
---

# Heroku

这是在 [Heroku](https://www.heroku.com/) 上部署 Strapi v3 或 v4 项目的分步指南。与 Strapi 和 Heroku 配合良好的数据库在有关如何入门的说明中进行了讨论。

## Heroku 安装要求

- 您必须在本地安装和设置 [Git](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup).
- 在执行这些步骤之前，您必须拥有 [免费 Heroku 账号](https://signup.heroku.com/)

如果您已经在计算机上本地安装了 Heroku CLI，请跳至 [登录到 Heroku](#_2-从您的-CLI-登录到-heroku).

### 1. Heroku CLI 安装

下载并安装适用于您的操作系统的 `Heroku CLI`：

:::: tabs card

::: tab Ubuntu
Run the following from your terminal:

```bash
sudo snap install --classic heroku
```

:::

::: tab Mac
[Download the installer](https://cli-assets.heroku.com/heroku.pkg)

Also available via Homebrew:

```bash
brew tap heroku/brew && brew install heroku
```

:::

::: tab Windows
Download the appropriate installer for your Windows installation:

- [64-bit installer](https://cli-assets.heroku.com/heroku-x64.exe)
- [32-bit installer](https://cli-assets.heroku.com/heroku-x86.exe)
  :::

::::

### 2. 从您的 CLI 登录到 Heroku

接下来，您需要从计算机登录到 Heroku。

```bash
heroku login
```

按照说明操作并返回到命令行。

### 3. 创建新项目（或使用现有项目）

创建一个 [new Strapi project](/developer-docs/latest/getting-started/quick-start.md)（如果要部署现有项目，请转到步骤 4）。

`Path: ./`

<code-group>

<code-block title="NPM">
```sh
npx create-strapi-app@latest my-project --quickstart
```
</code-block>

<code-block title="YARN">
```sh
yarn create strapi-app my-project --quickstart
```
</code-block>

</code-group>

::: tip
当您使用 `--quickstart` 在本地创建 Strapi 项目时，将使用与 Heroku 不兼容的 **SQLite 数据库**。因此，必须选择另一个 [数据库选项](#_7-heroku-数据库设置)。
:::

### 4. 更新 `.gitignore`

在 `.gitignore` 的末尾添加以下行：

`Path: ./my-project/.gitignore`

```
package-lock.json
```

即使通常建议对此文件进行版本控制，也可能会在 Heroku 上产生问题。

### 5. 初始化 Git 存储库并提交项目

初始化 Git 存储库并提交您的项目。

`Path: ./my-project/`

```bash
cd my-project
git init
git add .
git commit -m "Initial Commit"
```

### 6. 创建 Heroku 项目

创建一个新的 Heroku 项目。

`Path: ./my-project/`

```bash
heroku create
```

您可以使用 `heroku create custom-project-name`，让 Heroku 创建一个 `custom-project-name.heroku.com` URL。否则，Heroku 将自动为您生成一个随机的项目名称（和URL）。

:::tip
如果已创建 Heroku 项目应用，则可以使用以下步骤初始化本地项目文件夹：

`Path: ./my-project/`

```bash
heroku git:remote -a your-heroku-app-name
```

:::

您的本地开发环境现已设置并配置为与 Heroku 配合使用。你有一个新的 Strapi 项目和一个新的 Heroku 应用程序，可以配置为使用数据库并相互协作。

### 7. Heroku 数据库设置

您将在下面找到使用 Heroku 时的数据库选项。请选择正确的数据库（例如PostgreSQL）并按照这些说明进行操作。

:::::: tabs card

::::: tab PostgreSQL

## Heroku Postgres

请按照以下步骤使用 **PostgreSQL** 将 Strapi 应用程序部署到 Heroku：

### 1. 安装 [Heroku Postgres](https://elements.heroku.com/addons/heroku-postgresql) 以使用 Postgres。

为了让事情变得更容易，Heroku 提供了一个强大的插件系统。在本节中，您将使用 Heroku Postgres 插件，它提供免费的 "Hobby Dev" 计划。如果你计划在生产环境中部署应用，强烈建议切换到付费计划。

`Path: ./my-project/`

```bash
heroku addons:create heroku-postgresql:hobby-dev
```

### 2. 检索数据库凭据

加载项会自动将数据库凭据公开到应用可访问的单个环境变量中。要检索它，请键入：

`Path: ./my-project/`

```bash
heroku config
```

这应该打印如下内容： `DATABASE_URL: postgres://ebitxebvixeeqd:dc59b16dedb3a1eef84d4999sb4baf@ec2-50-37-231-192.compute-2.amazonaws.com: 5432/d516fp1u21ph7b`.

(这个网址是这样的： \*postgres:// **USERNAME** : **PASSWORD** @ **HOST** : **PORT** / **DATABASE_NAME\***)

### 3. 自动设置数据库变量

Strapi 期望每个数据库连接配置（主机、用户名等）都有一个变量。因此，从上面的url来看，Strapi 将使用 [pg-connection-string](https://www.npmjs.com/package/pg-connection-string) 包解构该环境变量。Heroku 有时会更改上述 url，因此最好自动解构它，因为 Heroku 将自动更新 `DATABASE_URL` 环境变量。

安装软件包：

<code-group>

<code-block title="NPM">
```sh
npm install pg-connection-string --save
```
</code-block>

<code-block title="YARN">
```sh
yarn add pg-connection-string
```
</code-block>

</code-group>

### 4. 创建用于生产的 Heroku 数据库配置文件

在 `./config` 中创建新的子文件夹，就像这样：在 `/env/production`, 然后在其中创建一个新的 `database.js` (参见 [environment documentation](/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.md))。您的路径应如下所示： `./config/env/production/database.js`。当您在本地运行时，您应该使用 `./config/database.js`，它可以设置为使用 SQLite，但是建议您也在本地使用 PostgreSQL，有关配置本地数据库的信息，请参阅[数据库文档](/developer-docs/latest/setup-deployment-guides/configurations/required/databases.md).


<code-group>
<code-block title="JAVASCRIPT">

```js
// path: ./config/env/production/database.js

const parse = require('pg-connection-string').parse;
const config = parse(process.env.DATABASE_URL);

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: {
        rejectUnauthorized: false
      },
    },
    debug: false,
  },
});
```

</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./config/env/production/database.ts

import parse = require('pg-connection-string').parse;
const config = parse(process.env.DATABASE_URL);

export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: {
        rejectUnauthorized: false
      },
    },
    debug: false,
  },
});
```

</code-block>
</code-group>


您还需要将 Heroku 上的 `NODE_ENV` 变量设置为 `production`，以确保使用此新的数据库配置文件。

```bash
heroku config:set NODE_ENV=production
```

### 5. 创建用于生产的 Strapi 服务器配置

在新的 [env](/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.md) 文件夹中创建一个新的 `server.js`。在这个文件中，你只需要一个密钥，即 `url` ，就可以通知Strapi我们的公共Heroku域名是什么。所有其他设置将自动从默认的 `./config/server.js` 中提取。

<code-group>

<code-block title="JAVASCRIPT">

```js
// Path: ./config/env/production/server.js`

module.exports = ({ env }) => ({
  url: env('MY_HEROKU_URL'),
});

```

</code-block>

<code-block title="TYPESCRIPT">


```js
export default ({ env }) => ({
  url: env('MY_HEROKU_URL'),
});
```

</code-block>
</code-group>



您还需要在 Heroku 中为 `MY_HEROKU_URL` 设置环境变量。这将用类似 `https://your-app.herokuapp.com` 之类的东西填充变量。

```bash
heroku config:set MY_HEROKU_URL=$(heroku info -s | grep web_url | cut -d= -f2)
heroku config:set APP_KEYS=$(cat .env | grep APP_KEYS | cut -d= -f2-)
heroku config:set API_TOKEN_SALT=$(cat .env | grep API_TOKEN_SALT | cut -d= -f2)
heroku config:set ADMIN_JWT_SECRET=$(cat .env | grep ADMIN_JWT_SECRET | cut -d= -f2)
heroku config:set JWT_SECRET=$(cat .env | grep -w JWT_SECRET | cut -d= -f2)
```

以下 `openssl` 命令将生成随机的新机密（仅限Mac和Linux）：

```bash
heroku config:set APP_KEYS=$(openssl rand -base64 32)
heroku config:set API_TOKEN_SALT=$(openssl rand -base64 32)
heroku config:set ADMIN_JWT_SECRET=$(openssl rand -base64 32)
heroku config:set JWT_SECRET=$(openssl rand -base64 32)
```


### 6. 安装 `pg` node 模块

除非您最初使用 PostgreSQL 安装了 Strapi，否则您需要安装 [pg](https://www.npmjs.com/package/pg) node 模块。

`Path: ./my-project/`

<code-group>

<code-block title="NPM">
```sh
npm install pg --save
```
</code-block>

<code-block title="YARN">
```sh
yarn add pg
```
</code-block>

</code-group>

:::::

::::::

### 8. 提交更改

`Path: ./my-project/`

```bash
git add .
git commit -m "Update database config"
```

### 9. 更新 Yarn lockfile

`Path: ./my-project/`

```bash
yarn install
```

### 10. 提交更改

`Path: ./my-project/`

```bash
git add yarn.lock
git commit -m "Updated Yarn lockfile"
```

### 11. 部署

`Path: ./my-project/`

```bash
git push heroku HEAD:main
```

部署可能需要几分钟时间。最后，日志将显示项目的 url（例如 `https://mighty-taiga-80884.herokuapp.com`)。您还可以使用命令行打开项目：

`Path: ./my-project/`

```bash
heroku open
```

如果您看到 Strapi 欢迎页面，则表示您已在 Heroku 上正确设置、配置和部署了 Strapi 项目。您现在需要设置您的 `管理员用户`，因为生产数据库是全新的（并且是空的）。

如果您对如何继续操作有任何疑问，现在可以继续阅读[快速入门指南](/developer-docs/latest/getting-started/quick-start.md)

::: caution
出于安全原因，内容类型生成器插件在生产环境中处于禁用状态。要更新内容结构，请在本地进行更改，然后重新部署。
:::

## Project 更新

当 Strapi 部署到 Heroku 时，Heroku 会将环境变量设置为 `NODE_ENV=production` 。在 `production` 中，Strapi 禁用内容类型构建器（出于安全原因）。此外，如果您想在 Heroku 中更改默认生产模式，则由于文件系统是临时的，因此它将无法正常工作。当您更新内容类型时，Strapi 会将文件写入服务器，当 Heroku 重新启动服务器时，这些更新将消失。

因此，需要写入模型创建或其他 json 文件的修改（例如，创建或更改内容类型）要求您在开发环境中进行这些更改，然后将更改推送到 Heroku。

当您继续使用 Strapi 开发应用程序时，您可能希望使用 [版本控制](https://devcenter.heroku.com/articles/github-integration)，或者您可以继续使用 `git push heroku HEAD：main` 直接将更改提交并推送到 Heroku。

`Path: ./my-project/`

```bash
git add .
git commit -am "Changes to my-project noted"
git push heroku HEAD:main
heroku open
```

## 文件上传

与 Heroku 上的项目更新一样，文件系统不支持本地上传文件，因为当 Heroku `cycles` dyno 时，它们将被擦除。这种类型的文件系统称为 [ephemeral](https://devcenter.heroku.com/articles/dynos#ephemeral-filesystem)，这意味着文件系统仅持续到dyno重新启动为止（使用 Heroku，这发生在您重新部署的任何时间或定期重新启动期间，这可能每隔几个小时或每天发生一次）。

由于 Heroku 的文件系统，您需要使用 AWS S3 或 Cloudinary 等上传提供商。您可以查看安装提供程序的文档 [here](/developer-docs/latest/development/providers.md) ，您可以在 [npmjs.com](https://www.npmjs.com/search?q=strapi-provider-upload-&page=0&perPage=20)  上看到 Strapi 和社区提供程序的列表。

## Gzip

从版本 `3.2.1`, Strapi 使用 [`koa-compress`](https://github.com/koajs/compress) v5，默认情况下启用 [Brotli](https://en.wikipedia.org/wiki/Brotli) 压缩。在撰写本文时，Brotli 的默认配置会导致性能不佳，从而导致非常慢的响应时间和潜在的响应超时。如果您计划启用 [gzip 中间件](/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.md#internal-middlewares-configuration-reference)，建议您禁用 Brotli 或定义更好的配置参数。

要禁用 Brotli，请在 `config/middleware.js` 中提供以下配置。

```json
gzip: {
  enabled: true,
  options: {
    br: false
  }
},
```

有关 `koa-compress` 的 Brotli 配置的更多信息，请参阅 [此问题](https://github.com/koajs/compress/issues/121).
