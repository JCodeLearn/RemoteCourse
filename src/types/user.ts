export type UserRole = 'student' | 'teacher' | 'admin'

export interface User {
  id: number
  username: string
  email: string
  avatarUrl: string | null
  role: UserRole
  level: number          // V0-V6, 由后端根据注册时长+投稿数+获赞数计算
  status: 'active' | 'disabled'
  createdAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  verifyCode: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}
