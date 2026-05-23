<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import { getContentList, deleteContent, type ManagedCourse } from '../api'
import { formatCount } from '@/utils/format'

const courses = ref<ManagedCourse[]>([])
const filter = ref('all')

const filtered = computed(() => {
  if (filter.value === 'all') return courses.value
  return courses.value.filter(c => c.status === filter.value)
})

onMounted(async () => { courses.value = await getContentList() })

async function handleDelete(id: number) {
  await ElMessageBox.confirm('确认删除该课程？删除后不可恢复。', '确认删除', { type: 'warning' })
  await deleteContent(id)
  courses.value = courses.value.filter(c => c.id !== id)
}
</script>

<template>
  <div class="content-manager">
    <div class="cm-header">
      <h2 class="cm-title">📋 内容管理</h2>
      <div class="cm-filters">
        <el-radio-group v-model="filter" size="small">
          <el-radio-button value="all">全部 ({{ courses.length }})</el-radio-button>
          <el-radio-button value="published">已发布</el-radio-button>
          <el-radio-button value="draft">草稿</el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <div v-if="filtered.length" class="cm-list">
      <div v-for="c in filtered" :key="c.id" class="cm-row">
        <div class="cm-cover" :style="{ background: 'linear-gradient(135deg, #1A5276, #2980B9)' }" />
        <div class="cm-info">
          <span class="cm-name">{{ c.title }}</span>
          <span class="cm-meta">
            <el-tag :type="c.status === 'published' ? 'success' : 'info'" size="small">{{ c.status === 'published' ? '已发布' : '草稿' }}</el-tag>
            <span v-if="c.status === 'published'">👁 {{ formatCount(c.viewCount) }} · 👍 {{ c.likeCount }} · 💬 {{ c.commentCount }}</span>
            <span>{{ c.createdAt }}</span>
          </span>
        </div>
        <div class="cm-actions">
          <el-button size="small" text>编辑</el-button>
          <el-button size="small" text type="danger" @click="handleDelete(c.id)">删除</el-button>
        </div>
      </div>
    </div>

    <el-empty v-else description="暂无内容" :image-size="80" />
  </div>
</template>

<style scoped>
.cm-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--spacing-lg); }
.cm-title { font-size: var(--font-size-xl); font-weight: 700; }

.cm-list { display: flex; flex-direction: column; gap: var(--spacing-sm); }
.cm-row { display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-md); background: var(--color-bg); border-radius: var(--radius-sm); }
.cm-cover { width: 100px; height: 56px; border-radius: 4px; flex-shrink: 0; }
.cm-info { flex: 1; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.cm-name { font-size: var(--font-size-sm); font-weight: 600; }
.cm-meta { display: flex; gap: var(--spacing-sm); align-items: center; font-size: var(--font-size-xs); color: var(--color-text-placeholder); }
.cm-actions { display: flex; gap: var(--spacing-sm); }
</style>
