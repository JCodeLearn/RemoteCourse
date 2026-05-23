<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Course } from '@/types'
import { formatCount, formatDate } from '@/utils/format'

const props = defineProps<{
  course: Course
  isLiked: boolean
  isEnrolled: boolean
}>()

const emit = defineEmits<{
  toggleLike: []
}>()

const descExpanded = ref(false)
const descLong = computed(() => (props.course.description?.length ?? 0) > 120)
</script>

<template>
  <div class="course-header">
    <h1 class="course-title">📚 {{ course.title }}</h1>

    <div class="course-meta">
      <el-tag size="small" type="info">{{ course.categoryName }}</el-tag>
      <span class="meta-divider">·</span>
      <span>{{ formatDate(course.createdAt) }}</span>
      <span class="meta-divider">·</span>
      <span><el-icon :size="14"><View /></el-icon> {{ formatCount(course.viewCount) }} 次播放</span>
    </div>

    <div v-if="course.description" class="course-desc" :class="{ expanded: descExpanded }">
      <p>{{ course.description }}</p>
      <button v-if="descLong" class="desc-toggle" @click="descExpanded = !descExpanded">
        {{ descExpanded ? '收起 ▲' : '展开更多 ▼' }}
      </button>
    </div>

    <div class="action-bar">
      <button class="action-btn like-btn" :class="{ liked: isLiked }" @click="emit('toggleLike')">
        <el-icon :size="18"><Pointer /></el-icon>
        <span>{{ formatCount(course.likeCount) }}</span>
      </button>

      <el-tooltip content="链接已复制到剪贴板" trigger="click" :hide-after="2000">
        <button class="action-btn share-btn" @click="navigator.clipboard.writeText(window.location.href)">
          <el-icon :size="16"><Link /></el-icon>
          <span>分享</span>
        </button>
      </el-tooltip>

      <span v-if="isEnrolled" class="enrolled-badge">
        <el-icon :size="14"><CircleCheckFilled /></el-icon>
        已加入课程
      </span>
    </div>
  </div>
</template>

<style scoped>
.course-header {
  margin-bottom: var(--spacing-lg);
}

.course-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.course-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-sm);
  color: var(--color-text-placeholder);
  margin-bottom: var(--spacing-base);
}
.meta-divider {
  color: var(--color-border);
}

.course-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.8;
  white-space: pre-line;
  max-height: 5.4em;
  overflow: hidden;
  transition: max-height var(--transition-base);
  margin-bottom: var(--spacing-base);
}
.course-desc.expanded {
  max-height: none;
}
.desc-toggle {
  color: var(--color-primary-light);
  font-size: var(--font-size-xs);
  margin-top: var(--spacing-xs);
  cursor: pointer;
}
.desc-toggle:hover {
  color: var(--color-primary);
}

.action-bar {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 16px;
  border-radius: var(--radius-base);
  font-size: var(--font-size-sm);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  background: var(--color-bg-white);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.action-btn:hover {
  border-color: var(--color-primary-light);
  color: var(--color-primary);
}
.like-btn.liked {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}

.enrolled-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  font-weight: 500;
}
</style>
