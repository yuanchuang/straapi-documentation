---
title: 用户、角色和权限 - Strapi 用户指南
description: 介绍 Strapi 的权限系统，该系统提供了对管理面板中各功能的访问控制。
canonicalUrl: https://docs.strapi.io/user-docs/latest/users-roles-permissions/introduction-to-users-roles-permissions.html
---

# 对用户、角色和权限的介绍

管理面板中的某些功能，以及由 Strapi 本身所管理的内容，都由权限系统所控制。这些权限（permissions）可以分配给角色（roles），角色则是与用户（users）相关联的，用户可以访问管理面板，这些用户也就是管理员（administrators）。但是，也可以把权限放开，也就是把内容开放给 Strapi 应用程序的终端用户（end users）。

根据你需要管理的用户及其角色和权限的不同，你可以使用基于角色的访问控制（Role Based Access Control (RBAC)）功能，或者使用 Users & Permissions 插件。这两者都是在 ![Settings icon](../assets/icons/settings.svg) _Settings_ 中进行管理的，从管理面板中的主导航处可以找到入口。

![Users, permissions and roles settings](../assets/users-permissions/users-roles-permissions-settings.png)
