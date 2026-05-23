<script setup lang="ts">
import { onMounted } from 'vue'
import HeroBanner from './components/HeroBanner.vue'
import CategoryNav from './components/CategoryNav.vue'
import VideoCardGrid from './components/VideoCardGrid.vue'
import HomeSkeleton from './components/HomeSkeleton.vue'
import { useCourseList } from './composables/useCourseList'

const { items, loading, finished, loadMore, switchCategory } = useCourseList()

onMounted(() => {
  loadMore()
})
</script>

<template>
  <div class="home-page">
    <HeroBanner />
    <CategoryNav @change="switchCategory" />

    <div class="page-container">
      <el-skeleton :loading="items.length === 0 && loading" animated>
        <template #template>
          <HomeSkeleton />
        </template>
        <template #default>
          <VideoCardGrid
            :items="items"
            :loading="loading"
            :finished="finished"
            @load-more="loadMore"
          />
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  background: var(--color-bg);
}

.page-container {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--spacing-lg);
}
</style>
