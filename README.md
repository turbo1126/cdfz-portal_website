# 上海成电福智官方网站

基于 `Nuxt 4 + Strapi 5 + PostgreSQL 16` 的中英文企业官网项目，面向品牌展示、产品获客、创新平台展示和合作线索收集。

## 目录说明

- `apps/web`：Nuxt 4 官网前端
- `apps/cms`：Strapi 5 内容管理系统
- `packages/contracts`：共享类型定义
- `images`：原始品牌与素材文件
- `references`：公司介绍与产品参考资料
- `infra`：Docker 与 Nginx 相关配置
- `.trae/documents`：PRD 与技术架构文档

## 本地开发架构

- Windows 主机 + WSL2 Ubuntu
- `apps/web` 在 WSL 中运行 `pnpm dev`，默认端口 `3000`
- `apps/cms` 在 WSL 中运行 `pnpm dev`，默认端口 `1337`
- PostgreSQL 16 通过 Docker Desktop 运行，端口 `5432`

## 初始化步骤

1. 启动数据库

```bash
docker compose up -d
```

2. 安装根工作区依赖

```bash
pnpm install
```

3. 复制环境变量

```bash
cp .env.example apps/cms/.env
```

根据需要补充 `apps/web/.env`，至少包含：

```bash
NUXT_PUBLIC_SITE_URL=http://localhost:3000
NUXT_INTERNAL_STRAPI_URL=http://localhost:1337
NUXT_PUBLIC_STRAPI_URL=http://localhost:1337
NUXT_PUBLIC_DEFAULT_LOCALE=zh-CN
```

4. 分别启动前端与 CMS

```bash
pnpm dev:web
pnpm dev:cms
```

## 常用命令

```bash
pnpm dev
pnpm dev:web
pnpm dev:cms
pnpm build
pnpm check
```

## 当前初始化内容

- 已建立 `pnpm workspace`
- 已生成 `Strapi 5` CMS 工程并接入 PostgreSQL 配置
- 已创建 `Nuxt 4` 官网前端骨架与基础页面结构
- 已复制品牌图片到前端 `public/brand`
- 已补充本地 Docker Compose、生产 Compose 和 Nginx 骨架

## 下一步建议

- 建立 Strapi 内容模型与种子数据
- 接入 Nuxt BFF 内容接口
- 将静态占位内容替换为 CMS 驱动内容
- 完善中英文文案、SEO 与表单提交流程
