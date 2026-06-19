/**
 * 博客归档页过滤器逻辑
 * 提供文章搜索、分类过滤、标签筛选等功能
 */

/**
 * 按年份分组文章
 * @param {Array} articles - 文章列表
 * @returns {Object} 按年份分组的文章对象
 */
export const groupArticlesByYear = (articles) => {
  const grouped = {}
  
  articles.forEach(article => {
    const year = new Date(article.date).getFullYear()
    if (!grouped[year]) {
      grouped[year] = []
    }
    grouped[year].push(article)
  })
  
  // 按日期倒序排序
  Object.keys(grouped).forEach(year => {
    grouped[year].sort((a, b) => new Date(b.date) - new Date(a.date))
  })
  
  // 按年份倒序排序
  const sortedGrouped = {}
  Object.keys(grouped).sort((a, b) => b - a).forEach(year => {
    sortedGrouped[year] = grouped[year]
  })
  
  return sortedGrouped
}

/**
 * 获取所有唯一的分类
 * @param {Array} articles - 文章列表
 * @returns {Array} 分类列表
 */
export const getUniqueCategories = (articles) => {
  const categories = [...new Set(articles.map(article => article.category))]
  return categories.sort()
}

/**
 * 获取所有唯一的标签
 * @param {Array} articles - 文章列表
 * @returns {Array} 标签列表
 */
export const getUniqueTags = (articles) => {
  const tags = [...new Set(articles.flatMap(article => article.tags))]
  return tags.sort()
}

/**
 * 过滤文章
 * @param {Array} articles - 原始文章列表
 * @param {Object} filters - 过滤器对象
 * @returns {Array} 过滤后的文章列表
 */
export const filterArticles = (articles, filters) => {
  return articles.filter(article => {
    // 搜索过滤
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase()
      const matchesSearch = 
        article.title.toLowerCase().includes(searchLower) ||
        article.description.toLowerCase().includes(searchLower) ||
        article.category.toLowerCase().includes(searchLower) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchLower))
      
      if (!matchesSearch) return false
    }
    
    // 分类过滤
    if (filters.selectedCategory !== 'all' && article.category !== filters.selectedCategory) {
      return false
    }
    
    // 标签过滤
    if (filters.selectedTags.length > 0) {
      const hasMatchingTag = filters.selectedTags.some(tag => 
        article.tags.includes(tag)
      )
      if (!hasMatchingTag) return false
    }
    
    return true
  })
}

/**
 * 日期格式化
 * @param {string} dateString - 日期字符串
 * @returns {string} 格式化后的日期
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.getMonth() + 1
  return `${month}月${day}日`
}

/**
 * 获取文章统计信息
 * @param {Array} articles - 文章列表
 * @returns {Object} 统计信息
 */
export const getArticleStats = (articles) => {
  const stats = {
    total: articles.length,
    byCategory: {},
    byYear: {},
    byTag: {}
  }
  
  articles.forEach(article => {
    // 按分类统计
    if (!stats.byCategory[article.category]) {
      stats.byCategory[article.category] = 0
    }
    stats.byCategory[article.category]++
    
    // 按年份统计
    const year = new Date(article.date).getFullYear()
    if (!stats.byYear[year]) {
      stats.byYear[year] = 0
    }
    stats.byYear[year]++
    
    // 按标签统计
    article.tags.forEach(tag => {
      if (!stats.byTag[tag]) {
        stats.byTag[tag] = 0
      }
      stats.byTag[tag]++
    })
  })
  
  return stats
}

/**
 * 检查是否有活跃的过滤器
 * @param {Object} filters - 过滤器对象
 * @returns {boolean} 是否有活跃的过滤器
 */
export const hasActiveFilters = (filters) => {
  return filters.searchQuery !== '' ||
         filters.selectedCategory !== 'all' ||
         filters.selectedTags.length > 0
}

/**
 * 重置过滤器
 * @param {Object} filters - 过滤器对象
 */
export const resetFilters = (filters) => {
  filters.searchQuery = ''
  filters.selectedCategory = 'all'
  filters.selectedTags = []
}

/**
 * 切换标签选择
 * @param {string} tag - 标签
 * @param {Array} selectedTags - 已选择的标签数组
 */
export const toggleTag = (tag, selectedTags) => {
  const index = selectedTags.indexOf(tag)
  if (index > -1) {
    selectedTags.splice(index, 1)
  } else {
    selectedTags.push(tag)
  }
}

/**
 * 搜索建议
 * @param {Array} articles - 文章列表
 * @param {string} query - 搜索查询
 * @param {number} limit - 限制结果数量
 * @returns {Array} 搜索建议
 */
export const getSearchSuggestions = (articles, query, limit = 5) => {
  if (!query) return []
  
  const queryLower = query.toLowerCase()
  const suggestions = []
  
  articles.forEach(article => {
    // 标题建议
    if (article.title.toLowerCase().includes(queryLower)) {
      suggestions.push({
        type: 'title',
        title: article.title,
        category: article.category,
        slug: article.slug
      })
    }
    
    // 标签建议
    article.tags.forEach(tag => {
      if (tag.toLowerCase().includes(queryLower)) {
        suggestions.push({
          type: 'tag',
          title: `#${tag}`,
          category: '标签',
          slug: tag
        })
      }
    })
  })
  
  // 去重并限制数量
  const uniqueSuggestions = suggestions.filter((suggestion, index, self) => 
    index === self.findIndex(s => s.title === suggestion.title)
  )
  
  return uniqueSuggestions.slice(0, limit)
}

/**
 * 导出过滤器配置
 */
export const filterConfig = {
  searchPlaceholder: '搜索文章标题、描述、分类或标签...',
  categoryOptions: ['all', 'Frontend', 'Vue', 'UX'],
  tagLimit: 20,
  debounceTime: 300
}

export default {
  groupArticlesByYear,
  getUniqueCategories,
  getUniqueTags,
  filterArticles,
  formatDate,
  getArticleStats,
  hasActiveFilters,
  resetFilters,
  toggleTag,
  getSearchSuggestions,
  filterConfig
}