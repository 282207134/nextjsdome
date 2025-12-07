import Link from "next/link";

/**
 * 学习模块卡片组件
 * @param title 模块标题
 * @param description 模块描述
 * @param href 跳转链接
 * @param icon 模块图标
 */
export function Card({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="flex items-center justify-between">
        <div className="text-4xl" aria-hidden>
          {icon}
        </div>
        <span className="text-sm font-medium text-blue-600 opacity-0 transition group-hover:opacity-100 dark:text-blue-400">
          查看详情 →
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </Link>
  );
}
