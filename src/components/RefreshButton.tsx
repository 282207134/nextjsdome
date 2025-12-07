'use client';

/**
 * 通用刷新按钮，用于示例页面
 */
export function RefreshButton({ label = "刷新页面" }: { label?: string }) {
  return (
    <button
      onClick={() => window.location.reload()}
      className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
    >
      {label}
    </button>
  );
}
