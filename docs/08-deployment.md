# 部署指南

本文档详细介绍了将 Next.js 应用部署到各种平台的方法。

## 目录

1. [Vercel 部署](#vercel-部署)
2. [Docker 容器化](#docker-容器化)
3. [静态导出](#静态导出)
4. [自托管服务器](#自托管服务器)
5. [云平台部署](#云平台部署)
6. [CI/CD 配置](#cicd-配置)

---

## Vercel 部署

Vercel 是 Next.js 的创建者，提供最佳的部署体验。

### 通过 Git 集成

1. 推送代码到 GitHub/GitLab/Bitbucket
2. 访问 [vercel.com](https://vercel.com)
3. 导入项目
4. Vercel 自动检测配置
5. 部署完成

### 使用 Vercel CLI

```bash
# 安装
npm i -g vercel

# 部署
vercel

# 生产部署
vercel --prod
```

### 环境变量配置

在 Vercel 控制台：
- Settings → Environment Variables
- 添加所需的环境变量
- 选择环境（Production/Preview/Development）

---

## Docker 容器化

### Dockerfile

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

### 构建和运行

```bash
docker build -t nextjs-app .
docker run -p 3000:3000 nextjs-app
```

---

## 静态导出

适用于纯静态网站。

### 配置

```typescript
// next.config.ts
const nextConfig = {
  output: 'export',
};
```

### 构建

```bash
npm run build
```

输出在 `out/` 目录。

---

## 自托管服务器

### 使用 PM2

```bash
npm install -g pm2
npm run build
pm2 start npm --name "nextjs-app" -- start
pm2 save
```

### Nginx 反向代理

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

---

## 云平台部署

### AWS

```bash
eb init
eb create production
eb deploy
```

### Azure

```bash
az webapp up --name nextjs-app
```

### Google Cloud

```bash
gcloud builds submit
gcloud run deploy
```

---

## CI/CD 配置

### GitHub Actions

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - run: npm test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 最佳实践

1. 使用环境变量管理敏感信息
2. 启用 HTTPS
3. 配置 CDN
4. 实施监控和日志
5. 设置自动备份
6. 使用 CI/CD 自动化部署

选择适合你项目的部署方案，享受 Next.js 的强大功能！🚀
