import { ref, type Ref, onUnmounted } from 'vue'

export function useDebounce<T extends (...args: never[]) => unknown>(fn: T, delay = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null

  function debounced(...args: Parameters<T>) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return debounced
}

export function useDebouncedRef<T>(initial: T, delay = 300): Ref<T> {
  const state = ref(initial) as Ref<T>
  const debounced = ref(initial) as Ref<T>
  let timer: ReturnType<typeof setTimeout> | null = null

  return {
    get value() {
      return debounced.value
    },
    set value(v: T) {
      state.value = v
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        debounced.value = v
      }, delay)
    },
  } as Ref<T>
}
