# 实习与学习记录网页

这是一个用于记录实习收获、学习感悟、个人思考、项目复盘和文档资料的个人网页。

## 功能

- 新增实习、学习、思考、文档、项目五类记录
- 文档记录支持添加外部链接
- 支持搜索、标签、月份、重点记录筛选
- 支持周计划、长期计划和目标完成率统计
- 支持 JSON 备份、Markdown 导出和 Gemini AI 助手
- 使用浏览器 localStorage 保存本地数据
- 可配置 Supabase 登录和云端同步，实现跨电脑在线编辑
- 适配桌面和手机浏览

## 云同步配置

1. 在 Supabase 新建项目。
2. 打开 Supabase 的 SQL Editor，执行 `supabase-schema.sql` 中的 SQL。
3. 在 Supabase Project Settings > API 中复制 `Project URL` 和 `anon public` key。
4. 打开网站的“云同步”页面，填入 URL 和 anon key 后保存。
5. 注册或登录账号。第一次登录时，如果云端没有数据，网站会把当前浏览器数据上传成第一份云备份；换电脑后登录同一账号会自动拉取云端数据。

说明：Gemini API Key 不会上传到云端，仍只保存在当前浏览器，避免敏感 Key 跟随数据同步。

## GitHub Pages 部署

仓库推送到 GitHub 后，可以在 GitHub 仓库的 Settings > Pages 中选择 `main` 分支和根目录 `/` 发布。发布后使用 GitHub Pages 链接访问网页，再进入“云同步”页面登录同一 Supabase 账号即可在线编辑。

## 本地预览

直接用浏览器打开 `index.html`，或在项目目录运行：

```bash
python3 -m http.server 8000
```

然后访问：

```text
http://127.0.0.1:8000/index.html
```

## 开发者

维护者：Edy
