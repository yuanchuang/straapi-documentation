---
title: 公共资源配置- Strapi 开发人员文档
description: The public folder of Strapi is used for static files that you want to make accesible to the outside world.
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/public-assets.html
---

# 公共资源配置

公共资源是静态文件（例如图像，视频，CSS 文件等），您希望外部可以访问它们。

由于 API 可能需要提供静态资产，因此默认情况下，每个新的 Strapi 项目都包含一个名为 `/public` 的文件夹。如果请求的路径与任何其他定义的路由不匹配，并且与公共文件名匹配，则可以访问位于此目录中的任何文件（例如，可以通过 `company-logo.png` URL访问 `./public/` 中名为 `/company-logo.png` 的图像。

::: tip
如果请求对应于文件夹名称，则提供 `index.html` 文件（`/pictures` url将尝试提供 `public/pictures/index.html` 文件）。
:::

:::caution
不会公开点文件。这意味着不会提供以 `.` 开头的每个文件名，例如 `.htaccess` 或 `.gitignore`。
:::
