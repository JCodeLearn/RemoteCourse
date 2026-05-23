<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const user = authStore.user
</script>

<template>
  <div class="profile-panel">
    <h2 class="panel-title">📋 个人信息</h2>

    <div class="profile-card">
      <div class="avatar-section">
        <el-avatar :size="80" :src="user?.avatarUrl || '/default-avatar.png'" />
        <el-tooltip content="此功能待后端实现">
          <span class="avatar-change-hint">更换头像</span>
        </el-tooltip>
      </div>

      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">用户名</span>
          <span class="info-value">{{ user?.username }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">邮箱</span>
          <span class="info-value">{{ user?.email }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">等级</span>
          <span class="level-badge-lg">V{{ user?.level ?? 0 }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">注册时间</span>
          <span class="info-value">{{ user?.createdAt || '—' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
}

.profile-card {
  display: flex;
  gap: var(--spacing-2xl);
  align-items: flex-start;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.avatar-change-hint {
  font-size: var(--font-size-xs);
  color: var(--color-primary-light);
  cursor: pointer;
}

.info-grid {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.info-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.info-label {
  width: 60px;
  font-size: var(--font-size-sm);
  color: var(--color-text-placeholder);
  flex-shrink: 0;
}

.info-value {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.level-badge-lg {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 36px; height: 22px; padding: 0 6px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: #fff; border-radius: 4px;
  font-size: var(--font-size-xs); font-weight: 700; letter-spacing: 0.5px;
}
</style>
