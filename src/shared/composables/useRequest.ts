import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/authStore'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

let isRefreshing = false
let pendingRequests: Array<(token: string) => void> = []

instance.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`
  }
  return config
})

instance.interceptors.response.use(
  (response) => {
    const body = response.data
    if (body.code === 200) return body.data
    return Promise.reject(new Error(body.message || '请求失败'))
  },
  async (error) => {
    const { config, response } = error
    if (response?.status === 401 && !config._retry) {
      const authStore = useAuthStore()
      if (!authStore.refreshToken) {
        authStore.clearAuth()
        window.location.href = '/login'
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingRequests.push((token: string) => {
            config.headers.Authorization = `Bearer ${token}`
            resolve(instance(config))
          })
        })
      }

      config._retry = true
      isRefreshing = true

      try {
        const newToken = await authStore.refreshAccessToken()
        pendingRequests.forEach((cb) => cb(newToken))
        pendingRequests = []
        config.headers.Authorization = `Bearer ${newToken}`
        return instance(config)
      } catch {
        authStore.clearAuth()
        window.location.href = '/login'
        return Promise.reject(error)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  },
)

export async function get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<T> {
  return instance.get(url, { params })
}

export async function post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  return instance.post(url, data, config)
}

export async function put<T = unknown>(url: string, data?: unknown): Promise<T> {
  return instance.put(url, data)
}

export async function del<T = unknown>(url: string): Promise<T> {
  return instance.delete(url)
}

export async function upload<T = unknown>(
  url: string,
  file: File,
  onProgress?: (percent: number) => void,
): Promise<T> {
  const formData = new FormData()
  formData.append('file', file)
  return instance.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (e.total && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100))
      }
    },
  })
}
