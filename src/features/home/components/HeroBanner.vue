<script setup lang="ts">
</script>

<template>
  <section class="hero-banner">
    <img src="/banner.jpg" class="hero-bg" alt="" aria-hidden="true" />
    <img src="/badge.jpg" class="hero-emblem" alt="" aria-hidden="true" />
    <div class="hero-content">
      <h1 class="hero-title">学无止境 · 点映未来</h1>
      <p class="hero-subtitle">在线教育，让知识触手可及</p>
      <div class="hero-actions">
        <el-button class="hero-btn primary" size="large" round @click="scrollToCards">
          开始学习
        </el-button>
        <el-button class="hero-btn secondary" size="large" round>
          了解更多
        </el-button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
function scrollToCards() {
  const el = document.getElementById('course-grid')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.hero-banner {
  position: relative;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-banner::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1;
}

.hero-emblem {
  position: absolute;
  right: 40px;
  bottom: 20px;
  width: 200px;
  opacity: 0.1;
  pointer-events: none;
  user-select: none;
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  color: #fff;
}

.hero-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  letter-spacing: 6px;
  margin-bottom: var(--spacing-sm);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: var(--font-size-md);
  opacity: 0.9;
  margin-bottom: var(--spacing-xl);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.hero-actions {
  display: flex;
  gap: var(--spacing-base);
  justify-content: center;
}

.hero-btn {
  min-width: 120px;
}
.hero-btn.primary {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: #fff;
  backdrop-filter: blur(4px);
}
.hero-btn.primary:hover {
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-primary);
  border-color: #fff;
}
.hero-btn.secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.85);
}
.hero-btn.secondary:hover {
  border-color: #fff;
  color: #fff;
}

@media (max-width: 1000px) {
  .hero-banner { height: 240px; }
  .hero-title { font-size: var(--font-size-2xl); letter-spacing: 4px; }
  .hero-emblem { width: 140px; right: 20px; }
}
@media (max-width: 640px) {
  .hero-banner { height: 200px; }
  .hero-title { font-size: var(--font-size-xl); letter-spacing: 2px; }
  .hero-subtitle { font-size: var(--font-size-sm); }
  .hero-emblem { width: 100px; right: 10px; }
}
</style>
