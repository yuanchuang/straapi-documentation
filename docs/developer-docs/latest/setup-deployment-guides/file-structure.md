---
title: 项目结构 - Strapi 开发人员文档
description: 了解任何默认 Strapi 应用程序的项目结构
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/file-structure.html
---

<style lang="scss" scoped>
  pre {
    a {
      color: #ffbf00;
      font-weight: 600;
      /* letter-spacing: .1px; */
    }
  }
</style>

# 项目结构

:::: note
如果 Strapi 项目是用 [启动器 CLI](https://strapi.io/blog/announcing-the-strapi-starter-cli) 创建的，那么项目结构包括 `frontend` 和 `backend` 文件夹，其中 `backend` 文件夹有默认的结构。

::: details 使用启动器CLI创建的项目结构

```sh
my-project
├─── frontend # starter folder
├─── backend  # template folder, has the default structure of a project
└─── node_modules
```

:::
::::

不使用启动器 CLI 创建的 Strapi 项目默认结构取决于项目使用普通的 JavaScript 创建还是 [TypeScript](/developer-docs/latest/development/typescript.md) 创建，如下所示

:::: tabs card

::: tab Vanilla JavaScript-based projects

<pre>
  <code>
. <span class="token comment"># root of the application</span>

├──── .cache <span class="token comment"># files used to build the admin panel</span>
├──── .tmp
├──── <a href="/developer-docs/latest/development/admin-customization.html#build">build</a> <span class="token comment"># build of the admin panel</span>
├──── config <span class="token comment"># API configurations</span>
│     ├ <a href="/developer-docs/latest/setup-deployment-guides/configurations/optional/api.html">api.js</a>
│     ├ <a href="/developer-docs/latest/setup-deployment-guides/configurations/required/admin-panel.html">admin.js</a>
│     ├ <a href="/developer-docs/latest/setup-deployment-guides/configurations/optional/cronjobs.html">cron-tasks.js</a>
│     ├ <a href="/developer-docs/latest/setup-deployment-guides/configurations/required/databases.html#database-configuration">database.js</a>
│     ├ <a href="/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.html">middlewares.js</a>
│     ├ <a href="/developer-docs/latest/setup-deployment-guides/configurations/optional/plugins.html">plugins.js</a>
│     └ <a href="/developer-docs/latest/setup-deployment-guides/configurations/required/server.html#server-configuration">server.js</a>
├──── database
│     └──── migrations
├──── node_modules <span class="token comment"># npm packages used by the project</span>
├──── <a href="/developer-docs/latest/setup-deployment-guides/configurations/optional/public-assets.html">public</a> <span class="token comment"># files accessible to the outside world</span>
│     └──── uploads
├──── src
│     ├──── admin <span class="token comment"># admin customization files</span>
│           ├──── <a href="/developer-docs/latest/development/admin-customization.html#extension">extensions</a> <span class="token comment"># files to extend the admin panel</span>
│     │     ├ <a href="/developer-docs/latest/development/admin-customization.html#configuration-options">app.js</a>
│     │     └ <a href="/developer-docs/latest/development/admin-customization.html#webpack-configuration">webpack.config.js</a>
│     ├──── api <span class="token comment"># business logic of the project split into subfolders per API</span>
│     │     └──── (api-name)
│     │           ├──── <a href="/developer-docs/latest/development/backend-customization/models.html">content-types</a>
│     │           │     └──── (content-type-name)
│     │           │           └ <a href="/developer-docs/latest/development/backend-customization/models.html#lifecycle-hooks">lifecycles.js</a>
│     │           │           └ <a href="/developer-docs/latest/development/backend-customization/models.html#model-schema">schema.json</a>
│     │           ├──── <a href="/developer-docs/latest/development/backend-customization/controllers.html">controllers</a>
│     │           ├──── <a href="/developer-docs/latest/setup-deployment-guides/configurations/optional/middlewares.html">middlewares</a>
│     │           ├──── <a href="/developer-docs/latest/development/backend-customization/policies.html">policies</a>
│     │           ├──── <a href="/developer-docs/latest/development/backend-customization/routes.html">routes</a>
│     │           ├──── <a href="/developer-docs/latest/development/backend-customization/services.html">services</a>
│     │           └ index.js
│     ├──── <a href="/developer-docs/latest/development/backend-customization/models.html">components</a>
│     │     └──── (category-name)
│     │           ├ (componentA).json
│     │           └ (componentB).json
│     ├──── <a href="/developer-docs/latest/development/plugins-extension.html">extensions</a> <span class="token comment"># files to extend installed plugins</span>
│     │     └──── (plugin-to-be-extended)
│     │           ├──── content-types
│     │           │     └──── (content-type-name)
│     │           │           └ schema.json
│     │           └ <a href="/developer-docs/latest/developer-resources/plugin-api-reference/server.html">strapi-server.js</a>
│     ├──── <a href="/developer-docs/latest/setup-deployment-guides/configurations/optional/middlewares.html">middlewares</a>
│     │     └──── (middleware-name).js
│     ├──── <a href="/developer-docs/latest/development/plugins-development.html">plugins</a> <span class="token comment"># local plugins files</span>
│     │     └──── (plugin-name)
│     │           ├──── admin
│     │           │     └──── src
│     │           │           └ <a href="/developer-docs/latest/developer-resources/plugin-api-reference/admin-panel.html">index.js</a>
│     │           ├──── <a href="/developer-docs/latest/developer-resources/plugin-api-reference/server.html">server</a>
│     │           │     ├──── <a href="/developer-docs/latest/developer-resources/plugin-api-reference/server.html#content-types">content-types</a>
│     │           │     ├──── <a href="/developer-docs/latest/developer-resources/plugin-api-reference/server.html#controllers">controllers</a>
│     │           │     └──── <a href="/developer-docs/latest/developer-resources/plugin-api-reference/server.html#policies">policies</a>
│     │           ├ package.json
│     │           ├ <a href="/developer-docs/latest/developer-resources/plugin-api-reference/admin-panel.html">strapi-admin.js</a>
│     │           └ <a href="/developer-docs/latest/developer-resources/plugin-api-reference/server.html">strapi-server.js</a>
│     ├─── <a href="/developer-docs/latest/development/backend-customization/policies.html">policies</a>
│     └ <a href="/developer-docs/latest/setup-deployment-guides/configurations/optional/functions.html">index.js</a> <span class="token comment"># include register(), bootstrap() and destroy() functions</span>
├ <a href="/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.html">.env</a>
└ package.json
  </code>
</pre>

:::

::: tab TypeScript-based projects

<pre>
  <code>
. <span class="token comment"># root of the application</span>

├──── .cache <span class="token comment"># files used to build the admin panel</span>
├──── .tmp
├──── config <span class="token comment"># API configurations</span>
│     ├ <a href="/developer-docs/latest/setup-deployment-guides/configurations/optional/api.html">api.ts</a>
│     ├  <a href="/developer-docs/latest/setup-deployment-guides/configurations/required/admin-panel.html">admin.ts</a>
│     ├ <a href="/developer-docs/latest/setup-deployment-guides/configurations/optional/cronjobs.html">cron-tasks.ts</a>
│     ├ <a href="/developer-docs/latest/setup-deployment-guides/configurations/required/databases.html#database-configuration">database.ts</a>
│     ├ <a href="/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.html">middlewares.ts</a>
│     ├ <a href="/developer-docs/latest/setup-deployment-guides/configurations/optional/plugins.html">plugins.ts</a>
│     └ <a href="/developer-docs/latest/setup-deployment-guides/configurations/required/server.html#server-configuration">server.ts</a>
├──── database
│     └──── migrations
├──── dist <span class="token comment"># build of the backend</span>
│     └──── build <span class="token comment"># build of the admin panel</span>
├──── node_modules # <span class="token comment">npm packages used by the project</span>
├──── <a href="/developer-docs/latest/setup-deployment-guides/configurations/optional/public-assets.html">public</a> <span class="token comment"># files accessible to the outside world</span>
│     └──── uploads
├──── src
│     ├──── admin <span class="token comment"># admin customization files</span>
│           ├──── <a href="/developer-docs/latest/development/admin-customization.html#extension">extensions</a> <span class="token comment"># files to extend the admin panel</span>
│     │     ├ <a href="/developer-docs/latest/development/admin-customization.html#configuration-options">app.example.tsx</a>
│     │     └ <a href="/developer-docs/latest/development/admin-customization.html#webpack-configuration">webpack.config.ts</a>
|     |     └ tsconfig.json
│     ├──── api <span class="token comment"># business logic of the project split into subfolders per API</span>
│     │     └──── (api-name)
│     │          <a href="/developer-docs/latest/development/backend-customization/models.html">content-types</a>
│     │           │     └──── (content-type-name)
│     │           │           └ <a href="/developer-docs/latest/development/backend-customization/models.html#lifecycle-hooks">lifecycles.s</a>
│     │           │           └ <a href="/developer-docs/latest/development/backend-customization/models.html#model-schema">schema.json</a>
│     │           ├──── <a href="/developer-docs/latest/development/backend-customization/controllers.html">controllers</a>
│     │           ├──── <a href="/developer-docs/latest/setup-deployment-guides/configurations/optional/middlewares.html">middlewares</a>
│     │           ├──── <a href="/developer-docs/latest/development/backend-customization/policies.html">policies</a>
│     │           ├──── <a href="/developer-docs/latest/development/backend-customization/routes.html">routes</a>
│     │           ├──── <a href="/developer-docs/latest/development/backend-customization/services.html">services</a>
│     │           └ index.ts
│     │
│     ├──── <a href="/developer-docs/latest/development/backend-customization/models.html">components</a>
│     │     └──── (category-name)
│     │           ├ (componentA).json
│     │           └ (componentB).json
│     ├──── <a href="/developer-docs/latest/development/plugins-extension.html">extensions</a> <span class="token comment"># files to extend installed plugins</span>
│     │     └──── (plugin-to-be-extended)
│     │           ├──── content-types
│     │           │     └──── (content-type-name)
│     │           │           └ schema.json
│     │           └ <a href="/developer-docs/latest/developer-resources/plugin-api-reference/server.html">strapi-server.js</a>
│     ├──── <a href="/developer-docs/latest/setup-deployment-guides/configurations/optional/middlewares.html">middlewares</a>
│     │     └──── (middleware-name)
│     │           ├ defaults.json
│     │           └ index.ts
│     ├──── <a href="/developer-docs/latest/development/plugins-development.html">plugins</a> <span class="token comment"># local plugins files</span>
│     │     └──── (plugin-name)
│     │           ├──── admin
│     │           │     └──── src
│     │           │           └ <a href="/developer-docs/latest/developer-resources/plugin-api-reference/admin-panel.html">index.tsx</a>
│     │           │           └ pluginId.ts
│     │           ├──── <a href="/developer-docs/latest/developer-resources/plugin-api-reference/server.html">server</a>
│     │           │     ├──── <a href="/developer-docs/latest/developer-resources/plugin-api-reference/server.html#content-types">content-types</a>
│     │           │     ├──── <a href="/developer-docs/latest/developer-resources/plugin-api-reference/server.html#controllers">controllers</a>
│     │           │     └──── <a href="/developer-docs/latest/developer-resources/plugin-api-reference/server.html#policies">policies</a>
│     │           ├ package.json
│     │           ├ <a href="/developer-docs/latest/developer-resources/plugin-api-reference/admin-panel.html">strapi-admin.js</a>
│     │           └ <a href="/developer-docs/latest/developer-resources/plugin-api-reference/server.html">strapi-server.js</a>
│     ├─── policies
│     └ index.ts <span class="token comment"># include register(), bootstrap() and destroy() functions</span>
├ .env
├ tsconfig.json
└ package.json

  </code>
</pre>

:::

::::
