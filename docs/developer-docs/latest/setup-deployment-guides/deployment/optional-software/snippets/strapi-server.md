### Strapi 服务

为了充分利用代理的 Strapi 应用程序，应该配置 Strapi，使其能够识别上游代理。与以下配置一样，有3个匹配的示例。其他信息可以在 [服务器配置](/developer-docs/latest/setup-deployment-guides/configurations/required/server.md)  和 [管理配置](/developer-docs/latest/setup-deployment-guides/configurations/required/admin-panel.md) 文档中找到。

:::note
这些示例使用默认的 API 前缀 `/api`. 这可以更改，而无需直接修改 Nginx 配置 (请参阅 [API prefix](/developer-docs/latest/setup-deployment-guides/configurations/optional/api.md) 文档).
:::

:::caution
如果在 `./config/admin.js` 或 `./config/server.js` 文件中更改了 `url` 键，则需要使用 `yarn build` 或 `npm run build` 重新构建管理面板。
:::

::::: tabs card

:::: tab Subdomain

#### 子域 Strapi 配置

---

- 示例 domain: `api.example.com`
- 示例 admin: `api.example.com/admin`
- 示例 API: `api.example.com/api`
- 示例 uploaded files (local provider): `api.example.com/uploads`

<code-group>
<code-block title="JAVASCRIPT">

```js
// path: ./config/server.js

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'https://api.example.com',
});
```

</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./config/server.ts

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'https://api.example.com',
});
```

</code-block>
</code-group>



::::

:::: tab Subfolder unified

#### 子文件夹统一 Strapi 配置

---

- 示例 domain: `example.com/test`
- 示例 admin: `example.com/test/admin`
- 示例 API: `example.com/test/api`
- 示例 uploaded Files (local provider): `example.com/test/uploads`

<code-group>
<code-block title="JAVASCRIPT">

```js
// path: ./config/server.js

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'https://example.com/test',
});
```

</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./config/server.ts

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'https://example.com/test',
});
```

</code-block>
</code-group>



::::

:::: tab Subfolder split

#### 子文件夹拆分 Strapi 配置

---

- 示例 domain: `example.com`
- 示例 admin: `example.com/dashboard`
- 示例 API: `example.com/api`
- 示例 uploaded files (local provider): `example.com/uploads`

<code-group>
<code-block title="JAVASCRIPT">

```js
// path: ./config/server.js

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'https://example.com',
});
```

</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./config/server.ts

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'https://example.com',
});
```

</code-block>
</code-group>

<code-group>
<code-block title="JAVASCRIPT">

```js
// path: ./config/admin.js

module.exports = ({ env }) => ({
  auth: {
    ...
  }
  url: 'https://example.com/dashboard',
});
```

</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./config/admin.ts

export default ({ env }) => ({
  auth: {
    ...
  }
  url: 'https://example.com/dashboard',
});
```

</code-block>
</code-group>



::::

:::::
