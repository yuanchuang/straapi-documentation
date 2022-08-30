---
title: 模型 - Strapi 开发人员文档
description: Strapi模型（即内容类型，组件和动态区域）定义了数据结构的表示形式。
sidebarDepth: 3
canonicalUrl: https://docs.strapi.io/developer-docs/latest/development/backend-customization/models.html
---

# 模型

由于 Strapi 是一个无头内容管理系统 （CMS），因此为内容创建数据结构是使用该软件最重要的方面之一。模型定义数据结构的表示形式。

Strapi中有2种不同类型的模型：

- 内容类型，可以是集合类型或单个类型，具体取决于它们管理的条目数
- 和作为可在多种内容类型中重用的数据结构的组件。

如果你刚刚开始，直接在管理面板中使用 [Content-type Builder](/user-docs/latest/content-types-builder/introduction-to-content-types-builder.md) 能很方便地生成一些模型。用户界面接管了许多验证任务，并展示了可用于创建内容数据结构的所有选项。然后，可以使用本文档在代码级别查看生成的模型映射。

## 模型创建

内容类型和组件模型的创建和存储方式不同。

### 内容类型

以下方式可以创建 Strapi 中的内容类型：

- 使用 [管理面板的 Content-type Builder ](/user-docs/latest/content-types-builder/introduction-to-content-types-builder.md)
- 使用 [Strapi's 交互式 CLI `strapi generate`](/developer-docs/latest/developer-resources/cli/CLI.md#strapi-generate) 命令

内容类型使用以下文件：

- `schema.json` 表示模型的 [schema](#model-schema) 定义。（使用任一方法创建内容类型时自动生成）
- `lifecycles.js` 表示 [lifecycle hooks](#lifecycle-hooks)。必须手动创建此文件。

这些模型文件存储在 `./src/api/[api-name]/content-types/[content-type-name]/`中，在这些文件夹中找到的任何 JavaScript 或 JSON 文件都将作为内容类型的模型加载 (参见 [project structure](/developer-docs/latest/setup-deployment-guides/file-structure.md)).

:::note
在启用了 [TypeScript](/developer-docs/latest/development/typescript.md) 的项目中，可以使用 `ts:generate-types` 命令生成架构类型。
:::

### 组件

无法使用 CLI 工具创建组件模型。使用 [Content-type Builder](/user-docs/latest/content-types-builder/introduction-to-content-types-builder.md) 或手动创建它们。

组件模型存储在 `./src/components` 文件夹中。每个组件都必须位于子文件夹中，以组件所属的类别命名（参见 [项目结构](/developer-docs/latest/setup-deployment-guides/file-structure.md)）。

## 模型架构

`schema.json` 文件包括：

- [settings](#模型设置) 例如，型表示的内容类型或应存储数据的表名
- [information](#模型信息)  主要用于在管理面板中显示模型，并通过 REST 和 GraphQL API 访问它
- [attributes](#模型属性) 描述了模型的数据结构
- [options](#模型选项) 用于定义模型上的特定行为

### 模型设置

可以使用以下参数配置模型的常规设置：

| 参数                                          | 类型   | 描述                                                                                                            |
| -------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| `tableName`                                  | String | 应在其中存储数据的数据库表名称                                                    |
| `kind`<br><br>_Optional,<br>only for content-types_ | String | 定义内容类型是否为：<ul><li>集合类型 (`collectionType`)</li><li> 或单一类型 (`singleType`)</li></ul> |

```json
// ./api/[api-name]/content-types/restaurant/schema.json

{
  "kind": "collectionType",
  "tableName": "Restaurants_v1",
}
```

### 模型信息

模型架构中的 `info` 键描述用于在管理面板中显示模型并通过内容 API 访问模型的信息。它包括以下参数：

<!-- ? with the new design system, do we still use FontAwesome?  -->

| 参数            | 类型   | 描述                                                                                                                                 |
| -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `displayName`  | String | 在管理面板中使用的默认名称                                                                                                      |
| `singularName` | String | 内容类型名称的单数形式。<br>用于生成 API 路由和数据库/表集合。<br><br>应该是 kebab-case 命名 |
| `pluralName`   | String | 内容类型名称的复数形式。<br>用于生成 API 路由和数据库/表集合。<br><br>应该是 kebab-case 命名 |
| `description`  | String | 模型说明                               |
| `icon`<br><br>_Optional,_<br>_only for Components_       | String      | [FontAwesome](https://fontawesome.com/) (v5) 图标名称，用于管理面板中的组件图标

```json
// ./src/api/[api-name]/content-types/restaurant/schema.json

  "info": {
    "displayName": "Restaurant",
    "singularName": "restaurant",
    "pluralName": "restaurants",
    "description": ""
  },
```

### 模型属性

模型的数据结构由属性列表组成。每个属性都有一个 `type` 参数，该参数描述其性质并将属性定义为一段简单的数据或 Strapi 使用的更复杂的结构。

有许多类型的属性可用：

- 标量类型（例如 strings, dates, numbers, booleans 等）
  - `media`,对于通过 [Media library](/user-docs/latest/content-types-builder/configuring-fields-content-type.md#media) 上传的文件 
  - `relation` 描述内容类型之间的 [关系](#relations)
  - `component` 定义一个 [组件](#组件-2)（即可在多种内容类型中使用的数据结构）
  - `dynamiczone` 定义一个[动态区域](#dynamic-zones)（即基于组件列表的灵活空间）
  - `locale` 和 `localizations` 类型，仅由 [Internationalization (i18n) 插件](/developer-docs/latest/plugins/i18n.md) 使用

属性的 `type` 参数应为以下值之一：

| Type categories | Available types |
|------|-------|
| String types | <ul><li>`string`</li> <li>`text`</li> <li>`richtext`</li><li>`enumeration`</li> <li>`email`</li><li>`password`</li><li>[`uid`<Fa-Link color="grey"/>](#uid-type)</li></ul> |
| Date types | <ul><li>`date`</li> <li>`time`</li> <li>`datetime`</li> <li>`timestamp`</li></ul> |
| Number types | <ul><li>`integer`</li><li>`biginteger`</li><li>`float`</li> <li>`decimal`</li></ul> |
| Other generic types |<ul><li>`boolean`</li><li>`array`</li><li>`json`</li></ul> |
| Special types unique to Strapi |<ul><li>`media`</li><li>[`relation`<Fa-Link color="grey" size="1x"/>](#relations)</li><li>[`component`<Fa-Link color="grey" size="1x"/>](#组件)</li><li>[`dynamiczone`<Fa-Link color="grey" size="1x"/>](#dynamic-zones)</li></ul> |
| Internationalization (i18n)-related types<br /><br />_Can only be used if the [i18n plugin](/developer-docs/latest/plugins/i18n.md) is installed_|<ul><li>`locale`</li><li>`localizations`</li></ul> |

#### 验证

可以使用以下参数将基本验证应用于属性：

| 参数 | 类型   | 描述                                                                                               | 默认 |
| -------------- | ------- | --------------------------------------------------------------------------------------------------------- | ------- |
| `required`     | Boolean | 如果为 `true`，则为此属性添加所需的验证程序                                                     | `false` |
| `max`          | Integer | 检查该值是否大于或等于给定的最大值                                        | -       |
| `min`          | Integer | 检查值是否小于或等于给定的最小值                                           | -       |
| `minLength`    | Integer | 字段输入值的最小字符数                                                      | -       |
| `maxLength`    | Integer | M字段输入值的最大字符数                                                      | -       |
| `private`      | Boolean | 如果为 `true`，则该属性将从服务器响应中删除。<br/><br/>💡 这对于隐藏敏感数据非常有用。 | `false` |
| `configurable` | Boolean | 如果为 `false`，则无法从内容类型生成器插件中配置该属性。                         | `true`  |

```json
// ./src/api/[api-name]/content-types/restaurant/schema.json

{
  // ...
  "attributes": {
    "title": {
      "type": "string",
      "minLength": 3,
      "maxLength": 99,
      "unique": true
    },
    "description": {
      "default": "My description",
      "type": "text",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title"
    }
    // ...
  }
}
```

#### 数据库验证和设置

:::caution 🚧 此 API 被视为实验性 API。
这些设置应保留给高级用法，因为它们可能会破坏某些功能。没有计划使这些设置稳定。
:::

数据库验证和设置是在模式迁移期间直接传递到 `tableBuilder` Knex.js函数上的自定义选项。数据库验证允许对设置自定义列设置进行高级控制。以下选项在每个属性的 `column: {}` 对象中设置：

| 参数     | 类型    | 描述                                                                                   | 默认 |
| ------------- | ------- | --------------------------------------------------------------------------------------------- | ------- |
| `name`        | string  | 更改数据库中列的名称               | -       |
| `defaultTo`   | string  | 将数据库设置为 `defaultTo`，通常与 `notNullable` 一起使用                              | -       |
| `notNullable` | boolean | 设置数据库 `notNullable`，确保列不能为空                          | `false` |
| `unsigned`    | boolean | 仅适用于数字列，删除了负数的能力，但最大长度加倍 | `false` |
| `unique`      | boolean | 强制数据库级别唯一，与草稿和发布功能一起使用时要小心  | `false` |
| `type`        | string  | 更改数据库类型，如果 `type` 有参数，则应在 `args` 中传递它们      | -       |
| `args`        | array   | 传递到 Knex 的参数.js函数，用于更改 `type` 等内容          | `[]`    |

```json
// ./src/api/[api-name]/content-types/restaurant/schema.json

{
  // ...
  "attributes": {
    "title": {
      "type": "string",
      "minLength": 3,
      "maxLength": 99,
      "unique": true,
      "column": {
        "unique": true // enforce database unique also
      }
    },
    "description": {
      "default": "My description",
      "type": "text",
      "required": true,
      "column": {
        "defaultTo": "My description", // set database level default
        "notNullable": true // enforce required at database level, even for drafts
      }
    },
    "rating": {
      "type": "decimal",
      "default": 0,
      "column": {
        "defaultTo": 0,
        "type": "decimal", // using the native decimal type but allowing for custom precision
        "args": [
          6,1 // using custom precision and scale
        ]
      }
    }
    // ...
  }
}
```

#### `uid` 类型

`uid` 类型用于根据 2 个可选参数，使用唯一标识符 （UID）（例如，文章的 slug）自动预填充管理面板中的字段值：

- `targetField` (string): 如果使用，定义为目标的字段的值将用于自动生成 UID。
- `options` (string): 如果使用，UID 将基于传递给 [底层 `uid` 生成器](https://github.com/sindresorhus/slugify) 的一组选项生成。生成的 `uid` 必须与以下正则表达式模式匹配：`/^[A-Za-z0-9-_.~]*$`。

#### 关系

关系将内容类型链接在一起。关系在模型的 [attributes](#模型属性) 中显式定义，`type: 'relation'` 并接受以下附加参数：

| 参数                         | 描述                                                                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `relation`                  | 这些值之间的关系类型：<ul><li>`oneToOne`</li><li>`oneToMany`</li><li>`manyToOne`</li>`manyToMany`</li></ul>                   |
| `target`                    | 接受字符串值作为目标内容类型的名称                                                                                 |
| `mappedBy` and `inversedBy`<br><br>_Optional_ | 在双向关系中，所属方声明 `inversedBy` 键，而反置方声明 `mappedBy` 键 |

::::: tabs card

:::: tab One-to-One

One-to-One relationships are useful when one entry can be linked to only one other entry.

They can be unidirectional or bidirectional. In unidirectional relationships, only one of the models can be queried with its linked item.

::: details Unidirectional use case example:

  - A blog article belongs to a category.
  - Querying an article can retrieve its category,
  - but querying a category won't retrieve the owned article.

  ```js
  // ./src/api/[api-name]/content-types/article/schema.json

  const model = {
    attributes: {
      category: {
        type: 'relation',
        relation: 'oneToOne',
        target: 'category',
      },
    },
  };
  ```

:::

::: details Bidirectional use case example:

  - A blog article belongs to a category.
  - Querying an article can retrieve its category,
  - and querying a category also retrieves its owned article.

  ```js
  // ./src/api/[api-name]/content-types/article/schema.json

  const model = {
    attributes: {
      category: {
        type: 'relation',
        relation: 'oneToOne',
        target: 'category',
        inversedBy: 'article',
      },
    },
  };


  // ./src/api/[api-name]/content-types/category/schema.json

  const model = {
    attributes: {
      article: {
        type: 'relation',
        relation: 'oneToOne',
        target: 'article',
        mappedBy: 'category',
      },
    },
  };

  ```

:::

::::

:::: tab One-to-Many

One-to-Many relationships are useful when:

- an entry from a content-type A is linked to many entries of another content-type B,
- while an entry from content-type B is linked to only one entry of content-type A.

One-to-many relationships are always bidirectional, and are usually defined with the corresponding Many-to-One relationship:

::: details Example:
A person can own many plants, but a plant is owned by only one person.

```js
// ./src/api/[api-name]/content-types/plant/schema.json

const model = {
  attributes: {
    owner: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'api::person.person',
      inversedBy: 'plants',
    },
  },
};

// ./src/api/person/models/schema.json

const model = {
  attributes: {
    plants: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'api::plant.plant',
      mappedBy: 'owner',
    },
  },
};
```

:::

::::

:::: tab Many-to-One

Many-to-One relationships are useful to link many entries to one entry.

They can be unidirectional or bidirectional. In unidirectional relationships, only one of the models can be queried with its linked item.

::: details Unidirectional use case example:

  A book can be written by many authors.

  ```js
  // ./src/api/[api-name]/content-types/book/schema.json

  const model = {
    attributes: {
      author: {
        type: 'relation',
        relation: 'manyToOne',
        target: 'author',
      },
    },
  };

  ```

:::

::: details Bidirectional use case example:

  An article belongs to only one category but a category has many articles.

  ```js
  // ./src/api/[api-name]/content-types/article/schema.json

  const model = {
    attributes: {
      author: {
        type: 'relation',
        relation: 'manyToOne',
        target: 'category',
        inversedBy: 'article',
      },
    },
  };


  // ./src/api/[api-name]/content-types/category/schema.json

  const model = {
    attributes: {
      books: {
        type: 'relation',
        relation: 'oneToMany',
        target: 'article',
        mappedBy: 'category',
      },
    },
  };
  ```
:::

::::

:::: tab Many-to-Many

Many-to-Many relationships are useful when:

- an entry from content-type A is linked to many entries of content-type B,
- and an entry from content-type B is also linked to many entries from content-type A.

Many-to-many relationships can be unidirectional or bidirectional. In unidirectional relationships, only one of the models can be queried with its linked item.

::: details Unidirectional use case example:

  ```js
  const model = {
    attributes: {
      categories: {
        type: 'relation',
        relation: 'manyToMany',
        target: 'category',
      },
    },
  };
  ```

:::

::: details Bidirectional use case example:

An article can have many tags and a tag can be assigned to many articles.

  ```js
  // ./src/api/[api-name]/content-types/article/schema.json

  const model = {
    attributes: {
      tags: {
        type: 'relation',
        relation: 'manyToMany',
        target: 'tag',
        inversedBy: 'articles',
      },
    },
  };


  // ./src/api/[api-name]/content-types/tag/schema.json

  const model = {
    attributes: {
      articles: {
        type: 'relation',
        relation: 'manyToMany',
        target: 'article',
        mappedBy: 'tag',
      },
    },
  };
  ```

:::

<!-- ? not sure what to do with this note and the following example, that's why I commented them for now -->
<!-- :::tip NOTE
The `tableName` key defines the name of the join table. It has to be specified once. If it is not specified, Strapi will use a generated default one. It is useful to define the name of the join table when the name generated by Strapi is too long for the database you use.
:::

**Path —** `./src/api/category/models/Category.settings.json`.

```js
{
  "attributes": {
    "products": {
      "collection": "product",
      "via": "categories"
    }
  }
}
``` -->
::::

:::::

#### 组件

组件字段创建内容类型和组件结构之间的关系。组件在模型的 [attributes](#模型属性) 中显式定义，`type: 'component'` 并接受以下附加参数：

| 参数    | 类型    | 描述                                                                              |
| ------------ | ------- | ---------------------------------------------------------------------------------------- |
| `repeatable` | Boolean | 可以是 `true` 或 `false`，具体取决于组件是否可重复    |
| `component`  | String  | 按照以下格式定义相应的组件：<br/>`<category>.<componentName>`  |

```json
// ./src/api/[apiName]/restaurant/content-types/schema.json

{
  "attributes": {
    "openinghours": {
      "type": "component",
      "repeatable": true,
      "component": "restaurant.openinghours"
    }
  }
}
```


#### 动态区域

动态区域根据 [组件](#组件-2) 的混合列表创建一个灵活的空间来撰写内容。

动态区域在具有 `type: 'dynamiczone'` 的模型的 [attributes](#模型属性) 中显式定义。它们还接受一个 `components` 数组，其中每个组件应按照以下格式命名：`<category>.<componentName>`.

```json
// ./src/api/[api-name]/content-types/article/schema.json

{
  "attributes": {
    "body": {
      "type": "dynamiczone",
      "components": ["article.slider", "article.content"]
    }
  }
}
```

### 模型选项

`options` 键用于定义特定行为，并接受以下参数：

| 参数           | 类型             | 描述                                                                                                                                                                                                                                                                                                        |
|---------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `privateAttributes` | Array of strings | 允许将一组属性视为私有属性，即使它们实际上并未在模型中定义为属性。它可用于从 API 响应时间戳中删除它们。<br><br> 模型中定义的 `privateAttributes` 与全局 Strapi 配置中定义的 `privateAttributes` 合并。 |
| `draftAndPublish`   | Boolean          | 启用草稿和发布功能。<br><br> 默认值：`true`（如果内容类型是从交互式创建的，则为 `false`)。        |

```json
// ./src/api/[api-name]/content-types/restaurant/schema.json

{
  "options": {
    "privateAttributes": ["id", "created_at"],
    "draftAndPublish": true
  }
}
```

## 生命周期挂钩

生命周期钩子是在调用 Strapi 查询时触发的函数。当通过管理面板管理内容或使用 `query` 开发自定义代码时，它们会自动触发。

生命周期挂钩可以通过声明方式或编程方式进行自定义。

:::caution
当直接使用  [knex](https://knexjs.org/) 库而不是 Strapi 函数时，不会触发生命周期钩子。
:::

### 可用的生命周期事件

以下生命周期事件可用：

- `beforeCreate`
- `beforeCreateMany`
- `afterCreate`
- `afterCreateMany`
- `beforeUpdate`
- `beforeUpdateMany`
- `afterUpdate`
- `afterUpdateMany`
- `beforeDelete`
- `beforeDeleteMany`
- `afterDelete`
- `afterDeleteMany`
- `beforeCount`
- `afterCount`
- `beforeFindOne`
- `afterFindOne`
- `beforeFindMany`
- `afterFindMany`

### Hook `event` 对象

生命周期挂钩是采用 `event` 参数的函数，该参数是具有以下键的对象：

| 键      | 类型              | 描述                                                                                                                                                      |
| -------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `action` | String            | 已触发的生命周期事件 (参见 [list](#available-lifecycle-events))                                                                                |
| `model`  | Object            | 模型对象                                                                                                                                                       |
| `params` | Object            | 接受以下参数：<ul><li>`data`</li><li>`select`</li><li>`where`</li><li>`orderBy`</li><li>`limit`</li><li>`offset`</li><li>`populate`</li></ul> |
| `result` | Object            | _可选，仅适用于 `afterXXX` 事件_<br><br>包含操作的结果。                                                                      |
| `state`  | Object            | 查询状态，可用于在查询的 `beforeXXX` 和 `afterXXX` 事件之间共享状态。query.                                                               |
<!-- TODO: `state` has not been implemented yet, ask for more info once done -->

### 声明式和编程用法

若要配置内容类型生命周期挂钩，请在 `./api/[api-name]/content-types/[content-type-name]/` 文件夹中创建一个 `lifecycles.js` 文件。

每个事件侦听器都是按顺序调用的。它们可以是同步的，也可以是异步的。

<code-group>
<code-block title=JAVASCRIPT>

```js
// ./src/api/[api-name]/content-types/[api-name]/lifecycles.js

module.exports = {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;

    // let's do a 20% discount everytime
    event.params.data.price = event.params.data.price * 0.8;
  },

  afterCreate(event) {
    const { result, params } = event;

    // do something to the result;
  },
};
```



</code-block>

<code-block title=TYPESCRIPT>

```js
// ./src/api/[api-name]/content-types/[api-name]/lifecycles.ts

export default {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;

    // let's do a 20% discount everytime
    event.params.data.price = event.params.data.price * 0.8;
  },

  afterCreate(event) {
    const { result, params } = event;

    // do something to the result;
  },
};
```

</code-block>
</code-group>

使用数据库层 API，还可以注册订阅者并以编程方式侦听事件：

```js
// ./src/api/[api-name]/content-types/[api-name]/lifecycles.js

// registering a subscriber
strapi.db.lifecycles.subscribe({
  models: [], // optional;

  beforeCreate(event) {
    const { data, where, select, populate } = event.params;

    event.state = 'doStuffAfterWards';
  },

  afterCreate(event) {
    if (event.state === 'doStuffAfterWards') {
    }

    const { result, params } = event;

    // do something to the result
  },
});

// generic subscribe for generic handling
strapi.db.lifecycles.subscribe((event) => {
  if (event.action === 'beforeCreate') {
    // do something
  }
});
```
