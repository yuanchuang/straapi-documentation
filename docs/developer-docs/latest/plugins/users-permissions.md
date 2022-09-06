---
title: 角色 & 权限 - Strapi 开发人员文档
description: 通过基于 JWT 的完整身份验证过程保护你的 API，并管理用户组之间的权限。
sidebarDepth: 2
canonicalUrl: https://docs.strapi.io/developer-docs/latest/plugins/users-permissions.html
---

# 角色 & 权限

此插件提供了一种通过基于 JWT 的完整身份验证过程来保护你的 API 的方法。此插件还附带了 ACL 策略，允许你管理用户组之间的权限。

要访问插件管理面板，请单击左侧菜单中的 **Settings** 链接，然后所有内容都将位于 **USERS & PERMISSIONS PLUGIN** 部分下。

## 概念

安装此插件后，它会在你的应用程序上添加一个访问层。
该插件使用 [`jwt token`](https://en.wikipedia.org/wiki/JSON_Web_Token) 效验用户。

每次发送 API 请求时，服务器便会检查 `Authorization` 协议头是否存在，并验证发出请求的用户是否有权访问资源。

为此，你的 JWT 包含你的用户 ID，并且我们能够匹配你的用户所在的组，并在最后知道该组是否允许访问路由。

## 管理角色权限

### 公共角色

当发送没带有 `Authorization` 协议头的请求时，将使用此角色。
如果您允许此角色的某些权限，则每个人都可以访问您选择的选项。
当您希望前端应用程序在不开发用户身份验证和授权的情况下访问所有内容时，选择 `find` / `findOne` 选项是常见的做法。

### 经过身份验证的角色

在创建用户时未提供任何角色，则为每个**新用户**提供的默认角色（Authenticated role）。在此角色中，您将能够定义用户可以访问的路由。

### 权限管理

通过单击 **Role** 名称，您将能够看到应用程序中可用的所有功能（并且这些功数与特定路由相关）如果勾选功能名称，则会使您正在编辑的当前角色可以访问此路由。在右侧边栏上，您将能够看到与此功能相关的 URL。

### 更新默认角色

当你使用 `/api/auth/local/register` 路由创建一个无角色的用户时，将会为该用户分配 `authenticated` 角色。

要修改默认角色，请单击 `高级设置`(`Advanced settings`) 标签并且更新 `经过身份验证的用户的默认角色`(`Default role for authenticated users`) 选项。

## 认证

### Token 用法

jwt token 可用于发出受权限限制的 API 请求。要以用户身份发出 API 请求，请将 jwt token 放入 GET 请求的 `Authorization` 协议头中。默认情况下，没有令牌的请求将采取 `公共`(`public`) 角色权限。在管理仪表板中修改每个用户角色的权限。身份验证失败将返回 401（未经授权）错误。

#### 用法

- `token` 变量是在登录或注册时从响应中 `data.jwt` 获取。

```js
import axios from 'axios';

const token = 'YOUR_TOKEN_HERE';

// Request API.
axios
  .get('http://localhost:1337/posts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    // Handle success.
    console.log('Data: ', response.data);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });
```

### JWT 配置

你可以使用 [插件配置文件](/developer-docs/latest/setup-deployment-guides/configurations/optional/plugins.md) 来配置 JWT 生成。
我们使用 [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) 来生成 JWT。

可用选项:

- `jwtSecret`: 随机字符串生成 JWT 签名。通常使用 `JWT_SECRET` [环境变量](/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.md#strapi-s-environment-variables) 设置。
- `jwt.expiresIn`: 以秒或描述时间跨度/毫秒的字符串表示。<br>例如: 60, "45m", "10h", "2 days", "7d", "2y". 数值被解释为秒计数。如果使用字符串，请确保提供正确时间单位 (minutes, hours, days, years, etc)，否则默认使用毫秒单位（ "120" 等于 "120ms"）。

<code-group>

<code-block title="JAVASCRIPT">

```js
// path: ./config/plugins.js

module.exports = ({ env }) => ({
  // ...
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  // ...
});
```

</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./config/plugins.ts

export default ({ env }) => ({
  // ...
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  // ...
});
```

</code-block>

</code-group>

:::warning
由于大量的安全问题，`绝对不建议`将JWT到期时间设置为30天以上。
Setting JWT expiry for more than 30 days is **absolutely not recommended** due to massive security concerns.
:::

### 注册

在数据库中创建一个默认角色为“已注册”的新用户。

#### 用法

```js
import axios from 'axios';

// Request API.
// Add your own code here to customize or restrict how the public can register new users.
axios
  .post('http://localhost:1337/api/auth/local/register', {
    username: 'Strapi user',
    email: 'user@strapi.io',
    password: 'strapiPassword',
  })
  .then(response => {
    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });
```

### 登录

提交用户的标识符和密码凭据进行身份验证。身份验证成功后，返回的响应数据将包含用户的信息以及 jwt 身份验证令牌。

#### 本地

- `identifier` 参数可以是 **email** 或 **username**。

```js
import axios from 'axios';

// Request API.
axios
  .post('http://localhost:1337/api/auth/local', {
    identifier: 'user@strapi.io',
    password: 'strapiPassword',
  })
  .then(response => {
    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });
```

### 提供者

借助 [Grant](https://github.com/simov/grant) 和 [Purest](https://github.com/simov/purest)， 您可以轻松地使用 OAuth 和 OAuth2 提供程序在应用程序中启用身份验证。

为了更好地理解，您可能会发现登录流程的说明如下。为了简化解释，我们使用 `github` 作为提供者，但它对其他提供者的工作方式相同。

#### 了解登录流程

假设 strapi 的后端位于：strapi.website.com。
假设 strapi 的前端端位于：website.com。

1. 用户进入您的前端应用程序 (`https://website.com`) 然后单击 `connect with Github` 按钮。
2. 前端将标签页重定向到后端 URL: `https://strapi.website.com/api/connect/github`.
3. 后端将标签页重定向到用户登录的 GitHub 登录页面。
4. 完成后，Github会将标签页重定向到后端 URL:`https://strapi.website.com/api/connect/github/callback?code=abcdef`.
5. 后端使用给定的 `code` 从 Github 获取 `access_token`，该 `access_token` 可以在一段时间内用于向 Github 发出授权请求以获取用户信息（例如用户的电子邮件）。
6. 然后，后端将选项卡重定向到您选择的URL，参数为 `access_token` (例如: `http://website.com/connect/github/redirect?access_token=eyfvg`)
7. 前端 使用 (`http://website.com/connect/github/redirect`) 调用后端的  `https://strapi.website.com/api/auth/github/callback?access_token=eyfvg` 返回带有 `jwt` 的 strapi 用户配置文件。<br> （在后台，后端要求Github提供用户的个人资料，并在 Github 用户的电子邮件地址和 Strapi 用户的电子邮件地址上进行匹配）
8. 前端现在拥有用户的 `jwt`，这意味着用户已连接，前端可以向后端发出经过身份验证的请求！

可在此处找到处理此流的前端应用的示例: [react login example app](https://github.com/strapi/strapi-examples/tree/master/login-react).

#### 设置服务器网址

在设置提供程序之前，您需要在 `server.js` 中指定后端的绝对 URL。

**example -** `config/server.js`

<code-group>

<code-block title="JAVASCRIPT">

```js
//path: config/server.js

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('', 'http://localhost:1337'),
});
```

</code-block>

<code-block title="TYPESCRIPT">

```js
//path: config/server.ts

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('', 'http://localhost:1337'),
});
```

</code-block>

</code-group>

:::tip 提示
稍后，您将此 URL 提供给您的提供商。<br> 对于开发，一些提供商接受使用本地主机网址，但许多提供商不接受。 在这种情况下，我们建议使用 [ngrok](https://ngrok.com/docs) (`ngrok http 1337`) 这将使代理隧道从它创建的 URL 到您的本地主机 URL（例: `url: env('', 'https://5299e8514242.ngrok.io'),`）。
:::

#### 设置提供程序 - 示例

为了更好地理解，我们决定为每个提供者展示一个示例，而不是一般的解释。

在以下示例中，前端应用程序将是 [react login example app](https://github.com/strapi/strapi-examples/tree/master/login-react)。 <br>
前端应用程序将在 `http://localhost:3000` 上运行。 <br>
Strapi 后端将在 `http://localhost:1337` 上运行。

:::: tabs card

::: tab GitHub

#### Using ngrok

Github doesn't accept `localhost` urls. <br>
Use `ngrok` to serve the backend app.

```
ngrok http 1337
```

Don't forget to update the server url in the backend config file `config/server.js` and the server url in your frontend app (environment variable `REACT_APP_BACKEND_URL` if you use [react login example app](https://github.com/strapi/strapi-examples/tree/master/login-react)) with the generated ngrok url.

#### Github configuration

- Visit the OAuth Apps list page [https://github.com/settings/developers](https://github.com/settings/developers)
- Click on **New OAuth App** button
- Fill the information (replace with your own ngrok url):
  - **Application name**: Strapi GitHub auth
  - **Homepage URL**: `https://65e60559.ngrok.io`
  - **Application description**: Strapi provider auth description
  - **Authorization callback URL**: `https://65e60559.ngrok.io/api/connect/github/callback`

#### Strapi configuration

- Visit the User Permissions provider settings page <br> [http://localhost:1337/admin/settings/users-permissions/providers](http://localhost:1337/admin/settings/users-permissions/providers)
- Click on the **GitHub** provider
- Fill the information (replace with your own client ID and secret):
  - **Enable**: `ON`
  - **Client ID**: 53de5258f8472c140917
  - **Client Secret**: fb9d0fe1d345d9ac7f83d7a1e646b37c554dae8b
  - **The redirect URL to your front-end app**: `http://localhost:3000/connect/github/redirect`

:::

::: tab Facebook

#### Using ngrok

Facebook doesn't accept `localhost` urls. <br>
Use `ngrok` to serve the backend app.

```
ngrok http 1337
```

Don't forget to update the server url in the backend config file `config/server.js` and the server url in your frontend app (environment variable `REACT_APP_BACKEND_URL` if you use [react login example app](https://github.com/strapi/strapi-examples/tree/master/login-react)) with the generated ngrok url.

#### Facebook configuration

- Visit the Developer Apps list page <br> [https://developers.facebook.com/apps/](https://developers.facebook.com/apps/)
- Click on **Add a New App** button
- Fill the **Display Name** in the modal and create the app
- Setup a **Facebook Login** product
- Click on the **PRODUCTS > Facebook login > Settings** link in the left menu
- Fill the information and save (replace with your own ngrok url):
  - **Valid OAuth Redirect URIs**: `https://65e60559.ngrok.io/api/connect/facebook/callback`
- Then, click on **Settings** in the left menu
- Then on **Basic** link
- You should see your Application ID and secret, save them for later

#### Strapi configuration

- Visit the User Permissions provider settings page <br> [http://localhost:1337/admin/settings/users-permissions/providers](http://localhost:1337/admin/settings/users-permissions/providers)
- Click on the **Facebook** provider
- Fill the information (replace with your own client ID and secret):
  - **Enable**: `ON`
  - **Client ID**: 2408954435875229
  - **Client Secret**: 4fe04b740b69f31ea410b9391ff3b5b0
  - **The redirect URL to your front-end app**: `http://localhost:3000/connect/facebook/redirect`

:::

::: tab Google

#### Using ngrok

Google accepts the `localhost` urls. <br>
The use of `ngrok` is not needed.

#### Google configuration

- Visit the Google Developer Console <br> [https://console.developers.google.com/](https://console.developers.google.com/)
- Click on the **Select a project** dropdown in the top menu
- Then click **NEW PROJECT** button
- Fill the **Project name** input and create

Wait a few seconds while the application is created.

- On the project dropdown, select your new project
- Click on **Go to APIs overview** under the **APIs** card
- Then click on the **Credentials** link in the left menu
- Click on **OAuth consent screen** button
- Choose **External** and click on **create**
- Fill the **Application name** and save
- Then click on **Create credentials** button
- Choose **OAuth client ID** option
- Fill the information:
  - **Name**: `Strapi Auth`
  - **Authorized redirect URIs**: `http://localhost:1337/api/connect/google/callback`
- Click on **OAuth 2.0 Client IDs** name of the client you just created
- You should see your Application ID and secret, save them for later

#### Strapi configuration

- Visit the User Permissions provider settings page <br> [http://localhost:1337/admin/settings/users-permissions/providers](http://localhost:1337/admin/settings/users-permissions/providers)
- Click on the **Google** provider
- Fill the information (replace with your own client ID and secret):
  - **Enable**: `ON`
  - **Client ID**: 226437944084-o2mojv5i4lfnng9q8kq3jkf5v03avemk.apps.googleusercontent.com
  - **Client Secret**: aiTbMoiuJQflSBy6uQrfgsni
  - **The redirect URL to your front-end app**: `http://localhost:3000/connect/google/redirect`

:::

::: tab AWS Cognito

#### Using ngrok

AWS Cognito accepts the `localhost` urls. <br>
The use of `ngrok` is not needed.

#### AWS Cognito configuration

- Visit the AWS Management Console <br> [https://aws.amazon.com/console/](https://aws.amazon.com/console/)
- If needed, select your **Region** in the top right corner next to the Support dropdown
- Select the **Services** dropdown in the top left corner
- Click on **Cognito** in the `Security, Identity & Compliance` section
- Then click on the **Manage User Pools** button
- If applicable either create or use an existing user pool. You will find hereafter a tutorial to create a User Pool <br> [https://docs.aws.amazon.com/cognito/latest/developerguide/tutorial-create-user-pool.html](https://docs.aws.amazon.com/cognito/latest/developerguide/tutorial-create-user-pool.html)
- Go to the **App clients** section in your cognito user pool and create a new client with the name `Strapi Auth` and set all the parameters and then click on **Create app client**
- You should now have an **App client id** and by clicking on the button **Show Details** you will be able to see the **App client secret**. Do copy those two values **App client id** and **App client secret** somewhere for later use when configuring the AWS Cognito provider in Strapi.
- Go to the **App integration section** and click on **App client settings**
- Look for your app client named `Strapi Auth` and enable Cognito User Pool by checking it in the **Enabled Identity Providers** section of your newly created App client
- Fill in your callback URL and Sign out URL with the value `http://localhost:1337/api/connect/cognito/callback` or the one provided by your AWS Cognito provider in Strapi
- In the **Oauth 2.0** section select `Authorization code grant` and `Implicit grant` for the **Allowed OAuth Flows** and select `email`, `openid` and `profile` for the **Allowed OAuth Scopes**
- You can now click on **Save changes** and if you have already configured your domain name then you should be able to see a link to the **Launch Hosted UI**. You can click on it in order to display the AWS Cognito login page. In case you haven't yet configured your domain name, use the link **Choose domain name** at the bottom right of the page in order to configure your domain name. On that page you will have an `Amazon Cognito Domain` section where a `Domain prefix` is already setup. Type a domain prefix to use for the sign-up and sign-in pages that are hosted by Amazon Cognito, this domain prefix together with the `.auth.YOUR_REGION.amazoncognito.com` will be the **Host URI (Subdomain)** value for your strapi configuration later on.

#### Strapi configuration

- Visit the User Permissions provider settings page <br> [http://localhost:1337/admin/settings/users-permissions/providers](http://localhost:1337/admin/settings/users-permissions/providers)
- Click on the **Cognito** provider
- Fill the information (replace with your own client ID and secret):
  - **Enable**: `ON`
  - **Client ID**: fill in the **App client id** (`5bd7a786qdupjmi0b3s10vegdt`)
  - **Client Secret**: fill in the **App client secret** (`19c5c78dsfsdfssfsdfhpdb4nkpb145vesdfdsfsffgh7vwd6g45jlipbpb`)
  - **Host URI (Subdomain)**: fill in the URL value that you copied earlier (`myapp67b50345-67b50b17-local.auth.eu-central-1.amazoncognito.com`)
  - **The redirect URL to your front-end app**: if you are using strapi react-login [https://github.com/strapi/strapi-examples/tree/master/login-react/](https://github.com/strapi/strapi-examples/tree/master/login-react/) use `http://localhost:3000/connect/cognito/redirect` but if you do not yet have a front-end app to test your Cognito configuration you can then use the following URL `http://localhost:1337/api/auth/cognito/callback`

:::

::: tab Twitter

#### Using ngrok

Twitter doesn't accept `localhost` urls. <br>
Use `ngrok` to serve the backend app.

```
ngrok http 1337
```

Don't forget to update the server url in the backend config file `config/server.js` and the server url in your frontend app (environment variable `REACT_APP_BACKEND_URL` if you use [react login example app](https://github.com/strapi/strapi-examples/tree/master/login-react)) with the generated ngrok url.

#### Twitter configuration

- Visit the Apps list page <br> [https://developer.twitter.com/en/apps](https://developer.twitter.com/en/apps)
- Click on **Create an app** button
- Fill the information (replace with your own ngrok url):
  - **App name**: Strapi Twitter auth
  - **Application description**: This is a demo app for Strapi auth
  - **Tell us how this app will be used**: - here write a message enough long -
- At the end of the process you should see your Application ID and secret, save them for later
- Go to you app setting and click on edit **Authentication settings**
- Enable **3rd party authentication** AND **Request email address from users**
- Fill the information (replace with your own ngrok url):
  - **Callback URLs**: `https://65e60559.ngrok.io/api/connect/twitter/callback`
  - **Website URL**: `https://65e60559.ngrok.io`
  - **Privacy policy**: `https://d73e70e88872.ngrok.io`
  - **Terms of service**: `https://d73e70e88872.ngrok.io`

#### Strapi configuration

- Visit the User Permissions provider settings page <br> [http://localhost:1337/admin/settings/users-permissions/providers](http://localhost:1337/admin/settings/users-permissions/providers)
- Click on the **Twitter** provider
- Fill the information (replace with your own client ID and secret):
  - **Enable**: `ON`
  - **Client ID**: yfN4ycGGmKXiS1njtIYxuN5IH
  - **Client Secret**: Nag1en8S4VwqurBvlW5OaFyKlzqrXFeyWhph6CZlpGA2V3VR3T
  - **The redirect URL to your front-end app**: `http://localhost:3000/connect/twitter/redirect`

:::

::: tab Discord

#### Using ngrok

Discord accepts the `localhost` urls. <br>
The use of `ngrok` is not needed.

#### Discord configuration

- Visit the Apps list page on the developer portal <br> [https://discordapp.com/developers/applications/](https://discordapp.com/developers/applications/)
- Click on **New application** button
- Fill the **name** and create
- Click on **OAuth2** in the left menu
- And click on **Add redirect** button
- Fill the **Redirect** input with `http://localhost:1337/api/connect/discord/callback` URL and save
- Click on **General information** in the left menu
- You should see your Application ID and secret, save them for later

#### Strapi configuration

- Visit the User Permissions provider settings page <br> [http://localhost:1337/admin/settings/users-permissions/providers](http://localhost:1337/admin/settings/users-permissions/providers)
- Click on the **Discord** provider
- Fill the information (replace with your own client ID and secret):
  - **Enable**: `ON`
  - **Client ID**: 665118465148846081
  - **Client Secret**: iJbr7mkyqyut-J2hGvvSDch_5Dw5U77J
  - **The redirect URL to your front-end app**: `http://localhost:3000/connect/discord/redirect`

:::

::: tab Twitch

#### Using ngrok

Twitch accepts the `localhost` urls. <br>
The use of `ngrok` is not needed.

#### Twitch configuration

- Visit the Apps list page on the developer console <br> [https://dev.twitch.tv/console/apps](https://dev.twitch.tv/console/apps)
- Click on **Register Your Application** button
- Fill the information:
  - **Name**: Strapi auth
  - **OAuth Redirect URLs**: `http://localhost:1337/api/connect/twitch/callback`
  - **Category**: Choose a category
- Click on **Manage** button of your new app
- Generate a new **Client Secret** with the **New Secret** button
- You should see your Application ID and secret, save them for later

#### Strapi configuration

- Visit the User Permissions provider settings page <br> [http://localhost:1337/admin/settings/users-permissions/providers](http://localhost:1337/admin/settings/users-permissions/providers)
- Click on the **Twitch** provider
- Fill the information (replace with your own client ID and secret):
  - **Enable**: `ON`
  - **Client ID**: amuy279g8wt68qlht3u4gek4oykh5j
  - **Client Secret**: dapssh10uo97gg2l25qufr8wen3yr6
  - **The redirect URL to your front-end app**: `http://localhost:3000/connect/twitch/redirect`

:::

::: tab Instagram

#### Using ngrok

Facebook doesn't accept `localhost` urls. <br>
Use `ngrok` to serve the backend app.

```
ngrok http 1337
```

Don't forget to update the server url in the backend config file `config/server.js` and the server url in your frontend app (environment variable `REACT_APP_BACKEND_URL` if you use [react login example app](https://github.com/strapi/strapi-examples/tree/master/login-react)) with the generated ngrok url.

#### Instagram configuration

- Visit the Developer Apps list page <br> [https://developers.facebook.com/apps/](https://developers.facebook.com/apps/)
- Click on **Add a New App** button
- Fill the **Display Name** in the modal and create the app
- Setup an **Instagram** product
- Click on the **PRODUCTS > Instagram > Basic Display** link in the left menu
- Then click on the **Create new application** button (and valid the modal)
- Fill the information (replace with your own ngrok url):
  - **Valid OAuth Redirect URIs**: `https://65e60559.ngrok.io/api/connect/instagram/callback`
  - **Deauthorize**: `https://65e60559.ngrok.io`
  - **Data Deletion Requests**: `https://65e60559.ngrok.io`
- On the **App Review for Instagram Basic Display** click on **Add to submission** for **instagram_graph_user_profile**.
- You should see your Application ID and secret, save them for later

#### Strapi configuration

- Visit the User Permissions provider settings page <br> [http://localhost:1337/admin/settings/users-permissions/providers](http://localhost:1337/admin/settings/users-permissions/providers)
- Click on the **Instagram** provider
- Fill the information (replace with your own client ID and secret):
  - **Enable**: `ON`
  - **Client ID**: 563883201184965
  - **Client Secret**: f5ba10a7dd78c2410ab6b8a35ab28226
  - **The redirect URL to your front-end app**: `http://localhost:3000/connect/instagram/redirect`

:::

::: tab VK

#### Using ngrok

Discord accepts the `localhost` urls. <br>
The use of `ngrok` is not needed.

#### VK configuration

- Visit the Apps list page <br> [https://vk.com/apps?act=manage](https://vk.com/apps?act=manage)
- Click on **Create app** button
- Fill the information:
  - **Title**: Strapi auth
  - **Platform**: Choose **Website** option
  - **Website address**: `http://localhost:1337`
  - **Base domain**: `localhost`
- Click on the **Settings** link in the left menu
- Click on the **Open API** link to enable this option
- Fill the information:
  - **Authorized redirect URL**: `http://localhost:1337/api/connect/vk/callback`

#### Strapi configuration

- Visit the User Permissions provider settings page <br> [http://localhost:1337/admin/settings/users-permissions/providers](http://localhost:1337/admin/settings/users-permissions/providers)
- Click on the **VK** provider
- Fill the information:
  - **Enable**: `ON`
  - **Client ID**: 7276416
  - **Client Secret**: cFBUSghLXGuxqnCyw1N3
  - **The redirect URL to your front-end app**: `http://localhost:3000/connect/vk/redirect`

:::

::: tab LinkedIn

#### Using ngrok

LinkedIn accepts the `localhost` urls. <br>
The use of `ngrok` is not needed.

#### LinkedIn configuration

- Visit the Apps list page <br> [https://www.linkedin.com/developers/apps](https://www.linkedin.com/developers/apps)
- Click on **Create app** button
- Fill the information:
  - **App name**: Strapi auth
  - **LinkedIn Page**: Enter a LinkedIn page name to associate with the app or click **Create a new LinkedIn Page** to create a new one
  - **App Logo**: Upload a square image that is at least 100x100 pixels.
- Click on the **Create app** to create the app
- On the app page click on **Auth** tab
- Fill the information:
  - **Authorized redirect URL**: `http://localhost:1337/api/connect/linkedin/callback`
- On the app page click on **Products** tab.
- Select `Sign In with LinkedIn` from the product list to enable it.

#### Strapi configuration

- Visit the User Permissions provider settings page <br> [http://localhost:1337/admin/settings/users-permissions/providers](http://localhost:1337/admin/settings/users-permissions/providers)
- Click on the **LinkedIn** provider
- Fill the information:
  - **Enable**: `ON`
  - **Client ID**: 84witsxk641rlv
  - **Client Secret**: HdXO7a7mkrU5a6WN
  - **The redirect URL to your front-end app**: `http://localhost:3000/connect/linkedin/redirect`

:::
::: tab CAS

#### Using ngrok

A remote CAS server can be configured to accept `localhost` URLs or you can run your own CAS server locally that accepts them.

The use of `ngrok` is not needed.

#### CAS configuration

- [CAS](https://github.com/apereo/cas) is an SSO server that supports many different methods of verifying a users identity,
  retrieving attributes out the user and communicating that information to applications via protocols such as SAML, OIDC, and the CAS protocol. Strapi can use a CAS server for authentication if CAS is deployed with support for OIDC.
- [CAS](https://github.com/apereo/cas) could already be used by your company or organization or you can setup a local CAS server by cloning the [CAS Overlay](https://github.com/apereo/cas-overlay-template) project or using the newer [CAS Initializr](https://github.com/apereo/cas-initializr) to create an overlay project.
- The CAS server must be configured so it can act as an [OpenID Connect Provider](https://apereo.github.io/cas/6.3.x/installation/OIDC-Authentication.html)
- CAS version 6.3.x and higher is known to work with Strapi but older versions that support OIDC may work.
- Define a CAS OIDC service for Strapi and store it in whichever CAS service registry is being used.
- The CAS service definition might look something like this for a local strapi deployment:

```json
{
  "@class": "org.apereo.cas.services.OidcRegisteredService",
  "clientId": "thestrapiclientid",
  "clientSecret": "thestrapiclientsecret",
  "bypassApprovalPrompt": true,
  "serviceId": "^http(|s)://localhost:1337/.*",
  "name": "Local Strapi",
  "id": 20201103,
  "evaluationOrder": 50,
  "attributeReleasePolicy": {
    "@class": "org.apereo.cas.services.ReturnMappedAttributeReleasePolicy",
    "allowedAttributes": {
      "@class": "java.util.TreeMap",
      "strapiemail": "groovy { return attributes['mail'].get(0) }",
      "strapiusername": "groovy { return attributes['username'].get(0) }"
    }
  }
}
```

#### Strapi configuration

- Visit the User Permissions provider settings page <br> [http://localhost:1337/admin/plugins/users-permissions/providers](http://localhost:1337/admin/plugins/users-permissions/providers)
- Click on the **Cas** provider
- Fill the information:
  - **Enable**: `ON`
  - **Client ID**: thestrapiclientid
  - **Client Secret**: thestrapiclientsecret
  - **The redirect URL to your front-end app**: `http://localhost:1337/api/connect/cas/redirect`
  - **The Provider Subdomain such that the following URLs are correct for the CAS deployment you are targeting:**
  ```
    authorize_url: https://[subdomain]/oidc/authorize
    access_url: https://[subdomain]/oidc/token
    profile_url: https://[subdomain]/oidc/profile
  ```
  For example, if running CAS locally with a login URL of: `https://localhost:8443/cas/login`, the value for the provider subdomain would be `localhost:8443/cas`.

:::

::: tab Reddit

#### Using ngrok

Reddit accepts the `localhost` urls. <br>
The use of `ngrok` is not needed.

#### Reddit configuration

- Visit the Reddit authorized applications preferences page <br> [https://www.reddit.com/prefs/apps](https://www.reddit.com/prefs/apps)
- Click on the **create another app...** button near the bottom
- Select **web app** for the type
- Fill the **name** and **redirect uri** input in
- Click the **create app** button
- Note that the **Client ID** is located under the app type (web app)

#### Strapi configuration

- Visit the User Permissions provider settings page <br> [http://localhost:1337/admin/settings/users-permissions/providers](http://localhost:1337/admin/settings/users-permissions/providers)
- Click on the **Reddit** provider
- Fill the information (replace with your own client ID and secret):
  - **Enable**: `ON`
  - **Client ID**: hmxSBOit0SCjSQ
  - **Client Secret**: gwR9hCjK_PMYVYNGeDLS4WLB8g7xqg
  - **The redirect URL to your front-end app**: `http://localhost:3000/connect/reddit/redirect`

:::

::: tab Auth0

#### Using ngrok

Auth0 accepts the `localhost` urls. <br>
The use of `ngrok` is not needed.

#### Auth0 configuration

- Visit your Auth0 tenant dashboard
- In API section, create a new API
- In application, create a `machine-to-machine` application and select the API that you have just created
- In settings of this app set these values:
  - **Allowed Callback URLs**: `http://localhost:1337/api/connect/auth0/callback`
  - **Allowed Logout URLs**: `http://localhost:3000`
  - **Allowed Web Origins**: `http://localhost:3000`
- At the bottom of settings, show "Advanced Settings" and go to the "Grant Types". Ensure that these grants are checked/enabled:
  - Implicit
  - Authorization Code
  - Refresh Token
  - Client Credentials

#### Strapi configuration

- Visit the User Permissions provider settings page <br> [http://localhost:1337/admin/settings/users-permissions/providers](http://localhost:1337/admin/settings/users-permissions/providers)
- Click on the **Auth0** provider
- Fill the information:
  - Enable: `ON`
  - Client ID: `<Your Auth0 Client ID>`
  - Client Secret: `<Your Auth0 Client Secret>`
  - Subdomain: `<Your Auth0 tenant url>`, example it is the part in bold in the following url: https://**my-tenant.eu**.auth0.com/
  - The redirect URL to your front-end app: `http://localhost:3000/connect/auth0`

:::

::::

Your configuration is done.
Launch the backend and the [react login example app](https://github.com/strapi/strapi-examples/tree/master/login-react), go to `http://localhost:3000` and try to connect to the provider your configured. It should work 🎉

#### What you have to do in your frontend

Once you have configured strapi and the provider, in your frontend app you have to :

- Create a button that links to `GET STRAPI_BACKEND_URL/api/connect/${provider}` (ex: `https://strapi.mywebsite/api/connect/github`).
- Create a frontend route like `FRONTEND_URL/connect/${provider}/redirect` that have to handle the `access_token` param and that have to request `STRAPI_BACKEND_URL/auth/${provider}/callback` with the `access_token` param. <br >
  The JSON request response will be `{ "jwt": "...", "user": {...} }`.

Now you can make authenticated requests 🎉 More info here: [token usage](#token-usage).

:::caution Troubleshooting

- **Error 429**: It's most likely because your login flow fell into a loop. To make new requests to the backend, you need to wait a few minutes or restart the backend.
- **Grant: missing session or misconfigured provider**: It may be due to many things.
  - **The redirect url can't be built**: Make sure you have set the backend url in `config/server.js`: [Setting up the server url](#setting-up-the-server-url)
  - **A session/cookie/cache problem**: You can try again in a private tab.
  - **The incorrect use of a domain with ngrok**: Check your urls and make sure that you use the ngrok url instead of `http://localhost:1337`. Don't forget to check the backend url set in the example app at `src/config.js`.
- **You can't access your admin panel**: It's most likely because you built it with the backend url set with a ngrok url and you stopped/restarted ngrok. You need to replace the backend url with the new ngrok url and run `yarn build` or `npm run build` again.
  :::

### 重置密码

**只能用于使用电子邮件提供商注册的用户。**

:::: tabs card

::: tab 忘记和重置流程

流程是以这样方式:

1. 用户跳转到**忘记密码页面**
2. 用户输入他/她的电子邮件地址
3. 忘记密码页面向后端发送请求，要求向用户发送带有重置密码链接的电子邮件
4. 用户收到电子邮件，点击特殊链接
5. 该链接将用户重定向到您的**重置密码页面**
6. 用户输入新密码
7. **重置密码页面**使用新密码向后端发送请求
8. 如果请求包含步骤 3 中的链接中包含的代码，则更新密码
9. 用户可以使用新密码登录

在下一节中，我们将详细介绍步骤 3 和 7..

#### 忘记密码：重置密码链接

此操作会向用户发送一封电子邮件，其中包含指向您自己的重置密码页面的链接。
该链接将使用步骤 7 中的 [重置密码](#reset-password) 所需的 url 参数 `code` 进行填充。

首先，您必须在管理面板中指定重置密码页面的 URL: **Settings > USERS & PERMISSIONS PLUGIN > Advanced Settings > Reset Password Page**。

然后，在**忘记密码页面**必须向后端发出以下请求。

```js
import axios from 'axios';

// Request API.
axios
  .post('http://localhost:1337/api/auth/forgot-password', {
    email: 'user@strapi.io', // user's email
  })
  .then(response => {
    console.log('Your user received an email');
  })
  .catch(error => {
    console.log('An error occurred:', error.response);
  });
```

#### 忘记密码：发送新密码

此操作将更新用户密码。 
也适用于 [GraphQL Plugin](./graphql.md)，以及 `resetPassword` 变化。

**重置密码页面**必须向后端发出以下请求。

```js
import axios from 'axios';

// Request API.
axios
  .post('http://localhost:1337/api/auth/reset-password', {
    code: 'privateCode', // code contained in the reset link of step 3.
    password: 'userNewPassword',
    passwordConfirmation: 'userNewPassword',
  })
  .then(response => {
    console.log("Your user's password has been reset.");
  })
  .catch(error => {
    console.log('An error occurred:', error.response);
  });
```

恭喜，你做到了！
:::

::: tab 修改密码流程

您还可以通过 `/change-password` API 终端节点更新经过身份验证的用户密码：

```js
import axios from 'axios';

// Request API.
axios.post(
  'http://localhost:1337/api/auth/change-password',
  {
    currentPassword: 'currentPassword',
    password: 'userNewPassword',
    passwordConfirmation: 'userNewPassword',
  },
  {
    headers: {
      Authorization: 'Bearer <user jwt token>',
    },
  }
);
```

:::

::::

### 邮件验证

:::note
在生产环境中，请确保设置了 `url` 配置属性。否则，验证链接将重定向到 `localhost`。有关配置的更多信息点 [这里](/developer-docs/latest/setup-deployment-guides/configurations/required/server.md)。
:::

注册后，如果将 **启用电子邮件确认** 设置为 **ON**，则用户将通过电子邮件收到确认链接。用户必须单击它以验证他/她的注册。

_确认链接的示例:_ `https://yourwebsite.com/api/auth/email-confirmation?confirmation=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTk0OTgxMTE3LCJleHAiOjE1OTc1NzMxMTd9.0WeB-mvuguMyr4eY8CypTZDkunR--vZYzZH6h6sChFg`

如果需要，您可以通过提出以下请求来重新发送确认电子邮件。

```js
import axios from 'axios';

// Request API.
axios
  .post(`http://localhost:1337/api/auth/send-email-confirmation`, {
    email: 'user@strapi.io', // user's email
  })
  .then(response => {
    console.log('Your user received an email');
  })
  .catch(error => {
    console.error('An error occurred:', error.response);
  });
```

## Strapi 上下文中的用户对象

 `user` 对象可用于成功通过身份验证的请求。

#### 用法

- 经过身份验证的 `user` 对象是 `ctx.state` 的属性。

```js
create: async ctx => {
  const { id } = ctx.state.user;

  const depositObj = {
    ...ctx.request.body,
    depositor: id,
  };

  const data = await strapi.services.deposit.add(depositObj);

  // Send 201 `created`
  ctx.created(data);
};
```

## 添加新的提供程序（添加到项目中）

::: caution
本文档不是 Strapi v4 的最新文档，是一项正在进行的工作。同时欢迎[贡献](https://github.com/strapi/documentation/blob/main/CONTRIBUTING.md)。

:::

**[Grant](https://github.com/simov/grant) supplies configuration for a number of commonly used OAuth providers. [Custom](https://github.com/simov/grant#misc-custom-providers) providers are also supported**. <br> You can view and try out the 200+ supported providers here: [OAuth Playground](https://grant.outofindex.com/).

### Prepare your files

To add a new provider on Strapi, you will need to perform changes onto the following files:

```
extensions/users-permissions/services/Providers.js
extensions/users-permissions/config/functions/bootstrap.js
```

If these files don't exist you will need to copy from your `node_modules` or the Strapi mono-repo. You can see [plugin extensions](/developer-docs/latest/development/plugins-extension.md) for more information on how it works.

We will go step by step.

### Configure your Provider Request

Configure the new provider in the `Provider.js` file at the `getProfile` function.

The `getProfile` takes three params:

- **provider**: The name of the used provider as a string.
- **query**: The query is the result of the provider callback.
- **callback**: The callback function who will continue the internal Strapi login logic.

Here is an example that uses the `discord` provider.

### Configure your oauth generic information

```js
case 'discord': {
  const discord = new Purest({
    provider: 'discord',
    config: {
      'discord': {
        'https://discordapp.com/api/': {
          '__domain': {
            'auth': {
              'auth': {'bearer': '[0]'}
            }
          },
          '{endpoint}': {
            '__path': {
              'alias': '__default'
            }
          }
        }
      }
    }
  });
}
```

This code creates a `Purest` object that gives us a generic way to interact with the provider's REST API.

For more specs on using the `Purest` module, please refer to the [Official Purest Documentation](https://github.com/simov/purest)

You may also want to take a look onto the numerous already made configurations [here](https://github.com/simov/purest-providers/blob/master/config/providers.json).

### Retrieve your user's information:

For our discord provider it will look like:

```js
  discord.query().get('users/@me').auth(access_token).request((err, res, body) => {
    if (err) {
      callback(err);
    } else {
      // Combine username and discriminator because discord username is not unique
      const username = `${body.username}#${body.discriminator}`;
      callback(null, {
        username,
        email: body.email
      });
    }
  });
  break;
}
```

Here is the next part of our switch. Now that we have properly configured our provider, we want to use it to retrieve
user information.

Here you see the real power of `purest`, you can simply make a get request on the desired URL, using the `access_token`
from the `query` parameter to authenticate.

That way, you should be able to retrieve the user info you need.

Now, you can simply call the `callback` function with the username and email of your user. That way, Strapi will be able
to retrieve your user from the database and log you in.

### Configure the new provider model onto database

Now, we need to configure our 'model' for our new provider. That way, our settings can be stored in the database, and
managed from the admin panel.

Open the file `packages/strapi-plugin-users-permissions/config/functions/bootstrap.js`

Add the fields your provider needs into the `grantConfig` object.
For our discord provider it will look like:

```js
discord: {
  enabled: false,  // make this provider disabled by default
  icon: 'comments', // The icon to use on the UI
  key: '',  // our provider app id (leave it blank, you will fill it with the Content Manager)
  secret: '', // our provider secret key (leave it blank, you will fill it with the Content Manager)
  callback: '/auth/discord/callback', // the callback endpoint of our provider
  scope: [  // the scope that we need from our user to retrieve information
    'identify',
    'email'
  ]
},
```

<!-- #### Tests -->

## Templating emails

By default, this plugin comes with only two templates (reset password and email address confirmation) at the moment. More templates will come later. The templates use Lodash's template() method to populate the variables.

You can update these templates under **Plugins** > **Roles & Permissions** > **Email Templates** tab in the admin panel.

### Reset Password

- `USER` (object)
  - `username`
  - `email`
- `TOKEN` corresponds to the token generated to be able to reset the password.
- `URL` is the link where the user will be redirected after clicking on it in the email.

### Email address confirmation

- `USER` (object)
  - `username`
  - `email`
- `CODE` corresponds to the CODE generated to be able confirm the user email.
- `URL` is the Strapi backend URL that confirms the code (by default `/auth/email-confirmation`).

## Security configuration

JWT tokens can be verified and trusted because the information is digitally signed. To sign a token a _secret_ is required. By default Strapi generates one that is stored in `./extensions/users-permissions/config/jwt.js`. This is useful during development but for security reasons it is **recommended** to set a custom token via an environment variable `JWT_SECRET` when deploying to production.

By default you can set a `JWT_SECRET` environment variable and it will be used as secret. If you want to use another variable you can update the configuration file.

<code-group>

<code-block title="JAVASCRIPT">

```js
//path: ./extensions/users-permissions/config/jwt.js

module.exports = {
  jwtSecret: process.env.SOME_ENV_VAR,
};
```

</code-block>

<code-block title="TYPESCRIPT">

```js
//path: ./extensions/users-permissions/config/jwt.ts

export default {
  jwtSecret: process.env.SOME_ENV_VAR,
};
```

</code-block>

</code-group>

::: tip
You can learn more on configuration in the documentation [here](/developer-docs/latest/setup-deployment-guides/configurations.md).
:::
