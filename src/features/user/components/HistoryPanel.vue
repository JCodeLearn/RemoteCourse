<script setup lang="ts">
import { formatCount, formatDate } from '@/utils/format'

interface HistoryItem {
  id: number
  courseTitle: string
  episodeTitle: string
  categoryId: number
  viewCount: number
  progress: number
  watchedAt: string
}

const items: HistoryItem[] = [
  { id: 1, courseTitle: '深入理解计算机系统', episodeTitle: '第3集: 浮点数与数据表示', categoryId: 1, viewCount: 12500, progress: 42, watchedAt: '2026-05-23T08:30:00Z' },
  { id: 7, courseTitle: '高等数学', episodeTitle: '第2集: 导数与微分', categoryId: 4, viewCount: 18500, progress: 100, watchedAt: '2026-05-22T14:20:00Z' },
  { id: 2, courseTitle: '数据结构与算法', episodeTitle: '第1集: 算法与数据结构概述', categoryId: 1, viewCount: 8900, progress: 15, watchedAt: '2026-05-21T19:45:00Z' },
]

const GRADIENTS: Record<number, string> = {
  1: 'linear-gradient(135deg, #1A5276, #2980B9)',
  4: 'linear-gradient(135deg, #1A5276, #2E86C1)',
}
</script>

<template>
  <div class="history-panel">
    <h2 class="panel-title">🕐 观看历史</h2>

    <div v-if="items.length" class="history-list">
      <div v-for="item in items" :key="item.id" class="history-item">
        <div class="h-cover" :style="{ background: GRADIENTS[item.categoryId] || 'linear-gradient(135deg, #666, #999)' }" />
        <div class="h-info">
          <h4 class="h-course">{{ item.courseTitle }}</h4>
          <p class="h-episode">{{ item.episodeTitle }}</p>
          <div class="h-meta">
            <span>👁 {{ formatCount(item.viewCount) }}</span>
            <span>·</span>
            <span>{{ formatDate(item.watchedAt) }}</span>
          </div>
          <div class="h-progress">
            <el-progress :percentage="item.progress" :stroke-width="4" :show-text="false" />
            <span class="progress-text">已看 {{ item.progress }}%</span>
          </div>
        </div>
      </div>
    </div>

    <el-empty v-else description="还没有观看记录" :image-size="80" />
  </div>
</template>

<style scoped>
.panel-title { font-size: var(--font-size-lg); font-weight: 600; margin-bottom: var(--spacing-lg); }

.history-list { display: flex; flex-direction: column; gap: var(--spacing-md); }

.history-item {
  display: flex; gap: var(--spacing-md);
  padding: var(--spacing-md); background: var(--color-bg-white);
  border-radius: var(--radius-md); box-shadow: var(--shadow-card);
}

.h-cover {
  width: 160px; aspect-ratio: 16 / 9; border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.h-info { flex: 1; min-width: 0; }
.h-course { font-size: var(--font-size-sm); font-weight: 600; margin-bottom: 2px; }
.h-episode { font-size: var(--font-size-xs); color: var(--color-text-placeholder); margin-bottom: 4px; }
.h-meta { font-size: var(--font-size-xs); color: var(--color-text-placeholder); display: flex; gap: 6px; margin-bottom: var(--spacing-sm); }
.h-progress { display: flex; align-items: center; gap: var(--spacing-sm); flex: 1; }
.progress-text { font-size: var(--font-size-xs); color: var(--color-primary); white-space: nowrap; }
</style>
