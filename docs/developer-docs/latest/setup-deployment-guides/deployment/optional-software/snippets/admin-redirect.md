### 将主页重定向到管理面板

如果您不希望将默认的首页挂载在 `/` 上，则可以使用下面的示例代码创建自定义的 `./public/index.html`，以自动重定向到您的管理面板。

:::caution
此示例配置要求可在 `/admin` 上访问管理面板。如果您使用上述配置之一将其更改为 `/dashboard`，则还需要调整此示例配置。
:::

**Path —** `./public/index.html`

```html
<html>
  <head>
    <meta http-equiv="refresh" content="0;URL='/admin'" />
  </head>
</html>
```
 