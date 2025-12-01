import type { ReactNode } from "react";

/**
 * FeatureLayout 用于构建每个学习页面的外层结构
 */
export function FeatureLayout({
  title,
  description,
  docLink,
  children,
}: {
  title: string;
  description: string;
  docLink: string;
  children: ReactNode;
}) {
  return (
    <section className="container mx-auto px-4 py-12">
      <header className="mb-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
          Next.js 核心能力
        </p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{description}</p>
        <a
          href={docLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          查看官方文档 →
        </a>
      </header>
      <div className="space-y-8">{children}</div>
    </section>
  );
}

/**
 * FeatureSection 用于展示某一部分的文字和示例
 */
export function FeatureSection({
  title,
  description,
  children,
}: {
  title: string;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-3 text-gray-600 dark:text-gray-300">{description}</div>
      {children && <div className="mt-6 space-y-4">{children}</div>}
    </article>
  );
}

/**
 * CodeBlock 统一处理代码展示样式
 */
export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-gray-900 p-4 text-sm text-gray-100">
      <code>{code}</code>
    </pre>
  );
}
