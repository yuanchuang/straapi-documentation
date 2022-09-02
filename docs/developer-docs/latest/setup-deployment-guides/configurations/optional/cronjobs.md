---
title: Cron 作业 - Strapi 开发人员文档
description: Strapi 允许您使用可选的重新设置规则，以在特定日期和时间执行 cron 作业。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/cronjobs.html
---

# Cron 作业

:::prerequisites
在 `./config/server.js` 中，`cron.enabled` 配置选项应设置为 `true`（对于 TypeScript 项目，则设置为 `./config/server.ts` ） [file](/developer-docs/latest/setup-deployment-guides/configurations/required/server.md)。
:::

`cron` 允许使用可选的重复规则来调度任意函数以在特定日期执行。这些函数被命名为 cron 作业。`cron` 在任何给定时间仅使用单个计时器，而不是每秒/每分钟重新评估一次即将到来的作业。

此功能由 ['node-schedule'](https://www.npmjs.com/package/node-schedule) 包提供支持。

`cron` 格式包括：

```

*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)

```

要定义 cron 作业并使其在所需的时间运行，请执行以下操作：

1. [创建](#创建一个-cron-作业)合适的文件。
2. [启用](#启用-cron-作业) 服务器配置文件中的 cron 作业。

::: tip
Optionally, cron jobs can be directly created in the `cron.tasks` key of the [server configuration file](/developer-docs/latest/setup-deployment-guides/configurations/required/server.md).
:::

## 创建一个 cron 作业

要定义 cron 作业，请创建具有以下结构的文件：

<code-group>
<code-block title="JAVASCRIPT">

```js
// path: ./config/cron-tasks.js

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */

  '0 0 1 * * 1': ({ strapi }) => {
    // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
  },
};
```

</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./config/cron-tasks.ts

export default {
  /**
   * Simple example.
   * Every monday at 1am.
   */

  '0 0 1 * * 1': ({ strapi }) => {
    // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
  },
};
```

</code-block>
</code-group>


如果 cron 作业需要在特定时区上运行：


<code-group>
<code-block title="JAVASCRIPT">

```js
// path: ./config/cron-tasks.js

module.exports = {
   /**
   * Cron job with timezone example.
   * Every Monday at 1am for Asia/Dhaka timezone.
   * List of valid timezones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
   */

  
myJob: {
     task: ({ strapi }) => {/* Add your own logic here */ },
     options: {
        rule: '0 0 1 * * 1',
        tz: 'Asia/Dhaka',
     },
   },
 };
```

</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./config/cron-tasks.ts

export default {
   /**
   * Cron job with timezone example.
   * Every Monday at 1am for Asia/Dhaka timezone.
   * List of valid timezones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
   */

  
myJob: {
     task: ({ strapi }) => {/* Add your own logic here */ },
     options: {
        rule: '0 0 1 * * 1',
        tz: 'Asia/Dhaka',
     },
   },
 };
```

</code-block>
</code-group>

## 启用 cron 作业

要启用 cron 作业，请在 [服务器配置文件](/developer-docs/latest/setup-deployment-guides/configurations/required/server.md) 中将 `cron.enabled` 设置为 `true`，然后声明作业：

<code-group>
<code-block title="JAVASCRIPT">

```js
// path: ./config/server.js

const cronTasks = require("./cron-tasks");

module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  cron: {
    enabled: true,
    tasks: cronTasks,
  },
});
```


</code-block>

<code-block title="TYPESCRIPT">

```js
// path: ./config/server.ts

import cronTasks from "./cron-tasks";

export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  cron: {
    enabled: true,
    tasks: cronTasks,
  },
});
```


</code-block>
</code-group>

