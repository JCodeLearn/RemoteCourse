<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

defineProps<{ activeMenu: string }>()
const emit = defineEmits<{ select: [key: string] }>()
const auth = useAuthStore()

const menus = [
  ...(auth.isTeacher ? [{ key: 'managed', label: '管理的班级', icon: 'School' }] : []),
  { key: 'joined', label: '加入的班级', icon: 'Notebook' },
  ...(auth.isTeacher ? [{ key: 'create', label: '创建班级', icon: 'CirclePlus' }] : []),
]
</script>

<template>
  <aside class="class-sidebar">
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
.class-sidebar { width: 200px; flex-shrink: 0; background: var(--color-bg-white); border-radius: var(--radius-md); box-shadow: var(--shadow-card); padding: var(--spacing-sm) 0; }
.sidebar-item { display: flex; align-items: center; gap: var(--spacing-sm); width: 100%; padding: var(--spacing-sm) var(--spacing-lg); font-size: var(--font-size-sm); color: var(--color-text-secondary); cursor: pointer; transition: all var(--transition-fast); border-left: 3px solid transparent; }
.sidebar-item:hover { color: var(--color-primary); background: var(--color-primary-surface); }
.sidebar-item.active { color: var(--color-primary); font-weight: 600; background: var(--color-primary-surface); border-left-color: var(--color-primary); }
</style>
