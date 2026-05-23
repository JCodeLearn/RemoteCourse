export interface Message {
  id: number
  type: MessageType
  title: string
  content: string
  senderName: string
  isRead: boolean
  createdAt: string
}

export type MessageType = 'reply' | 'mention' | 'system' | 'enroll' | 'private'

export const MESSAGE_TYPE_CONFIG: Record<MessageType, { icon: string; color: string; label: string }> = {
  reply: { icon: 'ChatDotRound', color: '#409EFF', label: '回复' },
  mention: { icon: 'ChatLineRound', color: '#E6A23C', label: '@提及' },
  system: { icon: 'Bell', color: '#909399', label: '系统' },
  enroll: { icon: 'CirclePlus', color: '#67C23A', label: '加入' },
  private: { icon: 'Message', color: '#8B5CF6', label: '私信' },
}

const MOCK_MESSAGES: Message[] = [
  { id: 1, type: 'system', title: '课程更新通知', content: '你加入的课程"深入理解计算机系统"已更新第6集内容，点击查看。', senderName: '系统', isRead: false, createdAt: '2026-05-24T10:00:00Z' },
  { id: 2, type: 'reply', title: '新的回复', content: '陈教授 回复了你在"高等数学"课程中的评论：讲得很清晰！', senderName: '陈教授', isRead: false, createdAt: '2026-05-24T08:30:00Z' },
  { id: 3, type: 'private', title: '关于作业的问题', content: '张教授向你发送了一条私信：同学你好，你的作业提交格式有一点小问题，请重新提交一下。', senderName: '张教授', isRead: true, createdAt: '2026-05-23T14:20:00Z' },
  { id: 4, type: 'enroll', title: '加入班级成功', content: '你已成功加入"2024春-高数A班"，邀请码: K1L2M3N4O。', senderName: '系统', isRead: true, createdAt: '2026-05-22T09:00:00Z' },
  { id: 5, type: 'mention', title: '有人在讨论中提到了你', content: '李四 在"数据结构"课程讨论空间中@了你：@Great 这道题你是怎么解的？', senderName: '李四', isRead: false, createdAt: '2026-05-21T16:45:00Z' },
  { id: 6, type: 'system', title: '平台维护通知', content: '点映平台将于 5月25日 凌晨2:00-4:00 进行系统维护，期间可能无法访问。', senderName: '系统', isRead: true, createdAt: '2026-05-20T12:00:00Z' },
  { id: 7, type: 'reply', title: '新的回复', content: '赵六 回复了你在"计算机网络"课程中的评论。', senderName: '赵六', isRead: false, createdAt: '2026-05-19T20:10:00Z' },
]

const MOCK_CLASSES = [
  { id: 1, name: '2024春-计算机系统班' },
  { id: 2, name: '2024春-数据结构班' },
]

// ====== API ======

export async function getMessages(page = 1, size = 10): Promise<{ items: Message[]; total: number }> {
  await new Promise(r => setTimeout(r, 300))
  return { items: MOCK_MESSAGES, total: MOCK_MESSAGES.length }
}

export async function getUnreadCount(): Promise<number> {
  await new Promise(r => setTimeout(r, 100))
  return MOCK_MESSAGES.filter(m => !m.isRead).length
}

export async function markAsRead(id: number): Promise<void> {
  const m = MOCK_MESSAGES.find(x => x.id === id)
  if (m) m.isRead = true
}

export async function deleteMessage(id: number): Promise<void> {
  const idx = MOCK_MESSAGES.findIndex(x => x.id === id)
  if (idx !== -1) MOCK_MESSAGES.splice(idx, 1)
}

export async function deleteMessages(ids: number[]): Promise<void> {
  for (const id of ids) {
    const idx = MOCK_MESSAGES.findIndex(x => x.id === id)
    if (idx !== -1) MOCK_MESSAGES.splice(idx, 1)
  }
}

export async function sendNotice(data: {
  targetType: 'class' | 'user'
  targetId?: number
  targetEmail?: string
  title: string
  content: string
}): Promise<void> {
  await new Promise(r => setTimeout(r, 400))
}

export { MOCK_CLASSES }
