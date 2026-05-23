import { ref, type Ref } from 'vue'

export function usePagination<T>(fetchFn: (page: number, size: number) => Promise<{ items: T[]; total: number }>) {
  const items: Ref<T[]> = ref([])
  const page = ref(1)
  const size = ref(12)
  const total = ref(0)
  const loading = ref(false)
  const finished = ref(false)

  async function loadMore() {
    if (loading.value || finished.value) return
    loading.value = true
    try {
      const result = await fetchFn(page.value, size.value)
      items.value.push(...result.items)
      total.value = result.total
      page.value++
      if (items.value.length >= total.value) finished.value = true
    } finally {
      loading.value = false
    }
  }

  async function refresh() {
    items.value = []
    page.value = 1
    total.value = 0
    finished.value = false
    await loadMore()
  }

  return { items, page, total, loading, finished, loadMore, refresh }
}
