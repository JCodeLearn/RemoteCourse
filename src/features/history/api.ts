export interface HistoryItem {
  id: number
  courseId: number
  courseTitle: string
  episodeTitle: string
  episodeIndex: number
  categoryId: number
  progress: number
  watchedAt: string
}

const MOCK_HISTORY: HistoryItem[] = [
  { id: 1, courseId: 1, courseTitle: '深入理解计算机系统', episodeTitle: '第3集: 浮点数与数据表示', episodeIndex: 3, categoryId: 1, progress: 60, watchedAt: '2026-05-24T15:30:00Z' },
  { id: 2, courseId: 7, courseTitle: '高等数学', episodeTitle: '第2集: 导数与微分', episodeIndex: 2, categoryId: 4, progress: 100, watchedAt: '2026-05-24T10:15:00Z' },
  { id: 3, courseId: 2, courseTitle: '数据结构与算法', episodeTitle: '第1集: 算法与数据结构概述', episodeIndex: 1, categoryId: 1, progress: 15, watchedAt: '2026-05-23T19:45:00Z' },
  { id: 4, courseId: 7, courseTitle: '高等数学', episodeTitle: '第1集: 函数与极限', episodeIndex: 1, categoryId: 4, progress: 100, watchedAt: '2026-05-23T14:00:00Z' },
  { id: 5, courseId: 1, courseTitle: '深入理解计算机系统', episodeTitle: '第2集: 信息的位表示与整数运算', episodeIndex: 2, categoryId: 1, progress: 100, watchedAt: '2026-05-22T20:30:00Z' },
  { id: 6, courseId: 5, courseTitle: '量子力学导论', episodeTitle: '第1集: 量子力学概述', episodeIndex: 1, categoryId: 5, progress: 42, watchedAt: '2026-05-22T08:00:00Z' },
  { id: 7, courseId: 14, courseTitle: '微观经济学', episodeTitle: '第2集: 供需理论', episodeIndex: 2, categoryId: 9, progress: 78, watchedAt: '2026-05-21T16:20:00Z' },
  { id: 8, courseId: 1, courseTitle: '深入理解计算机系统', episodeTitle: '第1集: 课程介绍与计算机系统概述', episodeIndex: 1, categoryId: 1, progress: 100, watchedAt: '2026-05-20T09:00:00Z' },
]

export const CATEGORY_GRADIENTS: Record<number, string> = {
  1: 'linear-gradient(135deg, #1A5276, #2980B9)',
  4: 'linear-gradient(135deg, #1A5276, #2E86C1)',
  5: 'linear-gradient(135deg, #0D3B66, #1A5276)',
  9: 'linear-gradient(135deg, #7B241C, #CB4335)',
}

export const CATEGORY_ICONS: Record<number, string> = {
  1: 'Monitor', 4: 'DataAnalysis', 5: 'Magnet', 9: 'TrendCharts',
}

export async function getHistory(): Promise<HistoryItem[]> {
  // TODO: 后端就绪后切换 GET /api/v1/history
  await new Promise(r => setTimeout(r, 300))
  return MOCK_HISTORY
}
