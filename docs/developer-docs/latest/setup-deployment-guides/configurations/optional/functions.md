---
title: 函数 - Strapi 开发人员文档
description: Strapi 包括生命周期函数（例如寄存器、引导和销毁），这些函数控制应用程序的流程。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/functions.html
---

# 函数

`./src/index.js` 文件 (或 [TypeScript-based](/developer-docs/latest/development/typescript.md) 项目中的 `./src/index.ts` 文件) 包括全局 [register](#register), [bootstrap](#bootstrap) 和 [destroy](#destroy) 函数，可用于添加动态和基于逻辑的配置。

## Register

`register` 生命周期函数位于 `./src/index.js`（或 `./src/index.ts`）中，它是一个在应用程序初始化之前运行的异步函数。
它可用于：

- [扩展插件](/developer-docs/latest/development/plugins-extension.md#extending-a-plugin-s-interface)
- 扩展 [content-types](/developer-docs/latest/development/backend-customization/models.md) programmatically
- 加载一些 [环境变量](/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.md).

## Bootstrap

在`./src/index.js`（或 `./src/index.ts`）中找到的 `bootstrap` 生命周期函数在每次服务器启动时调用。

它可用于：

- 如果没有管理员用户，请创建一个管理员用户
- 用一些必要的数据填充数据库
- 为 [基于角色的访问控制  (RBAC)](/developer-docs/latest/setup-deployment-guides/configurations/optional/rbac.md) 功能声明自定义条件

引导函数可以是同步的、异步的，也可以返回一个 promise：

**Synchronous function**

<code-group>
<code-block title="JAVASCRIPT">

```js
module.exports = () => {
  // some sync code
};
```

</code-block>

<code-block title="TYPESCRIPT">

```js
export default () => {
  // some sync code
};
```

</code-block>
</code-group>

**Asynchronous function**

<code-group>
<code-block title="JAVASCRIPT">

```js
module.exports = async () => {
  await someSetup();
};
```

</code-block>

<code-block title="TYPESCRIPT">

```js
export default async () => {
  await someSetup();
};
```

</code-block>
</code-group>

**Function returning a promise**

<code-group>
<code-block title="JAVASCRIPT">

```js
module.exports = () => {
  return new Promise(/* some code */);
};
```

</code-block>

<code-block title="TYPESCRIPT">

```js
export default () => {
  return new Promise(/* some code */);
};
```

</code-block>
</code-group>

## Destroy

在 `./src/index.js`（或 `./src/index.ts`）中找到的 `destroy` 函数是在应用程序关闭之前运行的异步函数。

它可用于：

- 停止正在运行的 [服务](/developer-docs/latest/development/backend-customization/services.md) 
- [清理插件操作](/developer-docs/latest/developer-resources/plugin-api-reference/server.md#destroy)（例如，关闭连接，删除侦听器等）。
