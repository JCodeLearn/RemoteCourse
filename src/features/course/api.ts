import type { Course, Episode } from '@/types'

export interface CourseDetail {
  course: Course
  episodes: Episode[]
  isEnrolled: boolean
  isLiked: boolean
}

const MOCK_DETAILS: Record<number, CourseDetail> = {
  1: {
    course: {
      id: 1, title: '深入理解计算机系统', status: 'published',
      description: '本课程从程序员视角深入讲解计算机系统的组成和工作原理。\n\n涵盖：\n• 信息表示与处理\n• 机器级编程\n• 处理器体系结构\n• 存储器层次结构\n• 链接与异常控制流\n\n适合有一定C语言基础的计算机专业学生。',
      coverUrl: '', teacherId: 1, teacherName: '张教授', teacherAvatar: null,
      categoryId: 1, categoryName: '计算机科学',
      viewCount: 12500, likeCount: 320, commentCount: 120,
      duration: 9030, createdAt: '2026-05-20T10:00:00Z', updatedAt: '2026-05-20T10:00:00Z',
    },
    episodes: [
      { id: 1, courseId: 1, title: '课程介绍与计算机系统概述', description: '', videoId: 101, orderIndex: 1, duration: 930 },
      { id: 2, courseId: 1, title: '信息的位表示与整数运算', description: '', videoId: 102, orderIndex: 2, duration: 1350 },
      { id: 3, courseId: 1, title: '浮点数与数据表示', description: '', videoId: 103, orderIndex: 3, duration: 1200 },
      { id: 4, courseId: 1, title: '机器级编程 I：基础指令', description: '', videoId: 104, orderIndex: 4, duration: 1500 },
      { id: 5, courseId: 1, title: '机器级编程 II：控制与过程', description: '', videoId: 105, orderIndex: 5, duration: 1350 },
      { id: 6, courseId: 1, title: '处理器体系结构', description: '', videoId: 106, orderIndex: 6, duration: 1800 },
      { id: 7, courseId: 1, title: '存储器层次结构', description: '', videoId: 107, orderIndex: 7, duration: 900 },
    ],
    isEnrolled: false,
    isLiked: false,
  },
  2: {
    course: {
      id: 2, title: '数据结构与算法', status: 'published',
      description: '本课程系统讲解常用的数据结构和经典算法。\n\n内容包括：\n• 线性表、栈与队列\n• 树与二叉树\n• 图的存储与遍历\n• 查找与排序算法\n• 动态规划与贪心算法\n\n课程采用理论+代码实践的方式，使用C++语言演示。',
      coverUrl: '', teacherId: 1, teacherName: '张教授', teacherAvatar: null,
      categoryId: 1, categoryName: '计算机科学',
      viewCount: 8900, likeCount: 210, commentCount: 85,
      duration: 7200, createdAt: '2026-05-18T10:00:00Z', updatedAt: '2026-05-18T10:00:00Z',
    },
    episodes: [
      { id: 8, courseId: 2, title: '算法与数据结构概述', description: '', videoId: 201, orderIndex: 1, duration: 850 },
      { id: 9, courseId: 2, title: '线性表的顺序与链式存储', description: '', videoId: 202, orderIndex: 2, duration: 1200 },
      { id: 10, courseId: 2, title: '栈与队列', description: '', videoId: 203, orderIndex: 3, duration: 1100 },
      { id: 11, courseId: 2, title: '二叉树与遍历', description: '', videoId: 204, orderIndex: 4, duration: 1500 },
      { id: 12, courseId: 2, title: '图的基本概念与遍历', description: '', videoId: 205, orderIndex: 5, duration: 1400 },
      { id: 13, courseId: 2, title: '查找与排序算法', description: '', videoId: 206, orderIndex: 6, duration: 1150 },
    ],
    isEnrolled: true,
    isLiked: true,
  },
  7: {
    course: {
      id: 7, title: '高等数学', status: 'published',
      description: '本课程是理工科本科基础课程，系统讲解高等数学的核心内容。\n\n涵盖：\n• 极限与连续\n• 导数与微分\n• 不定积分与定积分\n• 多元函数微积分\n• 无穷级数\n• 常微分方程\n\n注重概念理解和计算能力的培养。',
      coverUrl: '', teacherId: 5, teacherName: '陈教授', teacherAvatar: null,
      categoryId: 4, categoryName: '数学与统计',
      viewCount: 18500, likeCount: 480, commentCount: 200,
      duration: 10800, createdAt: '2026-05-08T10:00:00Z', updatedAt: '2026-05-08T10:00:00Z',
    },
    episodes: [
      { id: 14, courseId: 7, title: '函数与极限', description: '', videoId: 701, orderIndex: 1, duration: 1500 },
      { id: 15, courseId: 7, title: '导数与微分', description: '', videoId: 702, orderIndex: 2, duration: 1800 },
      { id: 16, courseId: 7, title: '中值定理与导数应用', description: '', videoId: 703, orderIndex: 3, duration: 1500 },
      { id: 17, courseId: 7, title: '不定积分', description: '', videoId: 704, orderIndex: 4, duration: 1700 },
      { id: 18, courseId: 7, title: '定积分及其应用', description: '', videoId: 705, orderIndex: 5, duration: 1600 },
      { id: 19, courseId: 7, title: '多元函数微分学', description: '', videoId: 706, orderIndex: 6, duration: 1400 },
      { id: 20, courseId: 7, title: '无穷级数', description: '', videoId: 707, orderIndex: 7, duration: 1300 },
    ],
    isEnrolled: false,
    isLiked: false,
  },
}

const FALLBACK: CourseDetail = {
  course: {
    id: 0, title: '课程未找到', status: 'published',
    description: '', coverUrl: '', teacherId: 0, teacherName: '',
    teacherAvatar: null, categoryId: 0, categoryName: '',
    viewCount: 0, likeCount: 0, commentCount: 0,
    duration: 0, createdAt: '', updatedAt: '',
  },
  episodes: [],
  isEnrolled: false,
  isLiked: false,
}

export async function getCourseDetail(id: number): Promise<CourseDetail> {
  // TODO: 后端就绪后切换
  // return get<CourseDetail>(`/api/v1/courses/${id}`)

  await new Promise((r) => setTimeout(r, 300 + Math.random() * 200))
  return MOCK_DETAILS[id] ?? FALLBACK
}

export async function toggleLike(courseId: number): Promise<boolean> {
  // TODO: 后端就绪后切换
  // return post<{ liked: boolean }>(`/api/v1/courses/${courseId}/like`)
  await new Promise((r) => setTimeout(r, 200))
  const detail = MOCK_DETAILS[courseId]
  if (detail) detail.isLiked = !detail.isLiked
  return detail?.isLiked ?? false
}
