# Next.js 学习项目 - 使用与部署完整手册

本手册提供了项目的完整使用说明和多种部署方案的详细步骤。

## 目录

1. [快速开始](#快速开始)
2. [开发环境配置](#开发环境配置)
3. [项目结构说明](#项目结构说明)
4. [开发指南](#开发指南)
5. [构建流程](#构建流程)
6. [部署方案](#部署方案)
7. [环境变量管理](#环境变量管理)
8. [性能优化](#性能优化)
9. [常见问题](#常见问题)

---

## 快速开始

### 系统要求

- **Node.js**: 18.17 或更高版本
- **包管理器**: npm、yarn、pnpm 或 bun
- **操作系统**: Windows、macOS 或 Linux
- **内存**: 至少 4GB RAM
- **磁盘空间**: 至少 1GB 可用空间

### 一键启动

```bash
# 1. 克隆项目
git clone <your-repository-url>
cd nextjs-learning-project

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 浏览器访问
# http://localhost:3000
```

---

## 开发环境配置

### 1. Node.js 安装

#### Windows

下载并安装 [Node.js LTS 版本](https://nodejs.org/)

验证安装：

```powershell
node --version
npm --version
```

#### macOS

使用 Homebrew：

```bash
brew install node@18
```

或使用 nvm：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

#### Linux

使用 nvm（推荐）：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

或使用包管理器：

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

### 2. 包管理器选择

#### npm（默认）

```bash
npm install
npm run dev
```

#### yarn

```bash
npm install -g yarn
yarn install
yarn dev
```

#### pnpm（推荐，更快）

```bash
npm install -g pnpm
pnpm install
pnpm dev
```

#### bun（最快）

```bash
# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# Windows
powershell -c "irm bun.sh/install.ps1|iex"

bun install
bun dev
```

### 3. VS Code 配置

#### 推荐扩展

创建 `.vscode/extensions.json`：

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "streetsidesoftware.code-spell-checker"
  ]
}
```

#### 工作区设置

创建 `.vscode/settings.json`：

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## 项目结构说明

### 完整目录树

```
nextjs-learning-project/
├── .next/                          # Next.js 构建输出（自动生成）
│   ├── cache/                      # 构建缓存
│   ├── server/                     # 服务端代码
│   ├── static/                     # 静态资源
│   └── types/                      # 路由类型定义
│
├── .vscode/                        # VS Code 配置
│   ├── extensions.json
│   └── settings.json
│
├── docs/                           # 项目文档
│   ├── 01-installation.md
│   ├── 02-routing.md
│   ├── 03-data-fetching.md
│   ├── 04-api-routes.md
│   ├── 05-components.md
│   ├── 06-styling.md
│   ├── 07-optimization.md
│   ├── 08-deployment.md
│   ├── 09-best-practices.md
│   ├── 10-faq.md
│   └── usage-guide.md
│
├── node_modules/                   # 依赖包（不提交到 Git）
│
├── public/                         # 静态资源目录
│   ├── images/                     # 图片资源
│   ├── fonts/                      # 字体文件
│   ├── favicon.ico
│   ├── next.svg
│   └── vercel.svg
│
├── src/                            # 源代码目录
│   ├── app/                        # App Router 目录
│   │   ├── (features)/             # 路由组 - 功能页面
│   │   │   ├── routing/            # 路由系统示例
│   │   │   ├── data-fetching/      # 数据获取示例
│   │   │   ├── api-routes/         # API 路由示例
│   │   │   ├── server-components/  # 服务端组件示例
│   │   │   ├── forms/              # 表单处理示例
│   │   │   ├── middleware-demo/    # 中间件示例
│   │   │   ├── optimization/       # 优化技术示例
│   │   │   ├── styling/            # 样式方案示例
│   │   │   ├── i18n/               # 国际化示例
│   │   │   ├── error-handling/     # 错误处理示例
│   │   │   ├── metadata/           # SEO 和元数据示例
│   │   │   └── env-variables/      # 环境变量示例
│   │   ├── api/                    # API 路由
│   │   │   ├── hello/
│   │   │   │   └── route.ts
│   │   │   └── users/
│   │   │       └── route.ts
│   │   ├── docs/                   # 文档页面
│   │   │   └── page.tsx
│   │   ├── examples/               # 更多示例
│   │   ├── favicon.ico             # 网站图标
│   │   ├── globals.css             # 全局样式
│   │   ├── layout.tsx              # 根布局
│   │   ├── page.tsx                # 首页
│   │   ├── loading.tsx             # 全局加载状态（可选）
│   │   ├── error.tsx               # 全局错误页面（可选）
│   │   └── not-found.tsx           # 404 页面（可选）
│   │
│   ├── components/                 # React 组件
│   │   ├── ui/                     # UI 组件
│   │   ├── Navigation.tsx
│   │   ├── Card.tsx
│   │   ├── FeatureLayout.tsx
│   │   └── RefreshButton.tsx
│   │
│   ├── lib/                        # 工具函数和共享逻辑
│   │   ├── utils.ts                # 通用工具函数
│   │   ├── courses.ts              # 示例数据
│   │   └── docs.ts                 # 文档元数据
│   │
│   ├── types/                      # TypeScript 类型定义
│   │   ├── global.d.ts
│   │   └── module.ts
│   │
│   └── middleware.ts               # 全局中间件（可选）
│
├── .env.local                      # 本地环境变量（不提交到 Git）
├── .env.development                # 开发环境变量
├── .env.production                 # 生产环境变量
├── .env.example                    # 环境变量示例
├── .gitignore                      # Git 忽略文件
├── .prettierrc                     # Prettier 配置
├── eslint.config.mjs               # ESLint 配置
├── next.config.ts                  # Next.js 配置
├── next-env.d.ts                   # Next.js 类型声明
├── package.json                    # 项目依赖和脚本
├── package-lock.json               # 依赖锁定文件
├── postcss.config.mjs              # PostCSS 配置
├── README.md                       # 项目说明
└── tsconfig.json                   # TypeScript 配置
```

### 关键文件说明

#### `next.config.ts`

Next.js 配置文件：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用严格模式
  reactStrictMode: true,
  
  // 图片优化配置
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
  
  // 环境变量
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // 重定向
  async redirects() {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true,
      },
    ];
  },
  
  // 重写
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },
};

export default nextConfig;
```

#### `tsconfig.json`

TypeScript 配置：

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 开发指南

### 常用命令

```bash
# 开发
npm run dev              # 启动开发服务器
npm run dev -- -p 3001   # 指定端口
npm run dev --turbo      # 使用 Turbopack (更快)

# 构建
npm run build            # 构建生产版本
npm run build -- --profile # 性能分析
npm run build -- --debug # 调试模式

# 生产
npm run start            # 启动生产服务器
npm run start -- -p 8080 # 指定端口

# 代码质量
npm run lint             # 运行 ESLint
npm run lint -- --fix    # 自动修复问题
npx tsc --noEmit         # 类型检查

# 清理
rm -rf .next             # 清除构建缓存
rm -rf node_modules      # 清除依赖
npm install              # 重新安装依赖
```

### 开发最佳实践

#### 1. 组件组织

```
components/
├── ui/              # 通用 UI 组件
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Card.tsx
├── features/        # 功能组件
│   ├── auth/
│   └── dashboard/
└── layout/          # 布局组件
    ├── Header.tsx
    └── Footer.tsx
```

#### 2. 代码风格

- 使用 TypeScript
- 组件使用函数式组件
- 使用 async/await 处理异步操作
- 使用 ESLint 和 Prettier 保持代码一致性

#### 3. Git 工作流

```bash
# 创建功能分支
git checkout -b feature/new-feature

# 提交代码
git add .
git commit -m "feat: add new feature"

# 推送到远程
git push origin feature/new-feature

# 创建 Pull Request
```

### 调试技巧

#### 服务端调试

```typescript
// 添加日志
console.log('Server:', data);

// 使用 Node.js 调试器
// package.json
{
  "scripts": {
    "dev:debug": "NODE_OPTIONS='--inspect' next dev"
  }
}
```

#### 客户端调试

```typescript
'use client';

import { useEffect } from 'react';

export default function ClientComponent() {
  useEffect(() => {
    console.log('Client:', data);
    debugger; // 断点
  }, []);
}
```

---

## 构建流程

### 开发构建

```bash
npm run dev
```

特点：
- 快速热更新 (HMR)
- 源码映射 (Source Maps)
- 详细的错误信息
- 不压缩代码

### 生产构建

```bash
npm run build
```

构建步骤：
1. 类型检查
2. 代码转译
3. 代码压缩
4. 优化资源
5. 生成静态页面
6. 创建服务端 Bundle

构建输出：

```
.next/
├── cache/               # 构建缓存
├── server/              # 服务端代码
│   ├── app/            # 页面路由
│   └── chunks/         # 代码分割
├── static/              # 静态资源
│   ├── chunks/         # JS 分块
│   ├── css/            # CSS 文件
│   └── media/          # 媒体文件
└── types/               # 类型定义
```

### 构建优化

#### 分析构建产物

```bash
npm install @next/bundle-analyzer
```

修改 `next.config.ts`：

```typescript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Next.js 配置
});
```

运行分析：

```bash
ANALYZE=true npm run build
```

---

## 部署方案

### 1. Vercel 部署（推荐）

#### 方法一：通过 GitHub

1. 将代码推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "Import Project"
4. 选择你的 GitHub 仓库
5. Vercel 自动检测 Next.js 并配置
6. 点击 "Deploy"

#### 方法二：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 部署到生产环境
vercel --prod
```

配置环境变量：

```bash
vercel env add NEXT_PUBLIC_API_URL
vercel env add DATABASE_URL
```

### 2. Docker 部署

#### 创建 Dockerfile

```dockerfile
# 依赖安装阶段
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 运行阶段
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

#### 创建 .dockerignore

```
node_modules
.next
.git
.gitignore
README.md
docs
```

#### 构建和运行

```bash
# 构建镜像
docker build -t nextjs-app .

# 运行容器
docker run -p 3000:3000 nextjs-app

# 使用 Docker Compose
docker-compose up -d
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  nextjs:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
    restart: unless-stopped
```

### 3. 静态导出

适用于不需要服务端功能的应用。

修改 `next.config.ts`：

```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

构建：

```bash
npm run build
```

输出目录 `out/` 可以部署到任何静态托管服务。

部署到静态托管：

```bash
# Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=out

# Vercel (静态)
vercel --prod

# AWS S3
aws s3 sync out/ s3://your-bucket-name --delete

# GitHub Pages
# 需要配置 GitHub Actions
```

### 4. Node.js 服务器部署

#### 使用 PM2

```bash
# 安装 PM2
npm install -g pm2

# 构建项目
npm run build

# 启动应用
pm2 start npm --name "nextjs-app" -- start

# 查看状态
pm2 status

# 查看日志
pm2 logs nextjs-app

# 重启
pm2 restart nextjs-app

# 停止
pm2 stop nextjs-app

# 开机自启
pm2 startup
pm2 save
```

#### PM2 配置文件

创建 `ecosystem.config.js`：

```javascript
module.exports = {
  apps: [{
    name: 'nextjs-app',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: './',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

启动：

```bash
pm2 start ecosystem.config.js
```

### 5. Nginx 反向代理

#### Nginx 配置

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用 HTTPS：

```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d example.com
```

### 6. 云平台部署

#### AWS (EC2 + Elastic Beanstalk)

```bash
# 安装 EB CLI
pip install awsebcli

# 初始化
eb init

# 创建环境
eb create production

# 部署
eb deploy

# 打开应用
eb open
```

#### Azure (App Service)

```bash
# 安装 Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# 登录
az login

# 创建资源组
az group create --name nextjs-rg --location eastus

# 创建 App Service
az webapp up --name nextjs-app --resource-group nextjs-rg
```

#### Google Cloud Platform (Cloud Run)

```bash
# 构建并推送到 Container Registry
gcloud builds submit --tag gcr.io/PROJECT-ID/nextjs-app

# 部署到 Cloud Run
gcloud run deploy nextjs-app \
  --image gcr.io/PROJECT-ID/nextjs-app \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 环境变量管理

### 变量类型

#### 公共变量 (浏览器可访问)

```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_GA_ID=UA-123456789-1
```

使用：

```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

#### 私有变量 (仅服务端)

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/db
API_SECRET_KEY=super-secret-key
STRIPE_SECRET_KEY=sk_test_xxx
```

使用：

```typescript
// 仅在服务端组件或 API 路由中使用
const dbUrl = process.env.DATABASE_URL;
```

### 环境文件

```
.env                # 所有环境
.env.local          # 本地覆盖（不提交）
.env.development    # 开发环境
.env.production     # 生产环境
.env.test           # 测试环境
```

优先级（从高到低）：
1. `.env.$(NODE_ENV).local`
2. `.env.local`
3. `.env.$(NODE_ENV)`
4. `.env`

### 示例配置

创建 `.env.example`：

```env
# 数据库
DATABASE_URL=postgresql://localhost:5432/mydb

# API
NEXT_PUBLIC_API_URL=https://api.example.com
API_SECRET_KEY=your-secret-key

# 第三方服务
NEXT_PUBLIC_GA_ID=UA-XXXXX-X
STRIPE_PUBLIC_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx

# 其他
NODE_ENV=development
```

### 验证环境变量

创建 `src/lib/env.ts`：

```typescript
const requiredEnvVars = [
  'NEXT_PUBLIC_API_URL',
  'DATABASE_URL',
] as const;

export function validateEnv() {
  const missing = requiredEnvVars.filter(
    (key) => !process.env[key]
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}
```

在 `next.config.ts` 中调用：

```typescript
import { validateEnv } from './src/lib/env';

validateEnv();

const nextConfig = {
  // ...
};
```

---

## 性能优化

### 1. 图片优化

```typescript
import Image from 'next/image';

// 本地图片
import logo from './logo.png';

<Image
  src={logo}
  alt="Logo"
  width={500}
  height={300}
  priority // 预加载
/>

// 远程图片
<Image
  src="https://example.com/image.jpg"
  alt="Image"
  width={500}
  height={300}
  loading="lazy" // 懒加载
/>
```

### 2. 字体优化

```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

### 3. 代码分割

```typescript
// 动态导入
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./Component'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // 禁用 SSR
});
```

### 4. 缓存策略

```typescript
// 静态生成 + 重新验证
export const revalidate = 3600; // 1 小时

// 禁用缓存
export const dynamic = 'force-dynamic';

// 强制静态
export const dynamic = 'force-static';
```

### 5. 数据库优化

```typescript
// 使用数据库连接池
// 添加索引
// 使用缓存（Redis）
// 实现分页
```

---

## 常见问题

### Q1: 如何更改默认端口？

```bash
# 方法一：命令行
npm run dev -- -p 3001

# 方法二：package.json
{
  "scripts": {
    "dev": "next dev -p 3001"
  }
}

# 方法三：环境变量
PORT=3001 npm run dev
```

### Q2: 如何处理 CORS？

在 API 路由中：

```typescript
export async function GET(request: Request) {
  return new Response(JSON.stringify({ data: 'Hello' }), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
```

或使用 `next.config.ts`：

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
        ],
      },
    ];
  },
};
```

### Q3: 如何清除缓存？

```bash
# 删除 .next 目录
rm -rf .next

# 清除 npm 缓存
npm cache clean --force

# 重新安装依赖
rm -rf node_modules package-lock.json
npm install
```

### Q4: 生产环境如何查看错误？

使用错误追踪服务：

```bash
npm install @sentry/nextjs
```

配置 `sentry.client.config.ts` 和 `sentry.server.config.ts`。

### Q5: 如何实现 API 限流？

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for');
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Too Many Requests', { status: 429 });
  }

  return Response.json({ data: 'Success' });
}
```

---

## 总结

本手册涵盖了从开发到部署的完整流程。根据你的需求选择合适的部署方案：

- **个人项目/原型**: Vercel（免费且简单）
- **企业应用**: Docker + Kubernetes
- **静态网站**: 静态导出 + CDN
- **自托管**: Node.js + PM2 + Nginx

记住：

1. 始终在生产环境使用环境变量
2. 定期更新依赖
3. 监控应用性能
4. 设置错误追踪
5. 实施 CI/CD

祝你部署顺利！🚀
