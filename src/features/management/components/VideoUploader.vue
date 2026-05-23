<script setup lang="ts">
import { ref } from 'vue'
import { createVideoFile, type VideoFile } from '../api'
import { formatFileSize } from '@/utils/format'

const emit = defineEmits<{ update: [files: VideoFile[]] }>()

const files = ref<VideoFile[]>([])
const dragging = ref(false)

function handleDrop(e: DragEvent) {
  dragging.value = false
  const dropped = e.dataTransfer?.files
  if (dropped) addFiles(dropped)
}

function handleFileInput(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files) addFiles(input.files)
}

function addFiles(fileList: FileList) {
  for (let i = 0; i < fileList.length; i++) {
    const f = fileList[i]!
    if (!f.type.startsWith('video/')) continue
    const vf = createVideoFile(f.name, f.size)
    files.value.push(vf)
    simulateUpload(vf)
  }
  emit('update', files.value)
}

function simulateUpload(vf: VideoFile) {
  vf.status = 'uploading'
  const interval = setInterval(() => {
    vf.progress = Math.min(vf.progress + Math.random() * 25, 100)
    if (vf.progress >= 100) {
      vf.status = 'ready'
      vf.duration = Math.floor(Math.random() * 1800) + 300
      clearInterval(interval)
      emit('update', files.value)
    }
  }, 300 + Math.random() * 400)
}

function removeFile(id: string) {
  files.value = files.value.filter(f => f.id !== id)
  emit('update', files.value)
}

function renameFile(id: string) {
  const f = files.value.find(v => v.id === id)
  if (!f) return
  const name = prompt('重命名视频文件:', f.name)
  if (name) f.name = name
}

const statusLabels: Record<string, string> = { waiting: '等待中', uploading: '上传中', transcoding: '转码中', ready: '就绪', failed: '失败' }
const statusIcons: Record<string, string> = { waiting: '⏸', uploading: '⏳', transcoding: '🔄', ready: '✅', failed: '❌' }
</script>

<template>
  <div class="video-uploader">
    <div
      class="drop-zone" :class="{ dragging }"
      @dragover.prevent="dragging = true"
      @dragleave="dragging = false"
      @drop.prevent="handleDrop"
    >
      <el-icon :size="40" color="var(--color-text-placeholder)"><UploadFilled /></el-icon>
      <p>拖拽 MP4 文件到此处，或 <label class="file-label">点击选择文件<input type="file" accept="video/*" multiple hidden @change="handleFileInput" /></label></p>
      <span class="hint">支持 MP4/MOV/AVI, 单文件最大 2GB</span>
    </div>

    <div v-if="files.length" class="file-list">
      <div v-for="f in files" :key="f.id" class="file-row">
        <div class="file-info">
          <span class="file-icon">📹</span>
          <span class="file-name">{{ f.name }}</span>
          <span class="file-meta">{{ f.resolution }} · {{ formatFileSize(f.size) }}</span>
          <span class="file-status" :class="f.status">{{ statusIcons[f.status] }} {{ statusLabels[f.status] }}</span>
        </div>
        <el-progress v-if="f.status === 'uploading'" :percentage="Math.round(f.progress)" :stroke-width="4" :show-text="false" />
        <div class="file-actions">
          <el-button size="small" text @click="renameFile(f.id)">重命名</el-button>
          <el-button size="small" text type="danger" @click="removeFile(f.id)">删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-uploader { margin-bottom: var(--spacing-lg); }

.drop-zone {
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-xl); text-align: center;
  transition: all var(--transition-fast);
}
.drop-zone.dragging { border-color: var(--color-primary); background: var(--color-primary-surface); }
.drop-zone p { font-size: var(--font-size-sm); color: var(--color-text-secondary); margin: var(--spacing-sm) 0; }
.file-label { color: var(--color-primary); cursor: pointer; text-decoration: underline; }
.hint { font-size: var(--font-size-xs); color: var(--color-text-placeholder); }

.file-list { margin-top: var(--spacing-md); display: flex; flex-direction: column; gap: var(--spacing-sm); }
.file-row { padding: var(--spacing-sm) var(--spacing-md); background: var(--color-bg); border-radius: var(--radius-sm); }
.file-info { display: flex; align-items: center; gap: var(--spacing-sm); font-size: var(--font-size-sm); margin-bottom: 4px; flex-wrap: wrap; }
.file-icon { font-size: 16px; }
.file-name { font-weight: 500; flex: 1; min-width: 200px; }
.file-meta { font-size: var(--font-size-xs); color: var(--color-text-placeholder); }
.file-status { font-size: var(--font-size-xs); }
.file-status.waiting, .file-status.uploading { color: var(--color-primary-light); }
.file-status.ready { color: #67C23A; }
.file-status.failed { color: var(--color-accent); }
.file-actions { display: flex; gap: var(--spacing-sm); margin-top: 2px; }
</style>
