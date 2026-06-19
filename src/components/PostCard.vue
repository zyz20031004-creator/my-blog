<script setup>
import { CalendarDays, Clock } from 'lucide-vue-next'

defineProps({
  article: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="post-card">
    <div class="post-card-meta">
      <span><CalendarDays :size="15" />{{ article.date }}</span>
      <span><Clock :size="15" />{{ article.readingTime }}</span>
    </div>
    <RouterLink class="post-card-title" :to="`/posts/${article.slug}`">{{ article.title }}</RouterLink>
    <p>{{ article.description }}</p>
    <div class="post-card-foot">
      <span class="pill">{{ article.category }}</span>
      <span v-for="tag in article.tags" :key="tag" class="tag">#{{ tag }}</span>
    </div>
  </article>
</template>
