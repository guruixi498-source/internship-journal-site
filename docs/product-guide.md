# 实习与学习成长记录系统

## 产品简介与使用说明书

版本：1.0  
维护者：Edy  
在线地址：https://guruixi498-source.github.io/internship-journal-site/

---

## 中文版

### 1. 产品定位

实习与学习成长记录系统是一款面向学生、实习生和个人开发者的轻量级成长管理工具。产品目标是帮助用户系统记录实习经历、学习过程、项目复盘、个人思考和阶段性计划，并通过统计看板、数据导出和云端同步能力，将日常积累转化为可复盘、可迁移、可用于求职和面试准备的个人成长档案。

### 2. 适用人群

本产品适用于以下用户：

1. 正在实习、希望记录每日工作收获的学生。
2. 需要长期整理学习笔记和个人感悟的学习者。
3. 正在准备简历和面试、需要沉淀项目经历的人。
4. 希望跨电脑访问个人记录的用户。
5. 希望用简单网页管理成长数据的个人开发者。

### 3. 核心价值

本产品解决的核心问题是：把零散的经历变成结构化资料。用户可以通过记录、标签、计划、项目复盘和导出功能，将平时的实习经历、学习内容、项目实现过程和个人思考沉淀下来。后续在写周报、总结、简历或准备面试时，可以快速回顾和整理已有内容。

### 4. 功能模块说明

首页概览：展示全部记录数量、文档数量、日历跳转和成长看板，帮助用户快速了解自己的记录情况。

记录中心：支持新增、编辑、删除和筛选记录。记录类型包括实习收获、学习感悟、个人思考、文档资料和项目记录。

项目记录：用于记录课程作业、竞赛项目、个人产品或 vibe coding 项目。支持填写项目背景、技术栈、实现过程和项目反思，方便后续整理面试回答。

计划中心：支持维护周计划和长期计划，并可以标记完成情况。系统会根据计划完成情况生成目标完成率。

个人档案：用于整理个人技能、能力描述、公司信息、Leader 信息和同事信息，适合沉淀实习相关背景资料。

云同步：通过 Supabase 实现登录和云端保存。用户在不同电脑打开同一网页，登录同一账号后即可同步查看和编辑数据。

数据备份：支持导出 JSON 备份文件，也支持导出 Markdown 文档，用于迁移、归档或整理成正式材料。

AI 助手：支持配置 Gemini API Key，用于生成周报、项目面试稿和计划建议。

### 5. 使用流程

第一步：打开网页  
访问 https://guruixi498-source.github.io/internship-journal-site/

第二步：新增记录  
进入“记录中心”，选择记录类型，填写标题、内容、标签和相关信息，然后保存。

第三步：维护计划  
进入“计划中心”，添加周计划或长期计划，并在完成后标记状态。

第四步：开启云同步  
进入“云同步”，填写 Supabase Project URL 和 Publishable Key，然后使用邮箱注册或登录。

第五步：跨设备使用  
在新电脑打开同一网页，填写相同 Supabase 配置，并登录同一账号，即可同步查看历史记录。

第六步：导出资料  
进入“数据备份”，可以导出 JSON 备份或 Markdown 文档。

### 6. 技术实现说明

本系统采用 HTML、CSS 和 JavaScript 开发，前端部署在 GitHub Pages。数据默认保存在浏览器 LocalStorage 中，云同步功能基于 Supabase Auth 和 Supabase Database 实现。用户登录后，系统会将记录、计划、个人档案和公司档案保存到云端，并通过数据库 RLS 策略保证用户只能访问自己的数据。

### 7. 安全说明

系统使用 Supabase Publishable Key 连接前端，该 Key 可用于公开前端场景。真正的数据访问权限由 Supabase Row Level Security 策略控制。

注意事项：

1. 不要公开 Supabase Secret Key。
2. 不要公开 service_role key。
3. 不要把自己的登录密码发给别人。
4. Gemini API Key 仅保存在当前浏览器，不会上传到云端。

### 8. 后续优化方向

后续可继续扩展以下能力：

1. 增加更完整的账号设置页面。
2. 支持更细粒度的项目管理和面试素材整理。
3. 增加移动端体验优化。
4. 增加更多 AI 生成模板。
5. 增加 PDF 导出和简历素材导出。
6. 增加多语言界面。

---

## English Version

### 1. Product Positioning

Internship Journal Site is a lightweight personal growth management tool for students, interns, and individual developers. It helps users record internship experience, learning reflections, project retrospectives, personal thoughts, and plans. With dashboard statistics, data export, and cloud sync, daily notes can become a reviewable, portable, and interview-ready personal growth archive.

### 2. Target Users

This product is suitable for:

1. Students who are doing internships and want to record daily work insights.
2. Learners who need to organize study notes and reflections over time.
3. Job seekers who want to prepare resumes and interview stories from project experience.
4. Users who need to access their personal records across different computers.
5. Individual developers who prefer a simple web-based growth management tool.

### 3. Core Value

The core value of this product is turning scattered experience into structured material. Through records, tags, plans, project retrospectives, and export features, users can preserve internship experience, learning content, project implementation details, and personal reflections. Later, these materials can be reused for weekly reports, summaries, resumes, and interview preparation.

### 4. Feature Modules

Home Overview: Shows total records, document count, date jump, and growth dashboard statistics.

Record Center: Supports creating, editing, deleting, and filtering records. Record types include internship notes, learning reflections, personal thoughts, documents, and project records.

Project Records: Designed for course projects, competitions, personal products, and vibe coding projects. Users can record project background, technology stack, implementation process, and reflections.

Plan Center: Supports weekly and long-term plans with completion tracking. The system calculates plan completion metrics for the dashboard.

Personal Profile: Organizes skills, abilities, company information, leader notes, and colleague notes.

Cloud Sync: Uses Supabase authentication and database storage. Users can open the same website on another computer and sign in with the same account to continue editing.

Data Backup: Supports JSON backup files and Markdown export for migration, archiving, and formal documentation.

AI Assistant: Supports Gemini API configuration to generate weekly reports, project interview drafts, and plan suggestions.

### 5. Usage Flow

Step 1: Open the website  
Visit https://guruixi498-source.github.io/internship-journal-site/

Step 2: Add records  
Go to the Record Center, choose a record type, fill in the title, content, tags, and related information, then save.

Step 3: Manage plans  
Go to the Plan Center, add weekly or long-term plans, and mark them as completed when finished.

Step 4: Enable cloud sync  
Go to Cloud Sync, enter the Supabase Project URL and Publishable Key, then sign up or sign in with an email account.

Step 5: Use across devices  
On another computer, open the same website, enter the same Supabase configuration, and sign in with the same account to load previous records.

Step 6: Export materials  
Go to Data Backup to export JSON backups or Markdown documents.

### 6. Technical Implementation

The system is built with HTML, CSS, and JavaScript, and is deployed through GitHub Pages. Data is stored in browser LocalStorage by default. Cloud sync is implemented with Supabase Auth and Supabase Database. After sign-in, records, plans, personal profile, and company archives are saved to the cloud. Supabase Row Level Security ensures that each user can only access their own data.

### 7. Security Notes

The frontend uses a Supabase Publishable Key, which is safe for browser usage. Actual data access is controlled by Supabase Row Level Security policies.

Important notes:

1. Do not expose the Supabase Secret Key.
2. Do not expose the service_role key.
3. Do not share your account password with others.
4. The Gemini API key is stored only in the current browser and is not uploaded to the cloud.

### 8. Future Improvements

Possible future improvements include:

1. A more complete account settings page.
2. More detailed project management and interview material organization.
3. Better mobile experience.
4. More AI generation templates.
5. PDF export and resume material export.
6. Multi-language interface support.
