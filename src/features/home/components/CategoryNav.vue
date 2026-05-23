<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  change: [categoryId: number]
}>()

const activeId = ref(0)

const categories = [
  { id: 0, name: '全部', icon: 'Grid' },
  // 工科
  { id: 1, name: '计算机科学', icon: 'Monitor' },
  { id: 2, name: '电子信息', icon: 'Cpu' },
  { id: 3, name: '机械与土木', icon: 'SetUp' },
  // 理科
  { id: 4, name: '数学与统计', icon: 'DataAnalysis' },
  { id: 5, name: '物理', icon: 'Magnet' },
  { id: 6, name: '化学与生命', icon: 'Dish' },
  // 文科
  { id: 7, name: '文学与历史', icon: 'Reading' },
  { id: 8, name: '外国语言', icon: 'ChatLineSquare' },
  { id: 9, name: '经济与管理', icon: 'TrendCharts' },
  { id: 10, name: '艺术与哲学', icon: 'Picture' },
]

function select(id: number) {
  if (id === activeId.value) return
  activeId.value = id
  emit('change', id)
}
</script>

<template>
  <nav class="category-nav">
    <div class="category-inner">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="category-tag"
        :class="{ active: activeId === cat.id }"
        @click="select(cat.id)"
      >
        <el-icon :size="16"><component :is="cat.icon" /></el-icon>
        <span>{{ cat.name }}</span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.category-nav {
  position: sticky;
  top: var(--header-height);
  z-index: 100;
  height: 48px;
  background: var(--color-bg-white);
  border-bottom: 1px solid var(--color-border-light);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.category-inner {
  max-width: var(--content-max-width);
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 0 var(--spacing-lg);
  overflow-x: auto;
  scrollbar-width: none;
}
.category-inner::-webkit-scrollbar {
  display: none;
}

.category-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 16px;
  border-radius: var(--radius-base);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  white-space: nowrap;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}
.category-tag:hover {
  color: var(--color-primary);
  background: var(--color-primary-surface);
}
.category-tag.active {
  color: var(--color-primary);
  font-weight: 600;
  box-shadow: inset 0 -2px 0 var(--color-primary);
  border-radius: 0;
}
</style>
