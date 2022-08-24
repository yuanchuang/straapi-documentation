---
title: 模板 - Strapi 开发人员文档
description: 快速创建专为特定用例设计的预制 Strapi 应用程序。它允许你快速启动自定义 Strapi 应用程序。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/installation/templates.html
---

# 模板

::: callout 🚧 
本文档目前正在重做并更新到 Strapi v4。你可以按照 [GitHub](https://github.com/strapi/documentation/pull/665) 上的正在进行的拉取请求进行操作。
:::

模板是为特定用例设计的预制 Strapi 配置。它允许你快速启动自定义 Strapi 应用程序。

以下是模板可以为你配置的一些内容:

- 集合类型和单个类型
- 组件和动态区域
- 要安装的插件或自定义插件

:::note
模板（Templates）和启动器（Starters）不是一个东西:

- 一个 _template_ 是预制的 Strapi 配置。它只是一个配置，而不是一个配置好的应用程序。它不能单独运行，因为它缺少许多文件，例如数据库配置或 `package.json`。模板只有在通过 CLI 应用于默认 Strapi 应用后才有用。
- 一个 _starter_ 是一个预制的前端应用程序，使用 Strapi API

:::

## 使用模板

在创建带有 `create-strapi-app` 的项目时，您可以使用模板。

:::: tabs

::: tab yarn

```bash
yarn create strapi-app my-project --template <template-github-name>
```

:::

::: tab npx

```bash
npx create-strapi-app@latest my-project --template <template-github-name>
```

:::

::::

在这些示例中，`template-github-name` 参数可以有不同的形式：

- A shorthand。如果一个名为 `paul` 的 Github 用户有一个名为 `strapi-template-restaurant` 的存储库，那么速记将是 `paul/restaurant`。仅当存储库的名称以 `strapi-template-` 开头时，它才有效。
- A URL. 只需粘贴 GitHub 存储库的 URL 即可。即使存储库没有以 `strapi-template-` 为前缀，它也可以工作。

::: tip
使用速记时，如果省略用户名，CLI 将假定它是 `strapi`。

所以以下命令是等效的:

```bash
# Shorthand
yarn create strapi-app my-project --template strapi/blog

# Shorthand with username omitted since it defaults to strapi
yarn create strapi-app my-project --template blog

# Full GitHub URL
yarn create strapi-app my-project --template https://github.com/strapi/strapi-template-blog
```

:::

你可以将 `--template` 选项与所有其他 `create-strapi-app` 项结合使用，如 `--quickstart` 或 `--no-run`。

## 创建模板

要创建 Strapi 模板，您需要发布遵循某些规则的公共 GitHub 存储库。

首先，模板唯一涉及到的问题应该是使 Strapi 兼容性。它不应处理特定于环境的配置，如数据库或上传和电子邮件服务。这是为了确保模板保持可维护性，并避免与其他 CLI 选项（如 `--quickstart`）发生冲突。

其次，模板必须遵循下面详述的文件结构。

您可以手动创建此文件结构，也可以通过 [CLI](/developer-docs/latest/developer-resources/cli/CLI.md#strapi-templates-generate) 生成它。

:::: tabs

::: tab yarn

```bash
yarn strapi generate:template <path>
```

:::

::: tab npx

```bash
npx strapi generate:template <path>
```

:::

::::

### 文件结构

您可以将任意数量的文件添加到模板存储库的根目录。但它必须至少具有 `template` 目录，以及 `template.json` 或 `template.js` 文件。

`template.json` 用于扩展 Strapi 应用程序的默认 `package.json`。您可以将应覆盖默认 `package.json` 的所有属性放在根 `package.json` 属性中。例如，`template.json` 可能如下所示：

```json
{
  "package": {
    "dependencies": {
      "strapi-plugin-graphql": "latest"
    },
    "scripts": {
      "custom": "node ./scripts/custom.js"
    }
  }
}
```

您还可以使用 `template.js` 文件来替代 `template.json` 文件。它应该导出一个返回具有相同属性的对象的函数。当我们的属性需要具有动态值时，它非常有用。例如，我们可以使用它来确保模板需要最新版本的 Strapi 插件：

```js
module.exports = function(scope) {
  return {
    package: {
      dependencies: {
        'strapi-plugin-graphql': scope.strapiVersion,
      },
    },
  };
};
```

在 `template` 目录中，您可以扩展 Strapi 项目的文件内容。所有子级都是可选的，您应该只包含将覆盖默认 Strapi 应用程序的文件。

`template` 目录中只允许包含以下内容：

- `README.md`: 使用此模板制作的应用的自述文件
- `.env.example`: 指定所需的环境变量
- `api/`: 对于集合和单一类型
- `components/` 对于组件
- `config/` 只能包含 `functions` 目录（如 `bootstrap.js` 或  `404.js`），因为其他配置文件是特定于环境。
- `data/` 用于存储脚本导入的数据
- `plugins/` 用于自定义插件
- `public/` 服务端文件
- `scripts/` 用于自定义脚本

如果发现任何预期外的文件或目录，安装将会导致崩溃。

### 循序渐进

阅读上述规则后，请按照以下步骤创建模板：

1. 使用 `--quickstart` 选项，使用 `create-strapi-app` 创建标准 Strapi 应用。
2. 自定义应用以满足用例的需求。
3. 使用 [CLI](/developer-docs/latest/developer-resources/cli/CLI.md#strapi-templates-generate) 生成模板，运行 `strapi templates:generate <path>` 命令。
4. 导航到此路径以查看生成的模板
5. 如果您修改了应用的 `package.json`，请将这些更改（以及 _only_ 这些更改）包含在 `package` 属性的 `template.json` 中。否则，请将其保留为空对象。
6. 在 GitHub 上发布根模板项目。确保存储库是公共的，并且代码位于 `master` 分支上。
