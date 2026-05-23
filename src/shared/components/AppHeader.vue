<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useUiStore } from '@/stores/uiStore'

const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUiStore()

function handleLogout() {
  authStore.logout()
  router.push('/home')
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

        <el-button class="header-btn" size="small" round>
          <el-icon :size="16"><Collection /></el-icon>
          <span>课程中心</span>
        </el-button>

        <el-button class="header-btn" size="small" round>
          <el-icon :size="16"><Clock /></el-icon>
          <span>历史</span>
        </el-button>

        <el-button class="header-btn" size="small" round @click="router.push('/inbox')">
          <el-icon :size="16"><Bell /></el-icon>
          <span>收件箱</span>
        </el-button>

        <el-button class="header-btn ai-btn" size="small" round @click="uiStore.toggleAiPanel()">
          <el-icon :size="16"><MagicStick /></el-icon>
          <span>小映助手</span>
        </el-button>

        <!-- 个人头像 -->
        <el-dropdown trigger="click">
          <span class="user-area">
            <el-avatar v-if="authStore.isLoggedIn" :size="32" :src="authStore.user?.avatarUrl" />
            <el-icon v-else :size="28" color="var(--color-text-placeholder)"><UserFilled /></el-icon>
          </span>

          <template #dropdown>
            <template v-if="authStore.isLoggedIn">
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
            <template v-else>
              <el-dropdown-item @click="router.push('/login')">
                <el-icon><Key /></el-icon>登录 / 注册
              </el-dropdown-item>
            </template>
          </template>
        </el-dropdown>
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
