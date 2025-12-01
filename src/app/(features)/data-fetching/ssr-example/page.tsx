import Link from "next/link";
import { RefreshButton } from "@/components/RefreshButton";

/**
 * 服务端渲染 (SSR) 示例
 * 每次请求都会重新获取最新数据
 */

// 强制该页面为动态渲染
export const dynamic = "force-dynamic";

async function getCurrentTime() {
  // 模拟 API 调用
  await new Promise((resolve) => setTimeout(resolve, 100));
  return new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
}

export default async function SSRExamplePage() {
  const currentTime = await getCurrentTime();
  const requestSignature = Date.now() % 1000;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6">
            <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              SSR 示例
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            服务端渲染 (SSR) 示例
          </h1>

          <div className="space-y-6">
            <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-200 mb-3">
                实时数据
              </h2>
              <p className="text-blue-800 dark:text-blue-300 mb-4">
                下面的数据每次刷新页面都会更新，因为使用了 SSR：
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    服务器时间
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {currentTime}
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    请求标识
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                    #{requestSignature}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                📝 工作原理
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• 使用 <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-800">
                  export const dynamic = &quot;force-dynamic&quot;
                </code> 强制 SSR</li>
                <li>• 每次请求都在服务器上执行页面组件</li>
                <li>• 数据在服务器上获取后发送给客户端</li>
                <li>• 适合需要实时数据的场景</li>
                <li>• 页面不会被缓存，每次都是最新的</li>
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🔄 尝试刷新页面
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                刷新浏览器页面，你会看到时间和请求标识都会更新。这证明了每次请求都会重新渲染页面。
              </p>
              <RefreshButton />
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              href="/data-fetching"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              ← 返回数据获取页面
            </Link>
            <Link
              href="/data-fetching/isr-example"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              查看 ISR 示例 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
