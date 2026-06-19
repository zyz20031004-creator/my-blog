<script setup>
import { Archive, FileText, Folder, Home, Info, Tags } from 'lucide-vue-next'

defineEmits(['navigate'])

const navItems = [
  { to: '/', label: '首页', icon: Home },
  { to: '/archive', label: '归档', icon: Archive },
  { to: '/categories', label: '分类', icon: Folder },
  { to: '/tags', label: '标签', icon: Tags },
  { to: '/pdfs', label: 'PDF 资料', icon: FileText },
  { to: '/about', label: '关于', icon: Info }
]
</script>

<template>
  <nav class="side-nav" aria-label="主导航">
    <RouterLink
      v-for="item in navItems"
      :key="item.to"
      class="nav-link"
      :to="item.to"
      @click="$emit('navigate')"
    >
      <component :is="item.icon" :size="17" />
      <span>{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>
