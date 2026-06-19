<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleBySlug, renderedArticles } from '../data/content'
import Toc from '../components/Toc.vue'
import { 
  CalendarDays, Clock, Menu, X, ArrowLeft, Heart, 
  Star, MessageSquare, ChevronLeft, ChevronRight, BookOpen, AlertCircle
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const article = computed(() => getArticleBySlug(route.params.slug))
const mobileTocCollapsed = ref(true)
const readingProgress = ref(0)

// 互动统计状态
const liked = ref(false)
const starred = ref(false)
const likeCount = ref(128)
const starCount = ref(256)

const toggleLike = () => {
  liked.value = !liked.value
  likeCount.value += liked.value ? 1 : -1
}

const toggleStar = () => {
  starred.value = !starred.value
  starCount.value += starred.value ? 1 : -1
}

// 查找“上一篇”和“下一篇”文章
const navArticles = computed(() => {
  if (!article.value) return { prev: null, next: null }
  const index = renderedArticles.findIndex(a => a.slug === article.value.slug)
  return {
    prev: index > 0 ? renderedArticles[index - 1] : null,
    next: index < renderedArticles.length - 1 ? renderedArticles[index + 1] : null
  }
})

// 监听滚动更新阅读进度
const updateReadingProgress = () => {
  if (!article.value) return
  const articleElement = document.querySelector('.article-content')
  if (!articleElement) return
  const articleHeight = articleElement.offsetHeight
  const scrolled = window.pageYOffset
  const progress = Math.min((scrolled / (articleHeight - window.innerHeight)) * 100, 100)
  readingProgress.value = isNaN(progress) ? 0 : progress
}

const toggleMobileToc = () => {
  mobileTocCollapsed.value = !mobileTocCollapsed.value
}

// 导航回首页
const goBack = () => {
  router.push('/')
}

onMounted(() => {
  window.addEventListener('scroll', updateReadingProgress, { passive: true })
  updateReadingProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateReadingProgress)
})

watch(() => route.params.slug, () => {
  readingProgress.value = 0
  setTimeout(updateReadingProgress, 100)
})
</script>

<template>
  <div class="post-layout" v-if="article">
    <!-- 极细致阅读进度条 -->
    <div class="reading-progress-bar" :style="{ width: `${readingProgress}%` }"></div>
    
    <!-- 面包屑导航 -->
    <div class="breadcrumbs">
      <RouterLink to="/">首页</RouterLink>
      <span class="separator">/</span>
      <RouterLink to="/categories">{{ article.category }}</RouterLink>
      <span class="separator">/</span>
      <span class="current">{{ article.title }}</span>
    </div>

    <!-- 精细文章头区 -->
    <header class="article-meta-header">
      <div class="header-upper">
        <span class="category-tag">{{ article.category }}</span>
        <div class="metadata-group">
          <span class="meta-item">
            <CalendarDays :size="14" />
            <span>{{ article.date }}</span>
          </span>
          <span class="meta-item">
            <Clock :size="14" />
            <span>阅读需要 {{ article.readingTime }}</span>
          </span>
        </div>
      </div>

      <h1 class="main-title">{{ article.title }}</h1>
      
      <!-- 摘要呼叫盒 - 设计图高颜值呈现 -->
      <div class="summary-callout">
        <div class="icon-container">
          <AlertCircle :size="20" />
        </div>
        <div class="summary-body">
          <div class="summary-title">摘要</div>
          <p class="summary-text">{{ article.description }}</p>
        </div>
      </div>
    </header>

    <!-- 文章核心内容区 -->
    <div class="article-content">
      <div class="markdown-body" v-html="article.html"></div>
    </div>

    <!-- 设计图专属：底部点赞/收藏/评论互动栏 -->
    <div class="article-interaction-center">
      <button class="interact-btn" :class="{ active: liked }" @click="toggleLike">
        <Heart :size="18" :fill="liked ? 'currentColor' : 'none'" />
        <span>{{ likeCount }}</span>
      </button>
      <button class="interact-btn" :class="{ active: starred }" @click="toggleStar">
        <Star :size="18" :fill="starred ? 'currentColor' : 'none'" />
        <span>{{ starCount }}</span>
      </button>
      <button class="interact-btn">
        <MessageSquare :size="18" />
        <span>评论 (36)</span>
      </button>
    </div>

    <!-- 上一篇、下一篇：精美双卡片结构 -->
    <div class="post-navigation-row">
      <div class="nav-card-container">
        <RouterLink 
          v-if="navArticles.prev" 
          :to="`/posts/${navArticles.prev.slug}`"
          class="navigation-card prev"
        >
          <div class="nav-label">
            <ChevronLeft :size="16" />
            <span>上一篇</span>
          </div>
          <div class="nav-title">{{ navArticles.prev.title }}</div>
        </RouterLink>
        <div v-else class="navigation-card-empty">
          <span class="empty-label">已经是第一篇了</span>
        </div>
      </div>

      <div class="nav-card-container">
        <RouterLink 
          v-if="navArticles.next" 
          :to="`/posts/${navArticles.next.slug}`"
          class="navigation-card next"
        >
          <div class="nav-label">
            <span>下一篇</span>
            <ChevronRight :size="16" />
          </div>
          <div class="nav-title">{{ navArticles.next.title }}</div>
        </RouterLink>
        <div v-else class="navigation-card-empty">
          <span class="empty-label">已经是最后一篇了</span>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="not-found-state">
    <div class="not-found-inner">
      <div class="code-404">404</div>
      <h2>文章不见了</h2>
      <p>这篇笔记可能已经被归档或删除。</p>
      <button class="btn-action" @click="goBack">返回首页</button>
    </div>
  </div>
</template>

<style scoped>
.post-layout {
  display: flex;
  flex-direction: column;
}

.reading-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--accent-gradient);
  z-index: 2000;
  transition: width 0.1s ease;
}

/* 顶部文章元信息 */
.article-meta-header {
  margin-bottom: 28px;
}

.header-upper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.category-tag {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 4px 12px;
  border-radius: 6px;
}

.metadata-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-subtle);
}

.main-title {
  font-size: 32px;
  font-weight: 800;
  color: var(--text);
  line-height: 1.25;
  margin: 0 0 24px 0;
}

/* 详情页摘要导读样式 */
.summary-callout {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: var(--accent-soft);
  border: 1px solid var(--accent);
  border-left: 5px solid var(--accent);
  border-radius: var(--radius-md);
  margin-bottom: 32px;
  box-shadow: var(--shadow-sm);
}

.summary-callout .icon-container {
  color: var(--accent);
  display: flex;
  align-items: flex-start;
  font-size: 20px;
  flex-shrink: 0;
}

.summary-callout .summary-text {
  font-size: 14.5px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

.summary-callout .summary-title {
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 4px;
  font-size: 15px;
}

.article-content {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 32px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 32px;
}

/* 互动栏 */
.article-interaction-center {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px 0;
  margin-bottom: 32px;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.interact-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-muted);
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: var(--transition);
}

.interact-btn:hover, .interact-btn.active {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-1px);
}

/* 导航行 */
.post-navigation-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 48px;
}

.nav-card-container {
  min-width: 0;
}

.navigation-card {
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: var(--transition);
  height: 100%;
}

.navigation-card:hover {
  border-color: var(--accent);
  background: var(--surface-secondary);
}

.navigation-card.prev {
  align-items: flex-start;
}

.navigation-card.next {
  align-items: flex-end;
}

.nav-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-light);
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.navigation-card:hover .nav-label {
  color: var(--accent);
}

.nav-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.navigation-card.next .nav-title {
  text-align: right;
}

.navigation-card-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 20px;
  background: var(--surface-secondary);
  border: 1px dashed var(--border);
  border-radius: var(--radius-md);
  height: 100%;
}

.empty-label {
  font-size: 13px;
  color: var(--text-light);
}

/* 404 页 */
.not-found-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 0;
}

.not-found-inner {
  text-align: center;
}

.code-404 {
  font-size: 72px;
  font-weight: 800;
  color: var(--text-light);
  line-height: 1;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .article-content {
    padding: 20px;
  }
  .main-title {
    font-size: 24px;
  }
  .post-navigation-row {
    grid-template-columns: 1fr;
  }
}
</style>