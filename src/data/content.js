import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false,
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre><code class="hljs language-${lang}">${hljs.highlight(code, { language: lang }).value}</code></pre>`
    }
    return `<pre><code class="hljs">${md.utils.escapeHtml(code)}</code></pre>`
  }
})

// 自定义渲染规则，实现 GitHub 风格
md.renderer.rules.heading_open = function (tokens, idx) {
  const token = tokens[idx]
  const level = token.tag.slice(1)
  const id = tokens[idx + 1].content.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')
  return `<h${level} id="${id}">`
}

md.renderer.rules.list_item_open = function (tokens, idx) {
  const token = tokens[idx]
  const parentList = tokens[idx - 2]
  const isTaskList = parentList && parentList.tag === 'ul' && parentList.attrGet('class') === 'contains-task-list'
  
  if (isTaskList) {
    return `<li class="task-list-item">`
  }
  return `<li>`
}

md.renderer.rules.checkbox = function () {
  return `<input type="checkbox" class="task-list-item-checkbox" disabled>`
}

export const articles = [
  {
    slug: 'vitepress-style-blog-system',
    title: '构建 VitePress 风格的学习笔记系统',
    description: '从信息架构、主题变量到 Markdown 渲染，整理一个适合长期沉淀的技术博客骨架。',
    date: '2026-06-12',
    category: 'Frontend',
    tags: ['Vue3', 'Vite', 'Design System'],
    readingTime: '6 min',
    markdown: `
# 构建 VitePress 风格的学习笔记系统

一个学习型技术博客最重要的不是复杂动效，而是稳定、克制、可持续的阅读体验。

## 信息架构

桌面端采用三栏结构：左侧是站点导航，中间是正文阅读区域，右侧是当前文章目录。移动端折叠导航，正文保持单列。

## 主题变量

把颜色、边框、阴影和代码块背景收束进 CSS variables，可以让浅色和深色主题保持同一套组件结构。

\`\`\`css
:root {
  --accent: #2563eb;
  --content-width: 760px;
}

[data-theme='dark'] {
  --bg: #0d1117;
  --text: #e6edf3;
}
\`\`\`

## Markdown 渲染

Markdown 负责内容表达，页面组件负责导航、卡片、归档和资料列表。这种分层能让内容迁移到 VitePress、Hexo 或 Hugo 时更轻松。
`
  },
  {
    slug: 'vue-composition-notes',
    title: 'Vue3 Composition API 学习札记',
    description: '用组合式 API 组织状态、派生数据和副作用，让组件逻辑更容易被复用和测试。',
    date: '2026-05-28',
    category: 'Vue',
    tags: ['Vue3', 'Composition API'],
    readingTime: '8 min',
    markdown: `
# Vue3 Composition API 学习札记

Composition API 的价值在于把相关逻辑放在一起，而不是按选项类型分散在组件中。

## 状态与派生值

\`\`\`js
import { computed, ref } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
\`\`\`

## 组织原则

优先让 composable 表达业务能力，而不是简单搬运生命周期。一个好的 composable 应该有清晰输入、输出和边界。
`
  },
  {
    slug: 'reading-width-and-doc-ux',
    title: '技术文档的阅读宽度与扫描效率',
    description: '为什么正文行宽应控制在 720 到 780px，以及侧栏、TOC 和留白如何一起提升阅读节奏。',
    date: '2026-04-19',
    category: 'UX',
    tags: ['Docs', 'Typography', 'UX'],
    readingTime: '5 min',
    markdown: `
# 技术文档的阅读宽度与扫描效率

技术文档需要同时支持连续阅读和快速扫描。过宽的正文会让视线回跳困难，过窄又会打断代码和概念表达。

## 推荐范围

正文最大宽度控制在 720 到 780px，配合 1.7 左右的行高，通常能在中文和英文混排中取得比较好的平衡。

## 周边信息

左侧导航解决跨页面跳转，右侧 TOC 解决页内定位。二者都应该轻量，不能抢正文的视觉权重。
`
  }
]

export const pdfResources = [
  {
    title: 'Vue3 响应式原理速查',
    description: 'Proxy、effect、computed 与 watch 的核心关系图谱。',
    category: 'Vue',
    size: '1.8 MB',
    updated: '2026-06-01',
    url: '#'
  },
  {
    title: '前端工程化 Checklist',
    description: 'Vite、ESLint、构建优化、发布与监控的实践清单。',
    category: 'Engineering',
    size: '2.4 MB',
    updated: '2026-05-16',
    url: '#'
  },
  {
    title: 'CSS 主题系统设计笔记',
    description: 'CSS variables、暗色模式、语义 token 与组件状态。',
    category: 'CSS',
    size: '1.2 MB',
    updated: '2026-04-08',
    url: '#'
  }
]

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function extractToc(markdown) {
  return markdown
    .split('\n')
    .filter((line) => /^##\s+/.test(line))
    .map((line) => {
      const title = line.replace(/^##\s+/, '').trim()
      return { id: slugify(title), title }
    })
}

function renderWithHeadingIds(markdown) {
  return md.render(markdown).replace(/<h2>(.*?)<\/h2>/g, (_, title) => {
    const plain = title.replace(/<[^>]+>/g, '')
    return `<h2 id="${slugify(plain)}">${title}</h2>`
  })
}

export const renderedArticles = articles.map((article) => ({
  ...article,
  html: renderWithHeadingIds(article.markdown),
  toc: extractToc(article.markdown)
}))

export function getArticleBySlug(slug) {
  return renderedArticles.find((article) => article.slug === slug)
}

export function getTaxonomy(mode) {
  const key = mode === 'categories' ? 'category' : 'tags'
  const map = new Map()

  for (const article of renderedArticles) {
    const values = Array.isArray(article[key]) ? article[key] : [article[key]]
    for (const value of values) {
      if (!map.has(value)) map.set(value, [])
      map.get(value).push(article)
    }
  }

  return [...map.entries()].map(([name, posts]) => ({ name, posts }))
}
