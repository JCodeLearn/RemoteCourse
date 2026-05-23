<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import VideoCard from './VideoCard.vue'
import type { Course } from '@/types'

defineProps<{
  items: Course[]
  loading: boolean
  finished: boolean
}>()

const emit = defineEmits<{
  loadMore: []
}>()

const sentinelRef = ref<HTMLDivElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!sentinelRef.value) return
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        emit('loadMore')
      }
    },
    { rootMargin: '200px' },
  )
  observer.observe(sentinelRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div id="course-grid" class="video-grid">
    <VideoCard v-for="course in items" :key="course.id" :course="course" />
  </div>

  <div ref="sentinelRef" class="grid-sentinel">
    <div v-if="loading" class="sentinel-loading">
      <el-icon class="is-loading" :size="20"><Loading /></el-icon>
      <span>加载中...</span>
    </div>
    <p v-else-if="finished && items.length > 0" class="sentinel-end">没有更多了~</p>
    <p v-else-if="!loading && !finished && items.length === 0" class="sentinel-empty">
      暂无课程
    </p>
  </div>
</template>

<style scoped>
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.grid-sentinel {
  padding: var(--spacing-2xl) 0;
  text-align: center;
}

.sentinel-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  color: var(--color-text-placeholder);
  font-size: var(--font-size-sm);
}

.sentinel-end {
  color: var(--color-text-placeholder);
  font-size: var(--font-size-sm);
}

.sentinel-empty {
  color: var(--color-text-placeholder);
  font-size: var(--font-size-md);
}
</style>
