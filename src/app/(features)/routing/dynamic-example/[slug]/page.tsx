import Link from "next/link";

/**
 * 动态路由示例页面
 * 展示如何使用动态参数
 */
export default function DynamicRoutePage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              动态路由示例
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            动态路由参数示例
          </h1>
          
          <div className="rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
              URL 参数值:
            </p>
            <code className="block text-2xl font-mono text-blue-600 dark:text-blue-400">
              {params.slug}
            </code>
          </div>

          <div className="mt-6 space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              这个页面位于 <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-800">
                src/app/(features)/routing/dynamic-example/[slug]/page.tsx
              </code>
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              方括号 <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-800">[slug]</code> 
              表示这是一个动态路由段，可以匹配任意值。
            </p>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                试试其他参数：
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/routing/dynamic-example/hello"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  hello
                </Link>
                <Link
                  href="/routing/dynamic-example/world"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  world
                </Link>
                <Link
                  href="/routing/dynamic-example/nextjs-is-awesome"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  nextjs-is-awesome
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/routing"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              ← 返回路由学习页面
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 生成静态参数（可选）
 * 用于静态生成时预渲染特定的动态路由
 */
export async function generateStaticParams() {
  // 返回要预渲染的参数列表
  return [
    { slug: 'test-123' },
    { slug: 'hello' },
    { slug: 'world' },
  ];
}
