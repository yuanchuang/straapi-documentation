---
title: 常见问题 - Strapi 开发人员文档
description: 查找一些答案和解决方案，以解决您在使用 Strapi 时可能遇到的大多数常见问题。
sidebarDepth: 0
canonicalUrl: https://docs.strapi.io/developer-docs/latest/getting-started/troubleshooting.html
---

# 常见问题

以下是您在使用 Strapi 时可能遇到的最常见问题的答案和解决方案。

## 为什么我无法在生产/过渡阶段中创建或更新内容类型？

Strapi 将模型配置文件（定义模型架构的内容）存储在诸如 `./src/api/restaurant/content-types/restaurant/schema.json` 等文件中。由于 Node .js的工作方式，为了使更改生效，这将需要 Node 重新启动服务器。这可能会导致生产服务停机，同样，应在某种源代码管理中跟踪这些更改。


一般来说，你的“开发流程”将遵循以下路径：

- 开发 - 在主机上本地开发 Strapi 应用程序，然后将更改推送到源代码管理中
- 暂存 - 将更改从源代码管理部署到“类似生产”的环境以进行测试
- 生产 - 如果不需要其他更改，请部署到生产环境中
- 根据需要重复，建议您正确版本并随时测试您的应用程序

目前和将来都没有计划在生产环境中创建或更新模型，并且目前没有计划将模型设置移动到数据库中。对此没有已知或推荐的解决方法。

## Strapi 如何处理内容的部署或迁移？

Strapi 目前不提供任何工具用于在不同环境之间迁移或部署数据更改（_即从开发到生产_）。除了内容管理器设置之外，要阅读有关此选项的更多信息，请参阅 [CLI 文档](/developer-docs/latest/developer-resources/cli/CLI.md#strapi-configuration-dump)。

## 用户无法登录到管理面板

随着 Strapi 测试版的发布，发生了根本性的变化，最终用户（REST 和 GraphQL 用户）从管理员（管理面板用户）中分离出来，普通用户无法访问管理面板。如果您想了解更多有关为什么进行此更改的信息，可以阅读 Strapi [博客文章](https://strapi.io/blog/why-we-split-the-management-of-the-admin-users-and-end-users)

Strapi发布了新的管理员权限（RBAC - 基于角色的访问控制），它确实允许对用户可以在管理面板中访问的内容进行一定程度的控制，并包括一些字段级权限。现在，您还可以为角色授予内容类型、单一类型、插件和设置等内容的特定权限。

当这个新插件发布时，有两个版本：

- 社区版
- 企业版

默认情况下，社区版包括 3 个预定义的角色（管理员、编辑者、作者）。升级到企业版将解锁无限数量的角色。基于版本，将有某些其他字段级别的权限限制，我们将构建有关“基本”与“高级”RBAC功能中包含的内容的详细指南。要了解有关所包含内容和定价的更多信息，请参阅我们的[价格页](https://strapi.io/pricing-self-hosted)。

## 关系不保持其排序顺序

对于组件，有一个名为 `order` 的隐藏字段，它允许条目保持其排序，但是对于关系，没有这样的字段。如果您考虑组件条目与基于关系的条目的典型计数（回想起来，它们在后端的功能相同），则通常存在更多数量的关系。如果关系也应用了 `order` 字段，则在尝试更新订单时可能会导致性能显著下降，同样，在关系可以附加到多个条目的情况下，维护订单将非常困难。

目前，没有推荐的方法来自动处理此问题，相反，您可能需要创建自定义控制器才能在自己的项目中处理此问题。

我们正在评估将来是否会在本地添加对此的支持。我们将在可用时添加更多详细信息。

## 为什么我的应用程序的数据库和上传在 PaaS 上重置？

如果使用 `--quickstart` 创建 Strapi 项目，则默认情况下，这将使用 SQLite 数据库。PaaS 系统 (Heroku, DigitalOcean Apps, Google App Engine 等等) 文件系统通常是 [ephemeral](https://devcenter.heroku.com/articles/dynos#ephemeral-filesystem) 或只读的，这意味着每次重置测功机（容器）时，所有文件系统更改都会丢失。由于 SQLite 和本地上传都存储在文件系统上，因此自上次 dyno 重置以来对这些更改都将被删除。通常，测功机每天至少重置一次，并且在大多数情况下每天重置多次，或者当新代码被推送到这些服务时。

建议您使用数据库插件，例如 Heroku's PostgreSQL。对于文件上传，您需要使用第三方提供商之一，例如 Cloudinary or AWS S3.

## Strapi 可以在 serverless 环境中运行吗？

由于应用程序的结构，Strapi 不太适合 serverless 环境。在 Strapi 启动时会发生一些可能需要几秒钟的操作。 serverless 部署通常需要应用程序非常快速地冷启动。Strapi 被设计为始终在线的服务，我们不打算在可预见的未来减少冷启动时间。因此，在 serverless 环境中运行 Strapi 并不是一种很好的体验，因为每个请求都需要几秒钟来响应，而不是几毫秒。在冷启动或热启动之间进行选择是许多软件开发人员需要从很早的阶段开始做出的体系结构决策，因此在选择使用 Strapi 时请考虑这一点。

## 是否可以在模型设置中存储内容管理器布局配置？

目前 Strapi 不支持此功能，因此添加了 `config:dump` 和 `config:restore` 命令，以便在不同的部署和环境之间移动时更轻松地迁移这些设置。

由于以下几个原因，我们不提供将这些配置存储在模型设置中的功能：

- 它将在管理界面中的内容国际化和翻译的情况下产生冲突。
- 布局可能因角色和权限而异。
- 虽然无论创建的内容如何，模型都是相同的，但贡献接口可以不同。例如，我们有一个想法，即仅为贡献者创建一个移动应用程序。标签和布局配置可能因设备 &接口而异。

由于所有这些原因以及其他原因，我们认为这将是一个错误，如果我们将配置存储在模型设置文件中，可能会使用户感到困惑。最终的解决方案是使跨环境的迁移和部署更加容易。

## How do I customize a plugin?

如何自定义插件？

Strapi 使用一个名为 [extensions](/developer-docs/latest/development/plugins-extension.md) 的系统，因为插件存储在 `node_modules` 文件夹中。由于这种扩展，Strapi 可以检测较新版本的文件，并将其用作存储在 `node_modules` 中的文件的替代品。

您可以在不分叉插件包的情况下修改这些文件，但是您将失去轻松更新的能力。在每个版本发布后，您需要将更改与新版本中的更改进行比较，并相应地修改文件版本。

<!-- TODO: Confirm with Frontend team if this FAQ is accurate -->

## 我可以添加自己的第三方身份验证提供商吗？

是的，您可以按照以下[指南](/developer-docs/latest/plugins/users-permissions.md#adding-a-new-provider-to-your-project)进行操作，也可以查看[用户权限](https://github.com/strapi/strapi/tree/master/packages/plugins/users-permissions)并提交拉取请求以包含每个人的提供程序。最终，Strapi 确实计划从当前的授权/最纯粹的提供商转变为类似于上传提供商的分裂系统。

但是，目前没有关于此迁移的预计到达时间。

## Strapi 是否允许我更改默认 ID 类型或名称？

否，目前无法允许更改默认 ID 名称，也不允许您切换数据类型（例如 PostgreSQL 中的 UUID），将来将研究对此的支持。

## 能过滤和/或深层过滤动态区域和多态关系吗？

目前，由于各种复杂性和性能问题，我们不打算允许过滤动态区域或多态关系。

## 如何使用 Strapi 设置 SSL？ 

Strapi 本身没有实现 SSL 解决方案，这是因为在低端口上直接向公共网络提供 Node.js 应用程序是非常不安全的。


在基于 Linux 的操作系统上，您需要 root 权限才能绑定到低于 1024 的任何端口，并且典型的 SSL 是端口 443，您需要以 root 身份运行应用程序。

同样，由于 Strapi 是基于 Node.js，为了对 SSL 证书进行更改（例如，当它过期时），您需要重新启动应用程序才能使该更改生效。

由于这两个问题，建议您使用代理应用程序，如 [Nginx](/developer-docs/latest/setup-deployment-guides/deployment/optional-software/nginx-proxy.md), [Caddy](/developer-docs/latest/setup-deployment-guides/deployment/optional-software/caddy-proxy.md), [HAProxy](/developer-docs/latest/setup-deployment-guides/deployment/optional-software/haproxy-proxy.md), 或许多其他应用程序来处理到 Strapi 的边缘路由。环境中有一些设置 [server.json](/developer-docs/latest/setup-deployment-guides/configurations/required/server.md) 来处理上游代理。代理块要求填写所有设置，并将修改任何后端插件，例如身份验证提供程序和上传插件），以将标准`localhost:1337` 替换为代理URL。

## 我可以在 Strapi 项目中使用类型脚本吗？

TypeScript 在 v4.2.0-beta.1 的 Strapi 项目中受支持，具体代码示例可在核心开发人员文档和 [专用 TypeScript 支持页面](/developer-docs/latest/development/typescript.md)。

## X 功能是否可用？

您可以在 [public roadmap](https://feedback.strapi.io/) 以查看哪些功能请求当前正在处理，哪些尚未启动，以及添加新的功能请求。

<!-- TODO: This will be changed to Canny eventually, leave this note here for Derrick please -->
