<script setup>
import { computed } from 'vue'
import { renderedArticles } from '../data/content'
import { Calendar, ChevronRight } from 'lucide-vue-next'

// 按年份和月份对文章进行分组排序
const groupedArticles = computed(() => {
  const groups = {}
  
  renderedArticles.forEach(article => {
    const dateObj = new Date(article.date)
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    
    if (!groups[year]) {
      groups[year] = []
    }
    
    groups[year].push({
      ...article,
      monthFormatted: `${month}月`
    })
  })
  
  // 排序年份
  const sortedYears = Object.keys(groups).sort((a, b) => b - a)
  
  return sortedYears.map(year => ({
    year,
    posts: groups[year].sort((a, b) => new Date(b.date) - new Date(a.date))
  }))
})
</script>

<template>
  <div class="archive-layout">
    <div class="breadcrumbs">
      <RouterLink to="/">首页</RouterLink>
      <span class="separator">/</span>
      <span class="current">文章归档</span>
    </div>

    <!-- 归档顶部 Banner -->
    <div class="archive-header">
      <div class="icon-shell">
        <Calendar :size="24" />
      </div>
      <div class="header-text">
        <h1 class="title">文章归档</h1>
        <p class="desc">共归档了 {{ renderedArticles.length }} 篇具有实践和学习沉淀意义的文章。</p>
      </div>
    </div>

    <!-- 归档时间线 -->
    <div class="archive-timeline">
      <div 
        v-for="group in groupedArticles" 
        :key="group.year" 
        class="timeline-year-block"
      >
        <div class="year-marker">
          <span class="year-text">{{ group.year }}</span>
          <span class="year-badge">{{ group.posts.length }} 篇</span>
        </div>

        <div class="timeline-posts">
          <RouterLink 
            v-for="post in group.posts" 
            :key="post.slug"
            :to="`/posts/${post.slug}`"
            class="timeline-post-card"
          >
            <div class="post-time">{{ post.monthFormatted }}</div>
            <div class="timeline-dot"></div>
            <div class="post-info">
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-summary">{{ post.description }}</p>
              <div class="post-footer">
                <span class="tag">{{ post.category }}</span>
                <span>•</span>
                <span>{{ post.readingTime }}</span>
              </div>
            </div>
            <ChevronRight :size="16" class="arrow-icon" />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.archive-layout {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.archive-header {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: var(--shadow-sm);
}

.icon-shell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--accent-soft);
  color: var(--accent);
}

.archive-header .title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 4px 0;
}

.archive-header .desc {
  font-size: 13.5px;
  color: var(--text-subtle);
  margin: 0;
}

/* 时间轴 */
.archive-timeline {
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;
  padding-left: 12px;
}

.archive-timeline::before {
  content: '';
  position: absolute;
  top: 15px;
  bottom: 0;
  left: 64px;
  width: 2px;
  background: var(--border-soft);
}

.timeline-year-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.year-marker {
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 10;
}

.year-text {
  font-size: 24px;
  font-weight: 800;
  color: var(--text);
  background: var(--bg);
  padding-right: 8px;
}

.year-badge {
  font-size: 11px;
  font-weight: 600;
  background: var(--accent-soft);
  color: var(--accent);
  padding: 2px 8px;
  border-radius: 6px;
}

.timeline-posts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.timeline-post-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: var(--transition);
  position: relative;
}

.timeline-post-card:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow);
  transform: translateX(4px);
}

.post-time {
  width: 44px;
  text-align: right;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-light);
  flex-shrink: 0;
}

.timeline-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border);
  border: 2px solid var(--bg);
  flex-shrink: 0;
  z-index: 10;
  transition: var(--transition);
}

.timeline-post-card:hover .timeline-dot {
  background: var(--accent);
  transform: scale(1.3);
}

.post-info {
  flex: 1;
  min-width: 0;
}

.post-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 4px 0;
  transition: var(--transition);
}

.timeline-post-card:hover .post-title {
  color: var(--accent);
}

.post-summary {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0 0 6px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  color: var(--text-light);
}

.post-footer .tag {
  color: var(--accent);
  font-weight: 600;
}

.arrow-icon {
  color: var(--text-light);
  transition: var(--transition);
}

.timeline-post-card:hover .arrow-icon {
  color: var(--accent);
  transform: translateX(2px);
}

@media (max-width: 768px) {
  .archive-timeline::before {
    left: 48px;
  }
  .post-time {
    width: 36px;
    font-size: 11px;
  }
}
</style>