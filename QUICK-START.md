# 🚀 博客项目快速启动指南

## 📋 环境要求

- **Node.js**: 16.0.0 或更高版本
- **npm**: 8.0.0 或更高版本
- **浏览器**: Chrome、Firefox、Safari、Edge

## 🔍 检查环境

```bash
# 检查 Node.js
node --version

# 检查 npm
npm --version
```

## 🚀 三步启动法

### 第一步：进入项目目录
```bash
cd /path/to/journey-blog
```

### 第二步：安装依赖
```bash
npm install
```

### 第三步：启动项目
```bash
npm run dev
```

### 第四步：访问项目
打开浏览器访问：**http://localhost:5173/**

---

## 🛠️ IDE 配置

### VS Code 用户

1. **安装插件**（Ctrl+Shift+X）：
   - Vue Language Features (Volar)
   - Vite
   - ESLint
   - Prettier

2. **打开项目**：
   ```
   File → Open Folder → 选择项目文件夹
   ```

3. **启动项目**：
   - 按 `Ctrl + ` ` 打开终端
   - 输入 `npm run dev`

### IDEA 用户

1. **安装插件**（File → Settings → Plugins）：
   - Vue.js
   - Vite
   - ESLint
   - Prettier

2. **打开项目**：
   ```
   File → Open → 选择项目文件夹
   ```

3. **启动项目**：
   - 等待依赖安装完成
   - 点击绿色运行按钮

---

## ⚠️ 常见问题

### 问题1：端口被占用
```bash
# 终止占用进程
netstat -ano | findstr :5173
taskkill /F /PID 进程号
```

### 问题2：依赖安装失败
```bash
# 清除缓存重新安装
npm cache clean --force
rm -rf node_modules
npm install
```

### 问题3：页面空白
- 检查控制台是否有错误
- 刷新浏览器 (Ctrl+R)
- 重启项目 (Ctrl+C)

### 问题4：样式错乱
- 确保主题切换正常
- 检查浏览器控制台是否有 CSS 错误

---

## 🎯 功能测试

启动成功后，请测试以下功能：

1. **首页**：查看文章列表
2. **文章页**：点击文章进入详情
3. **归档页**：访问 /archive 查看归档
4. **主题切换**：点击右上角主题按钮
5. **响应式**：调整浏览器窗口大小

---

## 📞 获取帮助

如果遇到问题：
1. 检查浏览器控制台错误
2. 查看终端错误信息
3. 检查网络连接
4. 重启项目重试

---

## 🎉 恭喜！

现在你已经成功启动了个人静态博客项目！

**访问地址**：http://localhost:5173/

**项目文档**：查看 `SETUP-GUIDE.md` 了解详细配置