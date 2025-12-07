import { Suspense } from "react";
import Link from "next/link";

async function FastComponent() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return (
    <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100">
      <h3 className="text-xl font-semibold">快速数据</h3>
      <p className="mt-2">该组件仅延迟 200ms，很快就能看到内容。</p>
    </div>
  );
}

async function SlowComponent() {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return (
    <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 text-purple-900 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-100">
      <h3 className="text-xl font-semibold">慢速数据</h3>
      <p className="mt-2">该组件延迟 2.5 秒，演示流式渲染如何分块加载内容。</p>
    </div>
  );
}

export default function StreamingExamplePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              流式渲染示例
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            React Suspense + Streaming
          </h1>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            下方的两个组件使用了 Suspense。快速组件会立即渲染，慢速组件在准备好后再插入。
          </p>

          <div className="space-y-6">
            <Suspense fallback={<div className="rounded-lg border border-dashed border-green-200 p-4 text-green-800 dark:border-green-800 dark:text-green-200">快速数据加载中...</div>}>
              <FastComponent />
            </Suspense>

            <Suspense fallback={<div className="rounded-lg border border-dashed border-purple-200 p-4 text-purple-800 dark:border-purple-800 dark:text-purple-200">慢速数据加载中...</div>}>
              <SlowComponent />
            </Suspense>
          </div>

          <div className="mt-8 flex gap-4">
            <Link href="/data-fetching" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
              ← 返回数据获取页面
            </Link>
            <Link href="/routing" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
              查看路由示例 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
