import type { Course } from '@/types'

const BASE_URL = 'http://localhost:8080'

interface CourseListResponse {
  items: Course[]
  total: number
  page: number
  size: number
}

// ========== Mock 数据 ==========

const MOCK_COURSES: Course[] = [
  {
    id: 1, title: '深入理解计算机系统', description: '', coverUrl: '', teacherId: 1,
    teacherName: '张教授', teacherAvatar: null, categoryId: 1, categoryName: '计算机科学',
    status: 'published', viewCount: 12500, likeCount: 320,
    commentCount: 120, duration: 9030, createdAt: '2026-05-20T10:00:00Z', updatedAt: '2026-05-20T10:00:00Z',
  },
  {
    id: 2, title: '数据结构与算法', description: '', coverUrl: '', teacherId: 1,
    teacherName: '张教授', teacherAvatar: null, categoryId: 1, categoryName: '计算机科学',
    status: 'published', viewCount: 8900, likeCount: 210,
    commentCount: 85, duration: 7200, createdAt: '2026-05-18T10:00:00Z', updatedAt: '2026-05-18T10:00:00Z',
  },
  {
    id: 3, title: '操作系统原理', description: '', coverUrl: '', teacherId: 3,
    teacherName: '王老师', teacherAvatar: null, categoryId: 1, categoryName: '计算机科学',
    status: 'published', viewCount: 6200, likeCount: 150,
    commentCount: 60, duration: 5400, createdAt: '2026-05-15T10:00:00Z', updatedAt: '2026-05-15T10:00:00Z',
  },
  {
    id: 4, title: '信号与系统', description: '', coverUrl: '', teacherId: 2,
    teacherName: '李教授', teacherAvatar: null, categoryId: 2, categoryName: '电子信息',
    status: 'published', viewCount: 4500, likeCount: 98,
    commentCount: 45, duration: 6300, createdAt: '2026-05-14T10:00:00Z', updatedAt: '2026-05-14T10:00:00Z',
  },
  {
    id: 5, title: '数字电路设计', description: '', coverUrl: '', teacherId: 2,
    teacherName: '李教授', teacherAvatar: null, categoryId: 2, categoryName: '电子信息',
    status: 'published', viewCount: 2100, likeCount: 55,
    commentCount: 30, duration: 4800, createdAt: '2026-05-12T10:00:00Z', updatedAt: '2026-05-12T10:00:00Z',
  },
  {
    id: 6, title: '材料力学', description: '', coverUrl: '', teacherId: 4,
    teacherName: '赵教授', teacherAvatar: null, categoryId: 3, categoryName: '机械与土木',
    status: 'published', viewCount: 1800, likeCount: 42,
    commentCount: 20, duration: 6600, createdAt: '2026-05-10T10:00:00Z', updatedAt: '2026-05-10T10:00:00Z',
  },
  {
    id: 7, title: '高等数学', description: '', coverUrl: '', teacherId: 5,
    teacherName: '陈教授', teacherAvatar: null, categoryId: 4, categoryName: '数学与统计',
    status: 'published', viewCount: 18500, likeCount: 480,
    commentCount: 200, duration: 10800, createdAt: '2026-05-08T10:00:00Z', updatedAt: '2026-05-08T10:00:00Z',
  },
  {
    id: 8, title: '线性代数', description: '', coverUrl: '', teacherId: 5,
    teacherName: '陈教授', teacherAvatar: null, categoryId: 4, categoryName: '数学与统计',
    status: 'published', viewCount: 10200, likeCount: 280,
    commentCount: 110, duration: 5400, createdAt: '2026-05-06T10:00:00Z', updatedAt: '2026-05-06T10:00:00Z',
  },
  {
    id: 9, title: '量子力学导论', description: '', coverUrl: '', teacherId: 6,
    teacherName: '周教授', teacherAvatar: null, categoryId: 5, categoryName: '物理',
    status: 'published', viewCount: 5600, likeCount: 130,
    commentCount: 55, duration: 9000, createdAt: '2026-05-04T10:00:00Z', updatedAt: '2026-05-04T10:00:00Z',
  },
  {
    id: 10, title: '有机化学', description: '', coverUrl: '', teacherId: 7,
    teacherName: '孙教授', teacherAvatar: null, categoryId: 6, categoryName: '化学与生命',
    status: 'published', viewCount: 3200, likeCount: 75,
    commentCount: 38, duration: 7800, createdAt: '2026-05-02T10:00:00Z', updatedAt: '2026-05-02T10:00:00Z',
  },
  {
    id: 11, title: '中国古代文学', description: '', coverUrl: '', teacherId: 8,
    teacherName: '吴教授', teacherAvatar: null, categoryId: 7, categoryName: '文学与历史',
    status: 'published', viewCount: 9500, likeCount: 340,
    commentCount: 150, duration: 6000, createdAt: '2026-04-28T10:00:00Z', updatedAt: '2026-04-28T10:00:00Z',
  },
  {
    id: 12, title: '世界近代史', description: '', coverUrl: '', teacherId: 8,
    teacherName: '吴教授', teacherAvatar: null, categoryId: 7, categoryName: '文学与历史',
    status: 'published', viewCount: 7800, likeCount: 220,
    commentCount: 95, duration: 7200, createdAt: '2026-04-25T10:00:00Z', updatedAt: '2026-04-25T10:00:00Z',
  },
  {
    id: 13, title: '英语精读', description: '', coverUrl: '', teacherId: 9,
    teacherName: '郑教授', teacherAvatar: null, categoryId: 8, categoryName: '外国语言',
    status: 'published', viewCount: 16200, likeCount: 420,
    commentCount: 180, duration: 4500, createdAt: '2026-04-22T10:00:00Z', updatedAt: '2026-04-22T10:00:00Z',
  },
  {
    id: 14, title: '微观经济学', description: '', coverUrl: '', teacherId: 10,
    teacherName: '钱教授', teacherAvatar: null, categoryId: 9, categoryName: '经济与管理',
    status: 'published', viewCount: 11300, likeCount: 290,
    commentCount: 135, duration: 5400, createdAt: '2026-04-20T10:00:00Z', updatedAt: '2026-04-20T10:00:00Z',
  },
  {
    id: 15, title: '西方哲学史', description: '', coverUrl: '', teacherId: 11,
    teacherName: '冯教授', teacherAvatar: null, categoryId: 10, categoryName: '艺术与哲学',
    status: 'published', viewCount: 6800, likeCount: 190,
    commentCount: 88, duration: 8400, createdAt: '2026-04-18T10:00:00Z', updatedAt: '2026-04-18T10:00:00Z',
  },
  {
    id: 16, title: '计算机组成原理', description: '', coverUrl: '', teacherId: 3,
    teacherName: '王老师', teacherAvatar: null, categoryId: 1, categoryName: '计算机科学',
    status: 'published', viewCount: 3400, likeCount: 88,
    commentCount: 42, duration: 6600, createdAt: '2026-04-16T10:00:00Z', updatedAt: '2026-04-16T10:00:00Z',
  },
  {
    id: 17, title: '概率论与数理统计', description: '', coverUrl: '', teacherId: 5,
    teacherName: '陈教授', teacherAvatar: null, categoryId: 4, categoryName: '数学与统计',
    status: 'published', viewCount: 9800, likeCount: 240,
    commentCount: 105, duration: 6000, createdAt: '2026-04-14T10:00:00Z', updatedAt: '2026-04-14T10:00:00Z',
  },
  {
    id: 18, title: '电磁学', description: '', coverUrl: '', teacherId: 6,
    teacherName: '周教授', teacherAvatar: null, categoryId: 5, categoryName: '物理',
    status: 'published', viewCount: 4100, likeCount: 96,
    commentCount: 50, duration: 5700, createdAt: '2026-04-12T10:00:00Z', updatedAt: '2026-04-12T10:00:00Z',
  },
  {
    id: 19, title: '日语入门', description: '', coverUrl: '', teacherId: 9,
    teacherName: '郑教授', teacherAvatar: null, categoryId: 8, categoryName: '外国语言',
    status: 'published', viewCount: 8700, likeCount: 210,
    commentCount: 92, duration: 3600, createdAt: '2026-04-10T10:00:00Z', updatedAt: '2026-04-10T10:00:00Z',
  },
  {
    id: 20, title: '管理学原理', description: '', coverUrl: '', teacherId: 10,
    teacherName: '钱教授', teacherAvatar: null, categoryId: 9, categoryName: '经济与管理',
    status: 'published', viewCount: 7500, likeCount: 180,
    commentCount: 78, duration: 4800, createdAt: '2026-04-08T10:00:00Z', updatedAt: '2026-04-08T10:00:00Z',
  },
]

// ========== API ==========

export async function getCourses(params: {
  page: number
  size: number
  categoryId: number
}): Promise<CourseListResponse> {
  // TODO: 后端就绪后切换为真实请求
  // return get<CourseListResponse>('/api/v1/courses', params)

  // Mock 实现
  await new Promise((r) => setTimeout(r, 400 + Math.random() * 300))

  let filtered = MOCK_COURSES
  if (params.categoryId !== 0) {
    filtered = MOCK_COURSES.filter((c) => c.categoryId === params.categoryId)
  }

  const start = (params.page - 1) * params.size
  const items = filtered.slice(start, start + params.size)

  return {
    items,
    total: filtered.length,
    page: params.page,
    size: params.size,
  }
}
