import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, AuthTokens, LoginRequest, RegisterRequest } from '@/types'
import { post } from '@/shared/composables/useRequest'

const TOKEN_KEY = 'dianying_tokens'
const USER_KEY = 'dianying_user'

function loadTokens(): AuthTokens | null {
  const raw = localStorage.getItem(TOKEN_KEY)
  return raw ? JSON.parse(raw) : null
}

function saveTokens(tokens: AuthTokens) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens))
}

function clearTokens() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const user = ref<User | null>(null)

  const isLoggedIn = computed(() => !!accessToken.value && !!user.value)
  const isTeacher = computed(() => user.value?.role === 'teacher')

  function init() {
    const tokens = loadTokens()
    if (tokens) {
      accessToken.value = tokens.accessToken
      refreshToken.value = tokens.refreshToken
    }
    const raw = localStorage.getItem(USER_KEY)
    if (raw) user.value = JSON.parse(raw)
  }

  async function login(data: LoginRequest) {
    // Mock 登录 (后端未就绪时使用)
    if (data.email === 'Great@qq.com' && data.password === '123456') {
      const mockUser: User = {
        id: 1,
        username: 'Great',
        email: 'Great@qq.com',
        avatarUrl: null,
        role: 'teacher',
        status: 'active',
        createdAt: '2026-05-20T10:00:00Z',
      }
      const mockTokens: AuthTokens = {
        accessToken: 'mock-access-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
      }
      accessToken.value = mockTokens.accessToken
      refreshToken.value = mockTokens.refreshToken
      user.value = mockUser
      saveTokens(mockTokens)
      localStorage.setItem(USER_KEY, JSON.stringify(mockUser))
      return
    }

    const result = await post<AuthTokens & { user: User }>('/api/v1/auth/login', data)
    accessToken.value = result.accessToken
    refreshToken.value = result.refreshToken
    user.value = result.user
    saveTokens({ accessToken: result.accessToken, refreshToken: result.refreshToken })
    localStorage.setItem(USER_KEY, JSON.stringify(result.user))
  }

  async function register(data: RegisterRequest) {
    await post('/api/v1/auth/register', data)
  }

  async function refreshAccessToken(): Promise<string> {
    if (!refreshToken.value) throw new Error('No refresh token')
    const result = await post<AuthTokens>('/api/v1/auth/refresh', { refreshToken: refreshToken.value })
    accessToken.value = result.accessToken
    refreshToken.value = result.refreshToken
    saveTokens(result)
    return result.accessToken
  }

  async function logout() {
    try {
      await post('/api/v1/auth/logout')
    } finally {
      clearAuth()
    }
  }

  async function fetchMyProfile() {
    const result = await post<User>('/api/v1/users/me')
    user.value = result
    localStorage.setItem(USER_KEY, JSON.stringify(result))
  }

  function clearAuth() {
    accessToken.value = null
    refreshToken.value = null
    user.value = null
    clearTokens()
  }

  return {
    accessToken,
    refreshToken,
    user,
    isLoggedIn,
    isTeacher,
    init,
    login,
    register,
    refreshAccessToken,
    logout,
    fetchMyProfile,
    clearAuth,
  }
})
