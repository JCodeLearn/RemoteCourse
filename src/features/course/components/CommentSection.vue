<script setup lang="ts">
defineProps<{
  commentCount: number
}>()
</script>

<template>
  <div class="comment-section">
    <h3 class="section-title">
      <el-icon :size="18"><ChatDotRound /></el-icon>
      评论 ({{ commentCount }})
    </h3>
    <el-empty description="评论功能开发中，敬请期待" :image-size="80" />
  </div>
</template>

<style scoped>
.comment-section {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border-light);
}

.section-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}
</style>
