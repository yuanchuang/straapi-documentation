---
title: Admin Panel API - Strapi 开发人员文档
description: Strapi 的插件管理面板 API 允许 strapi插件自定义应用程序的前端部分（即管理面板）。
sidebarDepth: 3
canonicalUrl: https://docs.strapi.io/developer-docs/latest/developer-resources/plugin-api-reference/admin-panel.html
---

# 插件的管理面板 API

一个 Strapi [插件](/developer-docs/latest/plugins/plugins-intro.md) 可以与 strapi有应用的[后端](/developer-docs/latest/developer-resources/plugin-api-reference/server.md)或前端交互。管理面板 API 是关于前端部分的，即它允许插件自定义 Strapi 的[管理面板](/developer-docs/latest/development/admin-customization.md)。

管理面板是一个 [React](https://reactjs.org/) 应用程序，可以嵌入其他 React 应用程序。这些其他 React 应用程序是每个 Strapi 插件的管理部分。

创建与管理面板 API 交互的插件：

1. 创建 [入口文件](#入口文件).
2. 在此文件中，声明并导出一个插件接口，该接口使用 [可用操作](#可用操作).
3. 在插件包文件夹根目录下的 `strapi-admin.js` 文件中需要此插件接口：

  ```js
  // path: [plugin-name]/strapi-admin.js

  'use strict';

  module.exports = require('./admin/src').default;
  ```

## 入口文件

管理面板 API 的文件是 `[plugin-name]/admin/src/index.js`。此文件导出所需的接口，并具有以下可用功能：

| 函数类型     | 可用函数                                                     |
| ------------------- | ------------------------------------------------------------------------ |
| 生命周期函数 | <ul><li> [register](#register)</li><li>[bootstrap](#bootstrap)</li></ul> |
| 异步函数      | [registerTrads](#registertrads)                                          |

## 生命周期函数

### register()

**Type:** `Function`

调用此函数以加载插件，甚至在应用程序实际 [引导](#bootstrap) 之前。它将正在运行的 Strapi 应用程序作为参数（`app`）。

在 register 函数中，插件可以:

* [注册自身](#registerplugin) 因此，它可用于管理面板
* 向主导航添加新链接 (参见 [Menu API](#menu-api))
* [创建新的设置部分](#createsettingsection)
* 定义 [injection zones](#injection-zones-api)
* [添加 reducers](#reducers-api)

#### registerPlugin()

**Type:** `Function`

注册插件以使其在管理面板中可用。

此函数返回具有以下参数的对象:

| 参数        | 类型                     | 描述                                                                                        |
| ---------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| `id`             | String                   | 插件 ID                                                                                         |
| `name`           | String                   | 插件名                                                                                       |
| `injectionZones` | Object                   | 声明可用 [injection zones](#injection-zones-api)                                       |

::: note
某些参数可以从 `package.json` 文件导入。
:::

**例子:**

```js
// path: my-plugin/admin/src/index.js

// Auto-generated component
import PluginIcon from './components/PluginIcon';
import pluginId from './pluginId'

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: 'My plugin',
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "my-plugin" */ './pages/App');

        return component;
      },
      permissions: [], // array of permissions (object), allow a user to access a plugin depending on its permissions
    });
    app.registerPlugin({
      id: pluginId,
      name,
    });
  },
};
```

### bootstrap()

**Type**: `Function`

暴露 bootstrap 函数，在所有插件都 [registered](#register) 后执行。

在 bootstrap 函数中，插件可以:

* 扩展另一个插件，使用 `getPlugin('plugin-name')`,
* 注册 hooks (参见 [Hooks API](#hooks-api))
* [添加指向设置部分的链接](#settings-api)

**例子:**

```js
module.exports = () => {
  return {
    // ...
    bootstrap(app) {
      // execute some bootstrap code
      app.injectContentManagerComponent('editView', 'right-links', { name: 'my-compo', Component: () => 'my-compo' })
    },
  };
};
```

## 异步函数

虽然 [`register()`](#register) 和 [`bootstrap()`](#bootstrap) 是生命周期函数，但 `registerTrads()` 是一个异步函数。

### registerTrads()

**Type**: `Function`

为了减小构建大小，默认情况下，管理面板仅附带 2 个地区设置 (`en` 和 `fr`)，`registerTrads()` 函数用于注册插件的翻译文件，并为应用程序翻译创建单独的块。大多数情况下不需要修改。

::: details 示例：注册插件的翻译文件

```jsx
export default {
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map(locale => {
        return import(
          /* webpackChunkName: "[pluginId]-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
```

:::

## 可用操作

管理面板 API 允许插件利用多个小 API 来执行操作。使用此表作为参考；

| 功能                                   | 要使用的 API                              | 要使用的函数                                   | 相关生命周期函数 |
| ---------------------------------------- | --------------------------------------- | ------------------------------------------------- | --------------------------- |
| 向主导航添加新链接                     | [Menu API](#menu-api)                   | [`addMenuLink()`](#menu-api)                      | [`register()`](#register)   |
| 创建新的设置部分                       | [Settings API](#settings-api)           | [`createSettingSection()`](#createsettingsection) | [`register()`](#register)   |
| 声明 injection zone                   | [Injection Zones API](#injection-zones-api) | [`registerPlugin()`](#registerplugin)             | [`register()`](#register)   |
| 添加 reducer                          | [Reducers API](#reducers-api)                                       | [`addReducers()`](#reducers-api)                      | [`register()`](#register)   |
| 创建 hook                             | [Hooks API](#hooks-api)                 | [`createHook()`](#hooks-api)                    | [`register()`](#register)   |
| 向设置部分添加单个链接                  | [Settings API](#settings-api)           | [`addSettingsLink()`](#addsettingslink)             | [`bootstrap()`](#bootstrap) |
| 向设置部分添加多个链接                  | [Settings API](#settings-api)           | [`addSettingsLinks()`](#addsettingslinks)           | [`bootstrap()`](#bootstrap) |
| 在 injection zone 注入组件             | [Injection Zones API](#injection-zones-api) | [`injectComponent()`](#injection-zones-api)           | [`bootstrap()`](#register)  |
| 注册 hook                             | [Hooks API](#hooks-api)                 | [`registerHook()`](#hooks-api)                    | [`bootstrap()`](#bootstrap)   |

::: strapi 所见即所得
所见即所得编辑器可以通过利用 [注册生命周期](#register) 来替换（参见 [new WYSIWYG field in the admin panel](/developer-docs/latest/guides/registering-a-field-in-admin.md) 指南）。
:::

::: tip
管理面板支持 dotenv 变量.

在 `.env` 文件中定义并以 `STRAPI_ADMIN_` 为前缀的所有变量都可以在通过 `process.env` 自定义管理面板时使用。
:::

### Menu API

Menu API允许插件通过 `addMenuLink()` 函数使用以下参数将新链接添加到主导航中：

| 参数          | 类型             | 描述                                                                                                                                                                                                              |
| ------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `to`          | String           | 链接应指向的路径                                                                                                                                                                                          |
| `icon`        | React Component  | 要在主导航中显示的图标                                                                                                                                                                                |
| `intlLabel`   | Object           | 链接的标签，遵循 [React Int'l](https://formatjs.io/docs/react-intl) 约定, 其中:<ul><li>`id`: 用于插入本地化标签的 id</li><li>`defaultMessage`: 链接的默认标签</li></ul> |
| `Component`   | Async function   | 返回插件入口点的动态导入                                                                                                                                                                      |
| `permissions` | Array of Objects | 插件的 `permissions.js` 文件中声明的权限`                                                                                                                                                                                                                        |

:::note
`intlLabel.id` 是翻译文件（`[plugin-name]/admin/src/translations/[language].json`）中使用的 ID 
:::

**例子:**

```jsx
// path: my-plugin/admin/src/index.js
import PluginIcon from './components/PluginIcon';

export default {
  register(app) {
    app.addMenuLink({
      to: '/plugins/my-plugin',
      icon: PluginIcon,
      intlLabel: {
        id: 'my-plugin.plugin.name',
        defaultMessage: 'My plugin',
      },
      Component: () => 'My plugin',
      permissions: [], // permissions to apply to the link
    });
    app.registerPlugin({ ... });
  },
  bootstrap() {},
};
```

### Settings API

Settings API 允许:

* [创建新的设置部分](#createsettingsection)
* 添加 [单个链接](#addsettingslink) 或 [多个链接](#addsettingslinks) 到现有设置部分

::: note
添加新的设置部分发生在 [register](#register) 生命周期中，而添加链接发生在 [bootstrap](#bootstrap) 生命周期中。
:::

所有函数都接受链接作为具有以下参数的对象：

| 参数          | 类型             | 描述                                                                                                                                                                                                              |
| ------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`          | String           | React id                                                                                                                                                                                                                 |
| `to`          | String           | 链接应指向的路径                                                                                                                                                                                           |
| `intlLabel`   | Object           | 链接的标签，遵循 [React Int'l](https://formatjs.io/docs/react-intl) 约定, 其中:<ul><li>`id`: 用于插入本地化标签的 id</li><li>`defaultMessage`: 链接的默认标签</li></ul> |
| `Component`   | Async function   | 返回插件入口点的动态导入组件                                                                                                                                                               |
| `permissions` | Array of Objects | 插件的 `permissions.js` 文件中声明的权限`                                                                                                                                                             |

#### createSettingSection()

**Type**: `Function`

创建新的设置部分。

该函数采用 2 个参数：

| 参数            | 类型             | 描述                                                                                                                                                                                                                                                                                                                   |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| first argument  | Object           | 部分标签:<ul><li>`id` (String): section id</li><li>`intlLabel` (Object): 部分的本地化标签，遵循 [React Int'l](https://formatjs.io/docs/react-intl) 约定, 其中:<ul><li>`id`: 用于插入本地化标签的 id</li><li>`defaultMessage`: 该部分的默认标签</li></ul></li></ul> |
| second argument | Array of Objects | 该部分中包含的链接                                                                                                                                                                                                                                                                                                |

:::note
`intlLabel.id` 是翻译文件 (`[plugin-name]/admin/src/translations/[language].json`) 中使用的 ID
:::

**例子:**

```jsx
// path: my-plugin/admin/src/index.js

const myComponent = async () => {
  const component = await import(
    /* webpackChunkName: "users-providers-settings-page" */ './pages/Providers'
  );

  return component;
};

export default {
  register(app) {
    app.createSettingSection(
      { id: String, intlLabel: { id: String, defaultMessage: String } }, // Section to create
      [
        // links
        {
          intlLabel: { id: String, defaultMessage: String },
          id: String,
          to: String,
          Component: myComponent,
          permissions: Object[],
        },
      ]
    );
  },
};
```

#### addSettingsLink()

**Type**: `Function`

添加指向现有设置部分的唯一链接。

**例子:**

```jsx
// path: my-plugin/admin/src/index.js

const myComponent = async () => {
  const component = await import(
    /* webpackChunkName: "users-providers-settings-page" */ './pages/Providers'
  );

  return component;
};

export default {
  bootstrap(app) {
		// Adding a single link
		app.addSettingsLink(
		 'global', // id of the section to add the link to
			{
				intlLabel: { id: String, defaultMessage: String },
				id: String,
				to: String,
				Component: myComponent,
				permissions: Object[]
			}
    )
  }
}
```

#### addSettingsLinks()

**Type**: `Function`

向现有设置部分添加多个链接。

**例子:**

```jsx
// path: my-plugin/admin/src/index.js

const myComponent = async () => {
  const component = await import(
    /* webpackChunkName: "users-providers-settings-page" */ './pages/Providers'
  );

  return component;
};

export default {
  bootstrap(app) {
    // Adding several links at once
    app.addSettingsLinks(
      'global', // id of the section to add the link in
        [{
          intlLabel: { id: String, defaultMessage: String },
          id: String,
          to: String,
          Component: myComponent,
          permissions: Object[]
        }]
    )
  }
}
```

### Injection Zones API

注入区域是指视图布局的区域，其中插件允许另一个插件注入自定义 React 组件（例如，像按钮一样的 UI 元素）。

插件可以使用：


* Strapi 的[预定义注入区域](#using-predefined-injection-zones) 用于内容管理器，
* 或自定义注入区域，由插件创建

::: note
注入区域在 [register()](#register) 生命周期中定义，但组件在 [bootstrap()](#bootstrap) 生命周期中注入。
:::

#### 使用预定义的注入区域

Strapi 管理面板带有预定义的注入区域，因此可以将组件添加到[内容管理器](/user-docs/latest/content-manager/introduction-to-content-manager.md)的UI中：

<!-- TODO: maybe add screenshots once the design system is ready? -->

| View      | Injection zone name & Location                                                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| List view | <ul><li>`actions`: sits between Filters and the cogs icon</li><li>`deleteModalAdditionalInfos()`: sits at the bottom of the modal displayed when deleting items</li></ul> |
| Edit view | <ul><li>`informations`: sits at the top right of the edit view</li><li>`right-links`: sits between "Configure the view" and "Edit" buttons</li></ul>                       |

#### 创建自定义注入区域

要创建自定义注入区域，请将其声明为 `<InjectionZone />` React组件，其中包含一个 `area` 属性，该属性采用具有以下命名约定的字符串：`plugin-name.viewName.injectionZoneName`。

#### 注入组件

插件有 2 种不同的组件注入方式：

* 要将一个插件中的组件注入到另一个插件的注入区域，请使用 `injectComponent()` 函数
* 要专门将组件注入到内容管理器的[预定义注入区域](#using-predefined-injection-zones)，请使用  `injectContentManagerComponent()` 函数

`injectComponent()` 和 `injectContentManagerComponent()` 方法都接受以下参数：

| 参数            | 类型   | 描述                                                                                                                                                                   |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| first argument  | String | 注入组件的视图
| second argument | String | 注入组件的区域
| third argument  | Object | 具有以下键的对象：<ul><li>`name` (string): 组件名</li><li>`Component` (function or class): 要注入的 React 组件</li></ul> |

::: details 示例：在内容管理器的“编辑视图”的信息框中注入组件：

```jsx
// path: my-plugin/admin/src/index.js

export default {
  bootstrap(app) {
    app.injectContentManagerComponent('editView', 'informations', {
      name: 'my-plugin-my-compo',
      Component: () => 'my-compo',
    });
  }
}
```

:::

::: details 示例：创建一个新的注入区域并将其从插件注入到另一个插件：

```jsx
// Use the injection zone in a view
// path: my-plugin/admin/src/injectionZones.js

import { InjectionZone } from '@strapi/helper-plugin';

const HomePage = () => {
  return (
    <main>
      <h1>This is the homepage</h1>
	    <InjectionZone area="my-plugin.homePage.right" />
    </main>
  );
};

// Declare this injection zone in the register lifecycle of the plugin
// path: my-plugin/admin/src/index.js

export default {
  register() {
    app.registerPlugin({
      // ...
      injectionZones: {
        homePage: {
          right: []
        }
      }
    });
  },
}

// Inject the component from a plugin in another plugin
// path: my-other-plugin/admin/src/index.js

export default {
  register() {
    // ...
  },
  bootstrap(app) {
    app.getPlugin('my-plugin').injectComponent('homePage', 'right', {
      name: 'my-other-plugin-component',
      Component: () => 'This component is injected',
    });
  }
};
```

:::

#### 使用 `useCMEditViewDataManager` React hook 访问数据 

一旦定义了注入区域，要在内容管理器中注入的组件就可以通过 `useCMEditViewDataManager` React hook 访问编辑视图的所有数据。

::: details 使用 'useCMEditViewDataManager' 钩子的基本组件示例

```js
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

const MyCompo = () => {
  const {
    createActionAllowedFields: [], // Array of fields that the user is allowed to edit
    formErrors: {}, // Object errors
    readActionAllowedFields: [], // Array of field that the user is allowed to edit
    slug: 'api::address.address', // Slug of the content-type
    updateActionAllowedFields: [],
    allLayoutData: {
      components: {}, // components layout
      contentType: {}, // content-type layout
    },
    initialData: {},
    isCreatingEntry: true,
    isSingleType: true,
    status: 'resolved',
    layout: {}, // Current content-type layout
    hasDraftAndPublish: true,
    modifiedData: {},
    onPublish: () => {},
    onUnpublish: () => {},
    addComponentToDynamicZone: () => {},
    addNonRepeatableComponentToField: () => {},
    addRelation: () => {},
    addRepeatableComponentToField: () => {},
    moveComponentDown: () => {},
    moveComponentField: () => {},
    moveComponentUp: () => {},
    moveRelation: () => {},
    onChange: () => {},
    onRemoveRelation: () => {},
    removeComponentFromDynamicZone: () => {},
    removeComponentFromField: () => {},
    removeRepeatableField: () => {},
  } = useCMEditViewDataManager()

  return null
}
```

:::

### Reducers API

Reducers 是 [Redux](https://redux.js.org/) 化简器，可用于在组件之间共享状态。Reducers 在以下情况下非常有用：

* 应用程序中的许多位置都需要大量的应用程序状态。
* 应用程序状态频繁更新。
* 更新该状态的逻辑可能很复杂。

在 [`register`](#register) 生命周期中，可以使用 `addReducers()` 函数将 Reducers 添加到插件接口中。

Reducers 使用以下语法声明为对象：

**例子:**

```js
// path: my-plugin/admin/src/index.js
import { exampleReducer } from './reducers'

const reducers = {
  // Reducer Syntax
  [`${pluginId}_exampleReducer`]: exampleReducer
}

export default {
  register(app) {
    app.addReducers(reducers)
  },
  bootstrap() {},
};


```

### Hooks API

Hooks API 允许插件创建和注册 Hooks，即插件可以添加个性化行为的应用程序。

Hooks 应该在插件的[引导](#bootstrap)生命周期内注册。

Hooks 可以连续或并行运行：

* `runHookSeries` 返回一个数组，对应于执行的每个函数的结果，有序
* `runHookParallel` 返回一个数组，对应于由执行的函数解析的承诺的结果，有序
* `runHookWaterfall` 返回一个值，该值对应于从初始值 `args` 开始的不同函数应用的所有转换。

:::details 示例：在插件中创建钩子并在另一个插件中使用它

```jsx
// path: my-plugin/admin/src/index.js
// Create a hook in a plugin
export default {
  register(app) {
    app.createHook('My-PLUGIN/MY_HOOK');
  }
}


// path: my-other-plugin/admin/src/index.js
// Use the hook in another plugin
export default {
  bootstrap(app) {
    app.registerHook('My-PLUGIN/MY_HOOK', (...args) => {
      console.log(args)

      // important: return the mutated data
      return args
    });

    app.registerPlugin({...})
  }
}
```

:::

#### 预定义 hook

Strapi 包括一个预定义的 `Admin/CM/pages/ListView/inject-column-in-table` hook，可用于添加或改变 [Content Manager](/user-docs/latest/content-manager/introduction-to-content-manager.md) 的列表视图的一列

::: details 示例: 'Admin/CM/pages/ListView/inject-column-in-table' hook，由国际化插件用于添加 'Content available in' 列

```jsx
// ./plugins/my-plugin/admin/src/index.js
import get from 'lodash/get';
import cellFormatter from './components/cellFormatter';

export default {
  bootstrap(app) {
	  app.registerHook('Admin/CM/pages/ListView/inject-column-in-table', ({ displayedHeaders, layout }) => {
			const isFieldLocalized = get(layout, 'contentType.pluginOptions.i18n.localized', false);

			if (!isFieldLocalized) {
			  return { displayedHeaders, layout };
			}

			return {
        layout,
        displayedHeaders: [
          ...displayedHeaders,
          {
            key: '__locale_key__', // Needed for the table
            fieldSchema: { type: 'string' }, // Schema of the attribute
            metadatas: {
              label: 'Content available in', // Label of the header,
              sortable: true|false // Define if the column is sortable
            }, // Metadatas for the label
            // Name of the key in the data we will display
            name: 'locales',
            // Custom renderer: props => Object.keys(props).map(key => <p key={key}>key</p>)
            cellFormatter,
          },
			  ]
      };
    });
  },
}
```

:::
