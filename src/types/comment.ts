export interface Comment {
  id: number
  courseId: number
  userId: number
  username: string
  userAvatar: string | null
  parentId: number | null
  content: string
  likeCount: number
  createdAt: string
  replies?: Comment[]
}

export interface DiscussionRoom {
  id: number
  classId: number
  name: string
}

export interface DiscussionMessage {
  id: number
  roomId: number
  senderId: number
  senderName: string
  senderAvatar: string | null
  content: string
  messageType: 'text' | 'image' | 'file'
  createdAt: string
}
