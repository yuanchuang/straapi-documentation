---
title: 插件开发 - Strapi 开发人员文档
description: Strapi 允许你创建自定义本地插件，这些插件的工作方式与外部插件完全相同。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/development/plugins-development.html
---

# 插件开发

Strapi 允许开发本地插件，其工作方式与 [Marketplace](https://market.strapi.io) 提供的外部插件完全相同。

:::strapi 扩展插件
如果您宁愿扩展现有插件而不是创建新插件，请参阅[插件扩展](/developer-docs/latest/development/plugins-extension.md)文档。
:::

## 创建插件

Strapi 提供了一个 [命令行界面 (CLI)](/developer-docs/latest/developer-resources/cli/CLI.md) 来创建插件：

1. 导航到 Strapi 项目的根目录。
2. 在终端窗口运行 `yarn strapi generate` 或 `npm run strapi generate` 以启动交互式 CLI。
4. 在列表中选择 "plugin"，按回车键，并用 kebab-case 命名方式中给插件一个名字（例如，my-plugin-name）
5. 选择 `JavaScript` 或 `TypeScript` 作为插件语言。
6. 通过将插件添加到 [plugins configurations](/developer-docs/latest/setup-deployment-guides/configurations/optional/plugins.md) 文件中来启用插件：

<code-group>

<code-block title="JAVASCRIPT">

```js
// path: ./config/plugins.js

    module.exports = {
      // ...
      'my-plugin': {
        enabled: true,
        resolve: './src/plugins/my-plugin' // path to plugin folder
      },
      // ...
    }
```
</code-block>

<code-block title="TYPESCRIPT">

```js
 // path: ./config/plugins.ts

    export default {
      // ...
      'my-plugin': {
        enabled: true,
        resolve: './src/plugins/my-plugin' // path to plugin folder
      },
      // ...
    }


```
</code-block>

</code-group>

7. (*针对TypeScript*) 在新创建的插件目录下运行 `npm run install` 或 `yarn install`
8. 运行 `yarn build` 或 `npm run build` 来构建插件.

使用上述说明创建的插件位于应用程序的 `plugins` 目录中（参见 [项目结构](/developer-docs/latest/setup-deployment-guides/file-structure.md)）。

## 向插件添加功能

Strapi 为插件提供了编程 API，以 hook 的方式到 Stripi 的一些功能中。

插件可以在服务器和/或管理面板上注册，通过在包的根目录中查找入口点文件：
  - `strapi-server.js` 对于服务器 (参见 [Server API](/developer-docs/latest/developer-resources/plugin-api-reference/server.md)),
  - `strapi-admin.js` 对于管理面板 (参见 [Admin Panel API](/developer-docs/latest/developer-resources/plugin-api-reference/admin-panel.md)).
