# Strapi 内容维护指南

## 基本发布流程

1. 打开 `http://localhost:1337/admin` 并登录。
2. 在左侧 Content Manager 选择内容类型。
3. 先确认右上角 Locale。中文使用 `zh-CN`，英文使用 `en-US`。
4. 填写并保存后点击 `Publish`。只有保存但未发布的草稿不会出现在官网。
5. 切换另一个 Locale，分别填写并发布对应语言内容。

## 页脚 Site Setting

可维护字段包括：

- `companyName`：公司名称
- `footerSlogan`：页脚标语
- `address`：地址
- `email`：邮箱
- `phone`：电话
- `wechatAccountName`：微信公众号名称
- `wechatQrCode`：公众号二维码

前端由 `apps/web/server/api/content/site-setting.get.ts` 读取并在 `SiteFooter.vue` 展示。字段为空或 Strapi 暂时不可用时，会使用前端回退内容。

## 关于我们 About Page

可维护 `eyebrow`、`title`、`description`、`highlights` 和 `featuredPoints`。前端优先显示已发布的 Strapi 内容，未填写字段继续使用 `apps/web/app/content/fallbacks/` 中的对应语言回退值。

## 案例与动态 Case Article

主要字段：

- `title`、`slug`、`summary`
- `category`：`case`、`news` 或 `event`
- `contentMode`：`internal` 或 `external`
- `cover`、`sourceName`、`publishedDate`、`featured`

两种发布方式：

- 站内文章：选择 `internal`，在 `content` 中填写正文。列表和首页会进入 `/cases/{slug}`。
- 微信公众号外链：选择 `external`，填写完整的 `externalUrl`。列表和首页会在新窗口打开微信文章。

首页最多读取最新 3 篇已发布文章。若当前语言没有已发布文章，则显示静态回退内容，不会把中文文章混入英文页面。

## 图片维护

通过 Strapi Media Library 上传的文章封面和二维码由 CMS 管理。官网自身固定使用的品牌与平台图片位于 `apps/web/public/images/`；原始图片和备用版本位于 `references/assets-original/`，本次整理未对图片进行压缩。
