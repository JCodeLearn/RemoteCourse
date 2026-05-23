<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Episode } from '@/types'
import { formatDuration } from '@/utils/format'

const props = defineProps<{
  episodes: Episode[]
}>()

const activeId = ref(props.episodes[0]?.id ?? 0)

const totalDuration = computed(() => {
  const total = props.episodes.reduce((s, e) => s + e.duration, 0)
  return formatDuration(total)
})

function select(id: number) {
  activeId.value = id
}
</script>

<template>
  <div class="episode-list">
    <div class="ep-header">
      <span class="ep-title">
        <el-icon :size="14"><List /></el-icon>
        课程目录 (共{{ episodes.length }}集 · 总时长 {{ totalDuration }})
      </span>
    </div>

    <div class="ep-items">
      <button
        v-for="ep in episodes"
        :key="ep.id"
        class="ep-item"
        :class="{ active: activeId === ep.id }"
        @click="select(ep.id)"
      >
        <span class="ep-index">
          <el-icon v-if="activeId === ep.id" :size="12"><VideoPlay /></el-icon>
          <span v-else class="ep-num">{{ ep.orderIndex }}</span>
        </span>
        <span class="ep-title-text">{{ ep.title }}</span>
        <span class="ep-duration">{{ formatDuration(ep.duration) }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.ep-header {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border-light);
}
.ep-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 4px;
}

.ep-items {
  padding: var(--spacing-sm) 0;
}

.ep-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  transition: background var(--transition-fast);
  text-align: left;
}
.ep-item:hover {
  background: var(--color-bg);
}
.ep-item.active {
  background: var(--color-primary-surface);
}
.ep-item.active .ep-title-text {
  color: var(--color-primary);
  font-weight: 500;
}

.ep-index {
  width: 24px;
  text-align: center;
  flex-shrink: 0;
  color: var(--color-primary);
}
.ep-num {
  font-size: var(--font-size-xs);
  color: var(--color-text-placeholder);
}

.ep-title-text {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.ep-duration {
  font-size: var(--font-size-xs);
  color: var(--color-text-placeholder);
  flex-shrink: 0;
}
</style>
