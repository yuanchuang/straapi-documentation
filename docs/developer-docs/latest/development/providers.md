---
title: Providers - Strapi 开发人员文档
description: 安装和使用提供程序来扩展可用插件的功能。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/development/providers.html
---

# 提供者

确保 [plugins](../../../user-docs/latest/plugins/introduction-to-plugins.md) 可通过安装进行扩展和配置额外 [providers](../../../user-docs/latest/plugins/introduction-to-plugins.md#providers).

提供程序向插件的核心功能添加扩展，例如上传媒体文件到 AWS S3 而不是本地服务器， 或者使用 Amazon SES 发送电子邮件而不是 Sendmail。

::: note
只有 [Upload](../plugins/upload.md) 和 [Email](../plugins/email.md) 插件目前设计用于与 providers 工作。
:::

对于相关插件，有两个由 Strapi 维护的官方提供者 — 可通过 [Marketplace](../../../user-docs/latest/plugins/installing-plugins-via-marketplace.md)  或通过许多社区维护的提供者 [npm](https://www.npmjs.com/) 方式发现

## 安装提供程序

可以使用 `npm` 或 `yarn` 使用以下格式 `@strapi/provider-<plugin>-<provider> --save` 来安装新的提供程序。

例如:

<code-group>

<code-block title="NPM">
```sh
# Install the AWS S3 provider for the Upload plugin
npm install @strapi/provider-upload-aws-s3 --save

# Install the Sendgrid provider for the Email plugin
npm install @strapi/provider-email-sendgrid --save
```
</code-block>

<code-block title="YARN">
```sh
# Install the AWS S3 provider for the Upload plugin
yarn add @strapi/provider-upload-aws-s3

# Install the Sendgrid provider for the Email plugin
yarn add @strapi/provider-email-sendgrid --save
```
</code-block>

</code-group>

## 配置提供程序

新安装的提供程序在 `./config/plugins.js` 文件中启用和配置。如果此文件不存在，则必须创建它。

每个提供程序将具有不同的可用配置设置。在 [Marketplace](../../../user-docs/latest/plugins/installing-plugins-via-marketplace.md) 或 [npm](https://www.npmjs.com/) 查看该提供程序的相应条目，以了解更多信息。

以下是上传和电子邮件插件的示例配置。

:::: tabs card

::: tab Upload

```js
// path: ./config/plugins.js

module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: 'aws-s3', // For community providers pass the full package name (e.g. provider: 'strapi-provider-upload-google-cloud-storage')
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_ACCESS_SECRET'),
        region: env('AWS_REGION'),
        params: {
          Bucket: env('AWS_BUCKET'),
        },
      },
    },
  },
  // ...
});
```

::: note
Strapi 有个默认 [`security` middleware](/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.md#security) ，有一个非常严格的 `contentSecurityPolicy` 将映像和媒体的加载限制为 `"'self'"`，请参阅 [provider page](https://www.npmjs.com/package/@strapi/provider-upload-aws-s3) 或 [middleware documentation](/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.md#security) 上的示例配置以了解更多信息。
:::

::: tab Email

```js
// path: ./config/plugins.js

module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: 'sendgrid', // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: 'juliasedefdjian@strapi.io',
        defaultReplyTo: 'juliasedefdjian@strapi.io',
        testAddress: 'juliasedefdjian@strapi.io',
      },
    },
  },
  // ...
});
```

请记住：

* 当每个环境使用不同的提供程序时，请在 `./config/env/${yourEnvironment}/plugins.js` 中指定正确的配置（参见 [Environments](/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.md)）。
* 一次只能有一个电子邮件提供商处于活动状态。如果 Strapi 未选择电子邮件提供商设置，请验证 `plugins.js` 文件是否位于正确的文件夹中。
* 使用在 strapi 设置期间创建的这两个电子邮件模板测试新的电子邮件提供商时，模板上的 _shipper email_ 默认为`no-reply@strapi.io`，需要根据您的电子邮件提供商进行更新，否则将无法通过测试（参见 [Configure templates locally](/user-docs/latest/settings/configuring-users-permissions-plugin-settings.md#configuring-email-templates)）。

:::

::::

### 配置每个环境

配置提供程序时，您可能希望根据 `NODE_ENV`  环境变量更改配置或使用特定于环境的凭据。

您可以在 `./config/env/{env}/plugins.js` 配置文件中设置特定配置，它将用于覆盖默认配置。

## 创建提供程序

要实现您自己的自定义提供程序，您必须 [创建一个Node.js模块](https://docs.npmjs.com/creating-node-js-modules)。

必须导出的接口取决于您为其开发提供程序的插件。以下是上传和电子邮件插件的模板：

:::: tabs card

::: tab Upload

```js
module.exports = {
  init(providerOptions) {
    // init your provider if necessary

    return {
      upload(file) {
        // upload the file in the provider
        // file content is accessible by `file.buffer`
      },
      uploadStream(file) {
        // upload the file in the provider
        // file content is accessible by `file.stream`
      },
      delete(file) {
        // delete the file in the provider
      },
    };
  },
};
```
:::
::: tab Email

```js
module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    return {
      send: async options => {},
    };
  },
};
```

在发送功能中，您将可以访问：

* `providerOptions` 在 `plugins.js` 包含写入的配置
* `settings` 在 `plugins.js` 包含写入的配置
* `options` 包含您在从电子邮件插件服务调用发送函数时发送的选项

:::

::::

例如，您可以查看 [Strapi maintained providers](https://github.com/strapi/strapi/tree/master/packages/providers) 的实现。

创建新提供程序后，您可以[发布到 npm](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages) 与社区共享或[本地使用](#local-providers) 仅用于您的项目。

### 本地提供程序

如果要创建自己的提供程序而不将其发布到 npm 上，可以按照以下步骤操作：

1. 在应用程序中创建 `providers` 文件夹。
2. 创建你的 provider (例 `./providers/strapi-provider-<plugin>-<provider>`)
3. 然后更新你的 `package.json` 以将您的 `strapi-provider-<plugin>-<provider>` 依赖项链接到新提供商的 [本地路径](https://docs.npmjs.com/files/package.json#local-paths)。

```json
{
  ...
  "dependencies": {
    ...
    "strapi-provider-<plugin>-<provider>": "file:providers/strapi-provider-<plugin>-<provider>",
    ...
  }
}
```

4. 更新 `./config/plugins.js` 文件来 [配置提供者](#configuring-providers).
5. 最后，运行 `yarn install` 或 `npm install` 来安装自定义提供者。
