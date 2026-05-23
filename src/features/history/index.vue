<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getHistory, CATEGORY_GRADIENTS, CATEGORY_ICONS, type HistoryItem } from './api'
import { formatDate } from '@/utils/format'

const items = ref<HistoryItem[]>([])

onMounted(async () => { items.value = await getHistory() })
</script>

<template>
  <div class="history-page page-container">
    <h2 class="history-title">🕐 观看历史</h2>

    <div v-if="items.length" class="history-grid">
      <router-link
        v-for="item in items" :key="item.id"
        :to="`/course/${item.courseId}`"
        class="history-card"
      >
        <div class="hc-cover" :style="{ background: CATEGORY_GRADIENTS[item.categoryId] || 'linear-gradient(135deg, #666, #999)' }">
          <el-icon v-if="CATEGORY_ICONS[item.categoryId]" :size="32" color="rgba(255,255,255,0.2)" class="hc-placeholder">
            <component :is="CATEGORY_ICONS[item.categoryId]" />
          </el-icon>
          <span v-if="item.progress >= 100" class="hc-done-tag">已看完</span>
        </div>

        <div class="hc-body">
          <h3 class="hc-course">{{ item.courseTitle }}</h3>
          <p class="hc-episode">{{ item.episodeTitle }}</p>
          <div class="hc-progress">
            <el-progress :percentage="item.progress" :stroke-width="4" :show-text="false" :status="item.progress >= 100 ? 'success' : undefined" />
          </div>
          <span class="hc-time">{{ formatDate(item.watchedAt) }}</span>
        </div>
      </router-link>
    </div>

    <el-empty v-else description="还没有观看记录" :image-size="100" />
  </div>
</template>

<style scoped>
.history-page { background: var(--color-bg); min-height: calc(100vh - var(--header-height)); padding-top: var(--spacing-lg); padding-bottom: var(--spacing-2xl); }
.history-title { font-size: var(--font-size-2xl); font-weight: 700; margin-bottom: var(--spacing-xl); }

.history-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--spacing-lg); }

.history-card { display: block; background: var(--color-bg-white); border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-card); transition: box-shadow var(--transition-base), transform var(--transition-base); }
.history-card:hover { box-shadow: var(--shadow-hover); transform: translateY(-2px); }

.hc-cover { position: relative; width: 100%; aspect-ratio: 16 / 9; display: flex; align-items: center; justify-content: center; }
.hc-done-tag { position: absolute; top: 8px; right: 8px; padding: 2px 8px; background: rgba(0,0,0,0.6); color: #67C23A; font-size: var(--font-size-xs); border-radius: 4px; }

.hc-body { padding: var(--spacing-sm) var(--spacing-md) var(--spacing-md); }
.hc-course { font-size: var(--font-size-sm); font-weight: 600; margin-bottom: 2px; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
.hc-episode { font-size: var(--font-size-xs); color: var(--color-text-placeholder); margin-bottom: var(--spacing-sm); }
.hc-progress { margin-bottom: 4px; }
.hc-time { font-size: var(--font-size-xs); color: var(--color-text-placeholder); }
</style>
