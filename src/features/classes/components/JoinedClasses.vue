<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { getJoinedClasses, leaveClass, type JoinedClass } from '../api'

const router = useRouter()
const classes = ref<JoinedClass[]>([])
const selectedId = ref<number | null>(null)
const selected = ref<JoinedClass | null>(null)

onMounted(async () => { classes.value = await getJoinedClasses() })

function selectClass(c: JoinedClass) { selectedId.value = c.id; selected.value = c }

async function handleLeave() {
  if (!selected.value) return
  await ElMessageBox.confirm('确认退出此班级？退出后需凭邀请码重新加入。', '退出班级', { type: 'warning' })
  await leaveClass(selected.value.id)
  classes.value = classes.value.filter(c => c.id !== selected.value.id)
  selected.value = null; selectedId.value = null
  ElMessage.success('已退出班级')
}
</script>

<template>
  <div>
    <h2 class="panel-title">📖 加入的班级</h2>

    <div v-if="classes.length" class="class-grid">
      <button
        v-for="c in classes" :key="c.id"
        class="class-card" :class="{ active: selectedId === c.id }"
        @click="selectClass(c)"
      >
        <span class="cc-name">{{ c.name }}</span>
        <span class="cc-meta">{{ c.courseTitle }} · {{ c.studentCount }}人</span>
        <span class="cc-code">邀请码: {{ c.invitationCode }}</span>
      </button>
    </div>
    <el-empty v-else description="暂无加入的班级" :image-size="80" />

    <!-- 班级详情 -->
    <div v-if="selected" class="class-detail">
      <h3>{{ selected.name }}</h3>

      <div class="detail-actions">
        <el-button size="small" @click="router.push(`/course/${selected.courseId}`)">📺 课程详情</el-button>
        <el-button size="small" disabled>💬 讨论空间</el-button>
        <el-button size="small" disabled>🔔 课程通知</el-button>
        <el-button size="small" type="danger" @click="handleLeave">退出班级</el-button>
      </div>

      <!-- 教师信息 -->
      <div class="info-block">
        <h4>👨‍🏫 教师信息</h4>
        <p>姓名: {{ selected.teacherName }}</p>
        <p>邮箱: {{ selected.teacherEmail }}</p>
      </div>

      <!-- 同学列表 -->
      <div class="info-block">
        <h4>👥 同学 ({{ selected.classmates.length }}人)</h4>
        <el-table :data="selected.classmates" size="small" style="width:100%">
          <el-table-column label="姓名" width="120">
            <template #default="{ row }">{{ row.name }}</template>
          </el-table-column>
          <el-table-column label="邮箱" min-width="200">
            <template #default="{ row }">{{ row.email }}</template>
          </el-table-column>
          <el-table-column label="进度" width="100">
            <template #default="{ row }">{{ row.progress.completionRate }}%</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel-title { font-size: var(--font-size-xl); font-weight: 700; margin-bottom: var(--spacing-lg); }
.class-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: var(--spacing-md); margin-bottom: var(--spacing-xl); }
.class-card { display: flex; flex-direction: column; gap: 4px; padding: var(--spacing-md); border: 1px solid var(--color-border); border-radius: var(--radius-md); text-align: left; cursor: pointer; transition: all var(--transition-fast); background: var(--color-bg-white); }
.class-card:hover { border-color: var(--color-primary-light); }
.class-card.active { border-color: var(--color-primary); background: var(--color-primary-surface); }
.cc-name { font-weight: 600; font-size: var(--font-size-sm); }
.cc-meta { font-size: var(--font-size-xs); color: var(--color-text-placeholder); }
.cc-code { font-size: var(--font-size-xs); color: var(--color-primary-light); font-family: var(--font-family-code); }
.class-detail { margin-top: var(--spacing-xl); }
.class-detail h3 { margin-bottom: var(--spacing-sm); }
.detail-actions { display: flex; gap: var(--spacing-sm); margin-bottom: var(--spacing-lg); flex-wrap: wrap; }
.info-block { margin-bottom: var(--spacing-lg); padding: var(--spacing-md); background: var(--color-bg); border-radius: var(--radius-sm); }
.info-block h4 { font-size: var(--font-size-sm); margin-bottom: var(--spacing-sm); }
.info-block p { font-size: var(--font-size-sm); margin: 2px 0; color: var(--color-text-secondary); }
</style>
