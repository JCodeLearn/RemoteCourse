import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const aiPanelOpen = ref(false)
  const aiPanelMinimized = ref(false)
  const sidebarCollapsed = ref(false)
  const globalLoading = ref(false)

  interface Toast {
    id: number
    message: string
    type: 'success' | 'warning' | 'error' | 'info'
  }

  const toastQueue = ref<Toast[]>([])
  let toastId = 0

  function showToast(message: string, type: Toast['type'] = 'info') {
    const id = ++toastId
    toastQueue.value.push({ id, message, type })
    setTimeout(() => {
      toastQueue.value = toastQueue.value.filter((t) => t.id !== id)
    }, 3000)
  }

  function toggleAiPanel() {
    if (aiPanelOpen.value) {
      aiPanelMinimized.value = !aiPanelMinimized.value
    } else {
      aiPanelOpen.value = true
      aiPanelMinimized.value = false
    }
  }

  function closeAiPanel() {
    aiPanelOpen.value = false
    aiPanelMinimized.value = false
  }

  return {
    aiPanelOpen,
    aiPanelMinimized,
    sidebarCollapsed,
    globalLoading,
    toastQueue,
    showToast,
    toggleAiPanel,
    closeAiPanel,
  }
})
