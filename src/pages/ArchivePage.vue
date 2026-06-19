<script setup>
import { renderedArticles } from '../data/content'
</script>

<template>
  <section class="page-block">
    <p class="eyebrow">Archive</p>
    <h1>归档</h1>
    <p class="lead">按时间线回看学习与构建记录。</p>
  </section>

  <div class="timeline">
    <RouterLink v-for="article in renderedArticles" :key="article.slug" class="timeline-item" :to="`/posts/${article.slug}`">
      <time>{{ article.date }}</time>
      <span>{{ article.title }}</span>
      <small>{{ article.category }}</small>
    </RouterLink>
  </div>
</template>
