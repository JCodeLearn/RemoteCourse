export type NotificationType = 'reply' | 'mention' | 'system' | 'enroll'

export interface Notification {
  id: number
  recipientId: number
  senderId: number | null
  senderName: string | null
  type: NotificationType
  title: string
  content: string | null
  isRead: boolean
  createdAt: string
}

export interface NotificationCount {
  unreadCount: number
}
