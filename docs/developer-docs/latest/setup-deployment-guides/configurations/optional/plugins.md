---
title: 插件配置- Strapi 开发人员文档
description: Strapi 插件具有单个入口点文件来定义其配置。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/plugins.html
---

# 插件配置

所有插件的配置都存储在 `./config/plugins.js` 中（参见[项目结构](/developer-docs/latest/setup-deployment-guides/file-structure.md)）。每个插件都可以使用以下可用参数进行配置：

| 参数                  | 描述                                                                                                                                                            | 类型    |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `enabled`                  | 启用 (`true`) 或禁用 (`false`) 已安装的插件                                                                                                               | Boolean |
| `config`<br><br>_Optional_ | 用于覆盖默认插件配置 ([在 strapi-server.js 定义](/developer-docs/latest/developer-resources/plugin-api-reference/server.md#configuration)) | Object  |
| `resolve`<br> _Optional, only required for local plugins_             | 插件文件夹的路径                                                                                                                                            | String  |

<code-group>
<code-block title="JAVASCRIPT">


```js
// path: ./config/plugins.js

module.exports = ({ env }) => ({
  // enable a plugin that doesn't require any configuration
  i18n: true,

  // enable a custom plugin
  myplugin: {
    // my-plugin is going to be the internal name used for this plugin
    enabled: true,
    resolve: './src/plugins/my-local-plugin',
    config: {
      // user plugin config goes here
    },
  },

  // disable a plugin
  myotherplugin: {
    enabled: false, // plugin installed but disabled
  },
});
```

</code-block>

<code-block title="TYPESCRIPT">


```js
// path: ./config/plugins.ts

export default ({ env }) => ({
  // enable a plugin that doesn't require any configuration
  i18n: true,

  // enable a custom plugin
  myplugin: {
    // my-plugin is going to be the internal name used for this plugin
    enabled: true,
    resolve: './src/plugins/my-local-plugin',
    config: {
      // user plugin config goes here
    },
  },

  // disable a plugin
  myotherplugin: {
    enabled: false, // plugin installed but disabled
  },
});
```

</code-block>
</code-group>


:::tip
如果不需要特定的配置，也可以使用速记语法 `'plugin-name': true` 来声明插件。
:::

## GraphQL 配置

[GraphQL plugin](/developer-docs/latest/plugins/graphql.md) 具有以下特定的配置选项，这些选项应该在 `graphql.config` 对象中声明。所有参数都是可选的：

| 参数          | 描述                                                                                                                                                   | 类型    | 默认值 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| `apolloServer`     | [`ApolloServer`](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#apolloserver) 的其他配置                  | Object  | `{}`    |
| `artifacts`        | 包含文件路径的对象，定义存储生成的工件的位置。可以包含以下属性：<ul><li>`schema`:  生成的 GraphQL 模式文件的路径</li><li>`typegen`: 生成的 TypeScript 类型的路径</li></ul>仅当 `generateArtifacts` 设置为 `true` 时才有效。 | Object  | <ul><li>`schema: false`</li><li>`typegen: false`</li></ul> |
| `defaultLimit`     | API 调用中使用的 [`pagination[limit]` 参数](/developer-docs/latest/developer-resources/database-apis-reference/graphql-api.md#pagination-by-offset) 的默认值 | Integer | 100 |
| `depthLimit`       | 限制 [GraphQL 查询的复杂性](https://www.npmjs.com/package/graphql-depth-limit)                                                             | Integer  | `10`    |
| `generateArtifacts`| Strapi 是否应该自动生成和输出一个 GraphQL 模式文件和相应的 TypeScript 定义。<br/><br/>可以通过 `artifacts` 配置文件系统位置。 | Boolean | `false` |
| `maxLimit`         | 使用 [`pagination[limit]` 参数](/developer-docs/latest/developer-resources/database-apis-reference/graphql-api.md#pagination-by-offset) API 的最大值 calls                                                                                                              | Integer  | `-1`    |
| `playgroundAlways` | playground 是否应该公开暴露。<br/><br/>如果 `NODE_ENV` 设置为`development`，则默认启用。                                        | Boolean | `false`  |
| `shadowCRUD`       | 是否应自动创建基于模型的查询、突变和解析器的类型定义 (参见 [Shadow CRUD 文档](/developer-docs/latest/plugins/graphql.md#shadow-crud)) | Boolean | `true` |
| `subscriptions`    | 启用 GraphQL 订阅（实验功能）。                                                                                                                                 | Boolean | `false` |

<code-group>
<code-block title="JAVASCRIPT">

```js
// path: ./config/plugins.js

module.exports = () => ({
  graphql: {
    enabled: true,
    config: {
      playgroundAlways: false,
      defaultLimit: 10,
      maxLimit: 20,
      apolloServer: {
        tracing: true,
      },
    }
  }
})
```


</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./config/plugins.ts

export default () => ({
  graphql: {
    enabled: true,
    config: {
      defaultLimit: 10,
      maxLimit: 20
    }
  }
})
```


</code-block>
</code-group>

