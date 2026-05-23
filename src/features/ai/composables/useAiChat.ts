import { ref, readonly } from 'vue'
import { chatStream } from '../api'

export interface AiMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  isStreaming: boolean
}

let nextId = 0

export function useAiChat() {
  const messages = ref<AiMessage[]>([])
  const isStreaming = ref(false)
  const error = ref<string | null>(null)
  let abortController: AbortController | null = null

  function sendMessage(content: string) {
    if (isStreaming.value || !content.trim()) return
    error.value = null

    // 添加用户消息
    messages.value.push({
      id: String(++nextId),
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
      isStreaming: false,
    })

    // 添加空的助手消息
    const assistantId = String(++nextId)
    const assistantMsg: AiMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      isStreaming: true,
    }
    messages.value.push(assistantMsg)

    isStreaming.value = true
    abortController = new AbortController()

    chatStream(
      messages.value,
      (token) => {
        assistantMsg.content += token
      },
      () => {
        assistantMsg.isStreaming = false
        isStreaming.value = false
        abortController = null
      },
      (msg) => {
        error.value = msg
        assistantMsg.content = assistantMsg.content || msg
        assistantMsg.isStreaming = false
        isStreaming.value = false
        abortController = null
      },
      abortController.signal,
    )
  }

  function stopStreaming() {
    if (abortController) {
      abortController.abort()
      const last = messages.value[messages.value.length - 1]
      if (last && last.isStreaming) {
        last.isStreaming = false
      }
      isStreaming.value = false
      abortController = null
    }
  }

  function clearMessages() {
    stopStreaming()
    messages.value = []
    error.value = null
  }

  return {
    messages: readonly(messages),
    isStreaming: readonly(isStreaming),
    error: readonly(error),
    sendMessage,
    stopStreaming,
    clearMessages,
  }
}
