<template>
  <div class="not-found-layout">
    <div class="not-found-container">
      <div class="not-found-content">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">Not Found</h2>
        <p class="error-description">
          抱歉，您访问的页面不存在。
        </p>
        <p class="error-suggestion">
          可能是链接已失效，或者页面还在开发中。
        </p>
        <RouterLink 
          to="/" 
          class="home-button"
        >
          返回首页
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  padding: 20px;
}

.not-found-container {
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.not-found-content {
  padding: 60px 40px;
  background: var(--surface);
  border: 1px solid var(--border-soft);
  border-radius: 8px;
}

.error-code {
  margin: 0 0 24px 0;
  font-size: clamp(72px, 15vw, 120px);
  font-weight: 700;
  line-height: 1;
  color: var(--accent);
  letter-spacing: -0.02em;
}

.error-title {
  margin: 0 0 24px 0;
  font-size: clamp(32px, 6vw, 48px);
  font-weight: 600;
  line-height: 1.2;
  color: var(--text);
  letter-spacing: -0.01em;
}

.error-description {
  margin: 0 0 16px 0;
  font-size: 18px;
  line-height: 1.6;
  color: var(--text-muted);
}

.error-suggestion {
  margin: 0 0 40px 0;
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-subtle);
}

.home-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background: var(--accent);
  border: none;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  min-width: 160px;
}

.home-button:hover {
  background: var(--accent);
  opacity: 0.9;
  transform: translateY(-1px);
}

.home-button:active {
  transform: translateY(0);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .not-found-layout {
    padding: 16px;
  }
  
  .not-found-content {
    padding: 40px 24px;
  }
  
  .error-code {
    font-size: clamp(48px, 12vw, 80px);
    margin-bottom: 20px;
  }
  
  .error-title {
    font-size: clamp(24px, 6vw, 36px);
    margin-bottom: 20px;
  }
  
  .error-description {
    font-size: 16px;
    margin-bottom: 12px;
  }
  
  .error-suggestion {
    font-size: 14px;
    margin-bottom: 32px;
  }
  
  .home-button {
    padding: 14px 28px;
    font-size: 14px;
    min-width: 140px;
  }
}

@media (max-width: 480px) {
  .not-found-content {
    padding: 32px 20px;
  }
  
  .error-code {
    font-size: 48px;
    margin-bottom: 16px;
  }
  
  .error-title {
    font-size: 28px;
    margin-bottom: 16px;
  }
  
  .error-description {
    font-size: 15px;
    margin-bottom: 10px;
  }
  
  .error-suggestion {
    font-size: 13px;
    margin-bottom: 24px;
  }
  
  .home-button {
    padding: 12px 24px;
    font-size: 13px;
    min-width: 120px;
  }
}

/* 深色模式样式 */
:root[data-theme='dark'] .not-found-content {
  background: var(--surface);
  border-color: var(--border-soft);
}

:root[data-theme='dark'] .error-code {
  color: var(--accent);
}

:root[data-theme='dark'] .error-title {
  color: var(--text);
}

:root[data-theme='dark'] .error-description {
  color: var(--text-muted);
}

:root[data-theme='dark'] .error-suggestion {
  color: var(--text-subtle);
}

:root[data-theme='dark'] .home-button {
  background: var(--accent);
}

:root[data-theme='dark'] .home-button:hover {
  background: var(--accent);
  opacity: 0.9;
}

/* 无障碍访问 */
.home-button:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* 打印样式 */
@media print {
  .not-found-layout {
    background: #ffffff;
    color: #000000;
  }
  
  .not-found-content {
    border: 1px solid #000000;
  }
  
  .home-button {
    background: #000000;
    color: #ffffff;
  }
}
</style>