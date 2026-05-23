<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

defineProps<{
  activeMenu: string
}>()

const emit = defineEmits<{
  select: [menu: string]
}>()

const authStore = useAuthStore()
const router = useRouter()

const mainMenus = [
  { key: 'profile', label: '个人信息', icon: 'User' },
  { key: 'password', label: '修改密码', icon: 'Lock' },
  { key: 'history', label: '观看历史', icon: 'Clock' },
]

const teacherMenus = [
  { key: 'myVideos', label: '我的发布', icon: 'VideoCamera' },
]

function handleSwitchAccount() {
  authStore.clearAuth()
  router.push('/login')
}
function handleLogout() {
  authStore.logout()
  router.push('/home')
}
</script>

<template>
  <aside class="user-sidebar">
    <!-- 用户卡片 -->
    <div class="user-card">
      <el-avatar :size="56" :src="authStore.user?.avatarUrl || '/default-avatar.png'" />
      <div class="user-info">
        <span class="user-name">{{ authStore.user?.username }}</span>
        <span class="level-badge">V{{ authStore.user?.level ?? 0 }}</span>
      </div>
    </div>

    <!-- 主菜单 -->
    <nav class="menu-list">
      <button
        v-for="m in mainMenus"
        :key="m.key"
        class="menu-item"
        :class="{ active: activeMenu === m.key }"
        @click="emit('select', m.key)"
      >
        <el-icon :size="16"><component :is="m.icon" /></el-icon>
        <span>{{ m.label }}</span>
      </button>

      <div v-if="authStore.isTeacher" class="menu-divider" />

      <button
        v-if="authStore.isTeacher"
        v-for="m in teacherMenus"
        :key="m.key"
        class="menu-item"
        :class="{ active: activeMenu === m.key }"
        @click="emit('select', m.key)"
      >
        <el-icon :size="16"><component :is="m.icon" /></el-icon>
        <span>{{ m.label }}</span>
      </button>

      <button
        v-if="authStore.isTeacher"
        class="menu-item"
        @click="router.push('/management')"
      >
        <el-icon :size="16"><Edit /></el-icon>
        <span>创作中心</span>
      </button>
    </nav>

    <!-- 底部操作 -->
    <div class="bottom-actions">
      <button class="menu-item" @click="handleSwitchAccount">
        <el-icon :size="16"><Switch /></el-icon>
        <span>切换账号</span>
      </button>
      <button class="menu-item danger" @click="handleLogout">
        <el-icon :size="16"><SwitchButton /></el-icon>
        <span>退出登录</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.user-sidebar {
  width: 260px;
  flex-shrink: 0;
  background: var(--color-bg-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.user-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: linear-gradient(135deg, var(--color-primary-surface), var(--color-primary));
  color: #fff;
}
.user-name { font-size: var(--font-size-md); font-weight: 600; }
.user-info { display: flex; flex-direction: column; gap: 4px; }

.level-badge {
  display: inline-flex; align-items: center; justify-content: center;
  width: 28px; height: 18px;
  background: rgba(255,255,255,0.25); color: #fff;
  border-radius: 4px; font-size: 11px; font-weight: 700;
  letter-spacing: 0.5px;
}

.menu-list {
  flex: 1;
  padding: var(--spacing-sm) 0;
}

.menu-divider {
  height: 1px;
  background: var(--color-border-light);
  margin: var(--spacing-sm) var(--spacing-base);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.menu-item:hover { color: var(--color-primary); background: var(--color-primary-surface); }
.menu-item.active { color: var(--color-primary); font-weight: 600; background: var(--color-primary-surface); }
.menu-item.danger:hover { color: var(--color-accent); background: var(--color-accent-surface); }

.bottom-actions {
  border-top: 1px solid var(--color-border-light);
  padding: var(--spacing-sm) 0;
}
</style>
