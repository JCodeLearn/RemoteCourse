<script setup lang="ts">
</script>

<template>
  <div class="layout-blank">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.layout-blank {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: url('/auth-bg.jpg') center / cover no-repeat;
}
</style>
