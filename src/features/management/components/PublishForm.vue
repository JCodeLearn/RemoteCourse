<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { CATEGORY_OPTIONS, saveCourse, type VideoFile, type ChapterNode } from '../api'
import VideoUploader from './VideoUploader.vue'
import EpisodeTreeManager from './EpisodeTreeManager.vue'

const videoFiles = ref<VideoFile[]>([])
const chapters = ref<ChapterNode[]>([])

const form = reactive({
  title: '', description: '', coverUrl: '', categoryId: 0, tags: [] as string[], status: 'draft' as 'draft' | 'published',
})

const tagInput = ref('')
function addTag() {
  const t = tagInput.value.trim()
  if (t && !form.tags.includes(t)) { form.tags.push(t); tagInput.value = '' }
}
function removeTag(tag: string) { form.tags = form.tags.filter(t => t !== tag) }

async function handleSave(status: 'draft' | 'published') {
  if (!form.title.trim()) { ElMessage.warning('请输入课程标题'); return }
  if (!form.categoryId) { ElMessage.warning('请选择分类'); return }
  form.status = status
  try {
    await saveCourse(form, chapters.value)
    ElMessage.success(status === 'published' ? '发布成功！' : '草稿已保存')
  } catch { ElMessage.error('保存失败') }
}

function handlePreview() {
  ElMessage.info('预览功能将在后续实现')
}

async function confirmPublish() {
  await ElMessageBox.confirm('确认发布课程？发布后学生即可观看。', '确认发布', { confirmButtonText: '发布', cancelButtonText: '取消', type: 'warning' })
  handleSave('published')
}
</script>

<template>
  <div class="publish-form">
    <h2 class="form-title">📹 发布新课程</h2>

    <!-- 标题 -->
    <div class="form-section">
      <label class="form-label">课程标题 <span class="required">*</span></label>
      <el-input v-model="form.title" maxlength="100" show-word-limit placeholder="输入课程标题，建议 6-30 字" size="large" />
    </div>

    <!-- 描述 -->
    <div class="form-section">
      <label class="form-label">课程描述</label>
      <el-input v-model="form.description" type="textarea" :rows="4" placeholder="介绍课程内容和学习目标..." />
    </div>

    <!-- 封面 + 分类 -->
    <div class="form-section form-row-2">
      <div class="form-col">
        <label class="form-label">课程封面</label>
        <div class="cover-upload">
          <el-icon :size="24" color="var(--color-text-placeholder)"><Picture /></el-icon>
          <span>拖拽上传封面 (16:9)</span>
        </div>
      </div>
      <div class="form-col">
        <label class="form-label">分类 <span class="required">*</span></label>
        <el-select v-model="form.categoryId" placeholder="选择分类" size="large" style="width:100%">
          <el-option v-for="c in CATEGORY_OPTIONS" :key="c.id" :label="c.name" :value="c.id" />
        </el-select>
      </div>
    </div>

    <!-- 标签 -->
    <div class="form-section">
      <label class="form-label">标签</label>
      <div class="tag-area">
        <el-tag v-for="t in form.tags" :key="t" closable @close="removeTag(t)" class="tag-item">{{ t }}</el-tag>
        <el-input v-if="form.tags.length < 5" v-model="tagInput" size="small" placeholder="输入标签后回车" class="tag-input" @keyup.enter="addTag" @blur="addTag" />
      </div>
      <span class="tag-hint">建议 3-5 个标签，方便学生搜索</span>
    </div>

    <!-- 视频上传 -->
    <div class="form-section">
      <label class="form-label">视频上传</label>
      <VideoUploader @update="videoFiles = $event" />
    </div>

    <!-- 剧集管理 -->
    <div class="form-section">
      <EpisodeTreeManager :video-files="videoFiles" @update="chapters = $event" />
    </div>

    <!-- 操作按钮 -->
    <div class="form-actions">
      <el-button size="large" @click="handleSave('draft')">💾 保存草稿</el-button>
      <el-button size="large" @click="handlePreview">👁 预览</el-button>
      <el-button size="large" type="primary" @click="confirmPublish">🚀 发布</el-button>
    </div>
  </div>
</template>

<style scoped>
.publish-form { max-width: 800px; }
.form-title { font-size: var(--font-size-xl); font-weight: 700; margin-bottom: var(--spacing-xl); }
.form-section { margin-bottom: var(--spacing-lg); }
.form-label { display: block; font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text-primary); margin-bottom: var(--spacing-sm); }
.required { color: var(--color-accent); }
.form-row-2 { display: flex; gap: var(--spacing-lg); }
.form-col { flex: 1; }
.cover-upload { border: 2px dashed var(--color-border); border-radius: var(--radius-sm); padding: var(--spacing-lg); text-align: center; color: var(--color-text-placeholder); font-size: var(--font-size-sm); display: flex; flex-direction: column; align-items: center; gap: var(--spacing-sm); }

.tag-area { display: flex; flex-wrap: wrap; gap: var(--spacing-xs); align-items: center; }
.tag-item { margin: 0; }
.tag-input { width: 140px; }
.tag-hint { font-size: var(--font-size-xs); color: var(--color-text-placeholder); display: block; margin-top: 4px; }

.form-actions { display: flex; gap: var(--spacing-md); padding-top: var(--spacing-lg); border-top: 1px solid var(--color-border-light); justify-content: flex-end; }
</style>
