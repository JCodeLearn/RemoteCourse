<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getMessages, deleteMessage, deleteMessages, markAsRead, MESSAGE_TYPE_CONFIG, type Message } from '../api'
import { formatDate } from '@/utils/format'

const messages = ref<Message[]>([])
const total = ref(0)
const selectedIds = ref<Set<number>>(new Set())
const page = ref(1)

const allSelected = computed({
  get: () => messages.value.length > 0 && selectedIds.value.size === messages.value.length,
  set: (v: boolean) => {
    if (v) selectedIds.value = new Set(messages.value.map(m => m.id))
    else selectedIds.value.clear()
  },
})

onMounted(async () => {
  const res = await getMessages()
  messages.value = res.items; total.value = res.total
})

function toggleSelect(id: number) {
  const s = new Set(selectedIds.value)
  if (s.has(id)) s.delete(id); else s.add(id)
  selectedIds.value = s
}

async function handleDeleteOne(id: number) {
  await ElMessageBox.confirm('确认删除此消息？', '删除', { type: 'warning' })
  await deleteMessage(id)
  messages.value = messages.value.filter(m => m.id !== id)
  selectedIds.value.delete(id)
}

async function handleBatchDelete() {
  if (!selectedIds.value.size) return
  await ElMessageBox.confirm(`确认删除选中的 ${selectedIds.value.size} 条消息？`, '批量删除', { type: 'warning' })
  const ids = [...selectedIds.value]
  await deleteMessages(ids)
  messages.value = messages.value.filter(m => !ids.includes(m.id))
  total.value = messages.value.length
  selectedIds.value.clear()
  ElMessage.success('已删除')
}

function handleClick(msg: Message) {
  if (!msg.isRead) {
    markAsRead(msg.id)
    msg.isRead = true
  }
}
</script>

<template>
  <div>
    <h2 class="panel-title">📥 收到的消息</h2>

    <div v-if="messages.length" class="msg-toolbar">
      <el-checkbox v-model="allSelected" :indeterminate="selectedIds.size > 0 && selectedIds.size < messages.length">
        全选
      </el-checkbox>
      <el-button size="small" type="danger" :disabled="!selectedIds.size" @click="handleBatchDelete">
        批量删除{{ selectedIds.size ? ` (${selectedIds.size})` : '' }}
      </el-button>
    </div>

    <div v-if="messages.length" class="msg-list">
      <div
        v-for="msg in messages" :key="msg.id"
        class="msg-item" :class="{ unread: !msg.isRead }"
        @click="handleClick(msg)"
      >
        <el-checkbox :model-value="selectedIds.has(msg.id)" @change="toggleSelect(msg.id)" @click.stop />
        <span class="msg-icon" :style="{ color: MESSAGE_TYPE_CONFIG[msg.type].color }">
          <el-icon :size="18"><component :is="MESSAGE_TYPE_CONFIG[msg.type].icon" /></el-icon>
        </span>
        <div class="msg-body">
          <div class="msg-header">
            <span class="msg-sender">{{ msg.senderName }}</span>
            <el-tag size="small" :type="msg.type === 'system' ? 'info' : ''">{{ MESSAGE_TYPE_CONFIG[msg.type].label }}</el-tag>
            <span class="msg-time">{{ formatDate(msg.createdAt) }}</span>
          </div>
          <p class="msg-title">{{ msg.title }}</p>
          <p class="msg-content">{{ msg.content }}</p>
        </div>
        <el-button size="small" text type="danger" class="msg-delete" @click.stop="handleDeleteOne(msg.id)">删除</el-button>
      </div>
    </div>

    <el-empty v-else description="暂无消息" :image-size="80" />

    <div v-if="total > 10" class="msg-pagination">
      <el-pagination v-model:current-page="page" :total="total" :page-size="10" small layout="prev, pager, next" />
    </div>
  </div>
</template>

<style scoped>
.panel-title { font-size: var(--font-size-xl); font-weight: 700; margin-bottom: var(--spacing-lg); }

.msg-toolbar { display: flex; align-items: center; gap: var(--spacing-md); padding-bottom: var(--spacing-md); border-bottom: 1px solid var(--color-border-light); margin-bottom: var(--spacing-sm); }

.msg-list { display: flex; flex-direction: column; }
.msg-item { display: flex; align-items: flex-start; gap: var(--spacing-sm); padding: var(--spacing-md); border-radius: var(--radius-sm); transition: background var(--transition-fast); cursor: pointer; }
.msg-item:hover { background: var(--color-bg); }
.msg-item.unread { border-left: 3px solid var(--color-primary); background: var(--color-primary-surface); }
.msg-icon { padding-top: 2px; flex-shrink: 0; }
.msg-body { flex: 1; min-width: 0; }
.msg-header { display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: 2px; }
.msg-sender { font-weight: 600; font-size: var(--font-size-sm); }
.msg-time { font-size: var(--font-size-xs); color: var(--color-text-placeholder); margin-left: auto; }
.msg-title { font-size: var(--font-size-sm); font-weight: 500; color: var(--color-text-primary); }
.msg-content { font-size: var(--font-size-xs); color: var(--color-text-placeholder); margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.msg-delete { flex-shrink: 0; opacity: 0; transition: opacity var(--transition-fast); }
.msg-item:hover .msg-delete { opacity: 1; }

.msg-pagination { display: flex; justify-content: center; margin-top: var(--spacing-lg); }
</style>
