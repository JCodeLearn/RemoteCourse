<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { sendNotice, MOCK_CLASSES } from '../api'

const targetType = ref<'class' | 'user'>('class')
const targetClassId = ref<number | null>(null)
const targetEmail = ref('')
const title = ref('')
const content = ref('')
const sending = ref(false)

async function handleSend() {
  if (!title.value.trim()) { ElMessage.warning('请输入标题'); return }
  if (!content.value.trim()) { ElMessage.warning('请输入内容'); return }
  if (targetType.value === 'class' && !targetClassId.value) { ElMessage.warning('请选择教学班'); return }
  if (targetType.value === 'user' && !targetEmail.value.trim()) { ElMessage.warning('请输入邮箱地址'); return }

  sending.value = true
  try {
    await sendNotice({
      targetType: targetType.value,
      targetId: targetClassId.value ?? undefined,
      targetEmail: targetType.value === 'user' ? targetEmail.value : undefined,
      title: title.value.trim(),
      content: content.value.trim(),
    })
    ElMessage.success('通知已发送')
    title.value = ''; content.value = ''; targetEmail.value = ''; targetClassId.value = null
  } catch { ElMessage.error('发送失败') }
  finally { sending.value = false }
}
</script>

<template>
  <div>
    <h2 class="panel-title">✏️ 写通知</h2>
    <p class="panel-desc">向教学班全体学生或指定用户发送站内通知。</p>

    <el-form label-position="top" style="max-width: 600px; margin-top: 20px">
      <el-form-item label="发送到">
        <el-radio-group v-model="targetType">
          <el-radio value="class">教学班</el-radio>
          <el-radio value="user">指定用户</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="targetType === 'class'" label="选择班级">
        <el-select v-model="targetClassId" placeholder="选择教学班" style="width:100%">
          <el-option v-for="c in MOCK_CLASSES" :key="c.id" :label="c.name" :value="c.id" />
        </el-select>
      </el-form-item>

      <el-form-item v-else label="接收者邮箱">
        <el-input v-model="targetEmail" placeholder="输入对方的注册邮箱" />
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="title" placeholder="通知标题" maxlength="50" show-word-limit />
      </el-form-item>

      <el-form-item label="内容">
        <el-input v-model="content" type="textarea" :rows="5" placeholder="输入通知内容..." />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="large" :loading="sending" @click="handleSend">
          {{ sending ? '发送中...' : '发送通知' }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.panel-title { font-size: var(--font-size-xl); font-weight: 700; margin-bottom: var(--spacing-sm); }
.panel-desc { font-size: var(--font-size-sm); color: var(--color-text-secondary); }
</style>
