import { NextResponse } from "next/server";

/**
 * 简单的 API 示例
 */
export async function GET() {
  return NextResponse.json({
    message: "欢迎使用 Next.js API 路由",
    timestamp: new Date().toISOString(),
  });
}
