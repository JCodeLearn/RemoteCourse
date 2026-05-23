export type CourseStatus = 'draft' | 'published' | 'archived'

export type VideoStatus = 'uploading' | 'transcoding' | 'ready' | 'failed'

export interface Course {
  id: number
  title: string
  description: string
  coverUrl: string | null
  teacherId: number
  teacherName: string
  teacherAvatar: string | null
  categoryId: number
  categoryName: string
  status: CourseStatus
  viewCount: number
  likeCount: number
  commentCount: number
  duration: number
  createdAt: string
  updatedAt: string
}

export interface Episode {
  id: number
  courseId: number
  title: string
  description: string
  videoId: number | null
  orderIndex: number
  duration: number
}

export interface Video {
  id: number
  originalName: string
  fileSize: number
  duration: number
  resolution: string
  status: VideoStatus
}

export interface ClassInfo {
  id: number
  courseId: number
  courseTitle: string
  teacherId: number
  name: string
  invitationCode: string
  maxStudents: number
  studentCount: number
  status: 'active' | 'ended'
  createdAt: string
}

export interface StudentProgress {
  studentId: number
  studentName: string
  studentAvatar: string | null
  totalEpisodes: number
  completedEpisodes: number
  completionRate: number
  totalWatchSeconds: number
}

export interface LearningProgress {
  episodeId: number
  watchedSeconds: number
  totalSeconds: number
  completionRate: number
  lastPosition: number
}

export interface WatchRecord {
  courseId: number
  episodeId: number
  courseTitle: string
  episodeTitle: string
  coverUrl: string | null
  watchedAt: string
  progress: number
}

export interface CourseCategory {
  id: number
  name: string
  icon: string
}
