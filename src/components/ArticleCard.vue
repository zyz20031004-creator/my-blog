<script setup>
import { CalendarDays } from 'lucide-vue-next'

defineProps({
  article: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.title && value.summary && value.tags && value.date
    }
  }
})

const formatSummary = (text) => {
  if (!text) return ''
  const lines = text.split('\n')
  if (lines.length > 2) {
    return lines.slice(0, 2).join('\n')
  }
  return text
}
</script>

<template>
  <article class="article-card" @click="$router.push(`/articles/${article.slug}`)">
    <div class="article-meta">
      <time class="article-date">
        <CalendarDays :size="14" />
        {{ article.date }}
      </time>
    </div>

    <h3 class="article-title">{{ article.title }}</h3>
    <p class="article-summary">{{ formatSummary(article.summary) }}</p>

    <div class="article-tags">
      <span v-for="tag in article.tags" :key="tag" class="article-tag">
        #{{ tag }}
      </span>
    </div>
  </article>
</template>

<style scoped>
.article-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  margin-bottom: 32px;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--surface);
  color: var(--text);
  text-decoration: none;
  transition: var(--transition);
  cursor: pointer;
}

.article-card:hover {
  border-color: var(--accent);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.article-date {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
}

.article-date svg {
  color: var(--text-subtle);
}

.article-title {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: var(--font-weight-bold);
  line-height: 1.4;
  color: var(--text);
  transition: var(--transition);
}

.article-card:hover .article-title {
  color: var(--accent);
}

.article-summary {
  margin: 0 0 20px 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-muted);
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.article-tag {
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  background: #f3f4f6;
  color: #64748b;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  height: 28px;
  transition: var(--transition);
}

.article-tag:hover {
  background: var(--accent-bg);
  color: var(--accent);
}

/* 移动端样式 */
@media (max-width: 768px) {
  .article-card {
    padding: 20px;
    margin-bottom: 24px;
    border-radius: 16px;
  }

  .article-title {
    font-size: 16px;
    margin-bottom: 12px;
  }

  .article-summary {
    font-size: 14px;
    margin-bottom: 16px;
    -webkit-line-clamp: 2;
  }

  .article-tags {
    gap: 6px;
  }

  .article-tag {
    padding: 0 10px;
    font-size: 12px;
    height: 24px;
  }
}
</style>