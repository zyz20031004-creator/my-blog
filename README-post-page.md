# Markdown 文章详情页实现完成

## 实现的组件

### 1. Post.vue - 文章详情页
- **布局结构**：
  - 左侧 Sidebar（导航）
  - 中间 Markdown 内容区（最大宽度 760px）
  - 右侧 TOC（自动生成 h2/h3）
- **功能特性**：
  - 阅读进度条（顶部）
  - 移动端 TOC 折叠按钮
  - 响应式三栏布局

### 2. Toc.vue - 目录导航组件
- **功能**：
  - 自动生成文章目录（h2/h3 标题）
  - TOC 跟随滚动高亮
  - 平滑滚动到对应标题
  - 移动端折叠/展开
- **交互**：
  - 点击目录项跳转到对应章节
  - 当前阅读位置高亮显示
  - 响应式设计

### 3. Markdown 渲染器配置
- **文件**：`markdown-renderer-config.js`
- **特性**：
  - GitHub README 风格渲染
  - 代码语法高亮
  - 任务列表支持
  - 自定义标题 ID
  - 目录提取功能

## 功能特性

### 📖 Markdown 渲染支持
- **标题**：支持 h1-h6，自动生成 ID
- **代码块**：语法高亮，支持多种编程语言
- **列表**：有序列表、无序列表、任务列表
- **链接**：自动链接识别和转换
- **图片**：响应式图片显示
- **表格**：支持表格渲染和样式
- **引用**：块引用支持
- **HTML**：支持 HTML 标签

### 🎨 样式特性
- **GitHub README 风格**：经典的文档风格
- **VitePress 文档风格**：现代化的文档体验
- **极简排版**：清晰简洁的视觉层次
- **高可读性**：line-height 1.8，舒适的阅读体验
- **双主题支持**：浅色/深色模式切换

### 📱 响应式设计
- **桌面端**：三栏布局（248px + 760px + 224px）
- **平板端**：双栏布局（220px + 1fr）
- **移动端**：单栏布局，TOC 可折叠

### 🚀 交互功能
- **阅读进度条**：实时显示阅读进度
- **目录高亮**：跟随滚动位置高亮当前章节
- **平滑滚动**：点击目录项平滑跳转
- **主题切换**：支持深色/浅色模式
- **移动端优化**：触摸友好的交互

## 文件结构

```
src/
├── components/
│   ├── Post.vue              # 文章详情页主组件
│   ├── Toc.vue              # 目录导航组件
│   ├── Sidebar.vue          # 左侧边栏（复用首页）
│   └── TopBar.vue           # 顶部导航（复用首页）
├── pages/
│   ├── Post.vue             # 文章详情页
│   └── Home.vue             # 首页
├── data/
│   └── content.js           # 文章数据和 Markdown 渲染
├── styles/
│   └── main.css             # 全局样式（包含 GitHub 风格）
├── router.js                # 路由配置
├── main.js                  # 应用入口
└── markdown-renderer-config.js  # Markdown 渲染器配置
```

## 数据结构

### 文章数据结构
```javascript
{
  slug: 'article-slug',
  title: '文章标题',
  description: '文章描述',
  date: '2026-06-19',
  category: '分类',
  tags: ['标签1', '标签2'],
  readingTime: '5 min',
  markdown: '# 文章内容...',
  html: '<div>渲染后的HTML</div>',
  toc: [
    { id: 'section-1', title: '章节1', level: 2 },
    { id: 'subsection-1', title: '子章节1', level: 3 }
  ]
}
```

### 目录数据结构
```javascript
[
  {
    id: 'section-id',
    title: '章节标题',
    level: 2, // 2 = h2, 3 = h3
    children: [
      {
        id: 'subsection-id',
        title: '子章节标题',
        level: 3
      }
    ]
  }
]
```

## 使用方法

### 1. 创建文章
在 `src/data/content.js` 中添加文章数据：

```javascript
{
  slug: 'my-article',
  title: '我的文章',
  description: '文章描述',
  date: '2026-06-19',
  category: '技术',
  tags: ['Vue', 'Markdown'],
  readingTime: '3 min',
  markdown: `
# 我的文章

## 第一章

这里是内容...

## 第二章

更多内容...
  `
}
```

### 2. 访问文章
访问 `http://localhost:5174/posts/my-article`

### 3. Markdown 语法支持
```markdown
# 标题
## 二级标题
### 三级标题

**粗体** *斜体*

\`\`\`javascript
// 代码块
console.log('Hello World')
\`\`\`

- 无序列表
- [ ] 任务列表
- [x] 已完成任务

| 表格 | 列1 | 列2 |
|------|-----|-----|
| 行1  | 数据1 | 数据2 |

> 引用块

[链接](https://example.com)

![图片](image.jpg)
```

## 样式定制

### 主题变量
在 `src/styles/main.css` 中修改 CSS 变量：

```css
:root {
  --accent: #2563eb;
  --bg: #ffffff;
  --text: #1f2328;
  --border: #d8dee7;
  --code-bg: #f6f8fa;
}

[data-theme='dark'] {
  --bg: #0d1117;
  --text: #e6edf3;
  --border: #303946;
  --code-bg: #151b23;
}
```

### 字体和间距
```css
.markdown-body {
  font-size: 16px;
  line-height: 1.8;
  font-family: Inter, system-ui, sans-serif;
}
```

## 性能优化

### 代码分割
- 使用动态导入减少初始加载时间
- 代码高亮按需加载

### 渲染优化
- Markdown 渲染在客户端进行
- 使用 Intersection Observer 优化滚动检测

### 样式优化
- 使用 CSS 变量实现主题切换
- 响应式设计适配不同设备

## 浏览器兼容性

- **Chrome 60+**
- **Firefox 55+**
- **Safari 12+**
- **Edge 79+**

## 构建和部署

- 开发环境：`npm run dev`
- 构建生产版本：`npm run build`
- 预览生产版本：`npm run preview`

## 注意事项

1. **Markdown 渲染**：所有 Markdown 内容都会被渲染为 HTML
2. **标题 ID**：自动生成用于目录导航的 ID
3. **代码高亮**：支持 highlight.js 支持的所有语言
4. **移动端**：TOC 在小屏幕上默认折叠
5. **主题切换**：会同步应用到所有页面