import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/Home.vue'
import Post from './pages/Post.vue'
import Archive from './pages/Archive.vue'
import TaxonomyPage from './pages/TaxonomyPage.vue'
import PdfPage from './pages/PdfPage.vue'
import About from './pages/About.vue'
import NotFound from './pages/NotFound.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/posts/:slug', name: 'article', component: Post },
  { path: '/archive', name: 'archive', component: Archive },
  { path: '/categories', name: 'categories', component: TaxonomyPage, props: { mode: 'categories' } },
  { path: '/tags', name: 'tags', component: TaxonomyPage, props: { mode: 'tags' } },
  { path: '/pdfs', name: 'pdfs', component: PdfPage },
  { path: '/about', name: 'about', component: About },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, top: 88, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})

export default router