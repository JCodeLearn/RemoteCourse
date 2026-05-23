<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { getDiscussionMessages, sendDiscussionMessage, type DiscussionMessage } from '../api'
import { useAuthStore } from '@/stores/authStore'
import { formatDate } from '@/utils/format'

const props = defineProps<{ courseId: string }>()
const router = useRouter()
const auth = useAuthStore()
const messages = ref<DiscussionMessage[]>([])
const newMsg = ref('')
const sending = ref(false)
const listRef = ref<HTMLDivElement | null>(null)

// Mock 判断是否已加入（从 course/2 已加入）
const isEnrolled = true

onMounted(async () => {
  if (!auth.isLoggedIn) { router.push('/login'); return }
  messages.value = await getDiscussionMessages()
  scrollToBottom()
})

async function handleSend() {
  if (!newMsg.value.trim()) return
  sending.value = true
  try {
    const msg = await sendDiscussionMessage(newMsg.value.trim())
    messages.value.push(msg)
    newMsg.value = ''
    scrollToBottom()
  } finally { sending.value = false }
}

function scrollToBottom() {
  nextTick(() => { if (listRef.value) listRef.value.scrollTop = listRef.value.scrollHeight })
}
</script>

<template>
  <div class="discussion-page page-container">
    <div class="disc-header">
      <el-button text @click="router.push(`/course/${courseId}`)">
        <el-icon :size="16"><ArrowLeft /></el-icon>
        返回课程详情
      </el-button>
      <h2>💬 课程讨论空间</h2>
    </div>

    <div ref="listRef" class="disc-messages">
      <div v-for="msg in messages" :key="msg.id" class="disc-msg" :class="{ mine: msg.senderId === 1 }">
        <span class="dm-sender">{{ msg.senderName }}</span>
        <span class="dm-content">{{ msg.content }}</span>
        <span class="dm-time">{{ formatDate(msg.createdAt) }}</span>
      </div>
      <el-empty v-if="!messages.length" description="暂无消息" :image-size="60" />
    </div>

    <div class="disc-input">
      <el-input v-model="newMsg" placeholder="输入消息..." @keyup.enter="handleSend" />
      <el-button type="primary" :loading="sending" @click="handleSend">发送</el-button>
    </div>
  </div>
</template>

<style scoped>
.discussion-page { background: var(--color-bg); min-height: calc(100vh - var(--header-height)); padding-top: var(--spacing-lg); padding-bottom: var(--spacing-2xl); max-width: 800px; margin: 0 auto; }
.disc-header { display: flex; align-items: center; gap: var(--spacing-md); margin-bottom: var(--spacing-lg); }
.disc-header h2 { font-size: var(--font-size-xl); font-weight: 700; }

.disc-messages { height: 50vh; overflow-y: auto; padding: var(--spacing-md); background: var(--color-bg-white); border-radius: var(--radius-md); margin-bottom: var(--spacing-md); display: flex; flex-direction: column; gap: var(--spacing-sm); box-shadow: var(--shadow-card); }
.disc-msg { padding: var(--spacing-sm) var(--spacing-md); background: #f0f2f5; border-radius: var(--radius-sm); max-width: 75%; align-self: flex-start; }
.disc-msg.mine { align-self: flex-end; background: var(--color-primary-surface); }
.dm-sender { font-size: var(--font-size-xs); font-weight: 600; color: var(--color-primary); display: block; }
.dm-content { font-size: var(--font-size-sm); color: var(--color-text-primary); }
.dm-time { font-size: 10px; color: var(--color-text-placeholder); display: block; text-align: right; margin-top: 2px; }

.disc-input { display: flex; gap: var(--spacing-sm); }
.disc-input .el-input { flex: 1; }
</style>
