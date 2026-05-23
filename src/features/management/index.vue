<script setup lang="ts">
import { ref } from 'vue'
import CreatorSidebar from './components/CreatorSidebar.vue'
import PublishForm from './components/PublishForm.vue'
import ContentManager from './components/ContentManager.vue'
import DataCenter from './components/DataCenter.vue'

const activeMenu = ref('publish')
</script>

<template>
  <div class="management-page page-container">
    <div class="mgmt-layout">
      <CreatorSidebar :active-menu="activeMenu" @select="activeMenu = $event" />
      <main class="mgmt-content">
        <PublishForm v-if="activeMenu === 'publish'" />
        <ContentManager v-else-if="activeMenu === 'content'" />
        <DataCenter v-else />
      </main>
    </div>
  </div>
</template>

<style scoped>
.management-page { background: var(--color-bg); min-height: calc(100vh - var(--header-height)); padding-top: var(--spacing-lg); padding-bottom: var(--spacing-2xl); }
.mgmt-layout { display: flex; gap: var(--spacing-xl); align-items: flex-start; }
.mgmt-content { flex: 1; min-width: 0; background: var(--color-bg-white); border-radius: var(--radius-md); box-shadow: var(--shadow-card); padding: var(--spacing-xl); }
</style>
