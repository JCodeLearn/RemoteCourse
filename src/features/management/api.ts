export interface VideoFile {
  id: string
  name: string
  size: number
  resolution: string
  progress: number
  status: 'waiting' | 'uploading' | 'transcoding' | 'ready' | 'failed'
  duration?: number
}

export interface ChapterNode {
  id: string
  title: string
  episodes: EpisodeNode[]
}

export interface EpisodeNode {
  id: string
  title: string
  videoFile: VideoFile | null
  orderIndex: number
}

export interface CourseForm {
  title: string
  description: string
  coverUrl: string
  categoryId: number
  tags: string[]
  status: 'draft' | 'published'
}

export interface ManagedCourse {
  id: number
  title: string
  coverUrl: string | null
  categoryId: number
  categoryName: string
  status: 'draft' | 'published'
  viewCount: number
  likeCount: number
  commentCount: number
  createdAt: string
}

// ====== Mock 数据 ======

let nextFileId = 1

export function createVideoFile(name: string, size: number): VideoFile {
  return {
    id: String(nextFileId++),
    name,
    size,
    resolution: '1920x1080',
    progress: 0,
    status: 'waiting',
  }
}

export function createChapter(title = '新章节'): ChapterNode {
  return { id: 'c' + Date.now(), title, episodes: [] }
}

export function createEpisode(title: string, video: VideoFile | null = null): EpisodeNode {
  return { id: 'e' + Date.now(), title: title || (video?.name ?? '新剧集'), videoFile: video, orderIndex: 0 }
}

const MOCK_CONTENT: ManagedCourse[] = [
  { id: 1, title: '深入理解计算机系统', coverUrl: null, categoryId: 1, categoryName: '计算机科学', status: 'published', viewCount: 12500, likeCount: 320, commentCount: 120, createdAt: '2026-05-20' },
  { id: 2, title: '数据结构与算法', coverUrl: null, categoryId: 1, categoryName: '计算机科学', status: 'draft', viewCount: 0, likeCount: 0, commentCount: 0, createdAt: '2026-05-22' },
  { id: 3, title: '高等数学精讲', coverUrl: null, categoryId: 4, categoryName: '数学与统计', status: 'published', viewCount: 18500, likeCount: 480, commentCount: 200, createdAt: '2026-05-08' },
]

export async function getContentList(): Promise<ManagedCourse[]> {
  await new Promise(r => setTimeout(r, 300))
  return MOCK_CONTENT
}

export async function deleteContent(id: number): Promise<void> {
  await new Promise(r => setTimeout(r, 200))
  const idx = MOCK_CONTENT.findIndex(c => c.id === id)
  if (idx !== -1) MOCK_CONTENT.splice(idx, 1)
}

export async function saveCourse(form: CourseForm, chapters: ChapterNode[]): Promise<{ id: number }> {
  await new Promise(r => setTimeout(r, 500))
  // TODO: call POST /api/v1/courses
  return { id: Date.now() }
}

// ====== 分类选项 ======
export const CATEGORY_OPTIONS = [
  { id: 1, name: '计算机科学' },
  { id: 2, name: '电子信息' },
  { id: 3, name: '机械与土木' },
  { id: 4, name: '数学与统计' },
  { id: 5, name: '物理' },
  { id: 6, name: '化学与生命' },
  { id: 7, name: '文学与历史' },
  { id: 8, name: '外国语言' },
  { id: 9, name: '经济与管理' },
  { id: 10, name: '艺术与哲学' },
]
