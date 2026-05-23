<script setup lang="ts">
import { ref } from 'vue'
import { formatCount } from '@/utils/format'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref<'videos' | 'creator'>('videos')

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
    <h2 class="panel-title">📹 我的创作</h2>

    <div class="tab-switch">
      <button :class="{ active: activeTab === 'videos' }" @click="activeTab = 'videos'">我的发布</button>
      <button :class="{ active: activeTab === 'creator' }" @click="activeTab = 'creator'">创作中心</button>
    </div>

    <!-- 我的发布 -->
    <template v-if="activeTab === 'videos'">
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
    </template>

    <!-- 创作中心 -->
    <template v-else>
      <div class="creator-card">
        <div class="creator-icon">
          <el-icon :size="48"><Edit /></el-icon>
        </div>
        <h3>创作中心</h3>
        <p>在这里管理你的课程、上传视频、查看学习数据</p>
        <el-button type="primary" size="large" round @click="router.push('/management')">
          进入创作中心
        </el-button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.panel-title { font-size: var(--font-size-lg); font-weight: 600; margin-bottom: var(--spacing-lg); }

.tab-switch {
  display: flex; gap: 0; margin-bottom: var(--spacing-lg);
  border-bottom: 2px solid var(--color-border-light);
}
.tab-switch button {
  padding: var(--spacing-sm) var(--spacing-lg); font-size: var(--font-size-sm);
  color: var(--color-text-placeholder); border-bottom: 2px solid transparent;
  margin-bottom: -2px; transition: all var(--transition-fast);
}
.tab-switch button.active { color: var(--color-primary); border-color: var(--color-primary); font-weight: 600; }

.video-list { display: flex; flex-direction: column; gap: var(--spacing-sm); }
.video-row { display: flex; gap: var(--spacing-md); padding: var(--spacing-md); background: var(--color-bg-white); border-radius: var(--radius-sm); align-items: center; }
.v-cover { width: 120px; aspect-ratio: 16/9; border-radius: 4px; flex-shrink: 0; }
.v-info { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.v-title { font-size: var(--font-size-sm); font-weight: 600; }
.v-meta { display: flex; gap: var(--spacing-sm); align-items: center; font-size: var(--font-size-xs); color: var(--color-text-placeholder); }

.creator-card { text-align: center; padding: var(--spacing-2xl); background: linear-gradient(135deg, var(--color-primary-surface), #fff); border-radius: var(--radius-md); }
.creator-icon { color: var(--color-primary); margin-bottom: var(--spacing-md); }
.creator-card h3 { font-size: var(--font-size-xl); margin-bottom: var(--spacing-sm); }
.creator-card p { color: var(--color-text-secondary); margin-bottom: var(--spacing-xl); font-size: var(--font-size-sm); }
</style>
