---
title: Typescript - Strapi 开发人员文档
description: 学习在 Strapi 应用程序中使用 Typescript。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/development/typescript.html
---

# TypeScript 开发

TypeScript 为 JavaScript 增加了一个额外的类型系统，这意味着现有的 JavaScript 代码也是 TypeScript 代码。Strapi 在 v4.3.0 及更高版本的新项目中支持 TypeScript。现有的 JavaScript 项目可以通过转换过程 [添加 TypeScript 支持](#add-typescript-support-to-an-existing-strapi-project) 。支持 TypeScript 的项目允许使用 TypeScript 开发插件以及使用 TypeScript 类型。

::: strapi 开始使用 TypeScript
要开始在 TypeScript 中开发，请使用 [CLI 安装文档](/developer-docs/latest/setup-deployment-guides/installation/cli.md) 来创建一个新的 TypeScript 项目。对于现有项目，可以使用提供的转换步骤添加 [TypeScript 支持](#add-typescript-support-to-an-existing-strapi-project)。此外，[项目结构](/developer-docs/latest/setup-deployment-guides/file-structure.md) 和 [TypeScript 配置](/developer-docs/latest/setup-deployment-guides/configurations/optional/typescript.md) 部分具有特定于 TypeScript 的资源，用于理解和配置应用程序。
:::

## 开始在 TypeScript 中开发

为启用了 TypeScript 的项目启动开发环境需要在启动服务器之前构建管理面板。在开发模式下，应用程序源代码被编译在 `./dist/build` 目录下，并在内容类型生成器中的每个更改中重新编译。要启动应用程序，请在根目录中运行以下命令：

<code-group>

<code-block title="NPM">

```sh
npm run build
npm run develop
```

</code-block>

 <code-block title="YARN">

```sh
yarn build
yarn develop
```

</code-block>

</code-group>

## 使用 TypeScript 类型

Strapi 在 `Strapi` 类上提供类型支持，以改善 TypeScript 开发体验。这些类型带有自动补全功能，可在开发时自动提供建议。

要在开发 Strapi 应用程序时体验基于 TypeScript 的自动补全，您可以尝试以下操作：

1. 在代码编辑器中，打开 `./src/index.ts` 文件。
2. 在 `register` 方法中，将 `strapi` 参数声明为 `Strapi` 类型：

    ```js
    // path: ./src/index.ts

    import { Strapi } from '@strapi/strapi';

    export default {
      register( { strapi }: { strapi: Strapi }) {
        // ...
      },
    };
    ```

2. 在 `register` 方法的主体中，开始键入 `strapi.` 并使用键盘箭头浏览可用属性。
3. 从列表中选择 `runLifecyclesfunction`。
4. 当 `strapi.runLifecyclesFunctions` 方法被添加，代码编辑器返回可用的生命周期类型（例 `register`、`bootstrap` 和 `destroy`）列表。使用键盘箭头选择其中一个生命周期，代码将自动补全。

## 为项目架构生成类型

要为项目架构生成类型，请使用 [`ts:generate-types` CLI 命令](/developer-docs/latest/developer-resources/cli/CLI.md#strapi-ts-generate-types)。`ts:generate-types` 命令会在项目根目录下创建 `schemas.d.ts` 文件用于存储架构类型。可选的 `--verbose` 标志返回生成的架构的详细表。

要使用 `ts：generate-types`，请在项目根目录的终端中运行以下代码：

<code-group>
<code-block title="NPM">

```sh
npm run strapi ts:generate-types --verbose #optional flag

```

</code-block>

<code-block title="YARN">

```sh
yarn strapi ts:generate-types --verbose #optional flag

```

</code-block>
</code-group>

## 使用 TypeScript 开发插件

New plugins can be generated following the [plugins development documentation](/developer-docs/latest/development/plugins-development.md). There are 2 important distinctions for TypeScript applications:

- After creating the plugin, run `yarn` or `npm install` in the plugin directory `src/admin/plugins/[my-plugin-name]` to install the dependencies for the plugin.
- Run `yarn build` or `npm run build` in the plugin directory `src/admin/plugins/[my-plugin-name]` to build the admin panel including the plugin.

::: note
It is not necessary to repeat the `yarn` or `npm install` command after the initial installation. The `yarn build` or `npm run build` command is necessary to implement any plugin development that affects the admin panel.
:::

## Start Strapi programmatically

To start Strapi programmatically in a TypeScript project the Strapi instance requires the compiled code location. This section describes how to set and indicate the compiled code directory.

### Use the `strapi()` factory

Strapi can be run programmatically by using the `strapi()` factory. Since the code of TypeScript projects is compiled in a specific directory, the parameter `distDir` should be passed to the factory to indicate where the compiled code should be read:

```js
// path: ./src/plugins/<plugin-name>/server/index.js 

const strapi = require('@strapi/strapi');

const app = await strapi({ distDir: './dist' });
```

### Use the `strapi.compile()` function

The `strapi.compile()` function should be mostly used for developing tools that need to start a Strapi instance and detect whether the project includes TypeScript code. `strapi.compile()` automatically detects the project language. If the project code contains any TypeScript code, `strapi.compile()` compiles the code and returns a context with specific values for the directories that Strapi requires:

```js

const strapi = require('@strapi/strapi');

const appContext = await strapi.compile();
const app = await strapi(appContext);

```

## 将 TypeScript 添加到现有的 Strapi 项目

向现有项目添加 TypeScript 支持需要添加 2 个 `tsconfig.json` 文件并重新构建管理面板。此外，可以选择删除 `eslintrc` 和 `eslintignore` 文件。TypeScript 标志 `allowJs` 应该在根 `tsconfig.json` 文件中设置为 `true`，以便以增量方式将 TypeScript 文件添加到现有的 JavaScript 项目中。`allowJs` 标志允许 `.ts`和 `.tsx` 文件与 JavaScript 文件共存。

按照以下步骤将 TypeScript 支持添加到现有的 Strapi 项目中：

1. 在项目根目录下添加一个 `tsconfig.json` 文件，并将以下代码（带有 `allowJs` 标志）复制到该文件中：

```json
// path: ./tsconfig.json

{
    "extends": "@strapi/typescript-utils/tsconfigs/server",
    "compilerOptions": {
      "outDir": "dist",
      "rootDir": ".",
      "allowJs": true //enables the build without .ts files
    },
    "include": [
      "./",
      "src/**/*.json"
    ],
    "exclude": [
      "node_modules/",
      "build/",
      "dist/",
      ".cache/",
      ".tmp/",
      "src/admin/",
      "**/*.test.ts",
      "src/plugins/**"
    ]
   
  }
  
```

2. 在 `./src/admin/` 目录中添加一个 `tsconfig.json` 文件，并将以下代码复制到该文件中：

```json
// path: ./src/admin/tsconfig.json

{
    "extends": "@strapi/typescript-utils/tsconfigs/admin",
    "include": [
      "../plugins/**/admin/src/**/*",
      "./"
    ],
    "exclude": [
      "node_modules/",
      "build/",
      "dist/",
      "**/*.test.ts"
    ]
  }
  
```

3. (可选) 在项目根目录下删除 `.eslintrc` 和 `.eslintignore`。
4. 重新生成管理面板并启动开发服务器：

<code-group>
<code-block title='NPM'>

```sh
npm run build
npm run develop
```

</code-block>

<code-block title='YARN'>

```sh
yarn build
yarn develop
```

</code-block>
</code-group>

完成上述步骤后，`dist` 目录将在项目路由中添加，并且项目可以访问与新的 TypeScript 支持的 Strapi 项目相同的 TypeScript 功能。
