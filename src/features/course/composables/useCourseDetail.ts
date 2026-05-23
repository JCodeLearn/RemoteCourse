import { ref, readonly } from 'vue'
import { getCourseDetail, toggleLike, type CourseDetail } from '../api'

export function useCourseDetail() {
  const detail = ref<CourseDetail | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDetail(courseId: number) {
    loading.value = true
    error.value = null
    try {
      detail.value = await getCourseDetail(courseId)
    } catch (e: unknown) {
      error.value = (e as Error).message || '加载失败'
    } finally {
      loading.value = false
    }
  }

  async function handleToggleLike() {
    if (!detail.value) return
    try {
      const liked = await toggleLike(detail.value.course.id)
      detail.value.isLiked = liked
      detail.value.course.likeCount += liked ? 1 : -1
    } catch {
      // ignore
    }
  }

  return {
    detail: readonly(detail),
    loading: readonly(loading),
    error: readonly(error),
    loadDetail,
    handleToggleLike,
  }
}
