<script setup lang="ts">
import type { Episode } from '@/types'
import EnterCourseSpace from './EnterCourseSpace.vue'
import UpTeacherInfo from './UpTeacherInfo.vue'
import EpisodeList from './EpisodeList.vue'

defineProps<{
  courseId: number
  episodes: Episode[]
  teacherName: string
  teacherAvatar: string | null
  isEnrolled: boolean
}>()
</script>

<template>
  <aside class="course-sidebar">
    <router-link :to="`/course/${courseId}/discussion`" style="text-decoration:none">
    <EnterCourseSpace :is-enrolled="isEnrolled" />
  </router-link>
    <UpTeacherInfo :teacher-name="teacherName" :teacher-avatar="teacherAvatar" />
    <EpisodeList :episodes="episodes" />
  </aside>
</template>

<style scoped>
.course-sidebar {
  width: 320px;
  flex-shrink: 0;
  position: sticky;
  top: calc(var(--header-height) + var(--spacing-lg));
  align-self: flex-start;
  background: var(--color-bg-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  overflow: hidden;
}

@media (max-width: 1000px) {
  .course-sidebar {
    width: 100%;
    position: static;
    order: 10;
  }
}
</style>
