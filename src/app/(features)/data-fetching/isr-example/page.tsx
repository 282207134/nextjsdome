import Link from "next/link";
import { getCourses } from "@/lib/courses";

/**
 * ISR 示例页面
 * 使用 revalidate 选项实现增量静态再生成
 */
export const revalidate = 30; // 每 30 秒重新生成

export default async function ISRExamplePage() {
  const courses = await getCourses("ISR");
  const generatedAt = new Date().toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6">
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800 dark:bg-green-900 dark:text-green-200">
              ISR 示例
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            增量静态再生成 (ISR)
          </h1>

          <div className="rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20 mb-8">
            <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-200 mb-3">
              当前页面生成时间
            </h2>
            <p className="text-2xl font-mono text-yellow-800 dark:text-yellow-100">
              {generatedAt}
            </p>
            <p className="mt-3 text-yellow-800 dark:text-yellow-100">
              该页面会在首次请求时生成，此后最多 30 秒内继续复用缓存。
              超过 30 秒后，下一次访问将触发后台再生成。
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="rounded-lg border border-dashed border-gray-300 p-4 text-gray-800 dark:border-gray-700 dark:text-gray-200"
              >
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  课程 #{course.id}
                </p>
                <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                  {course.title}
                </h3>
                <p className="mt-1 text-sm">难度：{course.level}</p>
                <p className="mt-1 text-sm">模式：{course.type}</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  最后更新：{course.updatedAt}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              🧠 ISR 心智模型
            </h3>
            <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-decimal list-inside">
              <li>首次访问生成页面并缓存</li>
              <li>缓存会在 30 秒内复用</li>
              <li>超过 30 秒的下一次访问会触发“后台再生成”</li>
              <li>生成完成后自动替换旧页面</li>
            </ol>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              href="/data-fetching"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              ← 返回数据获取页面
            </Link>
            <Link
              href="/data-fetching/streaming-example"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              查看流式渲染示例 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
