<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const activeItem = computed(() => {
  // 这里可以根据当前路由或滚动位置计算活跃的 TOC 项
  return null
})
</script>

<template>
  <aside class="toc">
    <!-- 目录 -->
    <div class="toc-section">
      <h3 class="toc-title">目录</h3>
      <nav class="toc-nav">
        <RouterLink 
          v-for="item in items" 
          :key="item.id || item.title"
          :to="item.url || `#${item.id}`"
          class="toc-item"
          :class="{ active: activeItem === item.id }"
        >
          {{ item.title }}
        </RouterLink>
      </nav>
    </div>

    <!-- 最近文章 -->
    <div class="toc-section">
      <h3 class="toc-title">最近文章</h3>
      <div class="recent-posts">
        <RouterLink to="/articles/vue3-composition-api" class="recent-post">
          <h4>Vue3 Composition API 完整指南</h4>
          <small>2026-06-01</small>
        </RouterLink>
        <RouterLink to="/articles/vite-optimization" class="recent-post">
          <h4>Vite 性能优化实践</h4>
          <small>2026-05-16</small>
        </RouterLink>
        <RouterLink to="/articles/css-theme-system" class="recent-post">
          <h4>CSS 主题系统设计</h4>
          <small>2026-04-08</small>
        </RouterLink>
      </div>
    </div>

    <!-- 热门标签 -->
    <div class="toc-section">
      <h3 class="toc-title">热门标签</h3>
      <div class="popular-tags">
        <RouterLink to="/tags/vue3" class="popular-tag">#Vue3</RouterLink>
        <RouterLink to="/tags/vite" class="popular-tag">#Vite</RouterLink>
        <RouterLink to="/tags/css" class="popular-tag">#CSS</RouterLink>
        <RouterLink to="/tags/javascript" class="popular-tag">#JavaScript</RouterLink>
        <RouterLink to="/tags/vue" class="popular-tag">#Vue</RouterLink>
        <RouterLink to="/tags/frontend" class="popular-tag">#Frontend</RouterLink>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.toc {
  position: sticky;
  top: var(--topbar-height);
  height: calc(100vh - var(--topbar-height));
  overflow-y: auto;
  padding: 24px 0;
}

.toc-section {
  margin-bottom: 32px;
}

.toc-title {
  font-size: 14px;
  font-weight: var(--font-weight-bold);
  color: var(--text-muted);
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.toc-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toc-item {
  padding: 8px 0;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 14px;
  transition: var(--transition);
}

.toc-item:hover {
  color: var(--accent);
}

.toc-item.active {
  color: var(--accent);
  font-weight: var(--font-weight-bold);
}

.recent-posts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recent-post {
  padding: 12px;
  border-radius: var(--radius-sm);
  background: var(--surface-hover);
  transition: var(--transition);
  text-decoration: none;
  color: var(--text);
}

.recent-post:hover {
  background: var(--accent-soft);
  transform: translateX(4px);
}

.recent-post h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  color: var(--text);
}

.recent-post small {
  color: var(--text-subtle);
  font-size: 12px;
}

.popular-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.popular-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background: var(--accent-soft);
  color: var(--accent);
  border-radius: var(--radius-pill);
  font-size: 12px;
  transition: var(--transition);
  text-decoration: none;
}

.popular-tag:hover {
  background: var(--accent);
  color: white;
}

/* 移动端样式 */
@media (max-width: 768px) {
  .toc {
    display: none;
  }
}
</style>