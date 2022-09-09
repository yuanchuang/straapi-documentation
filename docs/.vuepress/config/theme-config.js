const themeConfig = {
  logo: '/assets/logo.svg',
  nav: [
    {
      text: '资源中心',
      link: 'https://strapi.io/resource-center',
    },
    {
      text: 'v4 文档',
      items: [
        {
          text: '开发人员文档',
          items: [
            {
              text: '开始',
              link: '/developer-docs/latest/getting-started/introduction.html',
            },
            {
              text: '设置 & 部署',
              link: '/developer-docs/latest/setup-deployment-guides/installation.html',
            },
            {
              text: '插件',
              link: '/developer-docs/latest/plugins/plugins-intro.html',
            },
            {
              text: '部署',
              link: '/developer-docs/latest/development/backend-customization.html',
            },
            {
              text: '更新 & 迁移',
              link: '/developer-docs/latest/update-migration-guides/update-version.html',
            },
            {
              text: '开发人员资源',
              link: '/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html',
            },
          ],
        },
        {
          text: '用户指南',
          items: [
            {
              text: '开始',
              link: '/user-docs/latest/getting-started/introduction.html',
            },
            {
              text: '内容管理',
              link: '/user-docs/latest/content-manager/introduction-to-content-manager.html',
            },
            {
              text: '内容类型生成器',
              link:
                '/user-docs/latest/content-types-builder/introduction-to-content-types-builder.html',
            },
            {
              text: '用户、角色、权限',
              link:
                '/user-docs/latest/users-roles-permissions/introduction-to-users-roles-permissions.html',
            },
            {
              text: '媒体库',
              link:
                '/user-docs/latest/media-library/introduction-to-media-library.html',
            },
            {
              text: '插件',
              link: '/user-docs/latest/plugins/introduction-to-plugins.html',
            },
            {
              text: '常规设置',
              link: '/user-docs/latest/settings/managing-global-settings.html',
            },
          ],
        },
      ],
    },
    {
      text: 'v3 文档',
      link: 'https://docs-v3.strapi.io',
    },
    {
      text: '生态系统',
      items: [
        {
          text: 'Strapi',
          items: [
            {
              text: 'Website',
              link: 'https://strapi.io',
            },
            {
              text: 'Blog',
              link: 'https://strapi.io/blog',
            },
            {
              text: 'StrapiConf 2021',
              link: 'https://www.strapi.io/strapi-conf-2021',
            },
          ],
        },
        {
          text: '社区',
          items: [
            {
              text: 'Forum',
              link: 'https://forum.strapi.io',
            },
            {
              text: 'Discord',
              link: 'https://discord.strapi.io',
            },
            {
              text: 'Awesome-Strapi',
              link: 'https://github.com/strapi/awesome-strapi',
            },
          ],
        },
        {
          text: '资源',
          items: [
            {
              text: 'Tutorials',
              link: 'https://strapi.io/tutorials',
            },
            {
              text: 'Academy',
              link: 'https://academy.strapi.io/',
            },
          ],
        },
      ],
    },
    {
      text: "我们正在招聘！",
      link: 'https://strapi.io/careers#open-positions',
    },
  ],
  repo: 'strapi/documentation',
  docsDir: 'docs',
  docsBranch: 'main',
  algolia: {
    appId: '9FTY6J9E4X',
    apiKey: 'cf49c82a1865df2618a3d89e18657051',
    indexName: 'documentation',
  },
  editLinks: true,
  editLinkText: 'Improve this page',
  serviceWorker: true,
  sidebarDepth: 1,
  smoothScroll: false,
  sidebar: {
    '/developer-docs/latest/': sidebar.developer,
    '/user-docs/latest/': sidebar.user,
  },
};
