<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { getDiscussionMessages, sendDiscussionMessage, type DiscussionMessage } from '../api'
import { useAuthStore } from '@/stores/authStore'
import { formatDate } from '@/utils/format'

defineProps<{ isEnrolled: boolean }>()

const auth = useAuthStore()
const messages = ref<DiscussionMessage[]>([])
const newMsg = ref('')
const sending = ref(false)
const listRef = ref<HTMLDivElement | null>(null)

onMounted(async () => {
  if (!auth.isLoggedIn) return
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
  nextTick(() => {
    if (listRef.value) listRef.value.scrollTop = listRef.value.scrollHeight
  })
}
</script>

<template>
  <div class="discussion-panel">
    <h3 class="section-title">
      <el-icon :size="18"><ChatDotRound /></el-icon>
      课程讨论空间
      <el-tag v-if="!isEnrolled" size="small" type="info">加入课程后解锁</el-tag>
    </h3>

    <template v-if="isEnrolled && auth.isLoggedIn">
      <div ref="listRef" class="disc-messages">
        <div v-for="msg in messages" :key="msg.id" class="disc-msg" :class="{ mine: msg.senderId === 1 }">
          <span class="dm-sender">{{ msg.senderName }}</span>
          <span class="dm-content">{{ msg.content }}</span>
          <span class="dm-time">{{ formatDate(msg.createdAt) }}</span>
        </div>
        <el-empty v-if="!messages.length" description="暂无消息，来发送第一条吧" :image-size="60" />
      </div>

      <div class="disc-input">
        <el-input v-model="newMsg" size="small" placeholder="输入消息..." @keyup.enter="handleSend" />
        <el-button size="small" type="primary" :loading="sending" @click="handleSend">发送</el-button>
      </div>
    </template>

    <div v-else class="disc-locked">
      <el-icon :size="40" color="var(--color-text-placeholder)"><Lock /></el-icon>
      <p>加入课程后可参与讨论</p>
    </div>
  </div>
</template>

<style scoped>
.discussion-panel { margin-top: var(--spacing-lg); padding-top: var(--spacing-lg); border-top: 1px solid var(--color-border-light); }
.section-title { display: flex; align-items: center; gap: var(--spacing-xs); font-size: var(--font-size-md); font-weight: 600; margin-bottom: var(--spacing-md); }

.disc-messages { max-height: 320px; overflow-y: auto; padding: var(--spacing-sm); background: var(--color-bg); border-radius: var(--radius-sm); margin-bottom: var(--spacing-sm); display: flex; flex-direction: column; gap: var(--spacing-sm); }
.disc-msg { padding: var(--spacing-sm) var(--spacing-md); background: var(--color-bg-white); border-radius: var(--radius-sm); max-width: 80%; align-self: flex-start; }
.disc-msg.mine { align-self: flex-end; background: var(--color-primary-surface); }
.dm-sender { font-size: var(--font-size-xs); font-weight: 600; color: var(--color-primary); display: block; }
.dm-content { font-size: var(--font-size-sm); color: var(--color-text-primary); }
.dm-time { font-size: 10px; color: var(--color-text-placeholder); display: block; text-align: right; margin-top: 2px; }

.disc-input { display: flex; gap: var(--spacing-sm); }
.disc-input .el-input { flex: 1; }

.disc-locked { text-align: center; padding: var(--spacing-xl); color: var(--color-text-placeholder); }
.disc-locked p { margin-top: var(--spacing-sm); font-size: var(--font-size-sm); }
</style>
