<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useUiStore } from '@/stores/uiStore'
import { ElMessage } from 'element-plus'
import { getUnreadCount } from '@/features/inbox/api'

const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUiStore()

const unreadCount = ref(0)
let unreadTimer: ReturnType<typeof setInterval> | null = null

onMounted(async () => {
  if (authStore.isLoggedIn) {
    unreadCount.value = await getUnreadCount()
    // Phase 5 改为 WebSocket 实时推送
    unreadTimer = setInterval(async () => {
      if (document.visibilityState === 'visible') {
        unreadCount.value = await getUnreadCount()
      }
    }, 30000)
  }
})

onUnmounted(() => { if (unreadTimer) clearInterval(unreadTimer) })

function handleLogout() {
  authStore.logout()
  router.push('/home')
}

function handleAiClick() {
  if (!authStore.isLoggedIn) {
    ElMessage.warning('请先登录后使用小映助手')
    router.push('/login')
    return
  }
  uiStore.toggleAiPanel()
}
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <!-- 左侧：Logo + 校徽 -->
      <router-link to="/home" class="header-logo">
        <img src="/badge.jpg" class="header-badge" alt="" />
        <span class="logo-text">点映</span>
      </router-link>

      <!-- 右侧：功能按钮组 -->
      <div class="header-right">
        <el-button class="header-btn" size="small" round>
          <el-icon :size="16"><CirclePlus /></el-icon>
          <span>加入课程</span>
        </el-button>

        <el-button class="header-btn" size="small" round @click="router.push('/classes')">
          <el-icon :size="16"><Collection /></el-icon>
          <span>课程中心</span>
        </el-button>

        <el-button class="header-btn" size="small" round @click="router.push('/history')">
          <el-icon :size="16"><Clock /></el-icon>
          <span>历史</span>
        </el-button>

        <el-badge :value="unreadCount" :hidden="unreadCount === 0" :max="99">
          <el-button class="header-btn" size="small" round @click="router.push('/inbox')">
            <el-icon :size="16"><Bell /></el-icon>
            <span>消息</span>
          </el-button>
        </el-badge>

        <el-button class="header-btn ai-btn" size="small" round @click="handleAiClick">
          <el-icon :size="16"><MagicStick /></el-icon>
          <span>小映助手</span>
        </el-button>

        <!-- 个人头像 -->
        <template v-if="authStore.isLoggedIn">
          <el-dropdown trigger="click">
            <span class="user-area">
              <el-avatar :size="32" :src="authStore.user?.avatarUrl || '/default-avatar.png'" @click.stop="router.push('/personal')" />
            </span>
            <template #dropdown>
              <el-dropdown-item @click="router.push('/personal')">
                <el-icon><User /></el-icon>个人中心
              </el-dropdown-item>
              <el-dropdown-item v-if="authStore.isTeacher" @click="router.push('/management')">
                <el-icon><Setting /></el-icon>课程管理
              </el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout">
                <el-icon><SwitchButton /></el-icon>退出登录
              </el-dropdown-item>
            </template>
          </el-dropdown>
        </template>
        <template v-else>
          <span class="user-area" @click="router.push('/login')">
            <el-avatar :size="32" src="/default-avatar.png" />
          </span>
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background: var(--color-bg-white);
  border-bottom: 1px solid var(--color-border-light);
  z-index: 1000;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.header-inner {
  max-width: var(--content-max-width);
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-lg);
}

/* === 左侧 Logo === */
.header-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.header-badge {
  height: 32px;
  width: auto;
}

.logo-text {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 2px;
}

/* === 右侧按钮 === */
.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.header-btn {
  color: var(--color-text-secondary);
  border: none;
  background: transparent;
  padding: 6px 14px;
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
}
.header-btn:hover {
  color: var(--color-primary);
  background: var(--color-primary-surface);
}
.header-btn .el-icon {
  margin-right: 4px;
}

.ai-btn {
  color: var(--color-primary-light);
  border: 1px solid var(--color-primary-light);
}
.ai-btn:hover {
  color: #fff;
  background: var(--color-primary);
  border-color: var(--color-primary);
}

/* === 头像 === */
.user-area {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 2px;
  margin-left: 4px;
}
</style>
