# 个人静态博客项目完整搭建指南

本指南将详细介绍在 IDEA 和 VS Code 中搭建个人静态博客项目的完整操作步骤，适合新手直接照着操作。

## 项目概述

这是一个基于 Vue3 + Vite 的静态博客项目，包含：
- 首页文章列表
- 文章详情页
- 归档页
- 分类和标签系统
- 深色/浅色主题切换
- 响应式设计

## 环境要求

### 基础环境
- **Node.js**: 版本 ≥ 16.0.0
- **npm**: 版本 ≥ 8.0.0
- **Git**: 版本 ≥ 2.0.0

### 检查环境
```bash
# 检查 Node.js 版本
node --version

# 检查 npm 版本
npm --version

# 检查 Git 版本
git --version
```

---

## 🔧 IDEA 配置指南

### 1. IDEA 安装和配置

#### 1.1 下载安装
1. 访问 JetBrains 官网：https://www.jetbrains.com/idea/
2. 下载 **IntelliJ IDEA Community**（免费版）
3. 安装时选择 **Node.js** 插件（如果没自动勾选）

#### 1.2 插件安装
打开 IDEA 后，安装以下插件：
1. **Vue.js** - Vue 开发支持
2. **Vite** - Vite 项目支持
3. **ESLint** - 代码检查
4. **Prettier** - 代码格式化
5. **Git Integration** - Git 集成

**安装步骤**：
```
File → Settings → Plugins → Marketplace
```

### 2. 项目导入

#### 2.1 打开项目
```
File → Open → 选择项目文件夹
```

#### 2.2 等待依赖安装
IDEA 会自动检测 `package.json` 并安装依赖：
- 等待右下角显示 "npm install completed"
- 如果没有自动安装，手动执行：
  ```bash
  npm install
  ```

### 3. 运行配置

#### 3.1 创建运行配置
```
Run → Edit Configurations → + → npm
```

#### 3.2 配置参数
- **Name**: `Dev Server`
- **Package.json**: `package.json`
- **Script**: `dev`
- **Host**: `0.0.0.0`
- **Port**: `5174`

#### 3.3 启动项目
```
Run → Run 'Dev Server'
```

### 4. 常见问题解决

#### 问题1: 依赖安装失败
**现象**：右下角显示依赖安装错误
**解决**：
```bash
# 清除缓存重新安装
npm cache clean --force
rm -rf node_modules
npm install
```

#### 问题2: 端口被占用
**现象**：启动时提示端口被占用
**解决**：
```bash
# 查看端口占用
netstat -ano | findstr :5174

# 终止占用进程
taskkill /F /PID 进程号
```

#### 问题3: Vue 插件不工作
**现象**：Vue 文件没有语法高亮
**解决**：
```
File → Settings → Plugins → 搜索 Vue.js → 重新安装
```

#### 问题4: ESLint 报错
**现象**：代码有红色波浪线
**解决**：
```
File → Settings → Languages & Frameworks → ESLint → 取消勾选 Enable ESLint
```

---

## 🔧 VS Code 配置指南

### 1. VS Code 安装和配置

#### 1.1 下载安装
1. 访问 VS Code 官网：https://code.visualstudio.com/
2. 下载对应系统的版本
3. 安装时勾选 "Add to PATH"

#### 1.2 插件安装
打开 VS Code 后，安装以下插件：
1. **Vue Language Features (Volar)** - Vue3 支持
2. **Vite** - Vite 项目支持
3. **ESLint** - 代码检查
4. **Prettier** - 代码格式化
5. **GitLens** - Git 增强
6. **Path Intellisense** - 路径自动补全
7. **Auto Rename Tag** - 标签自动重命名

**安装步骤**：
```
Ctrl + Shift + X → 搜索插件 → Install
```

### 2. 工作区配置

#### 2.1 打开项目
```
File → Open Folder → 选择项目文件夹
```

#### 2.2 创建配置文件
在项目根目录创建以下文件：

**.vscode/settings.json**:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "files.associations": {
    "*.vue": "vue"
  }
}
```

**.vscode/extensions.json**:
```json
{
  "recommendations": [
    "vue.volar",
    "antfu.vite",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "eamodio.gitlens",
    "christian-kohler.path-intellisense",
    "formulahendry.auto-rename-tag"
  ]
}
```

#### 2.3 依赖安装
VS Code 通常不会自动安装依赖，需要手动执行：
```bash
# 在 VS Code 的集成终端中执行
Ctrl + ` (反引号) 打开终端
npm install
```

### 3. 运行配置

#### 3.1 使用 VS Code 任务
创建 **.vscode/tasks.json**:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Dev Server",
      "type": "npm",
      "script": "dev",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^"
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "> journey-blog@0.1.0 dev",
          "endsPattern": "press h + enter to show help"
        }
      }
    },
    {
      "label": "Build Project",
      "type": "npm",
      "script": "build"
    }
  ]
}
```

#### 3.2 启动项目
```
Ctrl + Shift + P → 输入 "Tasks: Run Task" → 选择 "Start Dev Server"
```

或者直接在终端中运行：
```bash
npm run dev
```

### 4. 常见问题解决

#### 问题1: 插件安装失败
**现象**：插件无法安装或更新
**解决**：
```bash
# 清除插件缓存
rm -rf ~/.vscode/extensions

# 重新安装插件
# 在 VS Code 中重新搜索安装
```

#### 问题2: 终端无法识别 npm
**现象**：终端中输入 npm 提示命令未找到
**解决**：
```bash
# 检查 Node.js 是否安装
node --version
npm --version

# 如果没有安装，重新安装 Node.js
# 下载地址：https://nodejs.org/
```

#### 问题3: Vue 文件没有语法高亮
**现象**：.vue 文件显示为纯文本
**解决**：
```
Ctrl + Shift + X → 搜索 "Vue Language Features (Volar)" → Install
```

#### 问题4: 格式化不工作
**现象**：代码格式化无效
**解决**：
```
Ctrl + Shift + P → 输入 "Preferences: Open Settings (JSON)" → 添加配置：
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

## 🚀 项目启动流程

### 1. 首次启动（全新项目）

```bash
# 1. 克隆项目（如果是 Git 仓库）
git clone <项目地址>
cd <项目文件夹>

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 访问项目
打开浏览器访问：http://localhost:5174/
```

### 2. 日常启动

```bash
# 1. 进入项目目录
cd /path/to/journey-blog

# 2. 启动开发服务器
npm run dev

# 3. 访问项目
http://localhost:5174/
```

### 3. 停止项目

```bash
# 在终端中按 Ctrl + C 停止
```

---

## 🔍 常见启动报错及解决方法

### 1. 依赖相关错误

#### 错误1: "ERR_MODULE_NOT_FOUND"
**现象**：模块找不到
**解决**：
```bash
# 清除缓存重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 错误2: "npm ERR! Cannot read properties of undefined"
**现象**：package.json 问题
**解决**：
```bash
# 检查 package.json 格式
cat package.json

# 如果格式错误，手动修复或重新生成
npm init -y
```

### 2. 端口相关错误

#### 错误1: "EADDRINUSE: address already in use"
**现象**：端口被占用
**解决**：
```bash
# 查看端口占用
netstat -ano | findstr :5174

# 终止占用进程（Windows）
taskkill /F /PID 进程号

# 或者修改端口
package.json 中修改 "dev" 脚本：
"dev": "vite --port 3000"
```

#### 错误2: "EACCES: permission denied"
**现象**：权限不足
**解决**：
```bash
# 使用管理员权限运行
# Windows: 右键终端以管理员身份运行
# macOS/Linux: sudo npm run dev
```

### 3. Vue 相关错误

#### 错误1: "Failed to resolve component"
**现象**：组件解析失败
**解决**：
```bash
# 检查组件导入路径
# 确保 import 语句正确
import ArticleCard from '../components/ArticleCard.vue'
```

#### 错误2: "Template compilation error"
**现象**：模板编译错误
**解决**：
```bash
# 检查 Vue 模板语法
# 确保 <template> 标签正确闭合
# 检查 v-if、v-for 等指令使用
```

### 4. 构建相关错误

#### 错误1: "Build failed"
**现象**：构建失败
**解决**：
```bash
# 查看详细错误信息
npm run build

# 清除缓存重新构建
rm -rf dist
npm run build
```

#### 错误2: "TypeScript error"
**现象**：TypeScript 错误
**解决**：
```bash
# 如果使用 TypeScript，确保安装了依赖
npm install --save-dev typescript @types/node

# 或者禁用 TypeScript 检查
# 在 vite.config.js 中添加：
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
```

---

## 💡 开发技巧

### 1. 提高开发效率

#### 快捷键
- **IDEA**: 
  - `Ctrl + Alt + S` - 打开设置
  - `Ctrl + Shift + A` - 搜索功能
  - `Ctrl + Alt + L` - 格式化代码
- **VS Code**:
  - `Ctrl + K Ctrl + S` - 打开快捷键设置
  - `Ctrl + Shift + P` - 命令面板
  - `Alt + Shift + F` - 格式化代码

#### 代码片段
创建代码片段可以快速生成常用代码结构。

#### 实时预览
启动项目后，修改代码会自动刷新浏览器，无需手动刷新。

### 2. 调试技巧

#### 浏览器调试
- 按 `F12` 打开开发者工具
- 使用 `Console` 查看错误信息
- 使用 `Network` 查看网络请求

#### 代码调试
- 在代码中添加 `console.log()` 输出调试信息
- 使用 `debugger` 语句进行断点调试

### 3. 性能优化

#### 开发环境优化
```bash
# 使用 --open 参数自动打开浏览器
npm run dev -- --open

# 使用 --host 参数允许外部访问
npm run dev -- --host 0.0.0.0
```

#### 生产环境优化
```bash
# 构建优化
npm run build

# 预览构建结果
npm run preview
```

---

## 📋 检查清单

### 启动前检查
- [ ] Node.js 版本 ≥ 16.0.0
- [ ] npm 版本 ≥ 8.0.0
- [ ] Git 版本 ≥ 2.0.0
- [ ] 项目文件夹已下载
- [ ] IDE 已安装必要插件

### 启动中检查
- [ ] 依赖安装完成
- [ ] 运行配置正确
- [ ] 端口未被占用
- [ ] 代码无语法错误

### 启动后检查
- [ ] 浏览器能正常访问
- [ ] 页面显示正常
- [ ] 交互功能正常
- [ ] 控制台无错误

---

## 🆘 获取帮助

### 官方文档
- [Vue.js 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Node.js 官方文档](https://nodejs.org/)

### 社区支持
- [Vue.js 官方论坛](https://forum.vuejs.org/)
- [Vite GitHub Issues](https://github.com/vitejs/vite/issues)
- [Stack Overflow](https://stackoverflow.com/)

### 项目维护
如果遇到问题，请检查：
1. 是否按照步骤正确操作
2. 环境是否符合要求
3. 错误信息是否仔细阅读
4. 是否尝试过提供的解决方案

---

## 📞 联系支持

如果遇到无法解决的问题，请提供以下信息：
- 操作系统
- Node.js 版本
- IDE 版本
- 错误信息截图
- 复现步骤

这样可以帮助更快地定位和解决问题。