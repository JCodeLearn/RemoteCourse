<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import InboxSidebar from './components/InboxSidebar.vue'
import MessageList from './components/MessageList.vue'
import ComposeNotice from './components/ComposeNotice.vue'
import { getUnreadCount } from './api'

const activeMenu = ref('inbox')

// 加载未读数 → 后续 Phase 5 改为 WebSocket 实时推送
const unreadCount = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

onMounted(async () => {
  unreadCount.value = await getUnreadCount()
  // 暂时用轻量轮询(页面可见时)，Phase 5 改 WebSocket
  timer = setInterval(async () => {
    if (document.visibilityState === 'visible') {
      unreadCount.value = await getUnreadCount()
    }
  }, 30000)
})

onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<template>
  <div class="inbox-page page-container">
    <div class="inbox-layout">
      <InboxSidebar :active-menu="activeMenu" @select="activeMenu = $event" />
      <main class="inbox-content">
        <MessageList v-if="activeMenu === 'inbox'" />
        <ComposeNotice v-else />
      </main>
    </div>
  </div>
</template>

<style scoped>
.inbox-page { background: var(--color-bg); min-height: calc(100vh - var(--header-height)); padding-top: var(--spacing-lg); padding-bottom: var(--spacing-2xl); }
.inbox-layout { display: flex; gap: var(--spacing-xl); align-items: flex-start; }
.inbox-content { flex: 1; min-width: 0; background: var(--color-bg-white); border-radius: var(--radius-md); box-shadow: var(--shadow-card); padding: var(--spacing-xl); }
</style>
