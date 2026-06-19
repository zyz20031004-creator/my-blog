/**
 * Theme System Composable
 * 提供主题切换功能的 Vue3 Composition API
 */

import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// 主题常量
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
}

// 主题存储键名
const STORAGE_KEY = 'theme-preference'
const SYSTEM_PREFERS_DARK = 'prefers-dark'

/**
 * 使用主题系统的 Composable
 * @returns {Object} 主题相关的响应式数据和函数
 */
export function useTheme() {
  // 当前主题状态
  const currentTheme = ref(THEMES.LIGHT)
  const systemTheme = ref(THEMES.LIGHT)
  
  // 主题切换状态
  const isTransitioning = ref(false)
  const transitionTimeout = ref(null)
  
  // 计算实际应用的主题
  const effectiveTheme = computed(() => {
    if (currentTheme.value === THEMES.SYSTEM) {
      return systemTheme.value
    }
    return currentTheme.value
  })
  
  // 计算主题图标
  const themeIcon = computed(() => {
    if (currentTheme.value === THEMES.SYSTEM) {
      return systemTheme.value === THEMES.DARK ? '🌙' : '☀️'
    }
    return currentTheme.value === THEMES.DARK ? '🌙' : '☀️'
  })
  
  // 计算主题文本
  const themeText = computed(() => {
    if (currentTheme.value === THEMES.SYSTEM) {
      return `跟随系统 (${systemTheme.value === THEMES.DARK ? '深色' : '浅色'})`
    }
    return currentTheme.value === THEMES.DARK ? '深色模式' : '浅色模式'
  })
  
  // 检查系统主题偏好
  const checkSystemTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    systemTheme.value = prefersDark ? THEMES.DARK : THEMES.LIGHT
  }
  
  // 从 localStorage 加载主题设置
  const loadThemeFromStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const { theme, timestamp } = JSON.parse(saved)
        
        // 检查是否过期（30天）
        const thirtyDays = 30 * 24 * 60 * 60 * 1000
        if (Date.now() - timestamp < thirtyDays) {
          currentTheme.value = theme
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error)
    }
  }
  
  // 保存主题设置到 localStorage
  const saveThemeToStorage = (theme) => {
    try {
      const themeData = {
        theme,
        timestamp: Date.now()
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(themeData))
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error)
    }
  }
  
  // 应用主题到 DOM
  const applyTheme = (theme) => {
    const root = document.documentElement
    
    // 移除所有主题类
    root.removeAttribute('data-theme')
    
    // 添加新主题
    if (theme === THEMES.DARK) {
      root.setAttribute('data-theme', 'dark')
      root.classList.add('theme-is-dark')
      root.classList.remove('theme-is-light')
    } else {
      root.classList.add('theme-is-light')
      root.classList.remove('theme-is-dark')
    }
    
    // 添加过渡动画类
    root.classList.add('theme-switching')
    setTimeout(() => {
      root.classList.remove('theme-switching')
    }, 150)
  }
  
  // 切换主题
  const toggleTheme = () => {
    const themes = [THEMES.LIGHT, THEMES.DARK, THEMES.SYSTEM]
    const currentIndex = themes.indexOf(currentTheme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    const nextTheme = themes[nextIndex]
    
    setTheme(nextTheme)
  }
  
  // 设置主题
  const setTheme = (theme) => {
    if (isTransitioning.value) return
    
    isTransitioning.value = true
    
    // 清除之前的超时
    if (transitionTimeout.value) {
      clearTimeout(transitionTimeout.value)
    }
    
    // 设置新主题
    currentTheme.value = theme
    
    // 应用主题到 DOM
    applyTheme(effectiveTheme.value)
    
    // 保存到 localStorage
    saveThemeToStorage(theme)
    
    // 显示切换提示
    showThemeChangeHint()
    
    // 设置过渡状态超时
    transitionTimeout.value = setTimeout(() => {
      isTransitioning.value = false
    }, 150)
  }
  
  // 显示主题切换提示
  const showThemeChangeHint = () => {
    // 移除现有的提示
    const existingHint = document.querySelector('.theme-change-hint')
    if (existingHint) {
      existingHint.remove()
    }
    
    // 创建新提示
    const hint = document.createElement('div')
    hint.className = 'theme-change-hint'
    hint.textContent = `已切换到${themeText.value}`
    document.body.appendChild(hint)
    
    // 显示提示
    setTimeout(() => {
      hint.classList.add('show')
    }, 10)
    
    // 3秒后隐藏并移除
    setTimeout(() => {
      hint.classList.remove('show')
      setTimeout(() => {
        hint.remove()
      }, 150)
    }, 3000)
  }
  
  // 初始化主题系统
  const initTheme = () => {
    // 检查系统主题
    checkSystemTheme()
    
    // 加载保存的主题设置
    loadThemeFromStorage()
    
    // 应用初始主题
    applyTheme(effectiveTheme.value)
    
    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      systemTheme.value = e.matches ? THEMES.DARK : THEMES.LIGHT
      
      // 如果当前是跟随系统模式，则自动切换
      if (currentTheme.value === THEMES.SYSTEM) {
        applyTheme(effectiveTheme.value)
        showThemeChangeHint()
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    // 监听 localStorage 变化（多标签页同步）
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        loadThemeFromStorage()
        applyTheme(effectiveTheme.value)
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // 清理函数
    onUnmounted(() => {
      mediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('storage', handleStorageChange)
      if (transitionTimeout.value) {
        clearTimeout(transitionTimeout.value)
      }
    })
  }
  
  // 监听主题变化
  watch(effectiveTheme, (newTheme) => {
    // 可以在这里添加主题变化时的其他逻辑
    console.log(`Theme changed to: ${newTheme}`)
  })
  
  // 组件挂载时初始化
  onMounted(() => {
    initTheme()
  })
  
  return {
    // 响应式状态
    currentTheme,
    systemTheme,
    effectiveTheme,
    isTransitioning,
    
    // 计算属性
    themeIcon,
    themeText,
    
    // 方法
    toggleTheme,
    setTheme,
    checkSystemTheme,
    
    // 常量
    THEMES
  }
}

/**
 * 主题工具函数
 */

// 获取当前主题
export const getCurrentTheme = () => {
  const root = document.documentElement
  return root.getAttribute('data-theme') === 'dark' ? THEMES.DARK : THEMES.LIGHT
}

// 检查是否支持深色模式
export const isDarkModeSupported = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

// 强制清除主题设置
export const clearThemeSettings = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.classList.remove('theme-is-dark', 'theme-is-light')
  } catch (error) {
    console.warn('Failed to clear theme settings:', error)
  }
}

// 获取主题统计信息
export const getThemeStats = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const { theme, timestamp } = JSON.parse(saved)
      const daysSinceSet = Math.floor((Date.now() - timestamp) / (24 * 60 * 60 * 1000))
      return {
        currentTheme: theme,
        daysSinceSet,
        isSystem: theme === THEMES.SYSTEM
      }
    }
  } catch (error) {
    console.warn('Failed to get theme stats:', error)
  }
  return null
}

// 创建主题切换按钮组件
export const createThemeButton = () => {
  return {
    template: `
      <button 
        class="theme-toggle" 
        :data-theme="currentTheme"
        @click="toggleTheme"
        :disabled="isTransitioning"
        :title="themeText"
      >
        <span class="theme-toggle-slider"></span>
        <span class="theme-icon">{{ themeIcon }}</span>
      </button>
    `,
    setup() {
      const { toggleTheme, currentTheme, themeIcon, themeText, isTransitioning } = useTheme()
      return {
        toggleTheme,
        currentTheme,
        themeIcon,
        themeText,
        isTransitioning
      }
    }
  }
}

export default useTheme