<script setup lang="ts">
defineProps<{
  teacherName: string
  teacherAvatar: string | null
}>()
</script>

<template>
  <div class="up-info">
    <div class="up-label">
      <el-icon :size="14"><UserFilled /></el-icon>
      <span>UP主</span>
    </div>

    <div class="up-main">
      <el-avatar :size="48" :src="teacherAvatar">
        <el-icon :size="24"><UserFilled /></el-icon>
      </el-avatar>
      <div class="up-detail">
        <span class="up-name">{{ teacherName }}</span>
        <el-tooltip content="此功能暂未开放">
          <el-button size="small" round disabled>
            <el-icon :size="14"><CirclePlus /></el-icon>
            关注
          </el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.up-info {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border-light);
  margin-bottom: var(--spacing-md);
}

.up-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-xs);
  color: var(--color-text-placeholder);
  margin-bottom: var(--spacing-sm);
}

.up-main {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.up-detail {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.up-name {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text-primary);
}
</style>
