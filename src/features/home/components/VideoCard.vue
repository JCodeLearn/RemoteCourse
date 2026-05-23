<script setup lang="ts">
import { computed } from 'vue'
import type { Course } from '@/types'
import { formatCount, formatDuration } from '@/utils/format'

const props = defineProps<{
  course: Course
}>()

const CATEGORY_GRADIENTS: Record<number, string> = {
  1: 'linear-gradient(135deg, #1A5276, #2980B9)',
  2: 'linear-gradient(135deg, #0D3B66, #2471A3)',
  3: 'linear-gradient(135deg, #2C3E50, #5D6D7E)',
  4: 'linear-gradient(135deg, #1A5276, #2E86C1)',
  5: 'linear-gradient(135deg, #0D3B66, #1A5276)',
  6: 'linear-gradient(135deg, #1B4F72, #2E86C1)',
  7: 'linear-gradient(135deg, #C41E2A, #E84855)',
  8: 'linear-gradient(135deg, #922B21, #C0392B)',
  9: 'linear-gradient(135deg, #7B241C, #CB4335)',
  10: 'linear-gradient(135deg, #8B0000, #C41E2A)',
}

const CATEGORY_ICONS: Record<number, string> = {
  1: 'Monitor', 2: 'Cpu', 3: 'SetUp', 4: 'DataAnalysis', 5: 'Magnet',
  6: 'Dish', 7: 'Reading', 8: 'ChatLineSquare', 9: 'TrendCharts', 10: 'Picture',
}

const coverStyle = computed(() => ({
  background: props.course.coverUrl
    ? `url(${props.course.coverUrl}) center/cover`
    : CATEGORY_GRADIENTS[props.course.categoryId] || 'linear-gradient(135deg, #666, #999)',
}))

const placeholderIcon = computed(() => CATEGORY_ICONS[props.course.categoryId] || 'VideoPlay')

const durationText = computed(() => formatDuration(props.course.duration))
</script>

<template>
  <router-link :to="`/course/${course.id}`" class="video-card">
    <div class="card-cover" :style="coverStyle">
      <div v-if="!course.coverUrl" class="cover-placeholder">
        <el-icon :size="36" color="rgba(255,255,255,0.35)">
          <component :is="placeholderIcon" />
        </el-icon>
      </div>
      <span class="duration-tag">{{ durationText }}</span>
    </div>

    <div class="card-body">
      <h3 class="card-title">{{ course.title }}</h3>
      <div class="card-meta">
        <el-avatar :size="20" :src="course.teacherAvatar" class="card-avatar" />
        <span class="card-teacher">{{ course.teacherName }}</span>
      </div>
      <div class="card-stats">
        <span class="stat">
          <el-icon :size="14"><View /></el-icon>
          {{ formatCount(course.viewCount) }}
        </span>
        <span class="stat-divider">·</span>
        <span class="stat">
          <el-icon :size="14"><ChatLineRound /></el-icon>
          {{ formatCount(course.commentCount) }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.video-card {
  display: block;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-bg-white);
  box-shadow: var(--shadow-card);
  transition: box-shadow var(--transition-base), transform var(--transition-base);
}
.video-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}

.card-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  transition: transform var(--transition-base);
}
.video-card:hover .card-cover {
  transform: scale(1.05);
}

.cover-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.duration-tag {
  position: absolute;
  right: 6px;
  bottom: 6px;
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: var(--font-size-xs);
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.card-body {
  padding: var(--spacing-sm) var(--spacing-md) var(--spacing-md);
}

.card-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: var(--spacing-xs);
  min-height: 2.8em;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.card-avatar {
  flex-shrink: 0;
}

.card-teacher {
  font-size: var(--font-size-xs);
  color: var(--color-text-placeholder);
}

.card-stats {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-xs);
  color: var(--color-text-placeholder);
}

.stat {
  display: flex;
  align-items: center;
  gap: 2px;
}

.stat-divider {
  color: var(--color-border);
  font-size: 10px;
}
</style>
