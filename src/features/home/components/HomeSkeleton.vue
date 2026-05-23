<script setup lang="ts">
</script>

<template>
  <div class="skeleton-grid">
    <div v-for="n in 8" :key="n" class="skeleton-card">
      <el-skeleton animated>
        <template #template>
          <div class="sk-cover" />
          <div class="sk-body">
            <el-skeleton-item variant="text" style="width: 100%; margin-bottom: 6px" />
            <el-skeleton-item variant="text" style="width: 60%; margin-bottom: 4px" />
            <el-skeleton-item variant="text" style="width: 45%" />
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<style scoped>
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.skeleton-card {
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-bg-white);
  box-shadow: var(--shadow-card);
}

.sk-cover {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: var(--color-border-light);
}

.sk-body {
  padding: var(--spacing-md);
}
</style>
