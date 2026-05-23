<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import ClassSidebar from './components/ClassSidebar.vue'
import ManagedClasses from './components/ManagedClasses.vue'
import JoinedClasses from './components/JoinedClasses.vue'
import CreateClass from './components/CreateClass.vue'

const auth = useAuthStore()
const activeMenu = ref(auth.isTeacher ? 'managed' : 'joined')
</script>

<template>
  <div class="classes-page page-container">
    <div class="classes-layout">
      <ClassSidebar :active-menu="activeMenu" @select="activeMenu = $event" />
      <main class="classes-content">
        <ManagedClasses v-if="activeMenu === 'managed'" />
        <JoinedClasses v-else-if="activeMenu === 'joined'" />
        <CreateClass v-else />
      </main>
    </div>
  </div>
</template>

<style scoped>
.classes-page { background: var(--color-bg); min-height: calc(100vh - var(--header-height)); padding-top: var(--spacing-lg); padding-bottom: var(--spacing-2xl); }
.classes-layout { display: flex; gap: var(--spacing-xl); align-items: flex-start; }
.classes-content { flex: 1; min-width: 0; background: var(--color-bg-white); border-radius: var(--radius-md); box-shadow: var(--shadow-card); padding: var(--spacing-xl); }
</style>
