<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const formRef = ref<FormInstance>()
const submitted = ref(false)
const errorMsg = ref('')

const form = reactive({ oldPassword: '', newPassword: '', confirmPassword: '' })

const validateConfirm = (_rule: unknown, value: string, cb: (e?: Error) => void) => {
  if (value !== form.newPassword) cb(new Error('两次输入的密码不一致'))
  else cb()
}

const rules: FormRules = {
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [{ required: true, min: 6, max: 32, message: '新密码为6-32位', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { validator: validateConfirm, trigger: 'blur' },
  ],
}

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  // TODO: call API
  submitted.value = true
  errorMsg.value = ''
  form.oldPassword = ''
  form.newPassword = ''
  form.confirmPassword = ''
}
</script>

<template>
  <div class="password-panel">
    <h2 class="panel-title">🔒 修改密码</h2>

    <el-alert
      title="密码修改功能待后端实现，当前仅展示 UI"
      type="info"
      show-icon
      :closable="false"
      style="margin-bottom: 20px"
    />

    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      style="max-width: 420px"
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="form.oldPassword" type="password" show-password placeholder="请输入旧密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword" type="password" show-password placeholder="6-32位新密码" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password" show-password placeholder="再次输入新密码" />
      </el-form-item>

      <el-alert v-if="errorMsg" :title="errorMsg" type="error" show-icon closable @close="errorMsg = ''" />
      <el-alert v-if="submitted" title="密码修改成功！（Mock）" type="success" show-icon :closable="false" />

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.panel-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
}
</style>
