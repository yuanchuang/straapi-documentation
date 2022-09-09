---
title: 快速开始指南 - Strapi 开发人员文档
description: 准备好在不到3分钟的时间内启动并运行您最喜欢的开源无头 cms Strapi。
sidebarDepth: 0
next: ./troubleshooting
canonicalUrl: https://docs.strapi.io/developer-docs/latest/getting-started/quick-start.html
---

# 快速开始指南

<style lang="scss" scoped>

  /*
    Some custom CSS tailored for this Quick Start Guide,
    so that the text can "breathe" a bit more.
  */  
  h2:not(:first-child) {
    padding-top: 2em;
  }

  h3, h4 {
    padding-top: 1.5em
  }

  h4 {
    font-size: 115%;
  }

  ul li, ol li {
    padding-bottom: .5em;
  }

  ol li {
    margin-left: 1em;
    padding-left: .3em;
  }

</style>

<!-- We use the vuepress-plugin-tabs plugin but customize tabs. -->
<!-- Not sure why I doesn't work if CSS is scoped 🤷  -->
<style lang="scss">
  /* I know some selectors are ugly, but I needed to target the proper nav and not conflict with the other "card"-style tabs embedded */
  
  .el-tabs--card > .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav,
  .el-tabs--card > .el-tabs__header  {
    border: none !important;
  }

  .el-tabs--card > .el-tabs__header {
    padding-top: 3em;
  }

  .el-tabs--card > .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav {
    width: 100%;
    height: 62px;
  }

  .el-tabs--card > .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__item {
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 110%;
    width: 50%;
    border-radius: 0 8px 8px 0 !important;
    border: solid 1px #bbbbba !important;
  }

  .el-tabs--card > .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__item:first-child {
    border-radius: 8px 0 0 8px !important;
    border-right: none !important;
  }

  .el-tabs--card > .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__item:not(.is-active) {
    background-color: #f8f8f8;
    color: #787878;
  }

  .image--50 {
    width: 50%;
  }
  .image--right {
    float: right;
  }
</style>

Strapi 提供了很大的灵活性。无论您是想快速快速查看最终结果，还是想更深入地了解产品，我们都能满足您的需求。

::: prerequisites

!!!include(developer-docs/latest/developer-resources/cli/snippets/installation-prerequisites.md)!!!

:::


👇 让我们开始吧！使用下面的大按钮，请选择：

- 用 **Hands-on** 方式 DIY 运行项目
- 或 **Starters** 方式，用于以最快的方式启动由 Strapi 后端提供支持的全栈应用程序。

:::::: tabs type:card

<!-- we need 5 colons or it will conflict with the callouts markup -->

::::: tab Hands-on

## 🚀 A 部分: 创建新项目

### 步骤 1: 运行安装脚本

在终端中运行以下命令：

<code-group>

<code-block title="NPM">
```bash
npx create-strapi-app@latest my-project --quickstart
```
</code-block>

<code-block title="YARN">
```bash
yarn create strapi-app my-project --quickstart
```
</code-block>

</code-group>

:::note
快速入门安装为 Strapi 设置了一个 SQLite 数据库。其他数据库和安装选项可用 (请参阅 [CLI 安装指南](/developer-docs/latest/setup-deployment-guides/installation/cli.md))。
:::

### 步骤 2: 注册第一个管理员用户

安装完成后，您的浏览器会自动打开一个新选项卡。

通过填写表格，您可以创建自己的帐户。完成后，您将成为此 Strapi 应用程序的第一个管理员用户。欢迎登船，指挥官！

您现在可以访问 [管理面板](http://localhost:1337/admin):

![Admin panel screenshot: dashboard](../assets/quick-start-guide/qsg-handson-part1-01-admin_panel_2.png)

::: callout 🥳 CONGRATULATIONS!
您刚刚创建了一个新的 Strapi 项目！您可以开始玩 Strapi 并使用我们的 [用户指南](/user-docs/latest/getting-started/introduction.md), 或继续阅读下面的 B 部分。
:::

## 🛠 B 部分: 构建您的内容

安装脚本刚刚创建了一个空项目。现在，我们将指导您创建一个餐厅目录，其灵感来自我们的 [FoodAdvisor](https://github.com/strapi/foodadvisor)  示例应用程序。

简而言之，我们将为您的内容创建一个数据结构，然后添加一些条目并发布它们，以便可以使用您的内容的 API。

Strapi 的管理面板在  [http://localhost:1337/admin](http://localhost:1337/admin) 处运行。这是您将花费大部分时间创建和更新内容的地方。

:::tip TIP
如果服务器尚未运行，请在终端中将 `cd` 到 `my-project` 目录下并运行 `npm run develop` (或 `yarn develop`) 以启动它。
:::

### 步骤 1: 使用内容类型生成器创建集合类型

内容类型生成器插件可帮助您创建数据结构。当使用 Strapi 创建一个空项目时，这是开始派对的地方！

#### 创建 "餐厅" 集合类型

您的餐厅目录最终将包含许多餐厅，因此我们需要创建一个“餐厅”集合类型。然后，我们可以描述添加新餐厅条目时要显示的字段：

1. 转到主导航中的插件内容类型生成器图标 ![Content-type Builder icon](../assets/quick-start-guide/icons/content_types_builder.svg) [Content-type Builder](http://localhost:1337/admin/plugins/content-type-builder)。
2. 点击 **Create new collection type**。
3. 输入 `Restaurant` 作为 _Display name_，然后单击 **Continue**.  
4. 单击文本字段。
5. 在 _Name_ 字段下输入 `name`。
6. 切换到 _Advanced Settings_ 选项卡，然后选中 **Required field** 和 **Unique field** 设置。
7. 点击 **Add another field**。
8. 选择富文本字段。
9. 在 _Name_ 字段下输入 `description`，然后点击 **Finish**。
10. 最后，点击 **Save** 并等待 Strapi 重启。

![GIF: Create Restaurant collection type in Content-type Builder](../assets/quick-start-guide/qsg-handson-restaurant_2.gif)

一旦 Strapi 重新启动 "Restaurant" 将列在 ![Content Manager icon](../assets/quick-start-guide/icons/content.svg) _Content Manager > Collection types_ 导航中。哇，你刚刚创建了你的第一个内容类型！这太酷了——让我们现在就再创造一个，只是为了好玩。

#### 创建 "分类" 集合类型

如果我们的餐厅目录有一些类别，这将有助于更有条理。让我们创建一个 "分类" 集合类型：

1. 转到主导航中的插件内容类型生成器图标 ![Content-type Builder icon](../assets/quick-start-guide/icons/content_types_builder.svg) [Content-type Builder](http://localhost:1337/admin/plugins/content-type-builder) 。
2. 点击 **Create new collection type**。
3. 输入 `Category` 作为 _Display name_，然后单击 **Continue**。
4. 单击文本字段。
5. 在 _Name_ 字段下输入 `name`。
6. 切换到 _Advanced Settings_ 选项卡，然后选中 **Required field** 和 **Unique field** 设置。
7. 点击 **Add another field**。
8. 选择 Relation 字段。
9. 在右侧，单击 _Category_ 框，然后选择 _Restaurant_。
10. 在中间，选择代表 "many-to-many" ![icon many-to-many](../assets/quick-start-guide/icon_manytomany.png)。文本应为 `Categories has and belongs to many Restaurants`。

![Admin Panel screenshot: relations](../assets/quick-start-guide/qsg-handson-part2-02-collection_ct.png)

11. 最后，点击 **Save** 并等待 Strapi 重启。

### 步骤 2: 使用集合类型创建新条目

现在，我们已经创建了一个包含 2 种集合类型的基本数据结构， "Restaurant" 和 "Category"，让我们使用它们通过创建新条目来实际添加内容。

#### 为 "餐厅" 集合类型创建一个条目

1. 在导航中选择 ![Content Manager icon](../assets/quick-start-guide/icons/content.svg) [Content Manager > Collection types - Restaurant](http://localhost:1337/admin/content-manager/collectionType/api::restaurant.restaurant)。
2. 点击 **Add new entry**.
3. 在 _Name_ 字段中键入您最喜爱的当地餐厅的名称。假设它是 `Biscotte Restaurant`。
4. 在 _Description_ 字段中，写几句关于它的话。如果您缺乏灵感，可以使用 `欢迎来到比斯科特餐厅！Biscotte餐厅提供基于新鲜优质产品的美食，通常是当地的有机产品，如果可能的话，并且总是由热情的生产商生产。`
5. 点击 **Save**.

![Screenshot: Biscotte Restaurant in Content Manager](../assets/quick-start-guide/qsg-handson-part2-03-restaurant.png)

该餐厅现在列在 [Collection types - Restaurant](http://localhost:1337/admin/content-manager/collectionType/api::restaurant.restaurant) 视图中。

#### 添加分类

到 ![Content Manager icon](../assets/quick-start-guide/icons/content.svg) [Content Manager > Collection types - Category](http://localhost:1337/admin/content-manager/collectionType/api::category.category) 并创建两个分类:

1. 点击 **Add new entry**.
2. 在 _Name_ 字段中输入 `French Food`。
3. 点击 **Save**。
4. 返回 _Collection types - Category_，然后再次单击 **Add new entry**.  
5. 在 _Name_ 字段中输入 `Brunch`，然后点击 **Save**。

![GIF: Add Categories](../assets/quick-start-guide/qsg-handson-categories.gif)

"French Food" 和 "Brunch" 类别现在列在 [Collection types - Category](http://localhost:1337/admin/content-manager/collectionType/api::category.category) 视图中。

#### 向餐厅添加类别

在导航栏中转到 ![Content Manager icon](../assets/quick-start-guide/icons/content.svg) [Content Manager > Collection types - Restaurant](http://localhost:1337/admin/content-manager/collectionType/api::restaurant.restaurant)，并点击 "Biscotte Restaurant".

在右侧边栏的 **Categories** 下拉列表中，选择 "Brunch"。点击 **Save**。

### 步骤 3: 设置角色和权限

我们刚刚添加了一家餐厅和 2 个类别。我们现在有足够的内容可供消费（双关语）。但首先，我们需要确保内容可以通过 API 公开访问：

We have just added a restaurant and 2 categories. We now have enough content to consume (pun intended). But first, we need to make sure that the content is publicly accessible through the API:

1. 在 主导航的底部点击 _General ![Settings icon](../assets/quick-start-guide/icons/settings.svg) Settings_。
2. 在 _Users & Permissions Plugin_ 下，选择 [Roles](http://localhost:1337/admin/settings/users-permissions/roles)。
3. 单击 **Public** 角色。
4. 在 _Permissions_ 下向下滚动。
5. 在 _Permissions_ 选项卡中找到 _Restaurant_ 并点击它。
6. 单击 **find** 和 **findone** 旁边的复选框。
7. 重复上述步骤：单击 _Category_ 下的 **find** 和 **findone** 旁边的复选框。
8. 最后，点击 **Save**。

![Screenshot: Public Role in Users & Permissions plugin](../assets/quick-start-guide/qsg-handson-part2-04-roles.png)

### 步骤 4: 发布内容

默认情况下，您创建的任何内容都将另存为草稿。让我们发布我们的类别和餐厅。

首先，到 ![Content Manager icon](../assets/quick-start-guide/icons/content.svg) [Content Manager > Collection types - Category](http://localhost:1337/admin/content-manager/collectionType/api::category.category)。在那里：

1. 点击 "Brunch" 条目。
2. 在下一个屏幕上，单击 **Publish**。
3. 在 _Confirmation_ 窗口中，点击 **Yes, publish**。

然后，返回 Categories 列表，并重复 "French Food" 类别。


最后，要发布您最喜欢的餐厅，请转到 ![Content Manager icon](../assets/quick-start-guide/icons/content.svg) [Content Manager > Collection types - Restaurant](http://localhost:1337/admin/content-manager/collectionType/api::restaurant.restaurant)，单击餐厅条目，然后 **Publish** 它。

![GIF: Publish content](../assets/quick-start-guide/qsg-handson-publish.gif)

### 步骤 5: 使用 API

好的，亲爱的美食家，我们刚刚完成了内容的创建，并通过API对其进行了访问。你可以拍拍自己的背——但你还没有看到你努力工作的最终结果。

您在那里：餐厅列表可在 [http://localhost:1337/api/restaurants](http://localhost:1337/api/restaurants).

现在就试试吧！结果应类似于下面的示例👇响应。

::: details 单击以查看 API 响应示例

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Biscotte Restaurant",
        "description": "Welcome to Biscotte restaurant! Restaurant Biscotte offers a cuisine based on fresh, quality products, often local, organic when possible, and always produced by passionate producers.",
        "createdAt": "2021-11-18T13:34:53.885Z",
        "updatedAt": "2021-11-18T13:59:05.035Z",
        "publishedAt": "2021-11-18T13:59:05.033Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

:::

::: callout 🥳 CONGRATULATIONS!  
现在，您的内容已创建、发布，并且您有权通过 API 请求该内容。
继续创造惊人的内容！
:::

## ⏩ 下一步做什么？

现在您已经了解了使用 Strapi 创建和发布内容的基础知识，我们鼓励您探索并深入挖掘 Strapi 的一些功能：


- 👉 [创建 API token](/user-docs/latest/settings/managing-global-settings.md#managing-api-tokens) 以限制对您的 API 的访问，
- 👉 学习如何使用 Strapi 的 [REST](/developer-docs/latest/developer-resources/database-apis-reference/rest-api.md) 和 [GraphQL](/developer-docs/latest/developer-resources/database-apis-reference/graphql-api.md) APIs 来请求你的内容
- 👉 和 [定制 Strapi 后端](/developer-docs/latest/development/backend-customization.md) 和 [管理面板](/developer-docs/latest/development/admin-customization.md).

:::::

::::: tab Starters

## 🚀 Part A: 使用 Strapi 启动器创建新项目


Strapi [starters](https://strapi.io/starters) 是启动项目的最快方法。它们涵盖了许多用例（博客，电子商务解决方案，企业网站，投资组合），并与各种技术（Next，Gridsome，Nuxt）集成。

本快速入门指南是专门为使用 [Next blog starter](https://strapi.io/starters/strapi-starter-next-js-blog) 而量身定制的。我们强烈建议您遵循此起始程序。一旦你对 Strapi 有了更好的了解，你将能够自己和其他初学者一起玩。

### 步骤 1: 运行安装脚本

要使用 Strapi， 在终端中运行以下命令创建 [Next](https://nextjs.org/) 博客：

:::: tabs card
::: tab npm

```bash
  npx create-strapi-starter my-project next-blog
```

:::
::: tab yarn

```bash
  yarn create strapi-starter my-project next-blog
```

::::

在安装过程中，当终端询问 `Choose your installation type` 时：按 Enter 选择默认的 `Quickstart (recommended)` 选项。然后安装 - 等待魔术发生！

### 步骤 2: 注册并查看您的博客

安装完成后，您的浏览器会自动打开一个选项卡 ([http://localhost:1337/admin/auth/register-admin](http://localhost:1337/admin/auth/register-admin))。它适用于 Strapi 的管理面板，即应用程序的后端。

通过在管理面板选项卡中填写表单，您可以创建自己的帐户。完成后，您将成为此 Strapi 应用程序的第一个管理员用户。欢迎登船，指挥官！

现在，在另一个选项卡中打开 [http://localhost:3000](http://localhost:3000)。这是应用程序的前端，您已经可以看到下一个博客的实际应用。

<img src="../assets/quick-start-guide/qsg-starters-part1-01-register.png" alt="Register screen" class="image--50" />
<img src="../assets/quick-start-guide/qsg-starters-part1-01-next_fe.png" alt="Next blog frontend screenshot" class="image--50 image--right" />

:::callout CONGRATULATIONS! 🥳
您的博客已准备就绪！您可以开始尝试 Strapi 并使用我们的[用户指南](/user-docs/latest/getting-started/introduction.md)，或继续阅读下面的 B 部分。

写博客不是你喜欢的？你可以离开这个指南，尝试其他 [Starters](https://strapi.io/starters)。
:::

## 🎨 B 部分: 玩一下你的内容

Strapi [starters](https://strapi.io/starters) 为您构建一个完整的堆栈应用程序和一个数据结构，因此您可以更快地开始播放您的内容。

我们即将为我们刚刚创建的博客做出贡献。让我们来玩一下你的应用程序，把自己添加为一个作家，创建你自己的文章，更新主页，然后重新启动服务器来查看最终结果。

:::tip
如果 Strapi 服务器尚未运行，请在您的终端中 `cd` 到 `my-project` 目录下并运行 `npm run develop` (或 `yarn develop`) 以启动它。
:::

### 步骤 1: Add yourself as a writer

You have several ideas for great articles in mind. But first, the world needs to know who you are!

点击 ![Content Manager icon](../assets/quick-start-guide/icons/content.svg) [Content Manager > Collection types - Writer](http://localhost:1337/admin/content-manager/collectionType/api::writer.writer) in the navigation, and click the **Add new entry** button.

![Screenshot: Create a new writer in admin panel](../assets/quick-start-guide/qsg-starters-part2-01-writer.png)

1.  在相应的字段中添加您的 _Name_ 和 _Email_。
2. 在 _Picture_ 字段中添加您喜欢的照片，您可以拖放图像，也可以单击字段并上传文件。在此过程中说 'Cheese!' 😄。
3. 点击 **Save**。

### 步骤 2: 撰写和发布您的第一篇文章

要撰写文章，我们需要在 "Article" 集合类型中添加一个新条目，并填写一些字段。

![Animated GIF to create an article](../assets/quick-start-guide/qsg-starters-part2-03-write_publish_article.gif)

在导航栏中点击 ![Content Manager icon](../assets/quick-start-guide/icons/content.svg) [Content Manager > Collection types - Article](http://localhost:1337/admin/content-manager/collectionType/api::article.article)，然后单击 **Add new entry** 按钮。

#### 给你的文章一个标题，一个描述，并添加一些内容

1. 在 _Title_ 字段输入 `Hello World!`
2. 在 _Description_ 字段输入 `My very first article with Strapi`
3. 在 _Content_ 字段中写几行。如果你缺乏一些灵感，只需输入 `This is my first blog article with Strapi and using it feels like a breeze!`。
4. 向下滚动并在 _Image_ 字段中添加图片。

#### 为您的文章选择作者和类别

在右侧边栏中，在 _Author_ 下拉列表中选择您的姓名。您刚刚与 Strapi 签署了您的第一篇文章。花几秒钟思考这个历史性的时刻！

在那里，您可能还想从列表中选择一个 _Category_ 为您的文章。

🤓 不要忘记点击 **Save** 以保存文章。

#### 将草稿转换为发布状态

默认情况下，您的新文章将另存为草稿。我们不必太害羞，可以立即发布。

要发布文章，请单击窗口顶部的 **Publish** 按钮。

您刚刚创建并发表了您的第一篇文章，"Hello World!"您可以在 ![Content Manager icon](../assets/quick-start-guide/icons/content.svg) [Content Manager > Collection types - Article](http://localhost:1337/admin/content-manager/collectionType/api::article.article?page=1&pageSize=10&sort=id:DESC) 视图看到。

### 步骤 3: 更新 `Homepage` 单一类型

现在是时候让这个博客更适合你的了。

在导航栏点击 ![Content Manager icon](../assets/quick-start-guide/icons/content.svg) [Content Manager > Single types - Homepage](http://localhost:1337/admin/content-manager/singleType/api::homepage.homepage) 。让我们编辑这个主页：

1. 替换 _ShareImage_ 字段中的图像。
2. 在页面底部，将 _Title_ 更新为 _Hero_ 字段组中的 `My Wonderful Strapi Blog`。
3. 点击 **Save**。

### 步骤 4: 重新启动服务器以反映最新更改

接下来是静态站点生成器。这意味着您需要重新启动服务器才能使更改显示在前端：

1. 在终端中，按 `Ctrl-C` 停止服务器。
2. 确保您位于 `my-project` 文件夹中。如果没有，请输入 `cd my-project` ，然后按回车键。
3. 通过键入 `npm run develop` (或 `yarn develop`) 重新启动服务器，然后按回车键。

片刻之后，您应该会看到您的博客及其更新的标题在 [http://localhost:3000](http://localhost:3000).上运行。您刚刚创建的 "Hello World!" 文章也显示在页面底部。

![GIF: Updated Next blog front end](../assets/quick-start-guide/qsg-starters-part2-04-restart_servers.gif)

:::callout CONGRATULATIONS! 🥳
现在您知道如何使用 Strapi 创建和更新您的博客了。继续创造惊人的内容！
:::

## ⏩ 下一步做什么？

现在您已经了解了使用 Strapi 启动器启动项目的基础知识，我们鼓励您进一步探索：

* 👉开始另一个项目！我们还有很多其他[入门](https://strapi.io/starters)，您可以使用它来启动您的博客，电子商务，企业网站或投资组合项目。
* 👉在我们的博客上阅读有关[入门CLI](https://strapi.io/blog/announcing-the-strapi-starter-cli) 的更多信息。

:::::

::::::
