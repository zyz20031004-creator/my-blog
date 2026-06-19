<script setup>
import { 
  Folder, Tag, FileText, ChevronDown, ChevronRight, 
  BookOpen, Home, Info, Archive 
} from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getTaxonomy } from '../data/content'

defineEmits(['navigate'])

const route = useRoute()

// 1. 动态获取真实的分类列表，并赋予精美的主题 Emoji 图标
const dynamicCategories = computed(() => {
  const tax = getTaxonomy('categories')
  const iconMap = {
    'Frontend': '🌐',
    'Vue': '⚡',
    'UX': '🎨'
  }
  return tax.map(item => ({
    name: item.name,
    count: item.posts.length,
    icon: iconMap[item.name] || '📝',
    to: `/categories?select=${encodeURIComponent(item.name)}`
  }))
})

// 2. 动态获取真实的标签列表，并按文章数量降序排列
const dynamicTags = computed(() => {
  const tax = getTaxonomy('tags')
  return tax.map(item => ({
    name: item.name,
    count: item.posts.length,
    to: `/tags?select=${encodeURIComponent(item.name)}`
  })).sort((a, b) => b.count - a.count)
})

const pdfResources = ref([
  {
    title: 'Vue3 响应式原理速查',
    description: 'Proxy、effect、computed 的核心关系图谱。',
    category: 'Vue',
    size: '1.8 MB',
    url: '/pdfs'
  },
  {
    title: '前端工程化 Checklist',
    description: 'Vite、ESLint、构建优化的实践清单。',
    category: 'Engineering',
    size: '2.4 MB',
    url: '/pdfs'
  }
])

const expandedSections = ref({
  categories: true,
  tags: true,
  pdfs: false
})

const toggleSection = (section) => {
  expandedSections.value[section] = !expandedSections.value[section]
}

// 判断当前的分类链接是否处于激活高亮状态
const isCategoryActive = (name) => {
  return route.path === '/categories' && route.query.select === name
}

// 判断当前的标签链接是否处于激活高亮状态
const isTagActive = (name) => {
  return route.path === '/tags' && route.query.select === name
}
</script>

<template>
  <aside class="sidebar-container">
    <!-- 主导航菜单 -->
    <div class="sidebar-section">
      <div class="sidebar-section-content no-border">
        <RouterLink to="/" class="sidebar-nav-item" active-class="active" @click="$emit('navigate')">
          <Home :size="16" />
          <span>首页</span>
        </RouterLink>
        <RouterLink to="/archive" class="sidebar-nav-item" active-class="active" @click="$emit('navigate')">
          <Archive :size="16" />
          <span>归档</span>
        </RouterLink>
        <RouterLink to="/categories" class="sidebar-nav-item" :class="{ active: route.path === '/categories' && !route.query.select }" @click="$emit('navigate')">
          <Folder :size="16" />
          <span>分类</span>
        </RouterLink>
        <RouterLink to="/tags" class="sidebar-nav-item" :class="{ active: route.path === '/tags' && !route.query.select }" @click="$emit('navigate')">
          <Tag :size="16" />
          <span>标签</span>
        </RouterLink>
        <RouterLink to="/pdfs" class="sidebar-nav-item" active-class="active" @click="$emit('navigate')">
          <FileText :size="16" />
          <span>PDF 资料</span>
        </RouterLink>
        <RouterLink to="/about" class="sidebar-nav-item" active-class="active" @click="$emit('navigate')">
          <Info :size="16" />
          <span>关于我</span>
        </RouterLink>
      </div>
    </div>

    <!-- 真实数据联动分类专栏 -->
    <div class="sidebar-section">
      <button class="section-trigger" @click="toggleSection('categories')">
        <span class="trigger-left">
          <Folder :size="15" class="icon" />
          <span class="title">分类专栏</span>
        </span>
        <ChevronDown v-if="expandedSections.categories" :size="14" class="chevron" />
        <ChevronRight v-else :size="14" class="chevron" />
      </button>
      
      <div v-if="expandedSections.categories" class="section-content-wrapper">
        <RouterLink 
          v-for="category in dynamicCategories" 
          :key="category.name"
          :to="category.to"
          class="sub-item"
          :class="{ 'active-sub-item': isCategoryActive(category.name) }"
          @click="$emit('navigate')"
        >
          <span class="sub-icon">{{ category.icon }}</span>
          <span class="sub-name">{{ category.name }}</span>
          <span class="sub-badge">{{ category.count }}</span>
        </RouterLink>
      </div>
    </div>

    <!-- 真实数据联动学习标签 -->
    <div class="sidebar-section">
      <button class="section-trigger" @click="toggleSection('tags')">
        <span class="trigger-left">
          <BookOpen :size="15" class="icon" />
          <span class="title">学习标签</span>
        </span>
        <ChevronDown v-if="expandedSections.tags" :size="14" class="chevron" />
        <ChevronRight v-else :size="14" class="chevron" />
      </button>
      
      <div v-if="expandedSections.tags" class="section-content-wrapper tags-wrapper">
        <RouterLink 
          v-for="tag in dynamicTags" 
          :key="tag.name"
          :to="tag.to"
          class="sidebar-tag-chip"
          :class="{ 'active-tag-chip': isTagActive(tag.name) }"
          @click="$emit('navigate')"
        >
          <span class="hash">#</span>
          <span class="name">{{ tag.name }}</span>
          <span class="count">{{ tag.count }}</span>
        </RouterLink>
      </div>
    </div>

    <!-- 侧栏PDF速查 widget -->
    <div class="sidebar-section">
      <button class="section-trigger" @click="toggleSection('pdfs')">
        <span class="trigger-left">
          <FileText :size="15" class="icon" />
          <span class="title">速查资料</span>
        </span>
        <ChevronDown v-if="expandedSections.pdfs" :size="14" class="chevron" />
        <ChevronRight v-else :size="14" class="chevron" />
      </button>
      
      <div v-if="expandedSections.pdfs" class="section-content-wrapper pdfs-list">
        <RouterLink 
          v-for="pdf in pdfResources" 
          :key="pdf.title"
          :to="pdf.url"
          class="sidebar-pdf-card"
          @click="$emit('navigate')"
        >
          <div class="pdf-card-title">{{ pdf.title }}</div>
          <p class="pdf-card-desc">{{ pdf.description }}</p>
          <div class="pdf-card-footer">
            <span>{{ pdf.category }}</span>
            <span>{{ pdf.size }}</span>
          </div>
        </RouterLink>
      </div>
    </div>

    <!-- 底部版权声明 -->
    <div class="sidebar-footer">
      <div class="copyright">© 2026 学习笔记</div>
      <div class="author-note">Built with Vue3 & Tailwind</div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 0;
}

.sidebar-section {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.sidebar-section:hover {
  border-color: var(--text-light);
}

.sidebar-section-content {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: var(--transition);
}

.sidebar-nav-item:hover {
  background: var(--accent-soft);
  color: var(--accent);
}

.sidebar-nav-item.active {
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}

/* 折叠控制面板 */
.section-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 14px 16px;
  background: transparent;
  border: none;
  color: var(--text);
  cursor: pointer;
  font-family: inherit;
  transition: var(--transition);
}

.trigger-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.trigger-left .icon {
  color: var(--text-subtle);
}

.trigger-left .title {
  font-size: 14px;
  font-weight: 600;
}

.chevron {
  color: var(--text-light);
}

.section-content-wrapper {
  padding: 0 8px 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px solid var(--border-soft);
  padding-top: 8px;
}

/* 子链接列表 */
.sub-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  font-size: 13.5px;
  text-decoration: none;
  transition: var(--transition);
}

.sub-item:hover {
  background: var(--surface-secondary);
  color: var(--text);
}

/* 子项激活高亮样式 */
.sub-item.active-sub-item {
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}

.sub-icon {
  margin-right: 8px;
}

.sub-name {
  flex: 1;
}

.sub-badge {
  font-size: 11px;
  background: var(--surface-secondary);
  border: 1px solid var(--border);
  color: var(--text-subtle);
  padding: 2px 6px;
  border-radius: 6px;
  min-width: 22px;
  text-align: center;
  transition: var(--transition);
}

.sub-item.active-sub-item .sub-badge {
  background: var(--accent);
  color: white;
  border-color: transparent;
}

/* 标签云群组 */
.tags-wrapper {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px 12px 14px 12px;
}

.sidebar-tag-chip {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px 10px;
  background: var(--surface-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 12px;
  color: var(--text-muted);
  text-decoration: none;
  transition: var(--transition);
}

.sidebar-tag-chip:hover,
.sidebar-tag-chip.active-tag-chip {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
}

.sidebar-tag-chip.active-tag-chip {
  font-weight: 600;
}

.sidebar-tag-chip .hash {
  color: var(--text-light);
}

.sidebar-tag-chip.active-tag-chip .hash {
  color: var(--accent);
}

.sidebar-tag-chip .count {
  font-size: 10px;
  color: var(--text-light);
  margin-left: 2px;
}

.sidebar-tag-chip.active-tag-chip .count {
  color: var(--accent);
}

/* PDF card items */
.sidebar-pdf-card {
  display: block;
  padding: 10px;
  border-radius: var(--radius-sm);
  background: var(--surface-secondary);
  border: 1px solid var(--border);
  text-decoration: none;
  transition: var(--transition);
}

.sidebar-pdf-card:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.pdf-card-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 2px;
}

.pdf-card-desc {
  font-size: 11px;
  color: var(--text-muted);
  margin: 0 0 6px 0;
  line-height: 1.4;
}

.pdf-card-footer {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--text-light);
}

.sidebar-footer {
  padding: 16px;
  text-align: center;
  font-size: 12px;
  color: var(--text-light);
}
</style>