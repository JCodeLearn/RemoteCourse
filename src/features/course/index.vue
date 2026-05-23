<script setup lang="ts">
const props = defineProps<{ id: string }>()
</script>

<template>
  <div class="course-page page-container">
    <h2>课程详情 #{{ id }}</h2>
    <p>视频播放器和课程信息将在 Phase 2-3 实现</p>
  </div>
</template>
