<script setup lang="ts">
import { formatCount } from '@/utils/format'

const videos = [
  { id: 1, title: '深入理解计算机系统', status: 'published', categoryId: 1, viewCount: 12500, createdAt: '2026-05-20' },
  { id: 2, title: '数据结构与算法', status: 'draft', categoryId: 1, viewCount: 0, createdAt: '2026-05-18' },
]

const GRADIENTS: Record<number, string> = {
  1: 'linear-gradient(135deg, #1A5276, #2980B9)',
}
</script>

<template>
  <div class="my-panel">
    <h2 class="panel-title">📹 我的发布</h2>

    <div v-if="videos.length" class="video-list">
      <div v-for="v in videos" :key="v.id" class="video-row">
        <div class="v-cover" :style="{ background: GRADIENTS[v.categoryId] || '#666' }" />
        <div class="v-info">
          <span class="v-title">{{ v.title }}</span>
          <span class="v-meta">
            <el-tag :type="v.status === 'published' ? 'success' : 'info'" size="small">{{ v.status === 'published' ? '已发布' : '草稿' }}</el-tag>
            <span v-if="v.status === 'published'">👁 {{ formatCount(v.viewCount) }}</span>
            <span>{{ v.createdAt }}</span>
          </span>
        </div>
      </div>
    </div>

    <el-empty v-else description="还没有发布课程" :image-size="80" />
  </div>
</template>

<style scoped>
.panel-title { font-size: var(--font-size-lg); font-weight: 600; margin-bottom: var(--spacing-lg); }

.video-list { display: flex; flex-direction: column; gap: var(--spacing-sm); }
.video-row { display: flex; gap: var(--spacing-md); padding: var(--spacing-md); background: var(--color-bg-white); border-radius: var(--radius-sm); align-items: center; }
.v-cover { width: 120px; aspect-ratio: 16/9; border-radius: 4px; flex-shrink: 0; }
.v-info { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.v-title { font-size: var(--font-size-sm); font-weight: 600; }
.v-meta { display: flex; gap: var(--spacing-sm); align-items: center; font-size: var(--font-size-xs); color: var(--color-text-placeholder); }
</style>
