<script setup>
import PostCard from '../components/PostCard.vue'
import { renderedArticles } from '../data/content'
</script>

<template>
  <section class="page-block home-head">
    <p class="eyebrow">Developer Notes</p>
    <h1>面向长期学习沉淀的极简技术博客</h1>
    <p class="lead">Markdown 笔记、代码片段、PDF 资料和归档索引被组织在一个安静、清晰、可扩展的文档系统里。</p>
  </section>

  <section class="post-list" aria-label="文章列表">
    <PostCard v-for="article in renderedArticles" :key="article.slug" :article="article" />
  </section>
</template>
