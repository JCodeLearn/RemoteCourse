<script setup lang="ts">
const emit = defineEmits<{ toggle: [] }>()
</script>

<template>
  <button class="ai-float-btn" @click="emit('toggle')">
    <el-icon :size="26"><MagicStick /></el-icon>
  </button>
</template>

<style scoped>
.ai-float-btn {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: #fff;
  box-shadow: 0 4px 16px rgba(26, 82, 118, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}
.ai-float-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 24px rgba(26, 82, 118, 0.5);
}
</style>
