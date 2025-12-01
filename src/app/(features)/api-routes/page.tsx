import {
  FeatureLayout,
  FeatureSection,
  CodeBlock,
} from "@/components/FeatureLayout";

/**
 * API 路由学习页面
 * 展示如何创建和使用 Next.js API 路由
 */
export default function APIRoutesPage() {
  return (
    <FeatureLayout
      title="API 路由 (API Routes)"
      description="Next.js 允许你在应用内创建 API 端点，无需单独的后端服务器。使用 Route Handlers 处理 HTTP 请求。"
      docLink="https://nextjs.org/docs/app/building-your-application/routing/route-handlers"
    >
      {/* 基础 API 路由 */}
      <FeatureSection
        title="1. 创建 API 路由"
        description="在 app/api 目录下创建 route.ts 文件，导出处理函数。"
      >
        <CodeBlock
          code={`// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({
    message: '你好，世界！',
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    received: body,
    status: 'success',
  });
}`}
        />
        <div className="flex gap-4">
          <a
            href="/api/hello"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            测试 /api/hello →
          </a>
          <a
            href="/api/users"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            测试 /api/users →
          </a>
        </div>
      </FeatureSection>

      {/* HTTP 方法 */}
      <FeatureSection
        title="2. 支持的 HTTP 方法"
        description="Route Handlers 支持所有标准 HTTP 方法。"
      >
        <CodeBlock
          code={`// app/api/users/route.ts
import { NextResponse } from 'next/server';

// GET - 获取资源
export async function GET(request: Request) {
  const users = await fetchUsers();
  return NextResponse.json(users);
}

// POST - 创建资源
export async function POST(request: Request) {
  const data = await request.json();
  const user = await createUser(data);
  return NextResponse.json(user, { status: 201 });
}

// PUT - 更新资源（完整）
export async function PUT(request: Request) {
  const data = await request.json();
  const user = await updateUser(data);
  return NextResponse.json(user);
}

// PATCH - 更新资源（部分）
export async function PATCH(request: Request) {
  const data = await request.json();
  const user = await partialUpdateUser(data);
  return NextResponse.json(user);
}

// DELETE - 删除资源
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await deleteUser(id);
  return NextResponse.json({ message: '已删除' });
}

// HEAD - 获取响应头
export async function HEAD(request: Request) {
  return new Response(null, {
    headers: { 'X-Custom-Header': 'value' },
  });
}

// OPTIONS - 获取支持的方法
export async function OPTIONS(request: Request) {
  return new Response(null, {
    headers: {
      'Allow': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
    },
  });
}`}
        />
      </FeatureSection>

      {/* 动态 API 路由 */}
      <FeatureSection
        title="3. 动态 API 路由"
        description="使用动态参数创建灵活的 API 端点。"
      >
        <CodeBlock
          code={`// app/api/users/[id]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getUserById(params.id);
  
  if (!user) {
    return NextResponse.json(
      { error: '用户未找到' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await deleteUser(params.id);
  return NextResponse.json({ message: '删除成功' });
}`}
        />
      </FeatureSection>

      {/* 请求处理 */}
      <FeatureSection
        title="4. 请求数据处理"
        description="获取请求头、查询参数、Cookie 等。"
      >
        <CodeBlock
          code={`export async function GET(request: Request) {
  // 1. 获取 URL 和查询参数
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';
  
  // 2. 获取请求头
  const authorization = request.headers.get('authorization');
  const userAgent = request.headers.get('user-agent');
  
  // 3. 获取 Cookie
  const cookies = request.cookies;
  const token = cookies.get('token');
  
  // 4. 获取 JSON 请求体
  const body = await request.json();
  
  // 5. 获取 FormData
  const formData = await request.formData();
  const name = formData.get('name');
  
  return NextResponse.json({
    query: { page, limit },
    headers: { authorization, userAgent },
    token,
  });
}`}
        />
      </FeatureSection>

      {/* 响应处理 */}
      <FeatureSection
        title="5. 响应处理"
        description="设置响应头、状态码、Cookie 等。"
      >
        <CodeBlock
          code={`import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  
  // 创建响应
  const response = NextResponse.json(
    { success: true, data },
    {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'custom-value',
      },
    }
  );
  
  // 设置 Cookie
  response.cookies.set({
    name: 'session',
    value: 'token-value',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 天
  });
  
  return response;
}

// 重定向响应
export async function GET() {
  return NextResponse.redirect(new URL('/new-path', request.url));
}

// 流式响应
export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode('数据块 1\n'));
      controller.enqueue(encoder.encode('数据块 2\n'));
      controller.close();
    },
  });
  
  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain' },
  });
}`}
        />
      </FeatureSection>

      {/* 错误处理 */}
      <FeatureSection
        title="6. 错误处理"
        description="优雅地处理 API 错误。"
      >
        <CodeBlock
          code={`export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // 验证数据
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: '缺少必填字段' },
        { status: 400 }
      );
    }
    
    // 处理业务逻辑
    const result = await createUser(data);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}`}
        />
      </FeatureSection>

      {/* CORS */}
      <FeatureSection
        title="7. CORS 处理"
        description="允许跨域请求。"
      >
        <CodeBlock
          code={`export async function GET(request: Request) {
  const data = { message: 'Hello from API' };
  
  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}`}
        />
      </FeatureSection>

      {/* 认证和授权 */}
      <FeatureSection
        title="8. 认证和授权"
        description="保护 API 端点。"
      >
        <CodeBlock
          code={`import { NextResponse } from 'next/server';

async function verifyAuth(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return null;
  }
  
  // 验证 token
  const user = await validateToken(token);
  return user;
}

export async function GET(request: Request) {
  const user = await verifyAuth(request);
  
  if (!user) {
    return NextResponse.json(
      { error: '未授权' },
      { status: 401 }
    );
  }
  
  // 返回受保护的数据
  const data = await getProtectedData(user.id);
  return NextResponse.json(data);
}`}
        />
      </FeatureSection>

      {/* 最佳实践 */}
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950">
        <h3 className="text-xl font-semibold text-green-900 dark:text-green-100">
          💡 最佳实践
        </h3>
        <ul className="mt-4 space-y-2 text-green-800 dark:text-green-200">
          <li>• 始终验证和清理用户输入</li>
          <li>• 使用适当的 HTTP 状态码</li>
          <li>• 实施速率限制防止滥用</li>
          <li>• 记录 API 错误用于调试</li>
          <li>• 对敏感数据使用 HTTPS</li>
          <li>• 实现认证和授权</li>
          <li>• 返回一致的错误格式</li>
          <li>• 使用 TypeScript 确保类型安全</li>
        </ul>
      </div>
    </FeatureLayout>
  );
}
