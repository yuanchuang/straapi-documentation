---
title: 插件扩展 - Strapi 开发人员文档 
description: Strapi 插件可以通过扩展内容类型或插件的接口来扩展。
sidebarDepth: 2
canonicalUrl: https://docs.strapi.io/developer-docs/latest/development/plugins-extension.html
---

# 插件扩展

Strapi 附带插件，可以从 [Marketplace](/user-docs/latest/plugins/installing-plugins-via-marketplace.md#installing-marketplace-plugins-and-providers) 安装或作为 npm 软件包安装。您还可以创建自己的插件（参见 [插件开发](/developer-docs/latest/development/plugins-development.md)）或者扩展已有插件。

插件扩展代码位于 `./src/extensions` 文件夹中（参见[项目结构](/developer-docs/latest/setup-deployment-guides/file-structure.md)）。一些插件会自动在那里创建文件，并且可以随时修改。

:::details 扩展文件夹结构示例

```bash
/extensions
  /some-plugin-to-extend
    strapi-server.js
    /content-types
      /some-content-type-to-extend
        model.json
      /another-content-type-to-extend
        model.json
  /another-plugin-to-extend
    strapi-server.js
```

:::

插件可以通过 2 种方式进行扩展:

- [扩展插件的内容类型](#扩展插件的内容类型)
- [扩展插件的接口](#扩展插件的接口) (例如：添加 controllers, services, policies, middlewares 等等)

::: note
目前无法扩展插件的管理面板部分。如果需要自定义管理员面板，请考虑使用[补丁包](https://www.npmjs.com/package/patch-package)。
:::

:::warning
新版本的 Strapi 随 [迁移指南](/developer-docs/latest/update-migration-guides/migration-guides.md) 一起发布，但这些指南可能不会涵盖插件扩展中的意外重大更改。如果需要大量自定义，请考虑 fork 插件。
:::

## 扩展插件的内容类型

插件的 content-types 可以通过两种方式进行扩展：使用 `strapi-server.js` 中的编程接口，并通过覆盖 content-types 架构。

content-types 的最终架构取决于以下加载顺序：

1. 原始插件的 content-types
2. 由 `./src/extensions/plugin-name/content-types/content-type-name/schema.json` 中定义的 [schema](/developer-docs/latest/development/backend-customization/models.md#model-schema) 中的声明覆盖的 content-types
3. 从 [`strapi-server.js` 导出 `content-types` key](/developer-docs/latest/developer-resources/plugin-api-reference/server.md#content-types) 中的 content-types 声明
4. Strapi 应用程序的 [`register()` 函数](/developer-docs/latest/setup-deployment-guides/configurations/optional/functions.md#register) 中的 content-types 声明

覆盖插件的 [content-types](/developer-docs/latest/development/backend-customization/models.md):

1. _(可选)_ 在应用的根目录下创建 `./src/extensions` 文件夹（如果该文件夹尚不存在）。
2. 创建与要扩展的插件同名的子文件夹。
3. 创建 `content-types` 子文件夹。
4. 在 `content-types` 子文件夹中，创建另一个子文件夹，该子文件夹与要覆盖的 content-type 具有相同的 [singularName](/developer-docs/latest/development/backend-customization/models.md#model-information)。
5. 在此 `content-types/name-of-content-type` 子文件夹中，在 `schema.json` 文件中定义 content-type 的新架构（请参阅 [schema](/developer-docs/latest/development/backend-customization/models.md#model-schema) 文档。
6. _(可选)_ 对要覆盖的每个 content-type 重复步骤 4 和 5。

## 扩展插件的接口

当 Strapi 应用程序初始化时，插件、扩展和全局生命周期函数事件按以下顺序发生：

1. 加载插件并公开其接口。
2. 加载 `./src/extensions` 中的文件。
3. 调用 `./src/index.js` 中的 `register()` 和 `bootstrap()` 函数。

插件的接口可以在步骤 2（即在 `./src/extensions` 中）或步骤3（即 `./src/index.js` 内）进行扩展。

### 在扩展文件夹中

使用 `./src/extensions` 文件夹扩展插件的服务器接口：

1. _(可选)_ 在应用的根目录下创建  `./src/extensions` 文件夹（如果该文件夹尚不存在）。
2. 创建与要扩展的插件同名的子文件夹。
3. 创建一个 `strapi-server.js` 文件，以使用 [Server API](/developer-docs/latest/developer-resources/plugin-api-reference/server.md) 扩展插件的后端服务。
4. 在此文件中，定义并导出一个函数。 该函数接收 `plugin` 接口作为参数，以便可以对其进行扩展。

::: details 后端扩展示例

```js
// path: ./src/extensions/some-plugin-to-extend/strapi-server.js

module.exports = (plugin) => {
  plugin.controllers.controllerA.find = (ctx) => {};

  plugin.policies[newPolicy] = (ctx) => {};

  plugin.routes['content-api'].routes.push({
    method: 'GET',
    path: '/route-path',
    handler: 'controller.action',
  });

  return plugin;
};
```

:::

### 在 register 和 bootstrap 函数中

要在 `./src/index.js` 中扩展插件的接口，请使用整个项目的 `bootstrap()` 和 `register()` [函数](/developer-docs/latest/setup-deployment-guides/configurations/optional/functions.md)，并使用 [getters](/developer-docs/latest/developer-resources/plugin-api-reference/server.md#usage) 以编程方式访问接口。

::: details 在 ./src/index.js 中扩展插件内容类型的示例

```js
// path: ./src/index.js

module.exports = {
  register({ strapi }) {
    strapi.contentType('plugin::my-plugin.content-type-name').attributes = {
      'toto': {
        type: 'string',
      }
    }
  },
  bootstrap({ strapi }) {},
};
```

:::
