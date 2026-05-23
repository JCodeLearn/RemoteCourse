<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  coverUrl: string | null
  categoryId: number
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

const bgStyle = computed(() => ({
  background: props.coverUrl
    ? `url(${props.coverUrl}) center/cover`
    : (CATEGORY_GRADIENTS[props.categoryId] || 'linear-gradient(135deg, #666, #999)'),
}))
</script>

<template>
  <div class="player-placeholder" :style="bgStyle">
    <div v-if="!coverUrl && CATEGORY_ICONS[categoryId]" class="placeholder-icon">
      <el-icon :size="48" color="rgba(255,255,255,0.25)">
        <component :is="CATEGORY_ICONS[categoryId]" />
      </el-icon>
    </div>
    <div class="play-btn">
      <el-icon :size="28" color="rgba(0,0,0,0.6)"><VideoPlay /></el-icon>
    </div>
    <div class="coming-soon">视频播放功能即将上线</div>
  </div>
</template>

<style scoped>
.player-placeholder {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
  background-color: #1a1a2e;
}

.play-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-fast);
  z-index: 1;
}
.player-placeholder:hover .play-btn {
  transform: scale(1.08);
}

.placeholder-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.coming-soon {
  position: absolute;
  bottom: 10px;
  right: 14px;
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.5);
  z-index: 1;
}
</style>
