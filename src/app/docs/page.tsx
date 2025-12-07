import Link from "next/link";
import { docsMeta } from "@/lib/docs";

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            📚 完整文档
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            深入学习 Next.js 的各个方面，从安装到部署的完整指南。
          </p>
        </header>

        <div className="grid gap-6">
          {docsMeta.map((doc, index) => (
            <div
              key={doc.slug}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {doc.title}
                    </h2>
                  </div>
                  <p className="ml-11 text-gray-600 dark:text-gray-400">
                    {doc.description}
                  </p>
                </div>
                <Link
                  href={`/docs/${doc.slug}`}
                  className="ml-4 inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  查看 →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-8 dark:border-blue-900 dark:bg-blue-950">
          <h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
            📝 文档说明
          </h2>
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            所有文档都以 Markdown 格式保存在 <code className="rounded bg-blue-100 px-2 py-1 dark:bg-blue-900">docs/</code> 目录中。
            你可以在代码编辑器中直接阅读，也可以在浏览器中查看渲染后的效果。
          </p>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li>• 每个文档都包含详细的代码示例</li>
            <li>• 提供最佳实践和注意事项</li>
            <li>• 附带常用命令和配置说明</li>
            <li>• 包含常见问题与解决方案</li>
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
