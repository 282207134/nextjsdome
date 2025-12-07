import Link from "next/link";
import { Card } from "@/components/Card";

/**
 * 首页组件
 * 展示 Next.js 学习项目的主要功能模块
 */
export default function Home() {
  // 定义学习模块列表
  const modules = [
    {
      title: "路由系统 (Routing)",
      description: "学习 Next.js 的文件系统路由、动态路由、路由组和平行路由",
      href: "/routing",
      icon: "🗺️",
    },
    {
      title: "数据获取 (Data Fetching)",
      description: "探索服务端渲染(SSR)、静态生成(SSG)、增量静态再生成(ISR)等数据获取方式",
      href: "/data-fetching",
      icon: "📊",
    },
    {
      title: "API 路由 (API Routes)",
      description: "创建 RESTful API 端点，处理各种 HTTP 请求方法",
      href: "/api-routes",
      icon: "🔌",
    },
    {
      title: "服务端组件 (Server Components)",
      description: "理解服务端组件和客户端组件的区别及使用场景",
      href: "/server-components",
      icon: "⚙️",
    },
    {
      title: "表单与数据处理 (Forms & Actions)",
      description: "使用 Server Actions 处理表单提交和数据变更",
      href: "/forms",
      icon: "📝",
    },
    {
      title: "中间件 (Middleware)",
      description: "在请求完成之前运行代码，实现认证、重定向等功能",
      href: "/middleware-demo",
      icon: "🔐",
    },
    {
      title: "优化技术 (Optimization)",
      description: "图片优化、字体优化、脚本优化等性能优化技术",
      href: "/optimization",
      icon: "⚡",
    },
    {
      title: "样式方案 (Styling)",
      description: "CSS Modules、Tailwind CSS、CSS-in-JS 等样式解决方案",
      href: "/styling",
      icon: "🎨",
    },
    {
      title: "国际化 (i18n)",
      description: "实现多语言支持和国际化功能",
      href: "/i18n",
      icon: "🌍",
    },
    {
      title: "错误处理 (Error Handling)",
      description: "优雅地处理错误和加载状态",
      href: "/error-handling",
      icon: "🚨",
    },
    {
      title: "元数据与SEO (Metadata & SEO)",
      description: "配置页面元数据，优化搜索引擎排名",
      href: "/metadata",
      icon: "🔍",
    },
    {
      title: "环境变量 (Environment Variables)",
      description: "管理和使用环境变量配置",
      href: "/env-variables",
      icon: "🔧",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Next.js 完整学习项目
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          这是一个全面的 Next.js 学习项目，涵盖了 Next.js 框架的所有核心特性和最佳实践。
          每个模块都包含详细的示例代码和中文注释。
        </p>
      </div>

      {/* 快速开始指南 */}
      <div className="mb-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900 dark:text-blue-200">
          🚀 快速开始
        </h2>
        <ul className="space-y-2 text-blue-800 dark:text-blue-300">
          <li>• 点击下方任意模块卡片开始学习</li>
          <li>• 每个模块都包含实际可运行的代码示例</li>
          <li>• 查看 <Link href="/docs" className="underline font-semibold">完整文档</Link> 了解更多细节</li>
          <li>• 所有代码都有详细的中文注释说明</li>
        </ul>
      </div>

      {/* 学习模块网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Card
            key={module.href}
            title={module.title}
            description={module.description}
            href={module.href}
            icon={module.icon}
          />
        ))}
      </div>

      {/* 技术栈说明 */}
      <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          📦 技术栈
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700 dark:text-gray-300">
          <div>
            <strong>框架:</strong> Next.js 15+
          </div>
          <div>
            <strong>语言:</strong> TypeScript
          </div>
          <div>
            <strong>样式:</strong> Tailwind CSS
          </div>
          <div>
            <strong>包管理:</strong> npm
          </div>
        </div>
      </div>
    </div>
  );
}
