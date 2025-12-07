import {
  FeatureLayout,
  FeatureSection,
  CodeBlock,
} from "@/components/FeatureLayout";
import { getCourses } from "@/lib/courses";
import Link from "next/link";

/**
 * 数据获取学习页面
 * 展示 Next.js 的多种数据获取模式
 */
export default async function DataFetchingPage() {
  // 服务端组件可以直接 await 数据
  const courses = await getCourses("SSG");

  return (
    <FeatureLayout
      title="数据获取 (Data Fetching)"
      description="Next.js 提供了灵活的数据获取方式，包括静态生成(SSG)、服务端渲染(SSR)、增量静态再生成(ISR)等多种模式。"
      docLink="https://nextjs.org/docs/app/building-your-application/data-fetching"
    >
      {/* 服务端组件数据获取 */}
      <FeatureSection
        title="1. 服务端组件数据获取（默认）"
        description={
          <>
            <p>
              在 App Router 中，所有组件默认都是服务端组件。你可以在组件内直接
              使用 async/await 获取数据。
            </p>
            <p className="mt-2 font-semibold text-blue-600 dark:text-blue-400">
              下面展示的课程数据就是通过服务端获取的：
            </p>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course.id}
              className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {course.title}
              </h3>
              <div className="mt-2 flex gap-2 text-sm">
                <span className="rounded bg-blue-100 px-2 py-1 dark:bg-blue-900">
                  {course.level}
                </span>
                <span className="rounded bg-green-100 px-2 py-1 dark:bg-green-900">
                  {course.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        <CodeBlock
          code={`// app/page.tsx (服务端组件)
async function getProducts() {
  const res = await fetch('https://api.example.com/products');
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}`}
        />
      </FeatureSection>

      {/* 静态生成 (SSG) */}
      <FeatureSection
        title="2. 静态生成 (SSG - Static Site Generation)"
        description="在构建时获取数据并生成静态 HTML，适合内容不常变化的页面。"
      >
        <CodeBlock
          code={`// 默认情况下，fetch 会自动缓存
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    // 默认：{ cache: 'force-cache' }
  });
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>;
}

// 也可以显式设置缓存策略
async function getStaticData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'force-cache' // 强制缓存（默认行为）
  });
  return res.json();
}`}
        />
      </FeatureSection>

      {/* 服务端渲染 (SSR) */}
      <FeatureSection
        title="3. 服务端渲染 (SSR - Server-Side Rendering)"
        description="每次请求时都在服务器上获取最新数据，适合需要实时数据的页面。"
      >
        <CodeBlock
          code={`// 禁用缓存，每次请求都重新获取
async function getDynamicData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store' // 不缓存，每次都重新获取
  });
  return res.json();
}

export default async function Page() {
  const data = await getDynamicData();
  return <div>最新数据: {data.value}</div>;
}

// 或者使用 dynamic 强制整个页面为动态
export const dynamic = 'force-dynamic';`}
        />
        <Link
          href="/data-fetching/ssr-example"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          查看 SSR 示例 →
        </Link>
      </FeatureSection>

      {/* 增量静态再生成 (ISR) */}
      <FeatureSection
        title="4. 增量静态再生成 (ISR - Incremental Static Regeneration)"
        description="静态生成页面，但定期重新验证和更新，兼顾性能和实时性。"
      >
        <CodeBlock
          code={`// 设置重新验证时间（秒）
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 } // 每 60 秒重新验证
  });
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.content}</div>;
}

// 或者在页面级别设置
export const revalidate = 60; // 60 秒

// 按需重新验证（在 API 路由或 Server Action 中）
import { revalidatePath, revalidateTag } from 'next/cache';

// 重新验证特定路径
revalidatePath('/blog/post-1');

// 重新验证带有特定标签的所有数据
revalidateTag('posts');`}
        />
        <Link
          href="/data-fetching/isr-example"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          查看 ISR 示例 →
        </Link>
      </FeatureSection>

      {/* 并行数据获取 */}
      <FeatureSection
        title="5. 并行数据获取"
        description="使用 Promise.all() 并行获取多个数据源，提高性能。"
      >
        <CodeBlock
          code={`async function getData() {
  // 并行获取多个数据源
  const [user, posts, comments] = await Promise.all([
    fetch('https://api.example.com/user').then(res => res.json()),
    fetch('https://api.example.com/posts').then(res => res.json()),
    fetch('https://api.example.com/comments').then(res => res.json()),
  ]);

  return { user, posts, comments };
}

export default async function Page() {
  const { user, posts, comments } = await getData();
  
  return (
    <div>
      <h1>{user.name}</h1>
      <div>文章数: {posts.length}</div>
      <div>评论数: {comments.length}</div>
    </div>
  );
}`}
        />
      </FeatureSection>

      {/* 流式渲染和 Suspense */}
      <FeatureSection
        title="6. 流式渲染 (Streaming) 和 Suspense"
        description="使用 Suspense 边界实现组件级的流式渲染，提升用户体验。"
      >
        <CodeBlock
          code={`import { Suspense } from 'react';

// 慢速数据组件
async function SlowData() {
  const data = await fetch('https://slow-api.example.com/data', {
    cache: 'no-store'
  });
  return <div>{data.content}</div>;
}

// 快速数据组件
async function FastData() {
  const data = await fetch('https://fast-api.example.com/data');
  return <div>{data.content}</div>;
}

export default function Page() {
  return (
    <div>
      {/* 快速内容立即显示 */}
      <Suspense fallback={<div>加载快速数据...</div>}>
        <FastData />
      </Suspense>
      
      {/* 慢速内容独立加载，不阻塞页面 */}
      <Suspense fallback={<div>加载慢速数据...</div>}>
        <SlowData />
      </Suspense>
    </div>
  );
}`}
        />
        <Link
          href="/data-fetching/streaming-example"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          查看流式渲染示例 →
        </Link>
      </FeatureSection>

      {/* 数据缓存标签 */}
      <FeatureSection
        title="7. 数据缓存标签 (Cache Tags)"
        description="为数据请求添加标签，实现精确的按需重新验证。"
      >
        <CodeBlock
          code={`// 添加缓存标签
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { 
      revalidate: 3600,
      tags: ['posts'] // 添加标签
    }
  });
  return res.json();
}

async function getPost(id: string) {
  const res = await fetch(\`https://api.example.com/posts/\${id}\`, {
    next: { 
      tags: ['posts', \`post-\${id}\`] // 可以添加多个标签
    }
  });
  return res.json();
}

// 在 Server Action 或 API 路由中按标签重新验证
import { revalidateTag } from 'next/cache';

export async function createPost(data: FormData) {
  // 创建文章...
  
  // 重新验证所有带 'posts' 标签的缓存
  revalidateTag('posts');
}`}
        />
      </FeatureSection>

      {/* 客户端数据获取 */}
      <FeatureSection
        title="8. 客户端数据获取"
        description="在客户端组件中使用 useEffect 或 React Query 等库获取数据。"
      >
        <CodeBlock
          code={`'use client';

import { useState, useEffect } from 'react';

export default function ClientComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>加载中...</div>;
  return <div>{data.content}</div>;
}

// 推荐：使用 SWR 或 React Query
import useSWR from 'swr';

export default function ClientComponent() {
  const { data, error, isLoading } = useSWR(
    'https://api.example.com/data',
    fetcher
  );

  if (error) return <div>加载失败</div>;
  if (isLoading) return <div>加载中...</div>;
  return <div>{data.content}</div>;
}`}
        />
      </FeatureSection>

      {/* 数据获取模式对比 */}
      <div className="overflow-x-auto">
        <table className="w-full rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
                模式
              </th>
              <th className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
                渲染时机
              </th>
              <th className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
                适用场景
              </th>
              <th className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
                配置
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-3 font-semibold">SSG</td>
              <td className="px-4 py-3">构建时</td>
              <td className="px-4 py-3">静态内容、博客文章</td>
              <td className="px-4 py-3">
                <code className="text-sm">cache: &apos;force-cache&apos;</code>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">SSR</td>
              <td className="px-4 py-3">每次请求</td>
              <td className="px-4 py-3">实时数据、个性化内容</td>
              <td className="px-4 py-3">
                <code className="text-sm">cache: &apos;no-store&apos;</code>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">ISR</td>
              <td className="px-4 py-3">定期重新验证</td>
              <td className="px-4 py-3">定期更新的内容</td>
              <td className="px-4 py-3">
                <code className="text-sm">revalidate: 60</code>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">CSR</td>
              <td className="px-4 py-3">客户端</td>
              <td className="px-4 py-3">交互式数据、用户特定</td>
              <td className="px-4 py-3">
                <code className="text-sm">useEffect / SWR</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 最佳实践 */}
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950">
        <h3 className="text-xl font-semibold text-green-900 dark:text-green-100">
          💡 最佳实践
        </h3>
        <ul className="mt-4 space-y-2 text-green-800 dark:text-green-200">
          <li>• 优先使用服务端组件获取数据，减少客户端 JavaScript</li>
          <li>• 为不常变化的数据使用静态生成 (SSG)</li>
          <li>• 为需要实时更新的数据使用服务端渲染 (SSR)</li>
          <li>• 使用 ISR 平衡性能和实时性</li>
          <li>• 使用 Suspense 实现渐进式渲染</li>
          <li>• 合理使用缓存标签实现精确的重新验证</li>
          <li>• 并行获取独立的数据源</li>
        </ul>
      </div>
    </FeatureLayout>
  );
}
