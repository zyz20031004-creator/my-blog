/**
 * Markdown 渲染器配置
 * GitHub README 风格 + VitePress 文档风格
 */

import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

// 创建 Markdown 实例
export const createMarkdownRenderer = () => {
  const md = new MarkdownIt({
    // 基础配置
    html: true,           // 允许 HTML 标签
    linkify: true,       // 自动将 URL 转换为链接
    typographer: true,   // 启用一些语言中性的替换 + ... ...
    breaks: false,       // 不把换行转换成 <br>
    highlight: function (code, lang) {
      // 代码高亮配置
      if (lang && hljs.getLanguage(lang)) {
        return `<pre><code class="hljs language-${lang}">${hljs.highlight(code, { language: lang }).value}</code></pre>`
      }
      return `<pre><code class="hljs">${md.utils.escapeHtml(code)}</code></pre>`
    }
  })

  // 自定义渲染规则 - GitHub 风格
  md.renderer.rules.heading_open = function (tokens, idx) {
    const token = tokens[idx]
    const level = token.tag.slice(1)
    const content = tokens[idx + 1].content
    const id = content.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    return `<h${level} id="${id}">`
  }

  // 任务列表支持
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

  // 自定义插件：添加任务列表支持
  md.core.ruler.push('task_lists', function (state) {
    const tokens = state.tokens
    let l = tokens.length
    
    for (let i = 0; i < l; i++) {
      const token = tokens[i]
      
      if (token.type === 'bullet_list_open' || token.type === 'ordered_list_open') {
        let taskList = false
        const start = i + 1
        
        // 检查列表项是否包含复选框
        for (let j = start; j < l; j++) {
          const itemToken = tokens[j]
          if (itemToken.type === 'list_item_open') {
            const nextToken = tokens[j + 1]
            if (nextToken && nextToken.content && nextToken.content.includes('[ ]')) {
              taskList = true
              break
            }
          } else if (itemToken.type === 'list_item_close' || itemToken.type === 'bullet_list_close' || itemToken.type === 'ordered_list_close') {
            break
          }
        }
        
        if (taskList) {
          token.attrSet('class', 'contains-task-list')
        }
      }
    }
  }, { alt: ['paragraph', 'list'] })

  return md
}

// 默认实例
export const md = createMarkdownRenderer()

// 渲染函数
export const renderMarkdown = (markdown) => {
  return md.render(markdown)
}

// 提取目录函数
export const extractToc = (markdown) => {
  return markdown
    .split('\n')
    .filter((line) => /^#{2,3}\s+/.test(line))
    .map((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/)
      if (match) {
        const level = match[1].length
        const title = match[2].trim()
        const id = title.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')
        return { id, title, level }
      }
      return null
    })
    .filter(Boolean)
}

// 添加标题 ID 的渲染函数
export const renderWithHeadingIds = (markdown) => {
  return md.render(markdown).replace(/<h([2-6])>(.*?)<\/h[2-6]>/g, (_, level, title) => {
    const plain = title.replace(/<[^>]+>/g, '')
    const id = plain.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    return `<h${level} id="${id}">${title}</h${level}>`
  })
}

// 支持的语法特性
export const supportedFeatures = {
  headings: '## 标题支持 (支持 h1-h6)',
  code: '```代码块``` (支持语法高亮)',
  lists: '- 无序列表\n- 有序列表',
  links: '[链接文本](URL)',
  images: '![图片描述](图片URL)',
  blockquotes: '> 引用块',
  tables: '| 表格 | 支持 |',
  taskLists: '- [ ] 任务列表\n- [x] 已完成任务',
  emphasis: '*斜体* 和 **粗体**',
  codeInline: '`行内代码`',
  horizontalRule: '--- 分割线',
  details: '<details>折叠内容</details>',
  html: 'HTML 标签支持'
}

export default {
  createMarkdownRenderer,
  md,
  renderMarkdown,
  extractToc,
  renderWithHeadingIds,
  supportedFeatures
}