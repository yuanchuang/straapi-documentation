---
title: 配置 - Strapi 开发人员文档
description: 了解如何管理和自定义 Strapi 应用程序的配置。
sidebarDepth: auto
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations.html
---

# 配置

应用程序配置位于 `./config` 文件夹中 (参见 [项目结构](/developer-docs/latest/setup-deployment-guides/file-structure.md))。所有配置文件都在启动时加载，并且可以通过配置提供程序进行访问。

`./config/server.js` 具有以下配置：

```js
module.exports = {
  host: '0.0.0.0',
};
```

`server.host` key 可以按如下方式访问：

```js
strapi.config.get('server.host', 'defaultValueIfUndefined');
```

嵌套键可通过 [dot notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#dot_notation) 访问。

:::note
文件名用作访问配置的前缀。
:::

配置文件可以是 `.js` 或 `.json` 文件。

使用 `.js` 文件时，可以导出配置：

- 作为对象:

  ```js
  module.exports = {
    mySecret: 'someValue',
  };
  ```

- 或作为返回配置对象的函数（推荐用法）。该函数将访问 [`env` utility](#casting-environment-variables)。

  ```js
  module.exports = ({ env }) => {
    return {
      mySecret: 'someValue',
    };
  };
  ```

## 必需配置

必须配置 Strapi 的某些部分，才能使 Strapi 应用程序正常工作：

- [database](/developer-docs/latest/setup-deployment-guides/configurations/required/databases.md)
- [server](/developer-docs/latest/setup-deployment-guides/configurations/required/server.md)
- [admin panel](/developer-docs/latest/setup-deployment-guides/configurations/required/admin-panel.md)
- [middlewares](/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.md)

## 可选配置

Strapi 还为特定功能提供以下可选配置选项：

- [API tokens](/developer-docs/latest/setup-deployment-guides/configurations/optional/api-tokens.md)
- [functions](/developer-docs/latest/setup-deployment-guides/configurations/optional/functions.md)
- [cron jobs](/developer-docs/latest/setup-deployment-guides/configurations/optional/cronjobs.md)
- [API calls](/developer-docs/latest/setup-deployment-guides/configurations/optional/api.md)
- [plugins](/developer-docs/latest/setup-deployment-guides/configurations/optional/plugins.md)
- the [environment and its variables](/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.md)
- [public assets](/developer-docs/latest/setup-deployment-guides/configurations/optional/public-assets.md)
- [Single Sign-On](/developer-docs/latest/setup-deployment-guides/configurations/optional/sso.md) <GoldBadge link="https://strapi.io/pricing-self-hosted/" withLinkIcon />
- [Role-Based Access Control](/developer-docs/latest/setup-deployment-guides/configurations/optional/rbac.md) <BronzeBadge link="https://strapi.io/pricing-self-hosted"/> <SilverBadge link="https://strapi.io/pricing-self-hosted"/> <GoldBadge link="https://strapi.io/pricing-self-hosted" withLinkIcon/>
