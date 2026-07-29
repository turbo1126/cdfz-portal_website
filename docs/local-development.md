# Windows 本地开发

## 服务分工

当前开发环境不使用 WSL：Nuxt 和 Strapi 直接运行在 Windows Node.js 中，PostgreSQL 运行在 Docker Desktop 中。这样便于使用 Windows 编辑器，同时让数据库环境保持一致。

| 服务 | 目录 | 运行位置 | 端口 |
|---|---|---|---|
| 官网前端 | `apps/web` | Windows | `3000` |
| 内容后台 | `apps/cms` | Windows | `1337` |
| 数据库 | — | Docker | `5432` |

## 必备软件

- Node.js 22 LTS
- pnpm 11：`corepack enable` 后执行 `corepack prepare pnpm@11.5.0 --activate`
- Docker Desktop
- Git

## 首次启动

在项目根目录执行：

```powershell
docker compose up -d postgres
pnpm install
Copy-Item apps/cms/.env.example apps/cms/.env
Copy-Item apps/web/.env.example apps/web/.env
```

随后打开两个 PowerShell 终端：

```powershell
pnpm dev:cms
```

```powershell
pnpm dev:web
```

访问：

- 官网：`http://localhost:3000`
- Strapi 管理后台：`http://localhost:1337/admin`

## 常见检查

```powershell
docker compose ps
pnpm --filter @cdfz/web typecheck
pnpm --filter @cdfz/web test
pnpm --filter @cdfz/web build
pnpm --filter @cdfz/cms build
```

如果前端显示静态回退内容，先确认 Strapi 正在运行、对应 Locale 已发布，并检查 `apps/web/.env` 中的 Strapi 地址是否为 `http://localhost:1337`。
