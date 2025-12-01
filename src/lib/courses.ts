type Course = {
  id: number;
  title: string;
  level: "入门" | "进阶" | "高级";
  type: "SSG" | "SSR" | "ISR";
  duration: string;
  updatedAt: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: "App Router 基础",
    level: "入门",
    type: "SSG",
    duration: "30 min",
    updatedAt: "2024-03-01",
  },
  {
    id: 2,
    title: "数据获取模式",
    level: "进阶",
    type: "SSR",
    duration: "45 min",
    updatedAt: "2024-05-12",
  },
  {
    id: 3,
    title: "Server Actions 实战",
    level: "高级",
    type: "ISR",
    duration: "60 min",
    updatedAt: "2024-06-18",
  },
];

/**
 * 模拟数据获取函数
 * @param mode 数据获取模式，仅用于描述
 */
export async function getCourses(mode: "SSG" | "SSR" | "ISR" = "SSR") {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 300));

  return courses.map((course) => ({
    ...course,
    mode,
  }));
}
