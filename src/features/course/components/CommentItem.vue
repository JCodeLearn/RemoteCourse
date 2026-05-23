<script setup lang="ts">
import { ref } from 'vue'
import type { CommentItem as CommentType } from '../api'
import { toggleCommentLike, postComment } from '../api'
import { formatDate } from '@/utils/format'

const { comment, depth } = defineProps<{ comment: CommentType; depth: number }>()
const emit = defineEmits<{ replied: [] }>()

const showReplyInput = ref(false)
const replyContent = ref('')

async function handleLike() {
  await toggleCommentLike(comment.id)
}

async function handleReply() {
  if (!replyContent.value.trim()) return
  await postComment(comment.courseId, comment.id, replyContent.value.trim())
  replyContent.value = ''
  showReplyInput.value = false
  emit('replied')
}
</script>

<template>
  <div class="comment-item" :style="{ marginLeft: depth > 0 ? '32px' : '0' }">
    <el-avatar :size="28" :src="comment.userAvatar">
      <el-icon :size="16"><UserFilled /></el-icon>
    </el-avatar>
    <div class="ci-body">
      <div class="ci-header">
        <span class="ci-name">{{ comment.username }}</span>
        <span class="ci-time">{{ formatDate(comment.createdAt) }}</span>
      </div>
      <p class="ci-content" :class="{ sending: comment.status === 'sending' }">
        <span v-if="comment.status === 'sending'" class="sending-indicator">⏳ </span>
        {{ comment.content }}
      </p>
      <div class="ci-actions" v-if="comment.status === 'ok'">
        <button class="ci-like" :class="{ liked: comment.isLiked }" @click="handleLike">
          <el-icon :size="14"><Pointer /></el-icon>
          <span>{{ comment.likeCount }}</span>
        </button>
        <button v-if="depth < 2" class="ci-reply" @click="showReplyInput = !showReplyInput">
          <el-icon :size="14"><ChatDotRound /></el-icon>
          <span>{{ showReplyInput ? '取消' : '回复' }}</span>
        </button>
      </div>

      <div v-if="showReplyInput" class="ci-reply-box">
        <el-input v-model="replyContent" size="small" placeholder="输入回复..." @keyup.enter="handleReply" />
        <el-button size="small" type="primary" @click="handleReply">发送</el-button>
      </div>

      <!-- 递归子回复 -->
      <CommentItem
        v-for="r in comment.replies" :key="r.id"
        :comment="r" :depth="depth + 1"
        @replied="emit('replied')"
      />
    </div>
  </div>
</template>

<style scoped>
.comment-item { display: flex; gap: var(--spacing-sm); padding: var(--spacing-sm) 0; }
.ci-body { flex: 1; min-width: 0; }
.ci-header { display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: 2px; }
.ci-name { font-size: var(--font-size-xs); font-weight: 600; color: var(--color-text-secondary); }
.ci-time { font-size: 11px; color: var(--color-text-placeholder); }
.ci-content { font-size: var(--font-size-sm); color: var(--color-text-primary); margin: 2px 0 var(--spacing-xs); line-height: 1.6; }
.ci-content.sending { color: var(--color-text-placeholder); font-style: italic; }
.sending-indicator { font-style: normal; }
.ci-actions { display: flex; gap: var(--spacing-md); }
.ci-like, .ci-reply { display: flex; align-items: center; gap: 2px; font-size: var(--font-size-xs); color: var(--color-text-placeholder); cursor: pointer; background: none; border: none; padding: 0; }
.ci-like:hover, .ci-reply:hover { color: var(--color-primary); }
.ci-like.liked { color: var(--color-accent); }
.ci-reply-box { margin-top: var(--spacing-sm); display: flex; gap: var(--spacing-sm); }
.ci-reply-box .el-input { flex: 1; }
</style>
