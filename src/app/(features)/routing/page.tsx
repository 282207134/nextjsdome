import Link from "next/link";
import {
  FeatureLayout,
  FeatureSection,
  CodeBlock,
} from "@/components/FeatureLayout";

/**
 * 路由系统学习页面
 * 展示 Next.js App Router 的核心特性
 */
export default function RoutingPage() {
  return (
    <FeatureLayout
      title="路由系统 (App Router)"
      description="Next.js 13+ 引入的 App Router 提供了基于文件系统的强大路由能力，支持嵌套路由、动态路由、路由组等高级特性。"
      docLink="https://nextjs.org/docs/app/building-your-application/routing"
    >
      {/* 基础路由 */}
      <FeatureSection
        title="1. 基础路由"
        description={
          <>
            <p>
              在 Next.js 中，路由是基于文件系统的。<code>app</code>{" "}
              目录下的每个文件夹代表一个路由段，映射到 URL 路径。
            </p>
            <p className="mt-2">
              每个文件夹内的 <code>page.tsx</code> 文件会成为该路由的页面组件。
            </p>
          </>
        }
      >
        <CodeBlock
          code={`// 文件结构示例
app/
├── page.tsx           → /
├── about/
│   └── page.tsx       → /about
├── blog/
│   └── page.tsx       → /blog
└── contact/
    └── page.tsx       → /contact

// app/about/page.tsx
export default function AboutPage() {
  return <h1>关于我们</h1>
}`}
        />
      </FeatureSection>

      {/* 动态路由 */}
      <FeatureSection
        title="2. 动态路由"
        description="使用方括号 [slug] 创建动态路由段，可以接收 URL 参数。"
      >
        <CodeBlock
          code={`// app/blog/[slug]/page.tsx
export default function BlogPost({ 
  params 
}: { 
  params: { slug: string } 
}) {
  return (
    <div>
      <h1>博客文章</h1>
      <p>当前文章 ID: {params.slug}</p>
    </div>
  );
}

// 访问 /blog/hello-world
// params.slug = "hello-world"

// 生成静态参数（用于静态生成）
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json());
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}`}
        />
        <div className="mt-4">
          <Link
            href="/routing/dynamic-example/test-123"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            测试动态路由示例 →
          </Link>
        </div>
      </FeatureSection>

      {/* 路由组 */}
      <FeatureSection
        title="3. 路由组 (Route Groups)"
        description="使用括号 (folder) 创建路由组，可以在不影响 URL 结构的情况下组织路由。"
      >
        <CodeBlock
          code={`// 文件结构
app/
├── (marketing)/
│   ├── about/
│   │   └── page.tsx      → /about
│   └── contact/
│       └── page.tsx      → /contact
├── (shop)/
│   ├── products/
│   │   └── page.tsx      → /products
│   └── cart/
│       └── page.tsx      → /cart
└── layout.tsx

// (marketing) 和 (shop) 不会出现在 URL 中
// 但可以为每个组创建独立的 layout.tsx`}
        />
      </FeatureSection>

      {/* 捕获所有路由 */}
      <FeatureSection
        title="4. 捕获所有路由 (Catch-all Segments)"
        description="使用 [...slug] 可以匹配所有后续路径段。"
      >
        <CodeBlock
          code={`// app/docs/[...slug]/page.tsx
export default function Docs({
  params,
}: {
  params: { slug: string[] }
}) {
  return (
    <div>
      <h1>文档页面</h1>
      <p>路径段: {params.slug.join('/')}</p>
    </div>
  );
}

// /docs/getting-started → slug: ['getting-started']
// /docs/api/authentication → slug: ['api', 'authentication']

// 可选的捕获所有路由：[[...slug]]
// 这样 /docs 本身也会被匹配`}
        />
      </FeatureSection>

      {/* 平行路由 */}
      <FeatureSection
        title="5. 平行路由 (Parallel Routes)"
        description="使用 @folder 语法创建命名插槽，可以在同一布局中同时渲染多个页面。"
      >
        <CodeBlock
          code={`// 文件结构
app/
├── @analytics/
│   └── page.tsx
├── @team/
│   └── page.tsx
├── layout.tsx
└── page.tsx

// app/layout.tsx
export default function Layout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <div>
      <div>{children}</div>
      <div className="grid grid-cols-2">
        <div>{analytics}</div>
        <div>{team}</div>
      </div>
    </div>
  );
}`}
        />
      </FeatureSection>

      {/* 拦截路由 */}
      <FeatureSection
        title="6. 拦截路由 (Intercepting Routes)"
        description="使用 (..) 语法可以拦截路由，在当前页面显示另一个路由的内容（如模态框）。"
      >
        <CodeBlock
          code={`// 文件结构
app/
├── feed/
│   ├── (..)photo/
│   │   └── [id]/
│   │       └── page.tsx  ← 拦截 /photo/[id]
│   └── page.tsx
└── photo/
    └── [id]/
        └── page.tsx      ← 原始路由

// (.) 匹配同级
// (..) 匹配上一级
// (..)(..) 匹配上两级
// (...) 匹配根目录

// 典型用例：在列表页以模态框形式展示详情`}
        />
      </FeatureSection>

      {/* 路由处理程序 */}
      <FeatureSection
        title="7. 路由处理程序 (Route Handlers)"
        description="使用 route.ts 文件创建自定义请求处理程序（API 端点）。"
      >
        <CodeBlock
          code={`// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ message: 'Hello World' });
}

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({ received: data });
}

// 支持的 HTTP 方法：
// GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS`}
        />
      </FeatureSection>

      {/* 布局和模板 */}
      <FeatureSection
        title="8. 布局 (Layouts) 和模板 (Templates)"
        description="layout.tsx 用于创建共享布局，状态会被保留；template.tsx 在每次导航时重新创建。"
      >
        <CodeBlock
          code={`// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <nav>侧边栏导航</nav>
      <main>{children}</main>
    </div>
  );
}

// app/dashboard/template.tsx
export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  // 每次路由切换都会重新挂载
  return <div>{children}</div>;
}`}
        />
      </FeatureSection>

      {/* 导航方式 */}
      <FeatureSection
        title="9. 导航方式"
        description="Next.js 提供多种页面导航方法。"
      >
        <CodeBlock
          code={`// 1. 使用 Link 组件（推荐）
import Link from 'next/link';

<Link href="/about">关于我们</Link>
<Link href="/blog/123">博客文章</Link>

// 2. 使用 useRouter hook（客户端导航）
'use client';
import { useRouter } from 'next/navigation';

function MyComponent() {
  const router = useRouter();
  
  return (
    <button onClick={() => router.push('/dashboard')}>
      前往仪表盘
    </button>
  );
}

// 3. 使用 redirect（服务端重定向）
import { redirect } from 'next/navigation';

async function fetchUser() {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }
}`}
        />
      </FeatureSection>

      {/* 加载和错误处理 */}
      <FeatureSection
        title="10. 加载和错误状态"
        description="使用特殊文件处理加载和错误状态。"
      >
        <CodeBlock
          code={`// app/dashboard/loading.tsx
export default function Loading() {
  return <div>加载中...</div>;
}

// app/dashboard/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>出错了！</h2>
      <button onClick={reset}>重试</button>
    </div>
  );
}

// app/dashboard/not-found.tsx
export default function NotFound() {
  return <h2>页面未找到</h2>;
}`}
        />
      </FeatureSection>

      {/* 实践建议 */}
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950">
        <h3 className="text-xl font-semibold text-green-900 dark:text-green-100">
          💡 最佳实践
        </h3>
        <ul className="mt-4 space-y-2 text-green-800 dark:text-green-200">
          <li>• 使用文件夹结构清晰地组织路由层级</li>
          <li>• 对于需要共享布局的路由使用嵌套路由</li>
          <li>• 优先使用 Link 组件进行导航，享受预加载优化</li>
          <li>• 合理使用路由组来组织代码而不影响 URL</li>
          <li>• 为动态路由实现 generateStaticParams 以提升性能</li>
          <li>• 使用 loading.tsx 提供更好的用户体验</li>
        </ul>
      </div>
    </FeatureLayout>
  );
}
