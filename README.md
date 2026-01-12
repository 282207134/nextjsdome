# Next.js 完整学习项目

这是一个全面的 Next.js 学习项目，包含了 Next.js 15 的所有核心特性和最佳实践，所有代码都有详细的中文注释。

## 🚀 快速开始

### 环境要求

- Node.js 18.17 或更高版本
- npm、yarn、pnpm 或 bun 包管理器

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
# 或
bun install
```

### 开发服务器

启动开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 故障排除

如果遇到启动问题，请按以下步骤操作：

#### 问题 1: 端口被占用

如果看到 `Port 3000 is in use` 错误：

**Windows (PowerShell):**
```powershell
# 查找占用端口的进程
netstat -ano | findstr ":3000"

# 终止进程（将 PID 替换为实际的进程 ID）
Stop-Process -Id <PID> -Force
```

**macOS/Linux:**
```bash
# 查找占用端口的进程
lsof -ti:3000

# 终止进程
kill -9 $(lsof -ti:3000)
```

#### 问题 2: 锁文件冲突

如果看到 `Unable to acquire lock` 错误，说明有另一个 Next.js 实例正在运行或之前的实例未正确关闭：

**Windows (PowerShell):**
```powershell
# 删除锁文件和 .next 目录
Remove-Item -Recurse -Force .next
```

**macOS/Linux:**
```bash
# 删除锁文件和 .next 目录
rm -rf .next
```

#### 问题 3: 清理并重新启动

如果上述方法无效，执行完整清理：

**Windows (PowerShell):**
```powershell
# 1. 停止所有 Node.js 进程（谨慎使用）
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force

# 2. 清理构建文件
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules

# 3. 重新安装依赖
npm install

# 4. 重新启动开发服务器
npm run dev
```

**macOS/Linux:**
```bash
# 1. 停止所有 Node.js 进程（谨慎使用）
pkill -f node

# 2. 清理构建文件
rm -rf .next node_modules

# 3. 重新安装依赖
npm install

# 4. 重新启动开发服务器
npm run dev
```

#### 问题 4: 安全漏洞警告

如果看到 `npm audit` 警告：

```bash
# 查看详细的安全报告
npm audit

# 自动修复（如果可能）
npm audit fix

# 强制修复（谨慎使用，可能会更新主要版本）
npm audit fix --force
```

#### 正确的启动流程

1. **首次启动或清理后：**
   ```bash
   # 安装依赖
   npm install
   
   # 启动开发服务器
   npm run dev
   ```

2. **正常重启：**
   ```bash
   # 在运行开发服务器的终端按 Ctrl+C 停止
   # 然后重新运行
   npm run dev
   ```

3. **验证服务器运行：**
   - 检查终端输出，应该看到：
     ```
     ✓ Starting...
     ✓ Ready in X seconds
     - Local: http://localhost:3000
     ```
   - 在浏览器访问 http://localhost:3000
   - 如果端口被占用，Next.js 会自动使用下一个可用端口（如 3001）

## 📁 项目结构

```
nextjs-learning-project/
├── src/
│   ├── app/                          # App Router 目录
│   │   ├── (features)/               # 路由组 - 功能页面
│   │   │   ├── routing/              # 路由系统示例
│   │   │   ├── data-fetching/        # 数据获取示例
│   │   │   ├── api-routes/           # API 路由示例
│   │   │   ├── server-components/    # 服务端组件示例
│   │   │   ├── forms/                # 表单处理示例
│   │   │   ├── middleware-demo/      # 中间件示例
│   │   │   ├── optimization/         # 优化技术示例
│   │   │   ├── styling/              # 样式方案示例
│   │   │   ├── i18n/                 # 国际化示例
│   │   │   ├── error-handling/       # 错误处理示例
│   │   │   ├── metadata/             # SEO 和元数据示例
│   │   │   └── env-variables/        # 环境变量示例
│   │   ├── api/                      # API 路由
│   │   │   ├── hello/                # 简单 API 示例
│   │   │   └── users/                # RESTful API 示例
│   │   ├── docs/                     # 文档页面
│   │   ├── examples/                 # 更多示例
│   │   ├── layout.tsx                # 根布局
│   │   ├── page.tsx                  # 首页
│   │   └── globals.css               # 全局样式
│   ├── components/                   # React 组件
│   │   ├── Navigation.tsx            # 导航栏组件
│   │   ├── Card.tsx                  # 卡片组件
│   │   ├── FeatureLayout.tsx         # 功能页面布局
│   │   └── RefreshButton.tsx         # 刷新按钮组件
│   ├── lib/                          # 工具函数和共享逻辑
│   │   └── courses.ts                # 示例数据
│   └── types/                        # TypeScript 类型定义
│       └── module.ts                 # 模块类型
├── public/                           # 静态资源
├── docs/                             # 项目文档（Markdown）
├── .gitignore                        # Git 忽略文件
├── package.json                      # 项目依赖
├── tsconfig.json                     # TypeScript 配置
├── next.config.ts                    # Next.js 配置
├── postcss.config.mjs                # PostCSS 配置
├── eslint.config.mjs                 # ESLint 配置
└── README.md                         # 本文件
```

## 📚 学习模块

### 1. 路由系统 (Routing)
- 基础路由和文件系统路由
- 动态路由 `[slug]`
- 捕获所有路由 `[...slug]`
- 路由组 `(folder)`
- 平行路由 `@folder`
- 拦截路由 `(..)`
- 布局和模板

### 2. 数据获取 (Data Fetching)
- 服务端组件数据获取
- 静态生成 (SSG)
- 服务端渲染 (SSR)
- 增量静态再生成 (ISR)
- 流式渲染和 Suspense
- 客户端数据获取

### 3. API 路由 (API Routes)
- 创建 API 端点
- 处理不同 HTTP 方法
- 请求和响应处理
- 中间件集成

### 4. 服务端组件 (Server Components)
- 服务端组件 vs 客户端组件
- 使用场景和最佳实践
- 组件组合模式

### 5. 表单与数据处理 (Forms & Actions)
- Server Actions
- 表单提交处理
- 数据验证
- 乐观更新

### 6. 中间件 (Middleware)
- 请求拦截
- 认证和授权
- 重定向和重写
- 响应修改

### 7. 优化技术 (Optimization)
- 图片优化 `<Image>`
- 字体优化
- 脚本优化 `<Script>`
- 元数据优化
- 懒加载和代码分割

### 8. 样式方案 (Styling)
- Tailwind CSS
- CSS Modules
- Global CSS
- CSS-in-JS

### 9. 国际化 (i18n)
- 多语言支持
- 路由国际化
- 内容翻译

### 10. 错误处理 (Error Handling)
- error.tsx 错误边界
- loading.tsx 加载状态
- not-found.tsx 404 页面
- 错误恢复

### 11. 元数据与 SEO
- 静态元数据
- 动态元数据
- Open Graph 和 Twitter Cards
- Sitemap 和 Robots.txt

### 12. 环境变量
- 环境变量配置
- 公共和私有变量
- 不同环境的配置

## 🛠️ 开发指南

### 代码风格

项目使用以下工具确保代码质量：

- **TypeScript**: 类型安全
- **ESLint**: 代码检查
- **Tailwind CSS**: 实用优先的样式

### 目录命名规范

- `(folder)`: 路由组，不影响 URL 结构
- `[slug]`: 动态路由段
- `[...slug]`: 捕获所有路由段
- `@folder`: 命名插槽（平行路由）
- `(.)folder`: 拦截路由

### 特殊文件

- `layout.tsx`: 共享布局
- `page.tsx`: 页面组件
- `loading.tsx`: 加载 UI
- `error.tsx`: 错误 UI
- `not-found.tsx`: 404 页面
- `route.ts`: API 路由处理程序
- `middleware.ts`: 中间件

## 🏗️ 构建和部署

### 构建生产版本

```bash
npm run build
```

这将创建一个优化的生产构建在 `.next` 目录中。

### 启动生产服务器

```bash
npm run start
```

### 部署选项

#### 1. Vercel（推荐）

最简单的部署方式是使用 [Vercel](https://vercel.com)，Next.js 的创建者。

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

或者通过 GitHub 集成：
1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. Vercel 会自动检测 Next.js 并配置构建设置

#### 2. Docker 部署

创建 `Dockerfile`:

```dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

构建和运行：

```bash
docker build -t nextjs-app .
docker run -p 3000:3000 nextjs-app
```

#### 3. 静态导出

如果你的应用不需要服务端功能，可以导出为静态 HTML：

修改 `next.config.ts`:

```typescript
const nextConfig = {
  output: 'export',
};
```

然后构建：

```bash
npm run build
```

生成的静态文件在 `out` 目录，可以部署到任何静态托管服务。

#### 4. Node.js 服务器

在任何支持 Node.js 的服务器上：

```bash
# 构建项目
npm run build

# 启动服务
npm run start
```

#### 5. 其他平台

- **Netlify**: 通过 GitHub 集成或 Netlify CLI
- **AWS Amplify**: 连接 Git 仓库自动部署
- **Azure Static Web Apps**: 通过 GitHub Actions
- **Cloudflare Pages**: Git 集成部署
- **Railway**: 一键部署
- **Render**: 自动检测 Next.js

### 环境变量配置

生产环境需要配置环境变量：

1. 创建 `.env.production` 文件
2. 在部署平台设置环境变量
3. 确保敏感信息不提交到 Git

## 📖 详细文档

查看 `docs/` 目录获取更详细的文档：

- [安装和设置指南](docs/01-installation.md)
- [路由系统详解](docs/02-routing.md)
- [数据获取策略](docs/03-data-fetching.md)
- [API 路由开发](docs/04-api-routes.md)
- [组件开发指南](docs/05-components.md)
- [样式和主题](docs/06-styling.md)
- [性能优化](docs/07-optimization.md)
- [部署指南](docs/08-deployment.md)
- [最佳实践](docs/09-best-practices.md)
- [常见问题](docs/10-faq.md)

## 🔗 有用的资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Next.js 示例](https://github.com/vercel/next.js/tree/canary/examples)
- [Vercel 部署文档](https://vercel.com/docs)
- [React 官方文档](https://react.dev)
- [TypeScript 文档](https://www.typescriptlang.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

## 🤝 贡献

欢迎贡献！如果你发现问题或有改进建议：

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目仅用于学习目的。

## ✨ 特性总结

- ✅ Next.js 15+ 最新特性
- ✅ TypeScript 类型安全
- ✅ Tailwind CSS 响应式设计
- ✅ 完整的中文注释
- ✅ 实际可运行的示例
- ✅ 详细的文档说明
- ✅ 多种部署方案
- ✅ 最佳实践指南
- ✅ 性能优化技巧
- ✅ SEO 友好

## 🎯 学习路径建议

1. **第一周**: 熟悉项目结构，学习路由系统和基础组件
2. **第二周**: 掌握数据获取模式（SSG、SSR、ISR）
3. **第三周**: 学习 API 路由和 Server Actions
4. **第四周**: 深入优化技术和部署流程

祝你学习愉快！🎉
