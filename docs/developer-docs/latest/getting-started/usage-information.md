---
title: 使用信息 - Strapi 开发人员文档
description: 我们致力于与 Strapi 一起提供超出用户和社区期望的解决方案。我们还致力于继续发展，使 Strapi 比今天更好。
sidebarDepth: 0
canonicalUrl: https://docs.strapi.io/developer-docs/latest/getting-started/usage-information.html
---

# 收集的使用信息

我们致力于与 Strapi 一起提供超出用户和社区期望的解决方案。我们还致力于继续发展，使 Strapi 比今天更好。为此，Strapi 包含一项功能，其中收集匿名和非敏感数据。这些数据是我们所有用户的集体汇总，当这些数据结合在一起时，我们可以更好地了解用户如何互动和使用 Strapi。

## 内容

使用 Strapi 的开发人员数量正在显著增长。如前所述，我们致力于为用户提供最佳体验。我们将始终继续进行动手的UI / UX测试，调查，问题跟踪，路线图投票等...并以其他方式与Stati社区交谈，同时努力通过任何可用的方式理解和交付所要求的内容和需求。

然而，仅凭上述这些行动往往不足以全面了解Stati全球使用及其功能的某些方面。全球汇总数据有助于我们回答以下问题并做出选择：

- 我们的用户是否使用特定功能？对于那些使用它的人来说，他们用它来做什么？它是否被激活并与另一个插件一起使用？哪个特定的插件？还是其他一些东西，比如，只在开发/生产中？
- 设置项目需要多长时间？如果全局安装时间增加，是否意味着用户遇到问题或过程太复杂？
- 我们的用户面临什么类型的错误？
- 最常用的插件是什么？
- 我们是否应该将精力集中在与节点16兼容上？也许我们的社区使用版本 16 的比例高于全球 Node.js 社区？
- 以及更多...

如果没有这些指标，我们将无法做出正确的选择，因为我们将继续推进路线图，并提供您，社区和用户的要求。

## 收集的数据

收集以下数据：

- 唯一的项目 ID（使用 UUID 生成）
- 唯一的计算机 ID（使用 [节点-机器-id](https://www.npmjs.com/package/node-machine-id)生成）
- 环境状态（开发、暂存、生产）
- 系统信息
- 构建配置

::: caution GDPR
收集的数据具有非敏感性，不会收集任何个人数据。我们遵守欧洲GDPR的建议（请参阅我们的[隐私政策](https://strapi.io/privacy))。我们不收集数据库配置、密码或自定义变量。收集的任何数据（如上所述）都是安全，加密和匿名的。
:::

### 选择退出

::: caution
Strapi 之前建议通过删除位于项目根目录中的 `package.json` 文件中的 `uuid` 属性来禁用数据收集。虽然此方法仍然有效，但不鼓励这样做，因为某些项目功能可能需要 `uuid`，并且在以后添加 `uuid` 将在不通知用户的情况下重新启用数据收集。

可以使用以下 CLI 命令禁用默认数据收集功能：

<code-group>

<code-block title="NPM">
```jsx
//disable telemetry in a Strapi application

npm run strapi telemetry:disable

```
</code-block>

<code-block title="YARN">
```jsx
//disable telemetry in a Strapi application

yarn strapi telemetry:disable
```

</code-block>

</code-group>

或者，项目 `package.json` 文件中的 `telemetryDisabled: true` 标志也将禁用数据收集。

以后可以通过删除标志或将其设置为 false，或者使用 `telemetry:enable` 命令来重新启用数据收集。

::: note
如果您对数据收集有任何疑问或疑虑，请通过以下电子邮件地址 [privacy@strapi.io](mailto:privacy@strapi.io) 与我们联系。
:::
