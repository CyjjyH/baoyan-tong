# CLAUDE.md — 保研信息聚合平台

> 本文件是 Claude Code 开发助手的项目指引。
> 每次开始开发任务前，Claude 应首先阅读相关标准文档。

---

## 项目简介

帮助大学生实时筛选夏令营/预推免通知的信息聚合网站。蓝白配色，简洁直观。

## 标准文档索引

在进行任何开发工作前，请务必查阅对应的标准文档：

| 文档 | 路径 | 说明 |
|------|------|------|
| 📋 产品需求 | `docs/requirements.md` | 完整功能需求，优先级定义 |
| 🔧 技术规范 | `docs/tech-stack.md` | 技术栈、项目结构、编码规范 |
| 🎨 设计规范 | `docs/design-spec.md` | 色彩、字体、组件、响应式断点 |
| 📅 执行计划 | `docs/execution-plan.md` | 7 阶段开发步骤和验收标准 |

## 开发工作流

### 每日例行
1. 开始开发前，查看 `devlog/` 最新日志了解进度
2. 按 `docs/execution-plan.md` 中的当前阶段逐项推进
3. 每天结束时，更新或新建 `devlog/YYYY-MM-DD.md`，记录：
   - 今日完成了什么
   - 遇到了什么问题
   - 待办事项
   - 明日计划

### 编码规范（摘要）

- **技术栈**：Next.js 16 + TypeScript + Tailwind CSS v4 + shadcn/ui + Prisma + SQLite(dev)/PostgreSQL(prod)
- **命名**：文件名 kebab-case，组件 PascalCase，函数 camelCase
- **组件**：服务端优先，需要交互才加 `"use client"`
- **风格**：参照 `docs/design-spec.md` 的色彩和组件规范
- **安全**：用户输入校验、密码 bcrypt 加密、API 权限检查

### Git 规范

- 分支命名：`feature/xxx`、`fix/xxx`
- 每完成一个功能模块提交一次
- Commit 信息简明描述变更

## 关键约束

- 不要一口气做太多，严格按照执行计划的阶段推进
- 每个阶段完成后验证，再进入下一阶段
- 优先保证功能可用，再追求完美
- 涉及外部服务（数据库、邮件、AI API）的配置，先确认用户有相应账号和密钥
