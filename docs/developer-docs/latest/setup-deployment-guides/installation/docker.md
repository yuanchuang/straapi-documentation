---
title: Docker安装 - Strapi 开发人员文档
description: 使用官方 Docker 镜像快速创建一个 Strapi 应用程序
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/installation/docker.html
---

# 使用 Docker 安装

:::caution 注意
该Docker镜像仅适用 Strapi v3。目前，Strapi 不会为 v4 更新镜像。无论如何，要构建一个与 Strapi v4 兼容的镜像，我们建议遵循 [本指南](https://blog.dehlin.dev/docker-with-strapi-v4) 由 Strapi 社区之星 Simen Daehlin 发表。

如果你想要一个官方的 v4 镜像，可以到 [roadmap](https://feedback.strapi.io/developer-experience)中查看。

:::

下面的文档将指引你如何使用 [Docker](https://www.docker.com/) 安装一个 Strapi 项目。


Docker 是一个开放的平台，允许使用容器(即包含应用程序运行所需的所有部分的包，如库和依赖)来开发、交付和运行应用程序。

::: note 备注
你可以在 [Docker Hub](https://hub.docker.com/r/strapi/strapi) 上找到 Strapi 官方镜像。
:::

## 创建 Strapi 项目

1. 创建一个空文件夹.
2. 在空文件夹中, 创建一个 `docker-compose.yaml` 文件。这是新 Strapi 项目创建的地方，它定义了要使用的数据库和 Strapi 服务。

    ::::: tabs card

    :::: tab SQLite

    ```yaml
    version: '3'
    services:
      strapi:
        image: strapi/strapi
        volumes:
          - ./app:/srv/app
        ports:
          - '1337:1337'
    ```

    ::::

    :::: tab PostgreSQL

    ```yaml
    version: '3'
    services:
      strapi:
        image: strapi/strapi
        environment:
          DATABASE_CLIENT: postgres
          DATABASE_NAME: strapi
          DATABASE_HOST: postgres
          DATABASE_PORT: 5432
          DATABASE_USERNAME: strapi
          DATABASE_PASSWORD: strapi
        volumes:
          - ./app:/srv/app
        ports:
          - '1337:1337'
        depends_on:
          - postgres

      postgres:
        image: postgres
        environment:
          POSTGRES_DB: strapi
          POSTGRES_USER: strapi
          POSTGRES_PASSWORD: strapi
        volumes:
          - ./data:/var/lib/postgresql/data
    ```

    ::::

    :::: tab MySQL

    ```yaml
    version: '3'
    services:
      strapi:
        image: strapi/strapi
        environment:
          DATABASE_CLIENT: mysql
          DATABASE_HOST: mysql
          DATABASE_PORT: 3306
          DATABASE_NAME: strapi
          DATABASE_USERNAME: strapi
          DATABASE_PASSWORD: strapi
          DATABASE_SSL: 'false'
        volumes:
          - ./app:/srv/app
        ports:
          - '1337:1337'
        depends_on:
          - mysql

      mysql:
        image: mysql
        command: mysqld --default-authentication-plugin=mysql_native_password
        volumes:
          - ./data:/var/lib/mysql
        environment:
          MYSQL_ROOT_PASSWORD: strapi
          MYSQL_DATABASE: strapi
          MYSQL_USER: strapi
          MYSQL_PASSWORD: strapi
    ```

    ::::

    :::: tab MariaDB

    ```yaml
    version: '3'
    services:
      strapi:
        image: strapi/strapi
        environment:
          DATABASE_CLIENT: mysql
          DATABASE_HOST: mariadb
          DATABASE_PORT: 3306
          DATABASE_NAME: strapi
          DATABASE_USERNAME: strapi
          DATABASE_PASSWORD: strapi
          DATABASE_SSL: 'false'
        volumes:
          - ./app:/srv/app
        ports:
          - '1337:1337'
        depends_on:
          - mariadb

      mariadb:
        image: mariadb
        volumes:
          - ./data:/var/lib/mysql
        environment:
          MYSQL_ROOT_PASSWORD: strapi
          MYSQL_DATABASE: strapi
          MYSQL_USER: strapi
          MYSQL_PASSWORD: strapi
    ```

    ::::

    :::::

3. 使用以下命令拉取最新镜像：
 
    ```
    docker-compose pull
    ```

## 运行 Strapi

要运行用 Docker 创建的 Strapi 项目，请使用以下命令之一：

```bash
# 执行Docker镜像并在后台运行
docker-compose up -d

# 在不卸载终端的情况下执行Docker镜像
docker-compose up
```
