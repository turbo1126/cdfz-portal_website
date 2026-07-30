# CMS 创新平台编辑说明

## 进入后台

1. 启动 CMS：`pnpm dev:cms`
2. 打开 `http://localhost:1337/admin`
3. 在左侧进入“内容管理器（Content Manager）” → “创新平台”

## 创建两条平台内容

当前前端在 CMS 没有已发布数据时会显示默认的两张卡片。准备切换到 CMS 时，建议先把两条平台内容都创建完成，再一起发布。

字段与页面位置的对应关系：

| CMS 字段 | 页面用途 |
| --- | --- |
| `title` | 卡片主标题、详情页大标题 |
| `slug` | 详情页网址，例如 `lingang-intelligent-systems`；发布后不建议随意修改 |
| `shortName` | 卡片标题上方的蓝色小分类 |
| `eyebrow` | 详情页标题上方的小标题；未填写时使用 `shortName` |
| `summary` | 卡片底部简介、详情页标题下方摘要 |
| `tags` | 卡片标签和详情页右侧“服务方向”，每项单独添加 |
| `cover` | 卡片封面和详情页头图，建议使用横图 |
| `content` | 点击卡片后详情页的正文，可添加标题、段落、列表、引用、链接和图片 |
| `sortOrder` | 排列顺序，建议两条内容分别填写 `1`、`2` |
| `featured` | 是否在首页“双平台驱动”区域展示；关闭后仍会显示在创新平台列表页 |

填写完成后点击右上角“发布（Publish）”。只有已发布内容会出现在官网。

## 中英文内容

中文内容发布后，可在右侧语言区域创建 English 本地化版本。英文版建议保留与中文版相同的 `slug`，分别翻译 `title`、`shortName`、`eyebrow`、`summary`、`tags` 和 `content`。

## 推荐网址标识

- 上海临港智能系统科创平台：`lingang-intelligent-systems`
- 上海人形机器人具身智能零部件中试平台：`embodied-robotics-pilot`

对应详情地址为：

- `/platforms/lingang-intelligent-systems`
- `/platforms/embodied-robotics-pilot`
