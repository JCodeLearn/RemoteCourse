<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { rules } from '@/utils/validation'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const activeTab = ref('login')
const formRef = ref<FormInstance>()
const loading = ref(false)
const sendingCode = ref(false)
const codeSent = ref(false)
const errorMsg = ref('')

// ====== 登录表单 ======
const loginForm = reactive({ email: '', password: '' })
const loginRules: FormRules = { email: rules.email, password: rules.password }

async function handleLogin() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  loading.value = true
  errorMsg.value = ''
  try {
    await authStore.login(loginForm)
    const redirect = (route.query.redirect as string) || '/home'
    router.push(redirect)
  } catch (e: unknown) {
    errorMsg.value = (e as Error).message || '登录失败'
  } finally {
    loading.value = false
  }
}

// ====== 注册表单 ======
const registerForm = reactive({ username: '', email: '', password: '', verifyCode: '' })
const registerRules: FormRules = {
  username: rules.username,
  email: rules.email,
  password: rules.password,
  verifyCode: rules.verifyCode,
}

const activeRules = computed(() => (activeTab.value === 'login' ? loginRules : registerRules))

async function sendCode() {
  const valid = await formRef.value?.validateField('email').catch(() => false)
  if (!valid) return
  sendingCode.value = true
  try {
    // TODO: call send-code API
    await new Promise((r) => setTimeout(r, 500))
    codeSent.value = true
  } finally {
    sendingCode.value = false
  }
}

async function handleRegister() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  loading.value = true
  errorMsg.value = ''
  try {
    await authStore.register(registerForm)
    // 注册成功 → 切到登录
    activeTab.value = 'login'
    loginForm.email = registerForm.email
    loginForm.password = ''
    errorMsg.value = ''
  } catch (e: unknown) {
    errorMsg.value = (e as Error).message || '注册失败'
  } finally {
    loading.value = false
  }
}

function handleSubmit() {
  if (activeTab.value === 'login') handleLogin()
  else handleRegister()
}

function switchTab() {
  activeTab.value = activeTab.value === 'login' ? 'register' : 'login'
  errorMsg.value = ''
  codeSent.value = false
  formRef.value?.resetFields()
}
</script>

<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <div class="auth-header">
        <router-link to="/home" class="auth-logo">点映</router-link>
        <p class="auth-subtitle">在线教育平台</p>
      </div>

      <!-- 标签切换 -->
      <div class="auth-tabs">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'login' }"
          @click="switchTab"
        >
          登录
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'register' }"
          @click="switchTab"
        >
          注册
        </button>
      </div>

      <el-form
        ref="formRef"
        :model="activeTab === 'login' ? loginForm : registerForm"
        :rules="activeRules"
        label-position="top"
        @submit.prevent="handleSubmit"
      >
        <!-- 注册：用户名 -->
        <el-form-item v-if="activeTab === 'register'" label="用户名" prop="username">
          <el-input v-model="registerForm.username" placeholder="2-20个字符" size="large" />
        </el-form-item>

        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input
            :model-value="activeTab === 'login' ? loginForm.email : registerForm.email"
            placeholder="请输入邮箱"
            size="large"
            @update:model-value="(v: string) => {
              if (activeTab === 'login') loginForm.email = v
              else registerForm.email = v
            }"
          />
        </el-form-item>

        <!-- 注册：验证码 -->
        <el-form-item v-if="activeTab === 'register'" label="验证码" prop="verifyCode">
          <div class="code-row">
            <el-input v-model="registerForm.verifyCode" placeholder="6位验证码" size="large" />
            <el-button size="large" :loading="sendingCode" :disabled="codeSent" @click="sendCode">
              {{ codeSent ? '已发送' : '获取验证码' }}
            </el-button>
          </div>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input
            :model-value="activeTab === 'login' ? loginForm.password : registerForm.password"
            type="password"
            :placeholder="activeTab === 'login' ? '请输入密码' : '6-32位密码'"
            size="large"
            show-password
            @update:model-value="(v: string) => {
              if (activeTab === 'login') loginForm.password = v
              else registerForm.password = v
            }"
          />
        </el-form-item>

        <el-alert
          v-if="errorMsg"
          :title="errorMsg"
          type="error"
          show-icon
          closable
          @close="errorMsg = ''"
        />

        <el-form-item>
          <el-button type="primary" size="large" :loading="loading" class="submit-btn" @click="handleSubmit">
            {{ activeTab === 'login' ? '登录' : '注册' }}
          </el-button>
        </el-form-item>
      </el-form>

      <div class="auth-footer">
        <span v-if="activeTab === 'login'">还没有账号？</span>
        <span v-else>已有账号？</span>
        <button class="link" @click="switchTab">
          {{ activeTab === 'login' ? '立即注册' : '立即登录' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: var(--spacing-xl);
}

.auth-card {
  width: 420px;
  background: var(--color-bg-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-hover);
  padding: var(--spacing-2xl);
}

.auth-header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.auth-logo {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 4px;
}

.auth-subtitle {
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--color-text-placeholder);
}

/* === Tabs === */
.auth-tabs {
  display: flex;
  border-bottom: 2px solid var(--color-border-light);
  margin-bottom: var(--spacing-lg);
}

.tab-btn {
  flex: 1;
  padding: var(--spacing-sm) 0;
  font-size: var(--font-size-md);
  font-weight: 500;
  color: var(--color-text-placeholder);
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all var(--transition-fast);
}
.tab-btn.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}
.tab-btn:hover {
  color: var(--color-primary);
}

.code-row {
  display: flex;
  gap: var(--spacing-sm);
}
.code-row .el-input { flex: 1; }

.submit-btn {
  width: 100%;
  margin-top: var(--spacing-sm);
}

.auth-footer {
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-text-placeholder);
}

.link {
  font-size: var(--font-size-sm);
  color: var(--color-primary-light);
  cursor: pointer;
}
.link:hover { color: var(--color-primary); }
</style>
