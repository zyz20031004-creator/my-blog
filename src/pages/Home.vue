<script setup>
import { computed, ref } from 'vue'
import { articles } from '../data/content'
import { CalendarDays, Clock, Heart, MessageSquare, Star, ArrowUpRight, Award, Compass, RefreshCw } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

// 支持切换 Tab
const activeTab = ref('newest') // newest | updated | random

const articleList = computed(() => {
  let sorted = [...articles]
  if (activeTab.value === 'newest') {
    sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
  } else if (activeTab.value === 'updated') {
    // 简易模拟更新排序
    sorted.reverse()
  } else if (activeTab.value === 'random') {
    // 简易乱序
    sorted.sort(() => Math.random() - 0.5)
  }
  return sorted
})

const handleArticleClick = (slug) => {
  router.push(`/posts/${slug}`)
}
</script>

<template>
  <div class="home-container">
    <!-- 设计图头部超精美 Banner 卡片 -->
    <div class="hero-banner-card">
      <div class="banner-content">
        <span class="banner-badge">💡 Developer Journey</span>
        <h1 class="banner-title">记录学习，沉淀知识</h1>
        <p class="banner-desc">
          用笔和思考，构建稳定、克制、可持续成长的文档与笔记系统。这里集中记录了前端工程、微前端、设计体系等成长足迹。
        </p>
        <div class="banner-stats">
          <div class="stat-unit">
            <span class="number">236</span>
            <span class="label">文章总数</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-unit">
            <span class="number">24</span>
            <span class="label">分类专栏</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-unit">
            <span class="number">48</span>
            <span class="label">标签汇聚</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-unit">
            <span class="number">12.6k</span>
            <span class="label">总阅读量</span>
          </div>
        </div>
      </div>
      <div class="banner-illustration">
        <!-- 美观的背景插图渐变圈 -->
        <div class="glow-circle"></div>
      </div>
    </div>

    <!-- Tab 切换和文章筛选 -->
    <div class="list-header">
      <div class="tab-triggers">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'newest' }"
          @click="activeTab = 'newest'"
        >
          <Award :size="15" />
          <span>最新发布</span>
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'updated' }"
          @click="activeTab = 'updated'"
        >
          <RefreshCw :size="15" />
          <span>最近更新</span>
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'random' }"
          @click="activeTab = 'random'"
        >
          <Compass :size="15" />
          <span>随机推荐</span>
        </button>
      </div>
      <div class="meta-info desktop-only">
        共 {{ articleList.length }} 篇沉淀
      </div>
    </div>

    <!-- 文章网格列表 - 设计图高颜值效果 -->
    <div class="article-stack">
      <article 
        v-for="article in articleList" 
        :key="article.slug"
        class="premium-post-card"
        @click="handleArticleClick(article.slug)"
      >
        <div class="card-inner">
          <div class="post-meta-top">
            <span class="post-category">{{ article.category }}</span>
            <span class="post-date-wrapper">
              <CalendarDays :size="14" />
              <span>{{ article.date }}</span>
            </span>
            <span class="post-reading-wrapper">
              <Clock :size="14" />
              <span>{{ article.readingTime }}</span>
            </span>
          </div>

          <h2 class="post-title">
            <span>{{ article.title }}</span>
            <ArrowUpRight :size="16" class="arrow-icon" />
          </h2>

          <p class="post-summary">
            {{ article.description }}
          </p>

          <div class="post-meta-bottom">
            <div class="tags-row">
              <span v-for="tag in article.tags" :key="tag" class="tag-badge-pill">
                #{{ tag }}
              </span>
            </div>

            <!-- 设计图专属：点赞/阅读/收藏统计等 -->
            <div class="interactive-stats">
              <span class="stat-badge" title="点赞量">
                <Heart :size="14" />
                <span>128</span>
              </span>
              <span class="stat-badge" title="阅读量">
                <Star :size="14" />
                <span>256</span>
              </span>
              <span class="stat-badge" title="评论数">
                <MessageSquare :size="14" />
                <span>36</span>
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 高端 Banner 卡片 */
.hero-banner-card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 32px;
  overflow: hidden;
  box-shadow: var(--shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:root[data-theme='dark'] .hero-banner-card {
  background: var(--surface-secondary);
}

.banner-content {
  position: relative;
  z-index: 10;
  max-width: 600px;
}

.banner-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  margin-bottom: 14px;
}

.banner-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--text);
  margin: 0 0 12px 0;
  line-height: 1.25;
}

.banner-desc {
  font-size: 14.5px;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 24px;
}

.banner-stats {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-unit {
  display: flex;
  flex-direction: column;
}

.stat-unit .number {
  font-size: 20px;
  font-weight: 700;
  color: var(--accent);
}

.stat-unit .label {
  font-size: 12px;
  color: var(--text-subtle);
}

.stat-divider {
  width: 1px;
  height: 24px;
  background: var(--border);
}

.banner-illustration {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 250px;
  height: 250px;
  pointer-events: none;
}

.glow-circle {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(20px);
}

/* Tabs & List Header */
.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 12px;
}

.tab-triggers {
  display: flex;
  gap: 6px;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.tab-btn:hover {
  background: var(--surface-secondary);
  color: var(--text);
}

.tab-btn.active {
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}

.meta-info {
  font-size: 13px;
  color: var(--text-light);
}

/* 高颜值文章卡片 */
.article-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.premium-post-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.premium-post-card:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.premium-post-card:hover .arrow-icon {
  transform: translate(2px, -2px);
  color: var(--accent);
}

.card-inner {
  padding: 24px;
}

.post-meta-top {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 13px;
  color: var(--text-subtle);
  margin-bottom: 12px;
}

.post-category {
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 2px 8px;
  border-radius: 6px;
}

.post-date-wrapper,
.post-reading-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
}

.post-title {
  font-size: 19px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 10px 0;
  line-height: 1.35;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  transition: var(--transition);
}

.premium-post-card:hover .post-title {
  color: var(--accent);
}

.arrow-icon {
  color: var(--text-light);
  transition: var(--transition);
}

.post-summary {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0 0 20px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-meta-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-top: 1px solid var(--border-soft);
  padding-top: 14px;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-badge-pill {
  font-size: 12px;
  color: var(--text-light);
  background: var(--surface-secondary);
  border: 1px solid var(--border-soft);
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  transition: var(--transition);
}

.tag-badge-pill:hover {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
}

.interactive-stats {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  color: var(--text-light);
  transition: var(--transition);
}

.stat-badge:hover {
  color: var(--accent);
}

@media (max-width: 768px) {
  .hero-banner-card {
    padding: 20px;
  }
  .banner-title {
    font-size: 22px;
  }
  .banner-stats {
    flex-wrap: wrap;
    gap: 12px;
  }
  .card-inner {
    padding: 16px;
  }
  .post-title {
    font-size: 17px;
  }
}
</style>