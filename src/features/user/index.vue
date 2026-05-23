<script setup lang="ts">
import { ref } from 'vue'
import UserSidebar from './components/UserSidebar.vue'
import ProfilePanel from './components/ProfilePanel.vue'
import PasswordPanel from './components/PasswordPanel.vue'
import HistoryPanel from './components/HistoryPanel.vue'
import MyVideosPanel from './components/MyVideosPanel.vue'

const activeMenu = ref('profile')
</script>

<template>
  <div class="personal-page page-container">
    <div class="personal-layout">
      <UserSidebar :active-menu="activeMenu" @select="activeMenu = $event" />
      <main class="personal-content">
        <ProfilePanel v-if="activeMenu === 'profile'" />
        <PasswordPanel v-else-if="activeMenu === 'password'" />
        <HistoryPanel v-else-if="activeMenu === 'history'" />
        <MyVideosPanel v-else-if="activeMenu === 'myVideos'" />
      </main>
    </div>
  </div>
</template>

<style scoped>
.personal-page {
  background: var(--color-bg);
  min-height: calc(100vh - var(--header-height));
  padding-top: var(--spacing-lg);
  padding-bottom: var(--spacing-2xl);
}

.personal-layout {
  display: flex;
  gap: var(--spacing-xl);
  align-items: flex-start;
}

.personal-content {
  flex: 1;
  min-width: 0;
  background: var(--color-bg-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  padding: var(--spacing-xl);
}
</style>
