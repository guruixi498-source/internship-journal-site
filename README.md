# Internship Journal Site | 实习与学习成长记录系统

一个面向学生、实习生和个人开发者的轻量级成长记录网页应用，用于沉淀实习收获、学习感悟、项目复盘、个人思考、计划目标和文档资料。项目支持本地保存、云端同步、Markdown 导出、JSON 备份和 AI 辅助生成，帮助用户把日常经历整理成可复盘、可迁移、可用于求职准备的个人成长档案。

在线访问地址：  
https://guruixi498-source.github.io/internship-journal-site/

产品说明书：  
[`docs/product-guide.pdf`](docs/product-guide.pdf)

## 中文介绍

### 项目定位

Internship Journal Site 是一个用于记录实习经历、学习感悟、项目复盘和个人成长计划的网页应用。它帮助用户把零散的学习过程、实习经验、项目经历和思考内容整理成可搜索、可复盘、可导出的个人成长档案。

### 核心功能

- 记录中心：支持实习收获、学习感悟、个人思考、文档资料、项目记录五类内容。
- 项目复盘：可记录项目背景、技术栈、实现过程、项目反思，方便后续整理面试素材。
- 计划中心：支持周计划、长期计划管理，并可标记完成状态。
- 成长看板：自动统计记录数量、分区分布、高频标签和目标完成率。
- 个人档案：集中整理个人技能、能力、公司信息和实习联系人资料。
- 云同步：基于 Supabase 实现跨设备同步和在线编辑。
- 数据备份：支持 JSON 备份导入导出，以及 Markdown 文档导出。
- AI 助手：支持接入 Gemini API，用于生成周报、项目面试稿和计划建议。

### 技术栈

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Supabase Auth
- Supabase Database
- GitHub Pages
- Gemini API

### 使用方式

1. 打开在线网页。
2. 在“记录中心”新增实习、学习、思考、文档或项目记录。
3. 在“计划中心”维护周计划和长期计划。
4. 在“云同步”中直接注册或登录账号，默认云端配置已内置。
5. 登录后，数据会同步到云端；换电脑后登录同一账号即可继续使用。
6. 可在“数据备份”中导出 JSON 或 Markdown 文件。

### 云同步配置

1. 本项目已内置 Supabase Project URL 和 publishable key，普通用户无需手动配置。
2. 打开网站的“云同步”页面，使用邮箱和密码注册或登录账号。
3. 第一次登录时，如果云端没有数据，网站会把当前浏览器数据上传成第一份云备份。
4. 换电脑后打开同一网页，登录同一账号会自动拉取云端数据。
5. 开发者如需更换 Supabase 项目，可在新项目 SQL Editor 中执行 `supabase-schema.sql`，再替换前端默认云端配置。

说明：Gemini API Key 不会上传到云端，仍只保存在当前浏览器，避免敏感 Key 跟随数据同步。

### 数据与隐私说明

- 用户记录默认保存在当前浏览器 LocalStorage 中。
- 开启云同步后，记录会保存到 Supabase 数据库。
- 每个登录用户只能访问自己的数据。
- Gemini API Key 只保存在当前浏览器，不上传到云端。
- 不应将 Supabase Secret Key 或 service_role key 放入前端代码。

### 本地预览

直接用浏览器打开 `index.html`，或在项目目录运行：

```bash
python3 -m http.server 8000
```

然后访问：

```text
http://127.0.0.1:8000/index.html
```

### 开发者

维护者：GU Ruixi

## English Overview

### Project Positioning

Internship Journal Site is a lightweight personal growth web application for recording internship experience, learning reflections, project retrospectives, personal thoughts, plans, and useful documents. It helps users turn scattered daily notes into a searchable, reviewable, exportable, and cloud-synced personal growth archive.

### Key Features

- Record Center: Create and manage internship notes, learning reflections, personal thoughts, document resources, and project records.
- Project Retrospective: Record project background, technology stack, implementation process, and reflections for interview preparation.
- Plan Center: Manage weekly and long-term plans with completion tracking.
- Growth Dashboard: View record counts, category distribution, frequent tags, monthly trends, and plan completion rate.
- Personal Profile: Organize skills, abilities, company information, leaders, and colleague notes.
- Cloud Sync: Use Supabase Auth and Database to sync data across devices.
- Data Backup: Export and import JSON backups, and export Markdown documents.
- AI Assistant: Connect a Gemini API key to generate weekly reports, project interview drafts, and plan suggestions.

### Tech Stack

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Supabase Auth
- Supabase Database
- GitHub Pages
- Gemini API

### How To Use

1. Open the online website.
2. Add internship, learning, thinking, document, or project records in the Record Center.
3. Manage weekly and long-term plans in the Plan Center.
4. Sign up or sign in from the Cloud Sync page. The default cloud configuration is built in.
5. After signing in, data is synced to the cloud. On another computer, open the same website and sign in with the same account to continue.
6. Export JSON backups or Markdown documents from the Data Backup page.

### Cloud Sync Setup

1. The Supabase Project URL and publishable key are built into this project, so regular users do not need to configure them manually.
2. Open the Cloud Sync page and sign up or sign in with an email and password.
3. If no cloud data exists, the current browser data will be uploaded as the first cloud backup.
4. On another computer, open the same website and sign in with the same account to load cloud data.
5. Developers who want to switch Supabase projects can run `supabase-schema.sql` in the new project and replace the default frontend cloud configuration.

### Data And Privacy

- Records are stored in browser LocalStorage by default.
- After cloud sync is enabled, records are stored in Supabase.
- Each authenticated user can only access their own data.
- The Gemini API key is stored only in the current browser and is not uploaded to the cloud.
- Supabase Secret Key or service_role key should never be committed to frontend code.
