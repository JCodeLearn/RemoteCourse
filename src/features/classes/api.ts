import type { ClassInfo } from '@/types'

export interface Student {
  id: number; name: string; email: string; avatar: string | null
  progress: { completionRate: number; totalWatchSeconds: number; completedEpisodes: number; totalEpisodes: number }
}

export interface ManagedClass extends ClassInfo {
  students: Student[]
}

export interface JoinedClass extends ClassInfo {
  teacherName: string; teacherEmail: string
  classmates: Student[]  // 脱敏后
}

function maskName(n: string): string { return n[0]! + '**' }
function maskEmail(e: string): string { return e.replace(/(.)(.*)(@.*)/, '$1***$3') }

const MOCK_STUDENTS: Student[] = [
  { id: 1, name: '张三', email: 'zhang@qq.com', avatar: null, progress: { completionRate: 85.5, totalWatchSeconds: 45000, completedEpisodes: 12, totalEpisodes: 14 } },
  { id: 2, name: '李四', email: 'lisi@gmail.com', avatar: null, progress: { completionRate: 62.0, totalWatchSeconds: 29880, completedEpisodes: 8, totalEpisodes: 14 } },
  { id: 3, name: '王五', email: 'wangwu@163.com', avatar: null, progress: { completionRate: 33.0, totalWatchSeconds: 11880, completedEpisodes: 4, totalEpisodes: 14 } },
  { id: 4, name: '赵六', email: 'zhaoliu@outlook.com', avatar: null, progress: { completionRate: 100.0, totalWatchSeconds: 54000, completedEpisodes: 14, totalEpisodes: 14 } },
  { id: 5, name: '欧阳锋', email: 'ouyang@xtu.edu.cn', avatar: null, progress: { completionRate: 47.0, totalWatchSeconds: 16920, completedEpisodes: 6, totalEpisodes: 14 } },
]

let MOCK_MANAGED: ManagedClass[] = [
  { id: 1, courseId: 1, courseTitle: '深入理解计算机系统', teacherId: 1, name: '2024春-计算机系统班', invitationCode: 'A1B2C3D4E', maxStudents: 100, studentCount: 32, status: 'active', createdAt: '2026-03-01', students: [...MOCK_STUDENTS] },
  { id: 2, courseId: 2, courseTitle: '数据结构与算法', teacherId: 1, name: '2024春-数据结构班', invitationCode: 'F6G7H8I9J', maxStudents: 80, studentCount: 28, status: 'active', createdAt: '2026-03-05', students: [MOCK_STUDENTS[0]!, MOCK_STUDENTS[2]!] },
]

let MOCK_JOINED: JoinedClass[] = [
  { id: 10, courseId: 7, courseTitle: '高等数学', teacherId: 5, name: '2024春-高数A班', invitationCode: 'K1L2M3N4O', maxStudents: 120, studentCount: 45, status: 'active', createdAt: '2026-03-01', teacherName: '陈教授', teacherEmail: 'chen@xtu.edu.cn', classmates: MOCK_STUDENTS.slice(0, 3).map(s => ({ ...s, name: maskName(s.name), email: maskEmail(s.email) })) },
]

const MOCK_COURSES = [
  { id: 1, title: '深入理解计算机系统' },
  { id: 2, title: '数据结构与算法' },
]

// ====== API ======

export async function getManagedClasses(): Promise<ManagedClass[]> {
  await new Promise(r => setTimeout(r, 300))
  return MOCK_MANAGED
}

export async function getJoinedClasses(): Promise<JoinedClass[]> {
  await new Promise(r => setTimeout(r, 300))
  return MOCK_JOINED
}

export async function removeStudent(classId: number, studentId: number): Promise<void> {
  await new Promise(r => setTimeout(r, 200))
  const c = MOCK_MANAGED.find(c => c.id === classId)
  if (c) { c.students = c.students.filter(s => s.id !== studentId); c.studentCount = c.students.length }
}

export async function addStudentByEmail(classId: number, email: string): Promise<Student | null> {
  await new Promise(r => setTimeout(r, 200))
  const s = MOCK_STUDENTS.find(s => s.email === email)
  if (!s) return null
  const c = MOCK_MANAGED.find(c => c.id === classId)
  if (c && !c.students.find(x => x.id === s.id)) { c.students.push(s); c.studentCount = c.students.length }
  return s
}

export async function createClass(courseId: number, name: string): Promise<ManagedClass> {
  await new Promise(r => setTimeout(r, 400))
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const code = Array.from({ length: 9 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  const course = MOCK_COURSES.find(c => c.id === courseId)
  const c: ManagedClass = { id: Date.now(), courseId, courseTitle: course?.title ?? '', teacherId: 1, name, invitationCode: code, maxStudents: 100, studentCount: 0, status: 'active', createdAt: new Date().toISOString().split('T')[0]!, students: [] }
  MOCK_MANAGED.push(c)
  return c
}

export async function leaveClass(classId: number): Promise<void> {
  await new Promise(r => setTimeout(r, 200))
  MOCK_JOINED = MOCK_JOINED.filter(c => c.id !== classId)
}

export function formatWatchTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

export { MOCK_COURSES }
