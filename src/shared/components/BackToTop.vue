<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="fade">
    <button v-show="visible" class="back-to-top" @click="scrollToTop">
      <el-icon :size="20"><ArrowUpBold /></el-icon>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 24px;
  bottom: 80px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-bg-white);
  box-shadow: var(--shadow-hover);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  z-index: 500;
  transition: all var(--transition-fast);
}

.back-to-top:hover {
  color: var(--color-primary);
  transform: translateY(-2px);
}
</style>
