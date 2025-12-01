"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

/**
 * 导航栏组件
 * 提供全局导航功能，包括响应式菜单
 */
export function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 导航链接配置
  const navLinks = [
    { href: "/", label: "首页" },
    { href: "/docs", label: "文档" },
    { href: "/examples", label: "示例" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Next.js 学习
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                  pathname === link.href
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* GitHub 链接示例 */}
            <a
              href="https://github.com/vercel/next.js"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              GitHub
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 py-4 md:hidden dark:border-gray-800">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                    pathname === link.href
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://github.com/vercel/next.js"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
