# 安装和设置指南

本指南将帮助你从零开始设置 Next.js 学习项目。

## 前置要求

### 1. Node.js

确保你的系统安装了 Node.js 18.17 或更高版本。

检查 Node.js 版本：

```bash
node --version
```

如果未安装或版本过低，请访问 [nodejs.org](https://nodejs.org/) 下载最新的 LTS 版本。

### 2. 包管理器

Next.js 支持多种包管理器：

- **npm**: Node.js 自带
- **yarn**: `npm install -g yarn`
- **pnpm**: `npm install -g pnpm`
- **bun**: 访问 [bun.sh](https://bun.sh/) 安装

### 3. 代码编辑器

推荐使用 [Visual Studio Code](https://code.visualstudio.com/)，并安装以下扩展：

- **ESLint**: 代码检查
- **Prettier**: 代码格式化
- **Tailwind CSS IntelliSense**: Tailwind CSS 自动补全
- **TypeScript**: TypeScript 支持（VS Code 内置）

## 快速安装

### 方法一：克隆本项目

如果你已经有本项目的代码：

```bash
# 克隆项目
git clone <repository-url>
cd nextjs-learning-project

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 方法二：从零创建

如果你想从头开始创建项目：

```bash
# 创建新的 Next.js 项目
npx create-next-app@latest my-nextjs-project

# 进入项目目录
cd my-nextjs-project

# 启动开发服务器
npm run dev
```

创建过程中的选项：

- **TypeScript**: Yes ✅
- **ESLint**: Yes ✅
- **Tailwind CSS**: Yes ✅
- **src/ directory**: Yes ✅
- **App Router**: Yes ✅
- **Import alias**: @/* ✅
- **React Compiler**: No

## 项目结构

安装完成后，你会看到以下目录结构：

```
nextjs-learning-project/
├── .next/                # 构建输出（自动生成，不要修改）
├── node_modules/         # 依赖包
├── public/               # 静态资源
│   ├── next.svg
│   └── vercel.svg
├── src/
│   └── app/              # App Router 目录
│       ├── globals.css   # 全局样式
│       ├── layout.tsx    # 根布局
│       └── page.tsx      # 首页
├── .gitignore            # Git 忽略文件
├── eslint.config.mjs     # ESLint 配置
├── next.config.ts        # Next.js 配置
├── next-env.d.ts         # Next.js 类型声明
├── package.json          # 项目依赖和脚本
├── postcss.config.mjs    # PostCSS 配置
├── README.md             # 项目说明
└── tsconfig.json         # TypeScript 配置
```

## 开发服务器

启动开发服务器：

```bash
npm run dev
```

默认端口是 3000，访问 [http://localhost:3000](http://localhost:3000)。

### 更改端口

如果 3000 端口被占用：

```bash
npm run dev -- -p 3001
```

或在 `package.json` 中修改：

```json
{
  "scripts": {
    "dev": "next dev -p 3001"
  }
}
```

## 环境变量

创建环境变量文件：

### `.env.local` (开发环境)

```env
# 数据库连接
DATABASE_URL=postgresql://localhost:5432/mydb

# API 密钥
NEXT_PUBLIC_API_URL=https://api.example.com
API_SECRET_KEY=your-secret-key

# 注意：NEXT_PUBLIC_ 前缀的变量会暴露给浏览器
```

### `.env.production` (生产环境)

```env
DATABASE_URL=postgresql://production-db-url
NEXT_PUBLIC_API_URL=https://api.production.com
API_SECRET_KEY=production-secret
```

### 环境变量优先级

1. `.env.local`
2. `.env.development` (仅开发环境)
3. `.env.production` (仅生产环境)
4. `.env`

## 常用命令

### 开发

```bash
# 启动开发服务器
npm run dev

# 启动开发服务器（Turbopack，更快的热更新）
npm run dev --turbo
```

### 构建

```bash
# 构建生产版本
npm run build

# 分析构建产物
npm run build -- --profile
```

### 生产

```bash
# 启动生产服务器
npm run start
```

### 代码检查

```bash
# 运行 ESLint
npm run lint

# 自动修复 ESLint 问题
npm run lint -- --fix
```

### 类型检查

```bash
# 运行 TypeScript 类型检查
npx tsc --noEmit
```

## 常见问题

### 1. 端口被占用

```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### 2. 清除缓存

```bash
# 删除 .next 目录
rm -rf .next

# 删除 node_modules 并重新安装
rm -rf node_modules
npm install
```

### 3. 依赖问题

```bash
# 清除 npm 缓存
npm cache clean --force

# 删除 package-lock.json 并重新安装
rm package-lock.json
npm install
```

### 4. TypeScript 错误

确保 `tsconfig.json` 配置正确：

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

## 下一步

安装完成后，建议：

1. 阅读 [路由系统详解](./02-routing.md)
2. 查看 [数据获取策略](./03-data-fetching.md)
3. 探索项目中的示例代码
4. 访问首页查看所有学习模块

祝你学习愉快！🚀
