export type DocMeta = {
  slug: string;
  title: string;
  description: string;
  file: string;
};

export const docsMeta: DocMeta[] = [
  {
    slug: "installation",
    title: "01. 安装和设置指南",
    description: "从零开始搭建 Next.js 开发环境",
    file: "01-installation.md",
  },
  {
    slug: "routing",
    title: "02. 路由系统详解",
    description: "深入了解 Next.js App Router",
    file: "02-routing.md",
  },
  {
    slug: "data-fetching",
    title: "03. 数据获取策略",
    description: "掌握 SSG、SSR、ISR 等数据获取模式",
    file: "03-data-fetching.md",
  },
  {
    slug: "api-routes",
    title: "04. API 路由开发",
    description: "创建和管理 API 端点",
    file: "04-api-routes.md",
  },
  {
    slug: "components",
    title: "05. 组件开发指南",
    description: "服务端组件与客户端组件",
    file: "05-components.md",
  },
  {
    slug: "styling",
    title: "06. 样式和主题",
    description: "Tailwind CSS、CSS Modules 等样式方案",
    file: "06-styling.md",
  },
  {
    slug: "optimization",
    title: "07. 性能优化",
    description: "图片、字体、代码分割等优化技术",
    file: "07-optimization.md",
  },
  {
    slug: "deployment",
    title: "08. 部署指南",
    description: "多种部署方案详解",
    file: "08-deployment.md",
  },
  {
    slug: "best-practices",
    title: "09. 最佳实践",
    description: "Next.js 开发最佳实践和代码规范",
    file: "09-best-practices.md",
  },
  {
    slug: "faq",
    title: "10. 常见问题",
    description: "FAQ 和疑难解答",
    file: "10-faq.md",
  },
  {
    slug: "usage",
    title: "附录：使用与部署手册",
    description: "包含构建、部署、环境变量等详细说明",
    file: "usage-guide.md",
  },
];

export function getDocMeta(slug: string) {
  return docsMeta.find((doc) => doc.slug === slug);
}
