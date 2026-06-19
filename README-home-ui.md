# 博客首页 UI 实现完成

## 实现的组件

### 1. ArticleCard.vue
- 文章卡片组件，包含：
  - title（标题）
  - summary（2行截断）
  - tags（标签列表）
  - date（发布日期）
- 交互效果：
  - hover 上浮效果
  - 点击进入文章页
- 样式：
  - 8px 圆角
  - 1px 低透明边框
  - 极简文档风格

### 2. TopBar.vue
- 顶部导航栏，包含：
  - 网站标题
  - 搜索框（带搜索图标）
  - GitHub 链接
  - 主题切换按钮（深色/浅色模式）

### 3. Sidebar.vue
- 左侧边栏，包含：
  - 分类导航（可折叠）
  - 标签云（可折叠）
  - PDF 资源入口（可折叠）
- 数据结构示例见 `sidebar-data-example.json`

### 4. Home.vue
- 首页主组件
- 集成 TopBar、Sidebar 和 ArticleCard
- 最大内容宽度 1200px

## 功能特性

### 双主题支持
- 浅色模式：白色背景，深色文字
- 深色模式：深色背景，浅色文字
- 自动检测系统主题偏好

### 响应式设计
- 桌面端：三栏布局
- 移动端：单栏布局
- 自适应字体大小和间距

### 交互效果
- 卡片 hover 上浮
- 边框高亮效果
- 平滑过渡动画
- 点击导航跳转

## 样式规范

### 颜色系统
- 使用 CSS 变量定义主题色彩
- 浅色模式：白色背景，灰色文字
- 深色模式：深色背景，浅色文字

### 字体系统
- 主字体：Inter, system-ui
- 字号：14px-20px
- 行高：1.4-1.6

### 间距系统
- 内边距：8px, 12px, 16px, 24px
- 外边距：同上
- 圆角：6px, 8px, 999px（圆形）

## 文件结构

```
src/
├── components/
│   ├── ArticleCard.vue      # 文章卡片
│   ├── TopBar.vue          # 顶部导航
│   └── Sidebar.vue         # 左侧边栏
├── pages/
│   └── Home.vue            # 首页
├── data/
│   └── content.js          # 文章数据
├── styles/
│   └── main.css            # 全局样式
├── router.js               # 路由配置
└── main.js                 # 应用入口
```

## 数据结构示例

详细的 sidebar 数据结构示例请参考 `sidebar-data-example.json` 文件。

## 使用方法

1. 启动开发服务器：`npm run dev`
2. 访问：http://localhost:5174/
3. 点击主题切换按钮切换深色/浅色模式
4. 点击文章卡片进入文章详情页
5. 点击侧边栏导航跳转到相应页面

## 构建和部署

- 开发环境：`npm run dev`
- 构建生产版本：`npm run build`
- 预览生产版本：`npm run preview`