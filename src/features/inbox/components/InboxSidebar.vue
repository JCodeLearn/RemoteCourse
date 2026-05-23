<script setup lang="ts">
const emit = defineEmits<{ select: [key: string] }>()
defineProps<{ activeMenu: string }>()

const menus = [
  { key: 'inbox', label: '收到的消息', icon: 'Message' },
  { key: 'compose', label: '写通知', icon: 'Edit' },
]
</script>

<template>
  <aside class="inbox-sidebar">
    <nav>
      <button
        v-for="m in menus" :key="m.key"
        class="sidebar-item" :class="{ active: activeMenu === m.key }"
        @click="emit('select', m.key)"
      >
        <el-icon :size="16"><component :is="m.icon" /></el-icon>
        <span>{{ m.label }}</span>
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.inbox-sidebar { width: 200px; flex-shrink: 0; background: var(--color-bg-white); border-radius: var(--radius-md); box-shadow: var(--shadow-card); padding: var(--spacing-sm) 0; }
.sidebar-item { display: flex; align-items: center; gap: var(--spacing-sm); width: 100%; padding: var(--spacing-sm) var(--spacing-lg); font-size: var(--font-size-sm); color: var(--color-text-secondary); cursor: pointer; transition: all var(--transition-fast); border-left: 3px solid transparent; }
.sidebar-item:hover { color: var(--color-primary); background: var(--color-primary-surface); }
.sidebar-item.active { color: var(--color-primary); font-weight: 600; background: var(--color-primary-surface); border-left-color: var(--color-primary); }
</style>
