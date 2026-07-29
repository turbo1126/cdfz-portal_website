# 部署说明

## 生产服务

`compose.prod.yml` 定义四个服务：

- `nginx`：对外提供 80/443，反向代理官网和 CMS。
- `web`：Nuxt SSR 官网及服务端 BFF。
- `cms`：Strapi 内容管理系统。
- `postgres`：PostgreSQL 数据库，仅供内部服务访问。

## 上线前配置

1. 将示例域名替换为正式官网和 CMS 域名。
2. 为 Strapi 设置强随机的 `APP_KEYS`、Token Salt、JWT Secret 和 Encryption Key。
3. 修改数据库账号密码，生产环境不要使用示例值。
4. 配置 HTTPS 证书、Nginx 安全头、备份和日志轮转。
5. 将 Strapi 上传目录接入持久化存储；迁移阿里云时建议使用 OSS。
6. 数据库迁移至阿里云 RDS 后，通过环境变量修改连接，不需要改业务代码。

## 构建与启动

```bash
docker compose -f compose.prod.yml build
docker compose -f compose.prod.yml up -d
docker compose -f compose.prod.yml ps
```

## CDN 建议

CDN 适合缓存 Nuxt 生成的静态资源和公开媒体文件。后台管理、预览、登录、Nuxt BFF API 和 Strapi API 不应使用长时间公共缓存。发布文章后，可按路径刷新相关页面和媒体缓存。
