import { NextResponse } from "next/server";

/**
 * 模拟用户数据
 */
const users = [
  { id: 1, name: "张三", email: "zhangsan@example.com" },
  { id: 2, name: "李四", email: "lisi@example.com" },
  { id: 3, name: "王五", email: "wangwu@example.com" },
];

/**
 * GET /api/users - 获取所有用户
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  // 如果有查询参数，进行过滤
  if (query) {
    const filtered = users.filter(
      (user) =>
        user.name.includes(query) || user.email.includes(query)
    );
    return NextResponse.json(filtered);
  }

  return NextResponse.json(users);
}

/**
 * POST /api/users - 创建新用户
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // 验证
    if (!name || !email) {
      return NextResponse.json(
        { error: "姓名和邮箱是必填项" },
        { status: 400 }
      );
    }

    // 创建新用户（实际应用中应保存到数据库）
    const newUser = {
      id: users.length + 1,
      name,
      email,
    };

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("API users POST error", error);
    return NextResponse.json(
      { error: "无效的请求数据" },
      { status: 400 }
    );
  }
}
