<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { createClass, MOCK_COURSES } from '../api'

const courseId = ref<number | null>(null)
const className = ref('')
const inviteCode = ref('')
const created = ref(false)

async function handleCreate() {
  if (!courseId.value) { ElMessage.warning('请选择课程'); return }
  if (!className.value.trim()) { ElMessage.warning('请输入班级名称'); return }
  const c = await createClass(courseId.value, className.value.trim())
  inviteCode.value = c.invitationCode
  created.value = true
  ElMessage.success('班级创建成功！')
}

function copyCode() {
  navigator.clipboard.writeText(inviteCode.value)
  ElMessage.success('邀请码已复制')
}
</script>

<template>
  <div>
    <h2 class="panel-title">➕ 创建班级</h2>
    <p class="panel-desc">以已有课程为基础创建教学班，生成邀请码供学生加入。</p>

    <el-form v-if="!created" label-position="top" style="max-width: 480px; margin-top: 20px">
      <el-form-item label="选择课程">
        <el-select v-model="courseId" placeholder="选择已发布的课程" style="width:100%">
          <el-option v-for="c in MOCK_COURSES" :key="c.id" :label="c.title" :value="c.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="班级名称">
        <el-input v-model="className" placeholder="例如: 2024春-计算机网络A班" maxlength="50" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="handleCreate">创建班级</el-button>
      </el-form-item>
    </el-form>

    <div v-else class="created-result">
      <el-icon :size="48" color="#67C23A"><CircleCheckFilled /></el-icon>
      <h3>班级创建成功</h3>
      <div class="invite-box">
        <span class="invite-label">邀请码</span>
        <code class="invite-code">{{ inviteCode }}</code>
        <el-button size="small" @click="copyCode">复制</el-button>
      </div>
      <p class="invite-hint">将此邀请码分享给学生，学生凭码加入班级</p>
      <el-button @click="created = false; className = ''; courseId = null; inviteCode = ''">继续创建</el-button>
    </div>
  </div>
</template>

<style scoped>
.panel-title { font-size: var(--font-size-xl); font-weight: 700; margin-bottom: var(--spacing-sm); }
.panel-desc { font-size: var(--font-size-sm); color: var(--color-text-secondary); }
.created-result { text-align: center; padding: var(--spacing-2xl); }
.created-result h3 { margin: var(--spacing-md) 0; }
.invite-box { display: flex; align-items: center; justify-content: center; gap: var(--spacing-md); margin: var(--spacing-lg) 0; }
.invite-label { font-size: var(--font-size-sm); color: var(--color-text-secondary); }
.invite-code { font-size: var(--font-size-2xl); font-weight: 700; font-family: var(--font-family-code); color: var(--color-primary); letter-spacing: 3px; background: var(--color-primary-surface); padding: var(--spacing-sm) var(--spacing-lg); border-radius: var(--radius-sm); }
.invite-hint { font-size: var(--font-size-xs); color: var(--color-text-placeholder); margin-bottom: var(--spacing-lg); }
</style>
