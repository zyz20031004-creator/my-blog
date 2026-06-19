<script setup>
import { ref } from 'vue'
import { pdfResources } from '../data/content'
import { FileText, Download, Clock, Star, Layers, Calendar } from 'lucide-vue-next'

// 支持本地点赞/模拟下载
const downloadStats = ref({})

const handleDownload = (title) => {
  if (!downloadStats.value[title]) {
    downloadStats.value[title] = 0
  }
  downloadStats.value[title]++
}
</script>

<template>
  <div class="pdf-layout">
    <div class="breadcrumbs">
      <RouterLink to="/">首页</RouterLink>
      <span class="separator">/</span>
      <span class="current">PDF 资料库</span>
    </div>

    <!-- 顶部资料库面板 -->
    <section class="banner-panel">
      <div class="banner-inner">
        <div class="icon-shell">
          <FileText :size="24" />
        </div>
        <div class="meta">
          <h1 class="page-title">PDF 速查资料库</h1>
          <p class="page-subtitle">把核心速查表、设计规范与大厂前端 checklist 集中整理，方便快速查询与离线学习。</p>
        </div>
      </div>
    </section>

    <!-- 网格下载卡片 -->
    <div class="pdf-cards-grid">
      <article 
        v-for="pdf in pdfResources" 
        :key="pdf.title"
        class="pdf-interactive-card"
      >
        <div class="pdf-card-main">
          <div class="pdf-file-icon">
            <span class="file-tag">PDF</span>
          </div>

          <div class="pdf-content-body">
            <div class="meta-row-top">
              <span class="pdf-category-tag">{{ pdf.category }}</span>
              <span class="pdf-size-badge">{{ pdf.size }}</span>
            </div>

            <h2 class="pdf-card-title">{{ pdf.title }}</h2>
            <p class="pdf-card-desc">{{ pdf.description }}</p>

            <div class="pdf-card-metadata">
              <div class="meta-unit">
                <Calendar :size="13" />
                <span>{{ pdf.updated }} 更新</span>
              </div>
              <div class="meta-unit">
                <Download :size="13" />
                <span>已下载 {{ downloadStats[pdf.title] || 128 }} 次</span>
              </div>
            </div>
          </div>
        </div>

        <div class="pdf-card-action">
          <a 
            :href="pdf.url" 
            class="download-btn"
            @click="handleDownload(pdf.title)"
            :aria-label="`下载 ${pdf.title}`"
          >
            <Download :size="16" />
            <span>立即下载</span>
          </a>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.pdf-layout {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.banner-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.banner-inner {
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

/* 高颜值PDF资料卡片 */
.pdf-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .pdf-cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  }
}

.pdf-interactive-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  transition: var(--transition);
}

.pdf-interactive-card:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.pdf-card-main {
  padding: 20px;
  display: flex;
  gap: 16px;
}

.pdf-file-icon {
  width: 50px;
  height: 64px;
  background: #ef4444; /* PDF Standard color */
  border-radius: 6px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 6px;
  box-shadow: var(--shadow-sm);
  position: relative;
  flex-shrink: 0;
}

.pdf-file-icon::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 14px;
  height: 14px;
  background: rgba(255, 255, 255, 0.3);
  border-bottom-left-radius: 6px;
}

.file-tag {
  color: white;
  font-weight: 800;
  font-size: 11px;
}

.pdf-content-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.meta-row-top {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pdf-category-tag {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 2px 8px;
  border-radius: 4px;
}

.pdf-size-badge {
  font-size: 11px;
  color: var(--text-light);
}

.pdf-card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  line-height: 1.35;
}

.pdf-card-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
}

.pdf-card-metadata {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 11.5px;
  color: var(--text-light);
  margin-top: 4px;
}

.meta-unit {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 按钮样式一键升级 */
.pdf-card-action {
  padding: 12px 20px;
  background: var(--surface-secondary);
  border-top: 1px solid var(--border-soft);
}

.download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 8px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
}

.pdf-interactive-card:hover .download-btn {
  background: var(--accent-gradient);
  border-color: transparent;
  color: white;
  box-shadow: var(--shadow-accent);
}
</style>