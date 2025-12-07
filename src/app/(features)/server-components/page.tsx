import {
  FeatureLayout,
  FeatureSection,
  CodeBlock,
} from "@/components/FeatureLayout";
import { ClientCounter } from "@/components/ClientCounter";

/**
 * 服务端组件示例数据获取
 */
async function getServerData() {
  // 模拟数据获取
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    message: "这段数据在服务器上获取",
    timestamp: new Date().toISOString(),
  };
}

/**
 * 服务端组件学习页面
 */
export default async function ServerComponentsPage() {
  const serverData = await getServerData();

  return (
    <FeatureLayout
      title="服务端组件 (Server Components)"
      description="React Server Components 是 Next.js 13+ 的核心特性，默认所有组件都是服务端组件，可以直接访问后端资源。"
      docLink="https://nextjs.org/docs/app/building-your-application/rendering/server-components"
    >
      {/* 服务端组件 vs 客户端组件 */}
      <FeatureSection
        title="1. 服务端组件 vs 客户端组件"
        description="理解两种组件类型的区别和使用场景。"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">
              ⚙️ 服务端组件（默认）
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <li>✅ 默认组件类型</li>
              <li>✅ 可以直接访问数据库</li>
              <li>✅ 可以使用服务端 API</li>
              <li>✅ 减少客户端 JavaScript</li>
              <li>✅ 更好的 SEO</li>
              <li>❌ 不能使用 useState/useEffect</li>
              <li>❌ 不能使用浏览器 API</li>
            </ul>
          </div>

          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100">
              💻 客户端组件
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-purple-800 dark:text-purple-200">
              <li>✅ 使用 &apos;use client&apos; 声明</li>
              <li>✅ 可以使用 React Hooks</li>
              <li>✅ 可以使用浏览器 API</li>
              <li>✅ 处理用户交互</li>
              <li>✅ 实现状态管理</li>
              <li>❌ 增加包体积</li>
              <li>❌ 不能直接访问后端</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            当前页面从服务器获取的数据：
          </p>
          <code className="mt-2 block text-gray-900 dark:text-white">
            {JSON.stringify(serverData, null, 2)}
          </code>
        </div>

        <div className="mt-4">
          <ClientCounter />
        </div>
      </FeatureSection>

      {/* 服务端组件示例 */}
      <FeatureSection
        title="2. 服务端组件示例"
        description="服务端组件可以是 async 函数，直接 await 数据。"
      >
        <CodeBlock
          code={`// app/page.tsx (默认是服务端组件)
async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}

export default async function HomePage() {
  // 直接在组件内 await 数据
  const posts = await getPosts();
  
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}

// 优点：
// 1. 代码更简洁
// 2. 数据在服务器获取，更安全
// 3. 减少客户端 JavaScript
// 4. 更好的 SEO`}
        />
      </FeatureSection>

      {/* 客户端组件示例 */}
      <FeatureSection
        title="3. 客户端组件示例"
        description="需要交互性时使用 'use client' 指令。"
      >
        <CodeBlock
          code={`'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
    </div>
  );
}

// 使用场景：
// 1. 需要使用 useState、useEffect 等 Hooks
// 2. 需要处理用户交互（onClick、onChange 等）
// 3. 需要使用浏览器 API（localStorage、window 等）
// 4. 需要使用第三方客户端库`}
        />
      </FeatureSection>

      {/* 组件组合模式 */}
      <FeatureSection
        title="4. 组件组合模式"
        description="在服务端组件中嵌套客户端组件。"
      >
        <CodeBlock
          code={`// app/page.tsx (服务端组件)
import ClientComponent from './ClientComponent';

async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  
  return (
    <div>
      <h1>服务端内容</h1>
      <p>服务器时间: {new Date().toISOString()}</p>
      
      {/* 嵌套客户端组件 */}
      <ClientComponent initialData={data} />
    </div>
  );
}

// components/ClientComponent.tsx
'use client';

import { useState } from 'react';

export default function ClientComponent({ initialData }) {
  const [data, setData] = useState(initialData);
  
  return (
    <div>
      <button onClick={() => setData('更新了！')}>
        更新数据
      </button>
      <p>{data}</p>
    </div>
  );
}`}
        />
      </FeatureSection>

      {/* 何时使用服务端组件 */}
      <FeatureSection
        title="5. 何时使用服务端组件"
        description="大多数情况下应该使用服务端组件。"
      >
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
            ✅ 适合使用服务端组件的场景：
          </h4>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li>• 获取数据</li>
            <li>• 直接访问后端资源（数据库、文件系统等）</li>
            <li>• 保护敏感信息（API 密钥、访问令牌等）</li>
            <li>• 减少客户端 JavaScript</li>
            <li>• 提升 SEO</li>
            <li>• 渲染静态内容</li>
          </ul>
        </div>
      </FeatureSection>

      {/* 何时使用客户端组件 */}
      <FeatureSection
        title="6. 何时使用客户端组件"
        description="需要交互性和浏览器 API 时使用客户端组件。"
      >
        <div className="rounded-lg border border-purple-200 bg-purple-50 p-6 dark:border-purple-800 dark:bg-purple-950">
          <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">
            ✅ 适合使用客户端组件的场景：
          </h4>
          <ul className="space-y-2 text-purple-800 dark:text-purple-200">
            <li>• 添加事件监听器（onClick、onChange 等）</li>
            <li>• 使用 State 和生命周期（useState、useEffect 等）</li>
            <li>• 使用浏览器 API（localStorage、geolocation 等）</li>
            <li>• 使用自定义 Hooks</li>
            <li>• 使用依赖浏览器的第三方库</li>
          </ul>
        </div>
      </FeatureSection>

      {/* 性能对比 */}
      <FeatureSection
        title="7. 性能对比"
        description="服务端组件可以显著减少客户端 JavaScript 包大小。"
      >
        <div className="overflow-x-auto">
          <table className="w-full rounded-lg border border-gray-200 dark:border-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
                  指标
                </th>
                <th className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
                  服务端组件
                </th>
                <th className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
                  客户端组件
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
              <tr>
                <td className="px-4 py-3 font-medium">JavaScript 包大小</td>
                <td className="px-4 py-3 text-green-600">更小 ✅</td>
                <td className="px-4 py-3 text-red-600">更大 ❌</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">首次加载速度</td>
                <td className="px-4 py-3 text-green-600">更快 ✅</td>
                <td className="px-4 py-3 text-red-600">较慢 ❌</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">SEO</td>
                <td className="px-4 py-3 text-green-600">更好 ✅</td>
                <td className="px-4 py-3 text-yellow-600">一般 ⚠️</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">交互性</td>
                <td className="px-4 py-3 text-red-600">无 ❌</td>
                <td className="px-4 py-3 text-green-600">有 ✅</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">数据安全</td>
                <td className="px-4 py-3 text-green-600">更安全 ✅</td>
                <td className="px-4 py-3 text-red-600">暴露给浏览器 ❌</td>
              </tr>
            </tbody>
          </table>
        </div>
      </FeatureSection>

      {/* 最佳实践 */}
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950">
        <h3 className="text-xl font-semibold text-green-900 dark:text-green-100">
          💡 最佳实践
        </h3>
        <ul className="mt-4 space-y-2 text-green-800 dark:text-green-200">
          <li>• 默认使用服务端组件</li>
          <li>• 仅在需要交互时使用客户端组件</li>
          <li>• 将客户端组件放在组件树的叶子节点</li>
          <li>• 通过 props 将服务端数据传递给客户端组件</li>
          <li>• 避免在客户端组件中直接导入大型依赖</li>
          <li>• 使用 React Context 在客户端组件间共享状态</li>
        </ul>
      </div>
    </FeatureLayout>
  );
}
