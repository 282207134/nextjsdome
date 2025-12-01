import {
  FeatureLayout,
  FeatureSection,
  CodeBlock,
} from "@/components/FeatureLayout";
import { revalidatePath } from "next/cache";

// 模拟内存存储（仅用于示例）
const feedbackStore: { name: string; message: string; createdAt: string }[] = [];

async function submitFeedback(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString() ?? "匿名";
  const message = formData.get("message")?.toString() ?? "";

  if (!message) {
    throw new Error("请填写反馈内容");
  }

  feedbackStore.unshift({
    name,
    message,
    createdAt: new Date().toISOString(),
  });

  revalidatePath("/forms");
}

export default function FormsPage() {
  return (
    <FeatureLayout
      title="表单与 Server Actions"
      description="Server Actions 可以让你在服务端处理表单提交，而无需额外的 API 路由。"
      docLink="https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions"
    >
      <FeatureSection
        title="1. Server Action 表单"
        description="使用 Server Actions 直接处理表单提交。"
      >
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900">
          <form action={submitFeedback} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                姓名
              </label>
              <input
                name="name"
                placeholder="请输入你的姓名"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                反馈内容
              </label>
              <textarea
                name="message"
                placeholder="写下你想说的话"
                className="mt-1 h-32 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              提交反馈
            </button>
          </form>

          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              最新反馈
            </h3>
            {feedbackStore.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                还没有反馈，快来提交第一条吧！
              </p>
            ) : (
              <ul className="space-y-3">
                {feedbackStore.map((feedback, index) => (
                  <li
                    key={index}
                    className="rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                  >
                    <p className="font-medium text-gray-900 dark:text-white">
                      {feedback.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feedback.message}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(feedback.createdAt).toLocaleString("zh-CN", {
                        timeZone: "Asia/Shanghai",
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <CodeBlock
          code={`// app/(features)/forms/page.tsx
async function submitFeedback(formData: FormData) {
  'use server';
  const name = formData.get('name');
  const message = formData.get('message');
  
  await saveToDatabase({ name, message });
  revalidatePath('/forms');
}

export default function Page() {
  return (
    <form action={submitFeedback}>
      <input name="name" />
      <textarea name="message" />
      <button type="submit">提交</button>
    </form>
  );
}`}
        />
      </FeatureSection>

      <FeatureSection
        title="2. 客户端变更（useFormStatus/useFormState)"
        description="使用 React 的新 Hook 配合 Server Actions 实现更好的体验。"
      >
        <CodeBlock
          code={`'use client';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? '提交中...' : '提交'}
    </button>
  );
}

export function FeedbackForm({ action }) {
  return (
    <form action={action}>
      <input name="name" />
      <textarea name="message" />
      <SubmitButton />
    </form>
  );
}`}
        />
      </FeatureSection>

      <FeatureSection
        title="3. Server Action 最佳实践"
        description="使用 Server Actions 的一些建议。"
      >
        <ul className="list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
          <li>验证输入数据，防止注入攻击</li>
          <li>使用 try/catch 捕获错误并返回友好提示</li>
          <li>配合 revalidatePath 或 revalidateTag 更新缓存</li>
          <li>结合 Suspense 和 useFormStatus 提供更好体验</li>
          <li>合理拆分服务器逻辑，保持代码清晰</li>
        </ul>
      </FeatureSection>
    </FeatureLayout>
  );
}
