<script setup lang="ts">
import { ref } from 'vue'
import { createChapter, createEpisode, type ChapterNode, type EpisodeNode, type VideoFile } from '../api'

const props = defineProps<{ videoFiles: VideoFile[] }>()
const emit = defineEmits<{ update: [chapters: ChapterNode[]] }>()

const chapters = ref<ChapterNode[]>([createChapter('第1章: 入门基础')])
const expanded = ref<Set<string>>(new Set([chapters.value[0]!.id]))

// 初始化: 上传完成的视频自动进入第一章
const unusedVideos = ref<VideoFile[]>([])

function getReadyFiles(): VideoFile[] {
  return props.videoFiles.filter(f => f.status === 'ready')
}

function toggleExpand(id: string) {
  if (expanded.value.has(id)) expanded.value.delete(id)
  else expanded.value.add(id)
}

function addChapter() {
  chapters.value.push(createChapter())
  emitUpdate()
}

function removeChapter(id: string) {
  chapters.value = chapters.value.filter(c => c.id !== id)
  emitUpdate()
}

function addEpisode(chapterId: string, video: VideoFile | null = null) {
  const chapter = chapters.value.find(c => c.id === chapterId)
  if (!chapter) return
  chapter.episodes.push(createEpisode(video?.name ?? '', video))
  emitUpdate()
}

function removeEpisode(chapterId: string, episodeId: string) {
  const chapter = chapters.value.find(c => c.id === chapterId)
  if (!chapter) return
  chapter.episodes = chapter.episodes.filter(e => e.id !== episodeId)
  emitUpdate()
}

function renameChapter(id: string) {
  const c = chapters.value.find(ch => ch.id === id)
  if (!c) return
  const name = prompt('重命名章节:', c.title)
  if (name) { c.title = name; emitUpdate() }
}

function renameEpisode(cid: string, eid: string) {
  const c = chapters.value.find(ch => ch.id === cid)
  if (!c) return
  const e = c.episodes.find(ep => ep.id === eid)
  if (!e) return
  const name = prompt('重命名剧集:', e.title)
  if (name) { e.title = name; emitUpdate() }
}

function assignVideoToEpisode(cid: string, eid: string) {
  const ready = getReadyFiles()
  if (!ready.length) { alert('没有可用的已上传视频'); return }
  // 简化: 选第一个就绪的视频
  const c = chapters.value.find(ch => ch.id === cid)
  if (!c) return
  const e = c.episodes.find(ep => ep.id === eid)
  if (!e) return
  e.videoFile = ready[0]!
  emitUpdate()
}

function emitUpdate() { emit('update', chapters.value) }
</script>

<template>
  <div class="tree-manager">
    <div class="tree-header">
      <span class="tree-title">📋 课程目录</span>
      <span class="tree-hint">（拖拽排序功能将在 Phase 3 实现）</span>
    </div>

    <div v-for="chapter in chapters" :key="chapter.id" class="chapter-node">
      <div class="chapter-row">
        <button class="expand-btn" @click="toggleExpand(chapter.id)">
          <el-icon :size="12"><component :is="expanded.has(chapter.id) ? 'ArrowDownBold' : 'ArrowRightBold'" /></el-icon>
        </button>
        <span class="chapter-icon">📂</span>
        <span class="chapter-title">{{ chapter.title }}</span>
        <el-button size="small" text @click="renameChapter(chapter.id)">编辑</el-button>
        <el-button size="small" text type="danger" @click="removeChapter(chapter.id)">删除</el-button>
      </div>

      <div v-if="expanded.has(chapter.id)" class="episodes">
        <div v-for="ep in chapter.episodes" :key="ep.id" class="episode-row">
          <span class="ep-indent">├─</span>
          <span class="ep-icon">📹</span>
          <span class="ep-title">{{ ep.title }}</span>
          <span v-if="ep.videoFile" class="ep-duration">{{ ep.videoFile.name }}</span>
          <span v-else class="ep-no-video">未关联视频</span>
          <el-button size="small" text @click="renameEpisode(chapter.id, ep.id)">编辑</el-button>
          <el-button size="small" text @click="assignVideoToEpisode(chapter.id, ep.id)">关联视频</el-button>
          <el-button size="small" text type="danger" @click="removeEpisode(chapter.id, ep.id)">删除</el-button>
        </div>
        <button class="add-ep-btn" @click="addEpisode(chapter.id)">+ 添加节</button>
      </div>
    </div>

    <button class="add-chapter-btn" @click="addChapter">+ 添加章节</button>
  </div>
</template>

<style scoped>
.tree-manager { margin-bottom: var(--spacing-lg); }
.tree-header { display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-md); }
.tree-title { font-weight: 600; font-size: var(--font-size-sm); }
.tree-hint { font-size: var(--font-size-xs); color: var(--color-text-placeholder); }

.chapter-node { margin-bottom: var(--spacing-sm); }
.chapter-row { display: flex; align-items: center; gap: 4px; padding: var(--spacing-sm); background: var(--color-primary-surface); border-radius: var(--radius-sm); }
.expand-btn { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; }
.chapter-icon { font-size: 14px; }
.chapter-title { flex: 1; font-weight: 500; font-size: var(--font-size-sm); }

.episodes { margin-left: 24px; margin-top: 2px; }
.episode-row { display: flex; align-items: center; gap: 4px; padding: 6px var(--spacing-sm); font-size: var(--font-size-sm); border-bottom: 1px solid var(--color-border-light); }
.ep-indent { color: var(--color-border); }
.ep-icon { font-size: 13px; }
.ep-title { flex: 1; }
.ep-duration { font-size: var(--font-size-xs); color: var(--color-primary-light); }
.ep-no-video { font-size: var(--font-size-xs); color: var(--color-text-placeholder); }

.add-ep-btn, .add-chapter-btn { margin-top: var(--spacing-xs); padding: 4px 12px; font-size: var(--font-size-xs); color: var(--color-primary-light); cursor: pointer; border: 1px dashed var(--color-border); border-radius: var(--radius-sm); width: 100%; text-align: center; background: transparent; }
.add-chapter-btn { margin-top: var(--spacing-sm); }
</style>
