<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getComments, postComment, type CommentItem } from '../api'
import CommentItemComponent from './CommentItem.vue'
import { useAuthStore } from '@/stores/authStore'
import { ElMessage } from 'element-plus'

const props = defineProps<{ courseId: number; commentCount: number }>()
const auth = useAuthStore()

const comments = ref<CommentItem[]>([])
const newComment = ref('')
onMounted(async () => { comments.value = await getComments(props.courseId) })

async function handlePost() {
  if (!newComment.value.trim()) return
  const content = newComment.value.trim()
  newComment.value = ''

  // 乐观更新：立即在列表顶部插入临时评论
  const temp: CommentItem = {
    id: -Date.now(), courseId: props.courseId, userId: 1, username: 'Great', userAvatar: null,
    parentId: null, content, likeCount: 0, isLiked: false,
    createdAt: new Date().toISOString(), status: 'sending', replies: [],
  }
  comments.value.unshift(temp)

  try {
    const real = await postComment(props.courseId, null, content)
    // 替换临时评论为真实数据
    const idx = comments.value.findIndex(c => c.id === temp.id)
    if (idx !== -1) comments.value.splice(idx, 1, { ...real, status: 'ok' as const })
  } catch {
    comments.value = comments.value.filter(c => c.id !== temp.id)
    ElMessage.error('发送失败，请重试')
  }
}

async function refreshComments() {
  comments.value = await getComments(props.courseId)
}
</script>

<template>
  <div class="comment-section">
    <h3 class="section-title">
      <el-icon :size="18"><ChatDotRound /></el-icon>
      评论 ({{ commentCount }})
    </h3>

    <!-- 输入框 -->
    <div v-if="auth.isLoggedIn" class="comment-input">
      <el-input v-model="newComment" size="large" placeholder="发表评论..." @keyup.enter="handlePost" />
      <el-button type="primary" @click="handlePost">发送</el-button>
    </div>
    <p v-else class="login-hint">
      <router-link to="/login">登录</router-link> 后即可发表评论
    </p>

    <!-- 评论列表 -->
    <div class="comment-list">
      <CommentItemComponent
        v-for="c in comments" :key="c.id"
        :comment="c" :depth="0"
        @replied="refreshComments"
      />
    </div>
  </div>
</template>

<style scoped>
.comment-section { margin-top: var(--spacing-lg); padding-top: var(--spacing-lg); border-top: 1px solid var(--color-border-light); }
.section-title { display: flex; align-items: center; gap: var(--spacing-xs); font-size: var(--font-size-md); font-weight: 600; color: var(--color-text-primary); margin-bottom: var(--spacing-md); }

.comment-input { display: flex; gap: var(--spacing-sm); margin-bottom: var(--spacing-lg); }
.comment-input .el-input { flex: 1; }

.login-hint { font-size: var(--font-size-sm); color: var(--color-text-placeholder); margin-bottom: var(--spacing-lg); }
.login-hint a { color: var(--color-primary); }

.comment-list { display: flex; flex-direction: column; }
</style>
