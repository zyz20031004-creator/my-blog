<script setup>
import { computed } from 'vue'
import { getTaxonomy } from '../data/content'
import { useRouter, useRoute } from 'vue-router'
import { FolderOpen, Tags, ChevronRight, X } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  mode: {
    type: String,
    required: true
  }
})

// 1. 获取 URL 中的 select 路由参数
const selectedName = computed(() => route.query.select || null)

const title = computed(() => (props.mode === 'categories' ? '分类专栏' : '热门标签'))
const subtitle = computed(() => (props.mode === 'categories' ? '按主题整理的文章集' : '快速扫描检索词云'))

// 2. 联动筛选：根据 select 参数动态过滤展示的卡片
const groups = computed(() => {
  const allGroups = getTaxonomy(props.mode)
  if (selectedName.value) {
    return allGroups.filter(g => g.name.toLowerCase() === selectedName.value.toLowerCase())
  }
  return allGroups
})

// 3. 重置并清除筛选，展示全部卡片
const clearFilter = () => {
  router.push({ query: {} })
}

// 计算不同卡片主题色
const colors = [
  { bg: 'rgba(59, 130, 246, 0.05)', border: 'rgba(59, 130, 246, 0.2)', accent: '#3b82f6' },
  { bg: 'rgba(16, 185, 129, 0.05)', border: 'rgba(16, 185, 129, 0.2)', accent: '#10b981' },
  { bg: 'rgba(139, 92, 246, 0.05)', border: 'rgba(139, 92, 246, 0.2)', accent: '#8b5cf6' },
  { bg: 'rgba(245, 158, 11, 0.05)', border: 'rgba(245, 158, 11, 0.2)', accent: '#f59e0b' },
  { bg: 'rgba(236, 72, 153, 0.05)', border: 'rgba(236, 72, 153, 0.2)', accent: '#ec4899' }
]

const getCardStyle = (index) => {
  const color = colors[index % colors.length]
  return {
    '--card-glow-bg': color.bg,
    '--card-glow-border': color.border,
    '--card-accent-color': color.accent
  }
}
</script>

<template>
  <div class="taxonomy-layout">
    <div class="breadcrumbs">
      <RouterLink to="/">首页</RouterLink>
      <span class="separator">/</span>
      <span class="current">{{ title }}</span>
    </div>

    <!-- 顶部引言 -->
    <section class="taxonomy-header-card">
      <div class="header-inner">
        <div class="icon-shell">
          <component :is="mode === 'categories' ? FolderOpen : Tags" :size="24" />
        </div>
        <div class="meta">
          <h1 class="page-title">{{ title }}</h1>
          <p class="page-subtitle">{{ subtitle }}</p>
        </div>
      </div>
    </section>

    <!-- 已筛选信息提示 Banner -->
    <transition name="fade">
      <div v-if="selectedName" class="filter-banner">
        <div class="filter-left">
          <span class="filter-badge">🔍 已聚焦</span>
          <span class="filter-text">
            正在显示{{ mode === 'categories' ? '分类' : '标签' }}：<strong>{{ selectedName }}</strong>
          </span>
        </div>
        <button @click="clearFilter" class="clear-filter-btn" title="显示全部">
          <X :size="14" />
          <span>清除筛选</span>
        </button>
      </div>
    </transition>

    <!-- 高保真网格卡片列表 -->
    <section class="taxonomy-cards-grid">
      <article 
        v-for="(group, idx) in groups" 
        :key="group.name" 
        class="premium-taxonomy-card"
        :style="getCardStyle(idx)"
      >
        <div class="card-head">
          <div class="accent-indicator"></div>
          <h2 class="category-name">{{ group.name }}</h2>
          <span class="count-badge">{{ group.posts.length }} 篇</span>
        </div>

        <div class="posts-preview-list">
          <RouterLink 
            v-for="post in group.posts" 
            :key="post.slug" 
            :to="`/posts/${post.slug}`"
            class="preview-post-item"
          >
            <ChevronRight :size="14" class="bullet-icon" />
            <span class="post-title">{{ post.title }}</span>
          </RouterLink>
        </div>
      </article>

      <!-- 空状态 -->
      <div v-if="groups.length === 0" class="empty-filter-state">
        <p>没有找到与 “{{ selectedName }}” 对应的{{ mode === 'categories' ? '分类' : '标签' }}</p>
        <button @click="clearFilter" class="clear-filter-btn">
          显示全部
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.taxonomy-layout {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.taxonomy-header-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 16px;
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

.page-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 4px 0;
}

.page-subtitle {
  font-size: 13.5px;
  color: var(--text-subtle);
  margin: 0;
}

/* 联动筛选条样式 */
.filter-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 20px;
  background: var(--accent-soft);
  border: 1px solid var(--accent);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.filter-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-badge {
  font-size: 11px;
  font-weight: 700;
  color: white;
  background: var(--accent);
  padding: 2px 8px;
  border-radius: 6px;
}

.filter-text {
  font-size: 14px;
  color: var(--text);
}

.clear-filter-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.clear-filter-btn:hover {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
}

/* 瀑布流与弹性网格卡片 */
.taxonomy-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.premium-taxonomy-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 24px;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  overflow: hidden;
}

.premium-taxonomy-card:hover {
  border-color: var(--card-accent-color);
  box-shadow: 0 12px 30px -10px var(--card-glow-border);
  transform: translateY(-2px);
}

.accent-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--card-accent-color);
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.category-name {
  font-size: 17px;
  font-weight: 700;
  color: var(--text);
  margin: 0;
}

.count-badge {
  font-size: 11px;
  font-weight: 600;
  background: var(--card-glow-bg);
  border: 1px solid var(--card-glow-border);
  color: var(--card-accent-color);
  padding: 2px 8px;
  border-radius: 6px;
}

.posts-preview-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.preview-post-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  color: var(--text-muted);
  text-decoration: none;
  transition: var(--transition);
}

.preview-post-item:hover {
  color: var(--card-accent-color);
}

.bullet-icon {
  color: var(--text-light);
  flex-shrink: 0;
}

.preview-post-item:hover .bullet-icon {
  color: var(--card-accent-color);
}

.empty-filter-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 48px;
  color: var(--text-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

/* 动效 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>