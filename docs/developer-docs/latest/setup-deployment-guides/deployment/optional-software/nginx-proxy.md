---
title: Nginx 代理 - Strapi 开发人员文档
description: 了解如何使用像 Nginx 这样的代理应用程序来保护您的 Strapi 应用程序。
canonicalUrl: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment/optional-software/nginx-proxy.html
---

# Nginx 代理

由于 Strapi 不直接处理 SSL，并且在 "edge" 网络上托管 Node.js 服务不是一个安全的解决方案，因此建议您使用某种代理应用程序，例如 Nginx, Apache, HAProxy, Traefik 等。下面你会发现 Nginx 的一些示例配置，当然，这些配置可能不适合所有环境，你可能需要调整它们以满足您的需求。 

## 配置

以下配置基于 Nginx 虚拟主机，这意味着您可以为每个域创建配置，以允许在同一端口（例如 80（HTTP）或 443（HTTPS）上为多个域提供服务。它还使用中央上游文件来存储别名，以便在群集多个 Strapi 部署时更轻松地进行管理、负载平衡和故障转移。

!!!include(developer-docs/latest/setup-deployment-guides/deployment/optional-software/snippets/strapi-server.md)!!!

### Nginx 上游

上游块用于将别名，如 `strapi` 映射到 `localhost:1337`。虽然在每个虚拟主机文件中定义这些文件会很有用，但如果您有多个虚拟主机文件，Nginx目前不支持在虚拟主机中加载这些内容。相反，请在 `conf.d` 目录中配置这些，因为这是在任何虚拟主机文件之前加载的。

在以下配置中，`localhost:1337` 映射到 Nginx 别名 `strapi`：

```sh
# path: /etc/nginx/conf.d/upstream.conf

# Strapi server
upstream strapi {
    server 127.0.0.1:1337;
}
```

### Nginx 虚拟主机

虚拟主机文件用于存储特定应用、服务或代理服务的配置。为了与 Strapi 一起使用，此虚拟主机文件正在处理 HTTPS 连接，并将它们代理到服务器上本地运行的 Strapi。此配置还会使用 301 重定向将所有 HTTP 请求重定向到 HTTP。

在下面的示例中，您将需要替换您的域，同样，您需要根据放置 SSL 证书的位置进行更改，或者，如果您使用的是 Let's Encrypt，则需要根据脚本放置它们的位置进行更改。另请注意，虽然下面的路径显示 `sites-available`，但您需要将文件符号链接到 `sites-enabled`，以便 Nginx 启用配置。

以下是 Nginx 配置的 3 个示例：

- 基于子域，如 `api.example.com`
- 基于API和管理员在同一子文件夹，例如 `example.com/test/api` 和 `example.com/test/admin` 上的子文件夹
- 基于拆分API和管理员的子文件夹，例如 `example.com/api` 和 `example.com/dashboard`

::::: tabs card

:::: tab Subdomain

#### 子域名

此配置使用专用于 Strapi 的子域。它将正常的 HTTP 流量重定向到 SSL，并将所有请求（API和admin）代理到在上面配置的上游别名上运行的 Strapi 服务器。

---

- 示例 domain: `api.example.com`
- 示例 admin panel: `api.example.com/admin`
- 示例 API: `api.example.com/api`
- 示例 uploaded Files (local provider): `api.example.com/uploads`

```sh
# path: /etc/nginx/sites-available/strapi.conf

server {
    # Listen HTTP
    listen 80;
    server_name api.example.com;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    # Listen HTTPS
    listen 443 ssl;
    server_name api.example.com;

    # SSL config
    ssl_certificate /path/to/your/certificate/file;
    ssl_certificate_key /path/to/your/certificate/key;

    # Proxy Config
    location / {
        proxy_pass http://strapi;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_pass_request_headers on;
    }
}
```

::::

:::: tab Subfolder unified

#### 子文件夹统一

此配置使用专用于 Strapi 的子文件夹。它会将正常的 HTTP 流量重定向到 SSL，并将前端文件托管在 `/var/www/html` 上，就像普通的 Web 服务器一样，但将所有 strapi 请求代理在 `example.com/test` 子路径上。

:::note
This example configuration is not focused on the front end hosting and should be adjusted to your front-end software requirements.
:::

---

- 示例 domain: `example.com/test`
- 示例 admin: `example.com/test/admin`
- 示例 API: `example.com/test/api`
- 示例 uploaded files (local provider): `example.com/test/uploads`

```sh
# path: /etc/nginx/sites-available/strapi.conf

server {
    # Listen HTTP
    listen 80;
    server_name example.com;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    # Listen HTTPS
    listen 443 ssl;
    server_name example.com;

    # SSL config
    ssl_certificate /path/to/your/certificate/file;
    ssl_certificate_key /path/to/your/certificate/key;

    # Static Root
    location / {
        root /var/www/html;
    }

    # Strapi API and Admin
    location /test/ {
        rewrite ^/test/?(.*)$ /$1 break;
        proxy_pass http://strapi;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_pass_request_headers on;
    }
}
```

::::

:::: tab Subfolder split

#### 子文件夹拆分

此配置使用 2 个专用于 Strapi 的子文件夹。它会将正常的 HTTP 流量重定向到 SSL，并像普通的 Web 服务器一样在 `/var/www/html` 上托管前端文件，但是在 `example.com/api` 子路径上代理所有 strapi API请求，并在 `example.com/dashboard` 子路径上代理所有管理员请求。

或者，对于管理员，您可以替换代理，而是直接从Nginx提供管理员 `build` 文件夹，例如集中管理员但对后端 API 进行负载平衡。未显示此示例，但它可能是要内置到 CI/CD 平台中的内容。

:::note
此示例配置不侧重于前端托管，应根据前端软件要求进行调整。
:::

---

- 示例 domain: `example.com`
- 示例 admin: `example.com/dashboard`
- 示例 API: `example.com/api`
- 示例 uploaded files (local provider): `example.com/uploads`

```sh
# path: /etc/nginx/sites-available/strapi.conf

server {
    # Listen HTTP
    listen 80;
    server_name example.com;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    # Listen HTTPS
    listen 443 ssl;
    server_name example.com;

    # SSL config
    ssl_certificate /path/to/your/certificate/file;
    ssl_certificate_key /path/to/your/certificate/key;

    # Static Root
    location / {
        root /var/www/html;
    }

    # Proxy Config
    location / {
        proxy_pass http://strapi;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_pass_request_headers on;
    }
}
```

::::

:::::

!!!include(developer-docs/latest/setup-deployment-guides/deployment/optional-software/snippets/admin-redirect.md)!!!
