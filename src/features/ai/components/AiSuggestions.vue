<script setup lang="ts">
const emit = defineEmits<{
  select: [text: string]
}>()

const suggestions = [
  { text: '推荐CS课程', icon: 'Monitor' },
  { text: '我的学习进度', icon: 'DataAnalysis' },
  { text: '有什么课程', icon: 'Collection' },
  { text: '如何使用小映助手', icon: 'MagicStick' },
]
</script>

<template>
  <div class="ai-suggestions">
    <p class="suggest-label">试试问：</p>
    <div class="suggest-chips">
      <button
        v-for="s in suggestions"
        :key="s.text"
        class="suggest-chip"
        @click="emit('select', s.text)"
      >
        <el-icon :size="13"><component :is="s.icon" /></el-icon>
        <span>{{ s.text }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.ai-suggestions {
  padding: var(--spacing-md) var(--spacing-base) 0;
}

.suggest-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-placeholder);
  margin-bottom: var(--spacing-sm);
}

.suggest-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.suggest-chip {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border: 1px solid var(--color-border);
  border-radius: 100px;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  background: var(--color-bg-white);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.suggest-chip:hover {
  color: var(--color-primary);
  border-color: var(--color-primary-light);
  background: var(--color-primary-surface);
}
</style>
