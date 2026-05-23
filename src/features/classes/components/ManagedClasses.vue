<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { getManagedClasses, removeStudent, addStudentByEmail, formatWatchTime, type ManagedClass, type Student } from '../api'

const router = useRouter()
const classes = ref<ManagedClass[]>([])
const selectedId = ref<number | null>(null)
const selected = ref<ManagedClass | null>(null)
const showAddDialog = ref(false)
const addEmail = ref('')

onMounted(async () => { classes.value = await getManagedClasses() })

function selectClass(c: ManagedClass) { selectedId.value = c.id; selected.value = c }

async function handleRemove(sid: number) {
  if (!selected.value) return
  await ElMessageBox.confirm('确认移除此学生？', '移除学生', { type: 'warning' })
  await removeStudent(selected.value.id, sid)
  selected.value.students = selected.value.students.filter(s => s.id !== sid)
  selected.value.studentCount = selected.value.students.length
  ElMessage.success('已移除')
}

async function handleAddStudent() {
  if (!selected.value || !addEmail.value.trim()) return
  const s = await addStudentByEmail(selected.value.id, addEmail.value.trim())
  if (s) { selected.value.students.push(s); selected.value.studentCount = selected.value.students.length; ElMessage.success(`已添加 ${s.name}`); addEmail.value = ''; showAddDialog.value = false }
  else ElMessage.warning('未找到该邮箱对应的用户')
}
</script>

<template>
  <div>
    <h2 class="panel-title">📚 管理的班级</h2>

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
    <el-empty v-else description="暂无管理的班级" :image-size="80" />

    <!-- 班级详情 -->
    <div v-if="selected" class="class-detail">
      <h3>{{ selected.name }}</h3>
      <div class="detail-actions">
        <el-button size="small" @click="router.push(`/course/${selected.courseId}`)">📺 课程详情</el-button>
        <el-button size="small" disabled>💬 讨论空间</el-button>
      </div>

      <div class="section-header">
        <span>学生列表 ({{ selected.students.length }}人)</span>
        <el-button size="small" type="primary" @click="showAddDialog = true">+ 添加学生</el-button>
      </div>

      <el-table :data="selected.students" size="small" style="width:100%">
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="email" label="邮箱" min-width="180" />
        <el-table-column label="进度" width="100">
          <template #default="{ row }">{{ row.progress.completionRate }}%</template>
        </el-table-column>
        <el-table-column label="观看时长" width="100">
          <template #default="{ row }">{{ formatWatchTime(row.progress.totalWatchSeconds) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template #default="{ row }">
            <el-button size="small" text type="danger" @click="handleRemove(row.id)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加学生弹窗 -->
    <el-dialog v-model="showAddDialog" title="通过邮箱添加学生" width="400px">
      <el-input v-model="addEmail" placeholder="输入学生邮箱" />
      <template #footer>
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="handleAddStudent">添加</el-button>
      </template>
    </el-dialog>
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
.detail-actions { display: flex; gap: var(--spacing-sm); margin-bottom: var(--spacing-lg); }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-sm); font-weight: 600; font-size: var(--font-size-sm); }
</style>
