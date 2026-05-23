import { ref } from 'vue'
import { getCourses } from '../api'
import type { Course } from '@/types'

export function useCourseList() {
  const items = ref<Course[]>([])
  const page = ref(1)
  const size = 12
  const total = ref(0)
  const loading = ref(false)
  const finished = ref(false)
  const categoryId = ref(0)

  async function loadMore() {
    if (loading.value || finished.value) return
    loading.value = true
    try {
      const data = await getCourses({
        page: page.value,
        size,
        categoryId: categoryId.value,
      })
      items.value.push(...data.items)
      total.value = data.total
      page.value++
      if (items.value.length >= total.value) finished.value = true
    } finally {
      loading.value = false
    }
  }

  async function switchCategory(id: number) {
    if (id === categoryId.value) return
    categoryId.value = id
    items.value = []
    page.value = 1
    total.value = 0
    finished.value = false
    await loadMore()
  }

  return { items, loading, finished, categoryId, loadMore, switchCategory }
}
