<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { CalendarDays, Clock } from 'lucide-vue-next'
import { getArticleBySlug } from '../data/content'

const route = useRoute()
const article = computed(() => getArticleBySlug(route.params.slug))
</script>

<template>
  <article v-if="article" class="article-view">
    <header class="article-head">
      <div class="post-card-meta">
        <span><CalendarDays :size="15" />{{ article.date }}</span>
        <span><Clock :size="15" />{{ article.readingTime }}</span>
      </div>
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <div class="post-card-foot">
        <span class="pill">{{ article.category }}</span>
        <span v-for="tag in article.tags" :key="tag" class="tag">#{{ tag }}</span>
      </div>
    </header>
    <div class="markdown-body" v-html="article.html"></div>
  </article>

  <section v-else class="empty-state">
    <h1>文章不存在</h1>
    <p>这篇笔记可能被移动或尚未发布。</p>
    <RouterLink class="primary-link" to="/">返回首页</RouterLink>
  </section>
</template>
