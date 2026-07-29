# 上海成电福智官方网站

基于 `Nuxt 4 + Vue 3 + TypeScript + Strapi 5 + PostgreSQL 16` 的中英文企业官网。前端通过 Nuxt 服务端接口读取 Strapi，支持公司介绍、页脚信息、案例与动态，以及微信公众号文章外链。

![alt text](image-1.png)

## 当前本地运行方式

| 服务 | 当前运行位置 | 默认地址 | 说明 |
|---|---|---|---|
| Nuxt 官网 | Windows Node.js | `http://localhost:3000` | `apps/web` |
| Strapi CMS | Windows Node.js | `http://localhost:1337` | `apps/cms` |
| PostgreSQL | Docker Desktop | `localhost:5432` | 容器名 `cdfz-postgres` |
| WSL | 未使用 | — | 当前开发不依赖 WSL |

生产环境由 `compose.prod.yml` 启动 Nginx、Nuxt、Strapi 和 PostgreSQL 四个容器。

## 目录说明

```text
cdfz-portal_website/
├─ apps/
│  ├─ web/                         Nuxt 官网、BFF 接口和线上静态图片
│  │  ├─ app/components/           Vue 组件
│  │  ├─ app/content/fallbacks/    CMS 不可用时的中英文回退内容
│  │  ├─ app/pages/                明确的页面路由
│  │  ├─ server/api/content/       面向前端的内容接口
│  │  └─ public/images/            网站直接使用的原尺寸图片
│  └─ cms/                         Strapi 内容模型、管理后台和媒体库
├─ packages/contracts/             Web 与 CMS 共用的 TypeScript 类型
├─ infra/                          Docker 镜像和 Nginx 配置
├─ docs/                           架构、需求、开发、内容和部署文档
├─ references/
│  ├─ company-materials/           公司原始资料
│  └─ assets-original/             未压缩的原始图片与备用版本
├─ compose.yml                     本地 PostgreSQL
└─ compose.prod.yml                生产全容器编排
```

`apps/web` 是访客看到的网站；`apps/cms` 是内部人员登录后维护内容的后台。两者是独立应用，通过 HTTP API 连接，不应把 Strapi 页面代码写入 `apps/web`，也不应把官网组件放入 `apps/cms`。

## Windows 开发环境

需要安装：

- Node.js 22 LTS
- pnpm 11
- Docker Desktop
- Git

首次启动：

```powershell
docker compose up -d postgres
pnpm install
Copy-Item apps/cms/.env.example apps/cms/.env
Copy-Item apps/web/.env.example apps/web/.env
pnpm dev:cms
pnpm dev:web
```

建议分别在两个 PowerShell 终端运行 `pnpm dev:cms` 和 `pnpm dev:web`。详细说明见 [本地开发文档](docs/local-development.md)。

## 内容更新

访问 `http://localhost:1337/admin` 登录 Strapi：

- `Site Setting`：更新公司名称、页脚标语、地址、电话、邮箱和微信公众号二维码。
- `About Page`：更新“关于我们”页面；中文和英文需要切换 Locale 分别编辑并发布。
- `Case Article`：发布客户案例、公司动态和活动资讯。`internal` 在本站渲染正文，`external` 跳转到微信公众号文章。

详细字段和发布流程见 [CMS 内容维护指南](docs/cms-content-guide.md)。

## 常用命令

```powershell
pnpm dev:web
pnpm dev:cms
pnpm typecheck
pnpm test
pnpm build:web
pnpm build:cms
```

更多资料：

- [技术架构](docs/architecture.md)
- [产品需求](docs/product-requirements.md)
- [实施方案](docs/implementation-plan.md)
- [部署说明](docs/deployment.md)
