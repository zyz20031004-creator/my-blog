<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, Moon, Sun, X, Search, Github } from 'lucide-vue-next'
import Sidebar from './components/Sidebar.vue'
import AppToc from './components/AppToc.vue'
import TopBar from './components/TopBar.vue'
import { getArticleBySlug } from './data/content'

const route = useRoute()
const drawerOpen = ref(false)
const theme = ref('light')

const activeArticle = computed(() => {
  if (route.name !== 'article') return null
  return getArticleBySlug(route.params.slug)
})

const tocItems = computed(() => activeArticle.value?.toc ?? [])
const showToc = computed(() => route.name === 'article' && tocItems.value.length > 0)

function applyTheme(nextTheme) {
  theme.value = nextTheme
  document.documentElement.dataset.theme = nextTheme
  localStorage.setItem('journey-theme', nextTheme)
}

function toggleTheme() {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark')
}

onMounted(() => {
  const saved = localStorage.getItem('journey-theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(saved || (prefersDark ? 'dark' : 'light'))
})
</script>

<template>
  <div class="app-shell">
    <!-- 使用独立的极美 TopBar 组件 -->
    <TopBar />

    <!-- 移动端抽屉唤醒按钮 -->
    <button class="mobile-drawer-toggle mobile-only" type="button" aria-label="Menu" @click="drawerOpen = true">
      <Menu :size="20" />
    </button>

    <div class="layout">
      <!-- 桌面端侧边栏 -->
      <aside class="sidebar-wrapper desktop-only">
        <Sidebar />
      </aside>

      <!-- 主要内容渲染区 -->
      <main class="main-panel">
        <RouterView />
      </main>

      <!-- 文章内目录 - 仅在文章详情页加载且非空时展示 -->
      <aside class="toc-wrapper desktop-only" :class="{ empty: !showToc }">
        <AppToc v-if="showToc" :items="tocItems" />
        <!-- 如果不在文章页，可以展示博主标签云或最近更新卡片 -->
        <div v-else class="side-widgets">
          <!--  widget placeholder -->
        </div>
      </aside>

      <!-- 移动端抽屉菜单 -->
      <div v-if="drawerOpen" class="drawer-backdrop mobile-only" @click="drawerOpen = false"></div>
      <aside class="drawer mobile-only" :class="{ 'is-open': drawerOpen }">
        <div class="drawer-head">
          <span class="brand-logo small">
            <span class="logo-box">J</span>
            <span class="logo-text">学习笔记</span>
          </span>
          <button class="close-drawer-btn" type="button" aria-label="Close" @click="drawerOpen = false">
            <X :size="18" />
          </button>
        </div>
        <Sidebar @navigate="drawerOpen = false" />
      </aside>
    </div>
  </div>  
</template>

<style scoped>
.main-panel {
  min-width: 0;
}

.mobile-drawer-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--accent-gradient);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-accent);
  z-index: 999;
  border: none;
  cursor: pointer;
}

/* 抽屉样式优化 */
.drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
}

.drawer {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 1200;
  width: 280px;
  height: 100vh;
  background: var(--surface);
  box-shadow: var(--shadow-lg);
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.drawer.is-open {
  transform: translateX(0);
}

.drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid var(--border);
}

.brand-logo.small {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-logo.small .logo-box {
  width: 28px;
  height: 28px;
  font-size: 15px;
}

.logo-text {
  font-weight: 700;
  color: var(--text);
  font-size: 15px;
}

.close-drawer-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--border);
  color: var(--text-muted);
}

.close-drawer-btn:hover {
  background: var(--accent-soft);
  color: var(--accent);
}

.toc-wrapper.empty {
  display: none;
}

@media (max-width: 1024px) {
  .desktop-only {
    display: none;
  }
}
</style>