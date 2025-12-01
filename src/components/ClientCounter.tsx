'use client';

import { useState } from "react";

/**
 * 客户端计数器示例
 */
export function ClientCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950">
      <p className="text-sm font-semibold text-purple-700 dark:text-purple-200">
        客户端组件（使用 useState）
      </p>
      <div className="mt-2 flex items-center gap-4">
        <button
          onClick={() => setCount((c) => c - 1)}
          className="rounded-lg bg-purple-600 px-3 py-2 text-white hover:bg-purple-700"
        >
          -
        </button>
        <span className="text-2xl font-bold text-purple-900 dark:text-purple-100">
          {count}
        </span>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-lg bg-purple-600 px-3 py-2 text-white hover:bg-purple-700"
        >
          +
        </button>
      </div>
    </div>
  );
}
