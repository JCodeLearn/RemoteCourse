<script setup lang="ts">
import { useUiStore } from '@/stores/uiStore'
import { useAiChat } from './composables/useAiChat'
import AiFloatingButton from './components/AiFloatingButton.vue'
import AiChatPanel from './components/AiChatPanel.vue'

const uiStore = useUiStore()
const { messages, isStreaming, sendMessage, stopStreaming } = useAiChat()
</script>

<template>
  <Teleport to="body">
    <!-- 悬浮按钮：面板关闭或最小化时显示 -->
    <AiFloatingButton v-if="!uiStore.aiPanelOpen || uiStore.aiPanelMinimized" />

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
