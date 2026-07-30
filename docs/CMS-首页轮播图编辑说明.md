# CMS 首页轮播图编辑说明

## 进入后台

1. 重启 CMS：`pnpm dev:cms`
2. 打开 `http://localhost:1337/admin`
3. 进入“内容管理器（Content Manager）” → “首页轮播图”

## 字段说明

| CMS 字段 | 页面用途 |
| --- | --- |
| `name` | 后台识别名称，不在官网显示，例如“首页第一张-智能系统” |
| `tag` | 标题上方的小角标 |
| `title` | 轮播主标题；可在文本框中按 Enter 手动换行 |
| `description` | 标题下方的说明文字；支持换行 |
| `backgroundImage` | 整张轮播背景图，建议使用 16:9 或更宽的高清横图 |
| `backgroundPosition` | 图片裁切位置，默认 `center center`；也可填写 `center 35%`、`60% center` |
| `primaryLabel` | 蓝色主按钮文字，留空则不显示主按钮 |
| `primaryLink` | 主按钮链接，例如 `/contact`、`/products` 或完整外部网址 |
| `secondaryLabel` | 次按钮文字，留空则不显示次按钮 |
| `secondaryLink` | 次按钮链接 |
| `sortOrder` | 轮播排序，从小到大显示，建议填写 `1`、`2`、`3` |
| `enabled` | 是否启用；关闭后该轮播不在首页显示 |

内容填写完成后点击右上角“发布（Publish）”。草稿不会显示在官网。

## 首次切换注意事项

CMS 没有已发布轮播时，官网会继续使用前端的三张默认轮播。只要 CMS 发布了至少一张轮播，首页就会完全改用 CMS 中已发布且已启用的轮播。

因此建议先创建完需要的全部轮播，再统一发布，避免首页暂时只显示一张。

## 中英文内容

中文版发布后，在语言区域创建 English 本地化版本。`name`、`sortOrder` 和 `enabled` 为中英文共用；`tag`、`title`、`description`、图片和按钮文字/链接均可分别编辑。
