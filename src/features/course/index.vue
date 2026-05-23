<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCourseDetail } from './composables/useCourseDetail'
import CourseHeader from './components/CourseHeader.vue'
import VideoPlayerPlaceholder from './components/VideoPlayerPlaceholder.vue'
import CourseSidebar from './components/CourseSidebar.vue'
import CommentSection from './components/CommentSection.vue'

const route = useRoute()
const { detail, loading, loadDetail, handleToggleLike } = useCourseDetail()

onMounted(() => {
  const id = Number(route.params.id)
  if (id) loadDetail(id)
})
</script>

<template>
  <div class="course-page page-container">
    <div v-if="loading" class="loading-state">
      <el-icon class="is-loading" :size="24"><Loading /></el-icon>
      <span>加载中...</span>
    </div>

    <template v-else-if="detail?.course">
      <div class="course-layout">
        <div class="course-main">
          <CourseHeader
            :course="detail.course"
            :is-liked="detail.isLiked"
            :is-enrolled="detail.isEnrolled"
            @toggle-like="handleToggleLike"
          />
          <VideoPlayerPlaceholder
            :cover-url="detail.course.coverUrl"
            :category-id="detail.course.categoryId"
          />
          <CommentSection :course-id="detail.course.id" :comment-count="detail.course.commentCount" />
        </div>

        <CourseSidebar
          :course-id="detail.course.id"
          :episodes="detail.episodes"
          :teacher-name="detail.course.teacherName"
          :teacher-avatar="detail.course.teacherAvatar"
          :is-enrolled="detail.isEnrolled"
        />
      </div>
    </template>

    <el-empty v-else description="课程不存在" :image-size="120" />
  </div>
</template>

<style scoped>
.course-page {
  background: var(--color-bg);
  min-height: calc(100vh - var(--header-height));
  padding-top: var(--spacing-lg);
  padding-bottom: var(--spacing-2xl);
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-2xl) 0;
  color: var(--color-text-placeholder);
  font-size: var(--font-size-sm);
}

.course-layout {
  display: flex;
  gap: var(--spacing-xl);
}

.course-main {
  flex: 1;
  min-width: 0;
}

@media (max-width: 1000px) {
  .course-layout {
    flex-direction: column;
  }
}
</style>
