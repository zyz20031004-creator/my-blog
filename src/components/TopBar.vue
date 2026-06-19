<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Github, BookOpen, Layers, Tag, FileText, User } from 'lucide-vue-next'
import { useTheme } from '../composables/useTheme'

const router = useRouter()
const searchQuery = ref('')
const { toggleTheme, themeIcon, themeText, isTransitioning } = useTheme()

const handleSearch = (e) => {
  if (e.key === 'Enter' && searchQuery.value.trim()) {
    // 简易搜索过滤
    console.log('搜索:', searchQuery.value)
  }
}

// 快速跳转
const navLinks = [
  { to: '/', label: '首页', icon: BookOpen },
  { to: '/categories', label: '分类', icon: Layers },
  { to: '/tags', label: '标签', icon: Tag },
  { to: '/pdfs', label: 'PDF 资料', icon: FileText },
  { to: '/about', label: '关于我', icon: User }
]
</script>

<template>
  <header class="top-bar">
    <div class="top-bar-left">
      <RouterLink class="brand-logo" to="/">
        <span class="logo-box">J</span>
        <div class="logo-meta">
          <span class="logo-title">学习笔记</span>
          <span class="logo-sub">Learn & Share</span>
        </div>
      </RouterLink>
    </div>
    
    <div class="top-bar-center">
      <!-- 设计图中的极美搜索框 -->
      <div class="search-container">
        <Search :size="16" class="search-icon" />
        <input
          type="text"
          v-model="searchQuery"
          @keyup.enter="handleSearch"
          placeholder="搜索文章、笔记、标签..."
          class="search-input"
        />
        <span class="search-kbd">⌘K</span>
      </div>

      <!-- 设计图顶部的快速导航链接 -->
      <nav class="header-nav">
        <RouterLink 
          v-for="link in navLinks" 
          :key="link.to" 
          :to="link.to"
          class="nav-item"
          active-class="active"
        >
          <component :is="link.icon" :size="15" />
          <span>{{ link.label }}</span>
        </RouterLink>
      </nav>
    </div>
    
    <div class="top-bar-right">
      <a 
        href="https://github.com" 
        target="_blank" 
        rel="noopener noreferrer"
        class="utility-button"
        title="GitHub"
      >
        <Github :size="18" />
      </a>
      
      <button 
        @click="toggleTheme"
        class="utility-button theme-btn"
        :title="themeText"
        :disabled="isTransitioning"
      >
        <span class="theme-icon">{{ themeIcon }}</span>
      </button>

      <!-- 设计图头像区 -->
      <div class="user-avatar-shell" @click="router.push('/about')">
        <div class="user-avatar">
          <span class="avatar-letter">L</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.top-bar {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--topbar-height);
  padding: 0 var(--padding);
  border-bottom: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: var(--transition);
}

:root[data-theme='dark'] .top-bar {
  background: rgba(15, 23, 42, 0.85);
}

.top-bar-left {
  flex-shrink: 0;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: var(--accent-gradient);
  color: white;
  border-radius: 10px;
  font-weight: 800;
  font-size: 18px;
  box-shadow: var(--shadow-accent);
}

.logo-meta {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.2;
}

.logo-sub {
  font-size: 11px;
  color: var(--text-light);
}

.top-bar-center {
  flex: 1;
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 24px;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--surface-secondary);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 6px 12px;
  width: 240px;
  transition: var(--transition);
}

.search-container:hover {
  border-color: var(--text-light);
}

.search-container:focus-within {
  border-color: var(--accent);
  background: var(--surface);
  box-shadow: 0 0 0 3px var(--accent-soft);
  width: 280px;
}

.search-icon {
  color: var(--text-subtle);
  margin-right: 8px;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  color: var(--text);
  font-size: 13px;
  outline: none;
}

.search-kbd {
  font-size: 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--text-light);
  font-family: monospace;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: var(--transition);
}

.nav-item:hover {
  background: var(--accent-soft);
  color: var(--accent);
}

.nav-item.active {
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.utility-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  color: var(--text-muted);
  cursor: pointer;
  transition: var(--transition);
}

.utility-button:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent);
}

.user-avatar-shell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid var(--border);
  cursor: pointer;
  transition: var(--transition);
  overflow: hidden;
}

.user-avatar-shell:hover {
  border-color: var(--accent);
  transform: scale(1.05);
}

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--accent-gradient);
  color: white;
  font-weight: 700;
  font-size: 15px;
}

@media (max-width: 1024px) {
  .header-nav {
    display: none;
  }
}

@media (max-width: 768px) {
  .search-container {
    display: none;
  }
}
</style>