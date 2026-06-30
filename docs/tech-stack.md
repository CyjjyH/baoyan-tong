# 技术选型与规范 — 保研信息聚合平台

> 版本：v1.0 | 创建日期：2026-06-30

---

## 1. 技术栈总览

| 层面 | 选型 | 理由 |
|------|------|------|
| **前端框架** | Next.js 14 (App Router) | 全栈框架，前后端一体，SSR 利于 SEO |
| **前端语言** | TypeScript | 类型安全，减少运行时错误 |
| **样式方案** | Tailwind CSS | 原子化 CSS，快速开发，易于统一风格 |
| **UI 组件** | shadcn/ui | 高质量可定制组件，与 Tailwind 完美配合 |
| **后端框架** | Next.js API Routes | 无需额外后端服务，减少部署复杂度 |
| **数据库 ORM** | Prisma | 类型安全的数据库操作，自动迁移 |
| **数据库** | PostgreSQL | 功能强大，支持全文搜索，免费托管方案多 |
| **身份认证** | NextAuth.js v5 | 开箱即用的认证方案，支持邮箱登录 |
| **邮件服务** | Resend | 开发者友好的邮件 API，免费额度够用 |
| **定时任务** | Vercel Cron Jobs | 简单可靠的定时触发 |
| **AI 搜索** | 大模型 API（Web Search + Structured Output） | 实现网页搜索 + 信息提取 |
| **部署** | Vercel | 免费层够用，自动部署，零运维 |
| **域名** | 用户自行购买 | 约 50-80 元/年 |

## 2. 开发环境

| 工具 | 用途 |
|------|------|
| VS Code | 代码编辑器 |
| Node.js 20+ | 运行时 |
| pnpm | 包管理器（更快更省空间） |
| Git + GitHub | 版本控制和代码托管 |
| PostgreSQL (本地/云) | 开发数据库 |

## 3. 项目结构规范

```
d:/求学伴侣/
├── CLAUDE.md                    # AI 开发助手指引
├── devlog/                      # 开发日志
│   └── YYYY-MM-DD.md
├── docs/                        # 项目文档
│   ├── requirements.md          # 产品需求
│   ├── tech-stack.md            # 技术选型（本文件）
│   ├── design-spec.md           # 设计规范
│   └── execution-plan.md        # 执行计划
├── src/
│   ├── app/                     # Next.js App Router 页面
│   │   ├── layout.tsx           # 根布局
│   │   ├── page.tsx             # 首页
│   │   ├── (auth)/              # 登录/注册
│   │   ├── notice/[id]/         # 通知详情
│   │   ├── admin/               # 管理后台
│   │   └── api/                 # API 路由
│   ├── components/              # 可复用组件
│   │   ├── ui/                  # shadcn 基础组件
│   │   ├── layout/              # 布局组件（Header/Footer/Sidebar）
│   │   ├── search/              # 搜索筛选相关组件
│   │   ├── notice/              # 通知相关组件
│   │   └── user/                # 用户相关组件
│   ├── lib/                     # 工具函数
│   │   ├── db.ts                # 数据库客户端
│   │   ├── auth.ts              # 认证配置
│   │   ├── mail.ts              # 邮件服务
│   │   └── ai-search.ts         # AI 搜索逻辑
│   ├── types/                   # TypeScript 类型定义
│   └── styles/                  # 全局样式（少量补充 Tailwind）
├── prisma/
│   └── schema.prisma            # 数据库模型定义
├── public/                      # 静态资源
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## 4. 编码规范

### 4.1 命名规范
- **文件名**：kebab-case（`search-filter.tsx`）
- **组件名**：PascalCase（`SearchFilter`）
- **函数名**：camelCase（`getNotices`）
- **数据库表/字段**：snake_case（`application_start_date`）
- **CSS 类名**：Tailwind 原子类为主，自定义类用 kebab-case

### 4.2 组件规范
- 每个组件文件只导出一个主组件
- 使用 `interface` 定义 Props 类型并导出
- 服务端组件优先，只在需要交互时使用客户端组件
- 客户端组件顶部标注 `"use client"`

### 4.3 Git 规范
- 分支命名：`feature/xxx`、`fix/xxx`
- Commit 信息：中文或英文，简明描述变更内容
- 每完成一个功能模块提交一次

## 5. 安全要求

- [ ] 所有用户输入做校验和清洗
- [ ] 密码使用 bcrypt 哈希存储
- [ ] API 路由做权限检查
- [ ] 防 SQL 注入（Prisma 已内置）
- [ ] 防 XSS（React 默认转义 + CSP header）
- [ ] 敏感环境变量使用 `.env` 管理，不提交到 Git
