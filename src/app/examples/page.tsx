import Link from "next/link";

export default function ExamplesPage() {
  const examples = [
    {
      title: "动态路由示例",
      description: "查看动态路由如何工作",
      href: "/routing/dynamic-example/test-123",
      category: "路由",
    },
    {
      title: "SSR 数据获取",
      description: "服务端渲染实时数据",
      href: "/data-fetching/ssr-example",
      category: "数据获取",
    },
    {
      title: "ISR 增量再生成",
      description: "定时重新验证缓存",
      href: "/data-fetching/isr-example",
      category: "数据获取",
    },
    {
      title: "流式渲染",
      description: "使用 Suspense 实现流式加载",
      href: "/data-fetching/streaming-example",
      category: "数据获取",
    },
    {
      title: "API 端点测试",
      description: "测试 REST API",
      href: "/api/users",
      category: "API",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            💡 实战示例
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            通过实际可运行的示例深入理解 Next.js 的各项功能。
          </p>
        </header>

        <div className="grid gap-6">
          {examples.map((example) => (
            <Link
              key={example.href}
              href={example.href}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-2">
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                      {example.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {example.title}
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {example.description}
                  </p>
                </div>
                <span className="text-blue-600 opacity-0 transition group-hover:opacity-100 dark:text-blue-400">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-8 dark:border-blue-900 dark:bg-blue-950">
          <h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
            🧪 如何使用示例
          </h2>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li>• 点击任意示例卡片查看实际效果</li>
            <li>• 查看源代码了解实现细节</li>
            <li>• 所有代码都有详细的中文注释</li>
            <li>• 可以复制代码到自己的项目中使用</li>
          </ul>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
