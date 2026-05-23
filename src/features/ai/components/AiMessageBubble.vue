<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import type { AiMessage } from '../composables/useAiChat'

const props = defineProps<{
  message: AiMessage
}>()

marked.setOptions({
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
  breaks: true,
})

const rendered = computed(() => {
  if (props.message.role === 'user') return escapeHtml(props.message.content)
  return marked.parse(props.message.content) as string
})
</script>

<template>
  <div class="msg-bubble" :class="message.role">
    <div class="msg-content" v-html="rendered" />
    <span v-if="message.isStreaming" class="cursor-blink">▌</span>
  </div>
</template>

<script lang="ts">
function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
</script>

<style scoped>
.msg-bubble {
  max-width: 85%;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  line-height: 1.65;
  word-break: break-word;
}

.msg-bubble.user {
  align-self: flex-end;
  background: var(--color-primary);
  color: #fff;
  border-bottom-right-radius: 4px;
}

.msg-bubble.assistant {
  align-self: flex-start;
  background: #f0f2f5;
  color: var(--color-text-primary);
  border-bottom-left-radius: 4px;
}

/* Markdown 内部样式 */
.msg-content :deep(p) { margin: 0 0 4px; }
.msg-content :deep(p:last-child) { margin-bottom: 0; }
.msg-content :deep(ul), .msg-content :deep(ol) { padding-left: 18px; margin: 4px 0; }
.msg-content :deep(li) { margin: 2px 0; }
.msg-content :deep(strong) { font-weight: 600; }
.msg-content :deep(code) {
  background: rgba(0,0,0,0.06);
  padding: 1px 5px;
  border-radius: 3px;
  font-family: var(--font-family-code);
  font-size: 12px;
}
.msg-content :deep(pre) {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: var(--spacing-md);
  border-radius: var(--radius-sm);
  overflow-x: auto;
  margin: 6px 0;
}
.msg-content :deep(pre code) {
  background: none;
  padding: 0;
  font-size: 12px;
  color: inherit;
}

.user .msg-content :deep(code) {
  background: rgba(255,255,255,0.15);
}

.cursor-blink {
  animation: blink 0.7s infinite;
  color: var(--color-primary);
  font-weight: 400;
}
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
