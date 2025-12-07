import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

// 配置 Geist Sans 字体
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// 配置 Geist Mono 字体 (用于代码展示)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 配置网站元数据 (SEO优化)
export const metadata: Metadata = {
  title: "Next.js 学习项目 - 完整示例",
  description: "一个包含所有 Next.js 核心特性的完整学习项目，包含路由、数据获取、API路由、中间件等",
  keywords: ["Next.js", "React", "TypeScript", "学习", "教程"],
  authors: [{ name: "Next.js 学习者" }],
  openGraph: {
    title: "Next.js 学习项目",
    description: "完整的 Next.js 学习示例",
    type: "website",
  },
};

/**
 * 根布局组件
 * 这是应用的最外层布局，所有页面都会使用这个布局
 * @param children - 子页面内容
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900`}
      >
        {/* 导航栏组件 */}
        <Navigation />
        
        {/* 主要内容区域 */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* 页脚 */}
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
            <p>© 2024 Next.js 学习项目 - 用于学习和实践 Next.js 框架</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
