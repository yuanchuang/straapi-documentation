const developer = [
  {
    title: '🚀 开始',
    collapsable: false,
    children: [
      ['/developer-docs/latest/getting-started/introduction', '介绍'],
      ['/developer-docs/latest/getting-started/quick-start', '快速安装指南'],
      ['/developer-docs/latest/getting-started/troubleshooting', '常见问题'],
      ['/developer-docs/latest/getting-started/usage-information', '使用信息'],
    ],
  },
  {
    title: '⚙️ 设置 & 部署',
    collapsable: false,
    sidebarDepth: 0,
    initialOpenGroupIndex: -1, // make sure that no subgroup is expanded by default
    children: [
      {
        title: '安装',
        path: '/developer-docs/latest/setup-deployment-guides/installation.html',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          ['/developer-docs/latest/setup-deployment-guides/installation/cli.md', 'CLI'],
          ['/developer-docs/latest/setup-deployment-guides/installation/docker.md', 'Docker'],
        ],
      },
      ['/developer-docs/latest/setup-deployment-guides/file-structure.md', '项目结构'],
      {
        title: '配置',
        path: '/developer-docs/latest/setup-deployment-guides/configurations.html',
        collapsable: true,
        children: [
          {
            title: '必需配置',
            collapsable: true,
            children: [
              [
                '/developer-docs/latest/setup-deployment-guides/configurations/required/databases.md',
                '数据库',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/configurations/required/server.md',
                '服务',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/configurations/required/admin-panel.md',
                '管理面板',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.md',
                '中间件',
              ],
            ],
          },
          {
            title: '可选配置',
            collapsable: true,
            children: [
              [
                '/developer-docs/latest/setup-deployment-guides/configurations/optional/api-tokens.md',
                'API tokens',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/configurations/optional/functions.md',
                '函数',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/configurations/optional/cronjobs.md',
                'Cron 作业',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/configurations/optional/api.md',
                'API',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/configurations/optional/plugins.md',
                '插件',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.md',
                '环境',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/configurations/optional/public-assets.md',
                '公共资源',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/configurations/optional/sso.md',
                '单点登录 (SSO)',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/configurations/optional/rbac.md',
                '基于角色的访问控制 (RBAC)',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/configurations/optional/typescript.md',
                'TypeScript',
            ],
          ],
          },
        ],
      },
      {
        title: '部署',
        path: '/developer-docs/latest/setup-deployment-guides/deployment',
        collapsable: true,
        initialOpenGroupIndex: -1, // make sure that no subgroup is open by default — if set to 0, 'Hosting Provider Guides' is expanded
        children: [
          {
            title: '托管服务提供商指南',
            path:
              '/developer-docs/latest/setup-deployment-guides/deployment.html#hosting-provider-guides',
            collapsable: true,
            children: [
              [
                '/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/21yunbox.md',
                '21YunBox',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/amazon-aws.md',
                'Amazon AWS',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/azure.md',
                'Azure',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/digitalocean-app-platform.md',
                'DigitalOcean App Platform',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/digitalocean.md',
                'DigitalOcean Droplets',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/google-app-engine.md',
                'Google App Engine',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/heroku.md',
                'Heroku',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/qovery.md',
                'Qovery',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/render.md',
                'Render',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/microtica.md',
                'Microtica',
              ],
            ],
            sidebarDepth: 2,
          },
          {
            title: '可选软件指南',
            path:
              '/developer-docs/latest/setup-deployment-guides/deployment.html#optional-software-guides',
            collapsable: true,
            children: [
              [
                '/developer-docs/latest/setup-deployment-guides/deployment/optional-software/caddy-proxy.md',
                'Caddy',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/deployment/optional-software/haproxy-proxy.md',
                'HAProxy',
              ],
              [
                '/developer-docs/latest/setup-deployment-guides/deployment/optional-software/nginx-proxy.md',
                'Nginx',
              ],
            ],
            sidebarDepth: 2,
          },
        ],
        sidebarDepth: 0,
      },
    ],
  },
  {
    title: '🔧 开发',
    collapsable: false,
    initialOpenGroupIndex: -1, // make sure that no subgroup is expanded by default
    children: [
      {
        title: '后端',
        collapsable: true,
        path: '/developer-docs/latest/development/backend-customization',
        children: [
          ['/developer-docs/latest/development/backend-customization/routes.md', 'Routes'],
          ['/developer-docs/latest/development/backend-customization/policies.md', 'Policies'],
          [
            '/developer-docs/latest/development/backend-customization/middlewares.md',
            'Middlewares',
          ],
          [
            '/developer-docs/latest/development/backend-customization/controllers.md',
            'Controllers',
          ],
          [
            '/developer-docs/latest/development/backend-customization/requests-responses.md',
            'Requests & Responses',
          ],
          ['/developer-docs/latest/development/backend-customization/services.md', 'Services'],
          ['/developer-docs/latest/development/backend-customization/models.md', 'Models'],
          ['/developer-docs/latest/development/backend-customization/webhooks.md', 'Webhooks'],
        ],
      },
      ['/developer-docs/latest/development/admin-customization', '定制化管理面板'],
      ['/developer-docs/latest/development/plugins-extension.md', '插件扩展'],
      ['/developer-docs/latest/development/plugins-development.md', '插件开发'],
      ['/developer-docs/latest/development/typescript.md', 'TypeScript'],
      ['/developer-docs/latest/development/providers.md', '提供者'],
    ],
  },
  {
    title: '💻 开发人员资源',
    collapsable: false,
    initialOpenGroupIndex: -1, // make sure that no subgroup is expanded by default
    sidebarDepth: 2,
    children: [
      {
        title: 'APIs 参考',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          {
            title: 'REST API',
            path: '/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html',
            collapsable: true,
            initialOpenGroupIndex: -1,
            sidebarDepth: 3,
            children: [
              ['/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html', 'API endpoints'],
              {
                title: 'API parameters',
                path: '/developer-docs/latest/developer-resources/database-apis-reference/rest/api-parameters.html',
                collapsable: true,
                initialOpenGroupIndex: -1,
                children: [
                  [
                    '/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.md',
                    '筛选、区域设置和发布状态'
                  ],
                  [
                    '/developer-docs/latest/developer-resources/database-apis-reference/rest/populating-fields.md',
                    'Population & Field Selection'
                  ],
                  [
                    '/developer-docs/latest/developer-resources/database-apis-reference/rest/sort-pagination.md',
                    '排序 & 分页'
                  ],
                ]
              },
            ],
          },
          [
            '/developer-docs/latest/developer-resources/database-apis-reference/graphql-api.md',
            'GraphQL API',
          ],
          {
            title: '实体服务 API',
            path:
              '/developer-docs/latest/developer-resources/database-apis-reference/entity-service-api',
            collapsable: true,
            children: [
              [
                '/developer-docs/latest/developer-resources/database-apis-reference/entity-service/crud.md',
                'CRUD 操作',
              ],
              [
                '/developer-docs/latest/developer-resources/database-apis-reference/entity-service/filter.md',
                'Filters',
              ],
              [
                '/developer-docs/latest/developer-resources/database-apis-reference/entity-service/populate.md',
                'Populate',
              ],
              [
                '/developer-docs/latest/developer-resources/database-apis-reference/entity-service/order-pagination.md',
                '排序 & 分页',
              ],
              [
                '/developer-docs/latest/developer-resources/database-apis-reference/entity-service/components-dynamic-zones.md',
                '组件和动态区域',
              ],
            ],
          },
          {
            title: '查询引擎 API',
            path:
              '/developer-docs/latest/developer-resources/database-apis-reference/query-engine-api.html',
            collapsable: true,
            // sidebarDepth: 3,
            children: [
              [
                '/developer-docs/latest/developer-resources/database-apis-reference/query-engine/single-operations.md',
                '单一操作',
              ],
              [
                '/developer-docs/latest/developer-resources/database-apis-reference/query-engine/bulk-operations.md',
                '批量操作',
              ],
              [
                '/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.md',
                'Filtering',
              ],
              [
                '/developer-docs/latest/developer-resources/database-apis-reference/query-engine/populating.md',
                'Populating',
              ],
              [
                '/developer-docs/latest/developer-resources/database-apis-reference/query-engine/order-pagination.md',
                '排序 & 分页',
              ],
            ],
          },
          {
            title: '插件 API 参考',
            collapsable: true,
            children: [
              [
                '/developer-docs/latest/developer-resources/plugin-api-reference/server.md',
                '插件的服务 API',
              ],
              [
                '/developer-docs/latest/developer-resources/plugin-api-reference/admin-panel.md',
                '插件的管理面板 API',
              ],
            ],
          },
        ],
      },
      ['/developer-docs/latest/developer-resources/cli/CLI', '命令行界面'],
      ['/developer-docs/latest/developer-resources/error-handling.md', '错误处理'],
      {
        title: '集成',
        path: '/developer-docs/latest/developer-resources/content-api/integrations.html',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          ['/developer-docs/latest/developer-resources/content-api/integrations/react', 'React'],
          [
            '/developer-docs/latest/developer-resources/content-api/integrations/vue-js',
            'Vue.js',
          ],
          [
            '/developer-docs/latest/developer-resources/content-api/integrations/angular',
            'Angular',
          ],
          [
            '/developer-docs/latest/developer-resources/content-api/integrations/next-js',
            'Next.js',
          ],
          [
            '/developer-docs/latest/developer-resources/content-api/integrations/nuxt-js',
            'Nuxt.js',
          ],
          [
            '/developer-docs/latest/developer-resources/content-api/integrations/graphql',
            'GraphQL',
          ],
          [
            '/developer-docs/latest/developer-resources/content-api/integrations/gatsby',
            'Gatsby',
          ],
          [
            '/developer-docs/latest/developer-resources/content-api/integrations/gridsome',
            'Gridsome',
          ],
          [
            '/developer-docs/latest/developer-resources/content-api/integrations/jekyll',
            'Jekyll',
          ],
          ['/developer-docs/latest/developer-resources/content-api/integrations/11ty', '11ty'],
          [
            '/developer-docs/latest/developer-resources/content-api/integrations/svelte',
            'Svelte',
          ],
          [
            '/developer-docs/latest/developer-resources/content-api/integrations/sapper',
            'Sapper',
          ],
          ['/developer-docs/latest/developer-resources/content-api/integrations/ruby', 'Ruby'],
          [
            '/developer-docs/latest/developer-resources/content-api/integrations/python',
            'Python',
          ],
          ['/developer-docs/latest/developer-resources/content-api/integrations/dart', 'Dart'],
          [
            '/developer-docs/latest/developer-resources/content-api/integrations/flutter',
            'Flutter',
          ],
          ['/developer-docs/latest/developer-resources/content-api/integrations/go', 'Go'],
          ['/developer-docs/latest/developer-resources/content-api/integrations/php', 'PHP'],
          [
            '/developer-docs/latest/developer-resources/content-api/integrations/laravel',
            'Laravel',
          ],
        ],
      },
    ],
  },
  {
    title: '🧩 Strapi 插件',
    path: '/developer-docs/latest/plugins/plugins-intro.html',
    collapsable: false,
    children: [
      ['/developer-docs/latest/plugins/graphql', 'GraphQL'],
      ['/developer-docs/latest/plugins/i18n', 'Internationalization (i18n)'],
      ['/developer-docs/latest/plugins/users-permissions', '用户 & 权限'],
      ['/developer-docs/latest/plugins/email', 'Email'],
      ['/developer-docs/latest/plugins/upload', 'Upload'],
      ['/developer-docs/latest/plugins/sentry', 'Sentry'],
      ['/developer-docs/latest/plugins/documentation', 'API Documentation'],
    ],
    sidebarDepth: 1,
  },
  {
    title: '♻️ Update & Migration',
    collapsable: false,
    children: [
      ['/developer-docs/latest/update-migration-guides/update-version.md', 'Update'],
      {
        title: 'Migration',
        path: '/developer-docs/latest/update-migration-guides/migration-guides.html',
        collapsable: true,
        children: [
          ['/developer-docs/latest/update-migration-guides/migration-guides.html#v4-guides', 'v4 migration guides'],
          {
            title: 'v3 to v4 migration guides',
            path: '/developer-docs/latest/update-migration-guides/migration-guides.html#v3-to-v4-migration-guides',
            collapsable: true,
            children: [
              {
                title: 'Code migration guide',
                initialOpenGroupIndex: -1, // make sure that no subgroup is expanded by default
                path: '/developer-docs/latest/update-migration-guides/migration-guides/v4/code-migration.html',
                collapsable: true,
                children: [
                  {
                    title: 'Updating the back end',
                    path: '/developer-docs/latest/update-migration-guides/migration-guides/v4/code/backend.html',
                    collapsable: true,
                    children: [
                      ['/developer-docs/latest/update-migration-guides/migration-guides/v4/code/backend/configuration.html', 'Configurations'],
                      ['/developer-docs/latest/update-migration-guides/migration-guides/v4/code/backend/dependencies.html', 'Dependencies'],
                      ['/developer-docs/latest/update-migration-guides/migration-guides/v4/code/backend/routes.html', 'Routes'],
                      ['/developer-docs/latest/update-migration-guides/migration-guides/v4/code/backend/controllers.html', 'Controllers'],
                      ['/developer-docs/latest/update-migration-guides/migration-guides/v4/code/backend/services.html', 'Services'],
                      ['/developer-docs/latest/update-migration-guides/migration-guides/v4/code/backend/content-type-schema.html', 'Content-type schema'],
                      ['/developer-docs/latest/update-migration-guides/migration-guides/v4/code/backend/policies.html', 'Policies'],
                      ['/developer-docs/latest/update-migration-guides/migration-guides/v4/code/backend/route-middlewares.html', 'Route middlewares'],
                      ['/developer-docs/latest/update-migration-guides/migration-guides/v4/code/backend/global-middlewares.html', 'Global middlewares'],
                      ['/developer-docs/latest/update-migration-guides/migration-guides/v4/code/backend/graphql.html', 'GraphQL'],
                    ]
                  },
                  {
                    title: 'Updating the front end',
                    path: '/developer-docs/latest/update-migration-guides/migration-guides/v4/code/frontend.html',
                    collapsable: true,
                    children: [
                      ['/developer-docs/latest/update-migration-guides/migration-guides/v4/code/frontend/wysiwyg.html', 'WYSIWYG customization'],
                      ['/developer-docs/latest/update-migration-guides/migration-guides/v4/code/frontend/translations.html', 'Translations'],
                      ['/developer-docs/latest/update-migration-guides/migration-guides/v4/code/frontend/webpack.html', 'Webpack configuration'],
                      ['/developer-docs/latest/update-migration-guides/migration-guides/v4/code/frontend/theming.html', 'Theme customizations'],
                      ['/developer-docs/latest/update-migration-guides/migration-guides/v4/code/frontend/strapi-global.html', 'Strapi global variable calls'],
                    ]
                  }
                ]
              },
              {
                title: 'Data migration guide',
                path: '/developer-docs/latest/update-migration-guides/migration-guides/v4/data-migration.html',
                collapsable: true,
                children: [
                  ['/developer-docs/latest/update-migration-guides/migration-guides/v4/data/sql.md', 'SQL v3 to v4 migration'],
                  ['/developer-docs/latest/update-migration-guides/migration-guides/v4/data/sql-relations.md', 'SQL relations cheatsheet'],
                  ['/developer-docs/latest/update-migration-guides/migration-guides/v4/data/mongo.md', 'MongoDB v3 to SQL v3 migration'],
                  ['/developer-docs/latest/update-migration-guides/migration-guides/v4/data/mongo-sql-cheatsheet.md', 'MongoDB vs. SQL cheatsheet'],
                ],
              },
              {
                title: 'Plugin migration guide',
                path: '/developer-docs/latest/update-migration-guides/migration-guides/v4/plugin-migration.html',
                collapsable: true,
                children: [
                  ['/developer-docs/latest/update-migration-guides/migration-guides/v4/plugin/update-folder-structure.md', 'Updating the folder structure'],
                  ['/developer-docs/latest/update-migration-guides/migration-guides/v4/plugin/migrate-back-end.md', 'Migrating the back end'],
                  ['/developer-docs/latest/update-migration-guides/migration-guides/v4/plugin/migrate-front-end.md', 'Migrating the front end'],
                  ['/developer-docs/latest/update-migration-guides/migration-guides/v4/plugin/enable-plugin.md', 'Enabling a plugin'],
                ]
              },
            ]
          },
          // ['/developer-docs/latest/update-migration-guides/migration-guides.html#v3-guides', 'v3 migration guides'], // commented out as it creates a "visual bug" and this is just a link to v3 docs after all
        ],
      },
    ],
  },
  {
    title: '📚 Guides',
    collapsable: true,
    children: [
      ['/developer-docs/latest/guides/auth-request', 'Authenticated request'],
      // ['/developer-docs/latest/guides/slug', 'Create a slug system'],
      // ['/developer-docs/latest/guides/is-owner', 'Create is owner policy'],
      // ['/developer-docs/latest/guides/custom-admin', 'Custom admin'],
      // ['/developer-docs/latest/guides/custom-data-response', 'Custom data response'],
      ['/developer-docs/latest/guides/draft', 'Draft system'],
      // ['/developer-docs/latest/guides/error-catching', 'Error catching'],
      // ['/developer-docs/latest/guides/external-data', 'Fetching external data'],
      ['/developer-docs/latest/guides/jwt-validation', 'JWT validation'],
      ['/developer-docs/latest/guides/process-manager', 'Process manager'],
      ['/developer-docs/latest/guides/scheduled-publication', 'Scheduled publication'],
      // ['/developer-docs/latest/guides/secure-your-app', 'Secure your application'],
      // ['/developer-docs/latest/guides/send-email', 'Send email programmatically'],
      [
        '/developer-docs/latest/guides/registering-a-field-in-admin',
        'New WYSIWYG field in admin panel',
      ],
      // ['/developer-docs/latest/guides/client', 'Setup a third party client'],
      ['/developer-docs/latest/guides/unit-testing', 'Unit testing'],
    ],
  },
];
