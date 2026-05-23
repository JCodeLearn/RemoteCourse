<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useUiStore } from '@/stores/uiStore'
import AiMessageBubble from './AiMessageBubble.vue'
import AiSuggestions from './AiSuggestions.vue'
import type { AiMessage } from '../composables/useAiChat'

defineProps<{
  messages: readonly AiMessage[]
  isStreaming: boolean
}>()

const emit = defineEmits<{
  send: [content: string]
  stop: []
  clear: []
}>()

const uiStore = useUiStore()

// ====== 拖拽 ======
const panelRef = ref<HTMLDivElement | null>(null)
const dragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const panelPos = ref({ x: 0, y: 0 })

function onDragStart(e: MouseEvent) {
  dragging.value = true
  dragStart.value = { x: e.clientX - panelPos.value.x, y: e.clientY - panelPos.value.y }
  document.addEventListener('mousemove', onDragMove)
  document.addEventListener('mouseup', onDragEnd)
}
function onDragMove(e: MouseEvent) {
  if (!dragging.value) return
  panelPos.value = { x: e.clientX - dragStart.value.x, y: e.clientY - dragStart.value.y }
}
function onDragEnd() {
  dragging.value = false
  document.removeEventListener('mousemove', onDragMove)
  document.removeEventListener('mouseup', onDragEnd)
}

// ====== 缩放 ======
const panelSize = ref({ w: 420, h: 580 })
const resizing = ref(false)
const resizeStart = ref({ x: 0, y: 0, w: 0, h: 0 })

function onResizeStart(e: MouseEvent) {
  e.preventDefault()
  resizing.value = true
  resizeStart.value = { x: e.clientX, y: e.clientY, w: panelSize.value.w, h: panelSize.value.h }
  document.addEventListener('mousemove', onResizeMove)
  document.addEventListener('mouseup', onResizeEnd)
}
function onResizeMove(e: MouseEvent) {
  if (!resizing.value) return
  panelSize.value = {
    w: Math.max(320, resizeStart.value.w + (e.clientX - resizeStart.value.x)),
    h: Math.max(400, resizeStart.value.h + (e.clientY - resizeStart.value.y)),
  }
}
function onResizeEnd() {
  resizing.value = false
  document.removeEventListener('mousemove', onResizeMove)
  document.removeEventListener('mouseup', onResizeEnd)
}

// ====== 输入 ======
const inputText = ref('')
const messagesRef = ref<HTMLDivElement | null>(null)

function handleSend() {
  const text = inputText.value.trim()
  if (!text) return
  emit('send', text)
  inputText.value = ''
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

// 新消息自动滚动
watch(
  () => useUiStore().aiPanelOpen,
  (open) => {
    if (open) {
      panelPos.value = { x: 0, y: 0 }
      nextTick(() => scrollToBottom())
    }
  },
)
watch(
  () => (typeof messagesRef.value?.scrollHeight === 'number' ? messagesRef.value.scrollHeight : 0),
  () => scrollToBottom(),
)

function scrollToBottom() {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}
</script>

<template>
  <div
    ref="panelRef"
    class="ai-panel"
    :class="{ dragging: dragging, resizing: resizing }"
    :style="{
      width: panelSize.w + 'px',
      height: panelSize.h + 'px',
      right: 20 + 'px',
      bottom: 20 + 'px',
      transform: `translate(${panelPos.x}px, ${panelPos.y}px)`,
    }"
  >
    <!-- 标题栏 -->
    <div class="panel-header" @mousedown="onDragStart">
      <span class="panel-title">🤖 小映助手</span>
      <div class="panel-actions">
        <button class="panel-act-btn" title="最小化" @click="uiStore.toggleAiPanel()">−</button>
        <button class="panel-act-btn" title="关闭" @click="uiStore.closeAiPanel()">×</button>
      </div>
    </div>

    <!-- 消息区 -->
    <div ref="messagesRef" class="panel-messages">
      <div v-if="messages.length === 0" class="empty-state">
        <AiSuggestions @select="emit('send', $event)" />
      </div>

      <div v-for="msg in messages" :key="msg.id" class="msg-row">
        <AiMessageBubble :message="msg" />
      </div>
    </div>

    <!-- 输入区 -->
    <div class="panel-input">
      <textarea
        v-model="inputText"
        class="input-area"
        :placeholder="isStreaming ? '小映正在回答...' : '输入问题...'"
        rows="1"
        :disabled="isStreaming"
        @keydown="handleKeydown"
      />
      <el-button
        v-if="!isStreaming"
        type="primary"
        size="small"
        :disabled="!inputText.trim()"
        @click="handleSend"
      >
        <el-icon :size="16"><Promotion /></el-icon>
      </el-button>
      <el-button v-else type="danger" size="small" @click="emit('stop')">
        <el-icon :size="16"><CloseBold /></el-icon>
      </el-button>
    </div>

    <!-- 缩放把手 -->
    <div class="resize-handle" @mousedown="onResizeStart" />
  </div>
</template>

<style scoped>
.ai-panel {
  position: fixed;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-white);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  user-select: none;
}
.dragging { transition: none; }
.resizing { transition: none; }

/* === 标题栏 === */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) var(--spacing-base);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: #fff;
  cursor: grab;
}
.panel-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
}
.panel-actions {
  display: flex;
  gap: 2px;
}
.panel-act-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--font-size-lg);
  transition: background var(--transition-fast);
}
.panel-act-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

/* === 消息区 === */
.panel-messages {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.empty-state {
  margin-top: var(--spacing-lg);
}

.msg-row {
  display: flex;
}

/* === 输入区 === */
.panel-input {
  display: flex;
  align-items: flex-end;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-top: 1px solid var(--color-border-light);
}
.input-area {
  flex: 1;
  resize: none;
  border: none;
  outline: none;
  font-size: var(--font-size-sm);
  font-family: inherit;
  line-height: 1.5;
  min-height: 20px;
  max-height: 80px;
  padding: 4px 0;
}
.input-area::placeholder {
  color: var(--color-text-placeholder);
}

/* === 缩放把手 === */
.resize-handle {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
}
</style>
