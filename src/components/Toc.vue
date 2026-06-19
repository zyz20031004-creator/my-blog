<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  toc: {
    type: Array,
    required: true,
    default: () => []
  },
  mobileCollapsed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-mobile'])

const activeHeading = ref('')
const tocContainer = ref(null)

// 创建 Intersection Observer 来检测当前可见的标题
const observer = ref(null)

const setupIntersectionObserver = () => {
  if (!tocContainer.value) return

  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id')
          if (id) {
            activeHeading.value = id
          }
        }
      })
    },
    {
      rootMargin: '-20% 0% -70% 0%',
      threshold: 0
    }
  )

  // 观察所有 h2 和 h3 标题
  const headings = tocContainer.value.querySelectorAll('h2[id], h3[id]')
  headings.forEach((heading) => {
    observer.value.observe(heading)
  })
}

const scrollToHeading = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const offset = 80 // 顶部导航栏高度 + 一些间距
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

const toggleMobileToc = () => {
  emit('toggle-mobile')
}

onMounted(() => {
  nextTick(() => {
    setupIntersectionObserver()
  })
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})
</script>

<template>
  <div class="toc-container" :class="{ 'mobile-collapsed': mobileCollapsed }">
    <div class="toc-header">
      <h3 class="toc-title">目录</h3>
      <button 
        v-if="mobileCollapsed" 
        @click="toggleMobileToc"
        class="toc-toggle"
      >
        展开
      </button>
    </div>
    
    <nav class="toc-nav" v-show="!mobileCollapsed">
      <ul>
        <li 
          v-for="item in toc" 
          :key="item.id"
          :class="{ 'active': activeHeading === item.id }"
        >
          <a 
            :href="`#${item.id}`" 
            @click.prevent="scrollToHeading(item.id)"
            class="toc-link"
          >
            <span class="toc-text">{{ item.title }}</span>
            <span v-if="item.level === 3" class="toc-level">└</span>
          </a>
          
          <ul v-if="item.children && item.children.length > 0">
            <li 
              v-for="child in item.children" 
              :key="child.id"
              :class="{ 'active': activeHeading === child.id }"
            >
              <a 
                :href="`#${child.id}`" 
                @click.prevent="scrollToHeading(child.id)"
                class="toc-link toc-link-child"
              >
                {{ child.title }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.toc-container {
  position: sticky;
  top: 64px;
  height: calc(100vh - 64px);
  overflow-y: auto;
  border-left: 1px solid var(--border-soft);
  background: var(--bg);
  padding: 24px 0;
}

.toc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px 16px;
  border-bottom: 1px solid var(--border-soft);
  margin-bottom: 16px;
}

.toc-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.toc-toggle {
  padding: 4px 8px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--surface);
  color: var(--text-muted);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toc-toggle:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.toc-nav {
  padding: 0 16px;
}

.toc-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-nav li {
  margin-bottom: 8px;
}

.toc-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 13px;
  line-height: 1.4;
  transition: color 0.2s ease;
  border-left: 2px solid transparent;
}

.toc-link:hover {
  color: var(--accent);
}

.toc-link.active {
  color: var(--accent);
  border-left-color: var(--accent);
  font-weight: 500;
}

.toc-link-child {
  padding-left: 16px;
  font-size: 12px;
  color: var(--text-subtle);
}

.toc-link-child:hover,
.toc-link-child.active {
  color: var(--accent);
}

.toc-level {
  font-size: 10px;
  color: var(--text-subtle);
  margin-left: auto;
}

.mobile-collapsed {
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

@media (max-width: 760px) {
  .toc-container {
    position: fixed;
    top: 64px;
    right: 0;
    width: 100%;
    max-width: 320px;
    z-index: 20;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }
  
  .toc-container:not(.mobile-collapsed) {
    transform: translateX(0);
  }
  
  .toc-header {
    padding: 0 16px;
  }
  
  .toc-nav {
    padding: 0 16px;
  }
}
</style>