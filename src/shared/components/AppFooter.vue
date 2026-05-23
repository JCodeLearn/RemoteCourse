<script setup lang="ts">
</script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <span class="footer-brand">点映</span>
      <span class="footer-divider">|</span>
      <span>&copy; 2026 点映在线教育平台</span>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  height: var(--footer-height);
  background: var(--color-bg-white);
  border-top: 1px solid var(--color-border-light);
}

.footer-inner {
  max-width: var(--content-max-width);
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  font-size: var(--font-size-xs);
  color: var(--color-text-placeholder);
}

.footer-brand {
  font-weight: 600;
  color: var(--color-text-secondary);
}

.footer-divider {
  color: var(--color-border);
}
</style>
