<script setup lang="ts">
defineProps<{
  isEnrolled: boolean
}>()
</script>

<template>
  <div class="course-space-entry" :class="{ enrolled: isEnrolled }">
    <div class="space-icon">
      <el-icon :size="22"><Collection /></el-icon>
    </div>
    <div class="space-text">
      <span class="space-label">进入课程空间</span>
      <span v-if="!isEnrolled" class="space-hint">加入课程后可参与讨论</span>
      <span v-else class="space-hint enrolled-hint">点击进入课程专属讨论区</span>
    </div>
    <el-icon v-if="!isEnrolled" :size="14" color="var(--color-text-placeholder)"><Lock /></el-icon>
    <el-icon v-else :size="14" color="var(--color-primary)"><ArrowRightBold /></el-icon>
  </div>
</template>

<style scoped>
.course-space-entry {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  border: 1px solid var(--color-border-light);
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-bottom: var(--spacing-md);
}
.course-space-entry:hover {
  border-color: var(--color-primary-light);
  background: var(--color-primary-surface);
}
.course-space-entry.enrolled:hover {
  border-color: var(--color-primary);
}

.space-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: var(--color-primary-surface);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.space-text {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.space-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}
.space-hint {
  font-size: var(--font-size-xs);
  color: var(--color-text-placeholder);
}
.enrolled-hint {
  color: var(--color-primary-light);
}
</style>
