<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/uiStore'
import { useAuthStore } from '@/stores/authStore'
import { ElMessage } from 'element-plus'
import { useAiChat } from './composables/useAiChat'
import AiFloatingButton from './components/AiFloatingButton.vue'
import AiChatPanel from './components/AiChatPanel.vue'

const router = useRouter()
const uiStore = useUiStore()
const authStore = useAuthStore()
const { messages, isStreaming, sendMessage, stopStreaming } = useAiChat()

function handleToggleAi() {
  if (!authStore.isLoggedIn) {
    ElMessage.warning('请先登录后使用小映助手')
    router.push('/login')
    return
  }
  uiStore.toggleAiPanel()
}
</script>

<template>
  <Teleport to="body">
    <!-- 悬浮按钮：面板关闭或最小化时显示 -->
    <AiFloatingButton v-if="!uiStore.aiPanelOpen || uiStore.aiPanelMinimized" @toggle="handleToggleAi" />

    <!-- 对话面板：打开且未最小化时显示 -->
    <AiChatPanel
      v-if="uiStore.aiPanelOpen && !uiStore.aiPanelMinimized"
      :messages="messages"
      :is-streaming="isStreaming"
      @send="sendMessage"
      @stop="stopStreaming"
    />
  </Teleport>
</template>
