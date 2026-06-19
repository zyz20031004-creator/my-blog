<script setup>
import { ref } from 'vue'

// 个人基本信息
const profile = ref({
  name: '开发者',
  title: '前端开发工程师',
  bio: '专注于现代 Web 开发技术，热爱开源项目和用户体验设计。致力于构建高性能、可维护的前端应用。',
  location: '北京',
  email: 'developer@example.com',
  github: 'https://github.com/developer',
  linkedin: 'https://linkedin.com/in/developer'
})

// 技术栈数据
const techStack = ref([
  { category: '前端框架', skills: ['Vue.js', 'React', 'Angular', 'Svelte'] },
  { category: '构建工具', skills: ['Vite', 'Webpack', 'Rollup', 'Parcel'] },
  { category: '编程语言', skills: ['JavaScript', 'TypeScript', 'Python', 'Go'] },
  { category: '样式技术', skills: ['CSS3', 'Sass', 'Tailwind CSS', 'Styled Components'] },
  { category: '开发工具', skills: ['VS Code', 'Git', 'Docker', 'Node.js'] },
  { category: '数据库', skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'] }
])

// 学习路径时间线
const learningPath = ref([
  {
    period: '2020-2021',
    title: '前端入门',
    description: '从 HTML/CSS/JavaScript 开始，学习基础的前端开发知识',
    achievements: ['完成第一个静态网站', '掌握响应式设计', '学习 Git 版本控制']
  },
  {
    period: '2021-2022',
    title: '框架学习',
    description: '深入学习 Vue.js 和 React 框架，构建单页应用',
    achievements: ['开发个人博客系统', '掌握组件化开发', '学习状态管理']
  },
  {
    period: '2022-2023',
    title: '工程化实践',
    description: '学习前端工程化，构建完整的开发流程',
    achievements: ['配置 CI/CD 流程', '性能优化实践', '单元测试覆盖']
  },
  {
    period: '2023-2024',
    title: '全栈开发',
    description: '扩展后端知识，成为全栈开发者',
    achievements: ['学习 Node.js 后端开发', '数据库设计实践', 'API 设计与开发']
  },
  {
    period: '2024-2025',
    title: '技术深耕',
    description: '深入研究前端架构和性能优化',
    achievements: ['微前端架构实践', '性能监控与优化', '技术分享与开源贡献']
  }
])

// 技能卡片数据
const skillCards = ref([
  {
    title: '前端开发',
    description: '精通现代前端技术栈，包括 Vue.js、React、TypeScript 等',
    level: 90,
    technologies: ['Vue.js', 'React', 'TypeScript', 'Vite']
  },
  {
    title: 'UI/UX 设计',
    description: '具备良好的设计审美和用户体验设计能力',
    level: 75,
    technologies: ['Figma', 'CSS3', '响应式设计', '用户体验']
  },
  {
    title: '后端开发',
    description: '熟悉 Node.js 后端开发，能够构建完整的 Web 应用',
    level: 70,
    technologies: ['Node.js', 'Express', 'MongoDB', 'RESTful API']
  },
  {
    title: 'DevOps',
    description: '掌握持续集成和部署流程，优化开发效率',
    level: 65,
    technologies: ['Docker', 'CI/CD', 'AWS', '监控告警']
  }
])

// 计算技能等级显示
const getSkillLevel = (level) => {
  if (level >= 90) return '专家级'
  if (level >= 80) return '熟练级'
  if (level >= 70) return '进阶级'
  if (level >= 60) return '基础级'
  return '入门级'
}

// 获取技能等级颜色
const getSkillColor = (level) => {
  if (level >= 90) return 'var(--accent)'
  if (level >= 80) return '#10b981'
  if (level >= 70) return '#3b82f6'
  if (level >= 60) return '#f59e0b'
  return '#6b7280'
}
</script>

<template>
  <div class="about-layout">
    <!-- 个人基本信息区 -->
    <div class="profile-section">
      <div class="profile-header">
        <div class="profile-avatar">
          <div class="avatar-placeholder">
            <span class="avatar-text">{{ profile.name.charAt(0) }}</span>
          </div>
        </div>
        
        <div class="profile-info">
          <h1 class="profile-name">{{ profile.name }}</h1>
          <p class="profile-title">{{ profile.title }}</p>
          <p class="profile-bio">{{ profile.bio }}</p>
          
          <div class="profile-meta">
            <div class="meta-item">
              <span class="meta-label">📍</span>
              <span class="meta-value">{{ profile.location }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">📧</span>
              <span class="meta-value">{{ profile.email }}</span>
            </div>
          </div>
          
          <div class="profile-links">
            <a 
              :href="profile.github" 
              target="_blank" 
              rel="noopener noreferrer"
              class="profile-link"
            >
              GitHub
            </a>
            <a 
              :href="profile.linkedin" 
              target="_blank" 
              rel="noopener noreferrer"
              class="profile-link"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 技术栈展示 -->
    <div class="tech-stack-section">
      <h2 class="section-title">技术栈</h2>
      <p class="section-description">掌握的技术领域和工具</p>
      
      <div class="tech-stack-grid">
        <div 
          v-for="category in techStack" 
          :key="category.category"
          class="tech-category"
        >
          <h3 class="category-title">{{ category.category }}</h3>
          <div class="skills-list">
            <span 
              v-for="skill in category.skills" 
              :key="skill"
              class="skill-tag"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 技能卡片展示 -->
    <div class="skills-section">
      <h2 class="section-title">核心技能</h2>
      <p class="section-description">专业技能和能力水平</p>
      
      <div class="skills-grid">
        <div 
          v-for="skill in skillCards" 
          :key="skill.title"
          class="skill-card"
        >
          <h3 class="skill-card-title">{{ skill.title }}</h3>
          <p class="skill-card-description">{{ skill.description }}</p>
          
          <div class="skill-level">
            <div class="skill-level-info">
              <span class="skill-level-text">{{ getSkillLevel(skill.level) }}</span>
              <span class="skill-level-percentage">{{ skill.level }}%</span>
            </div>
            <div class="skill-level-bar">
              <div 
                class="skill-level-fill" 
                :style="{ width: skill.level + '%', backgroundColor: getSkillColor(skill.level) }"
              ></div>
            </div>
          </div>
          
          <div class="skill-techs">
            <span 
              v-for="tech in skill.technologies" 
              :key="tech"
              class="tech-chip"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 学习路径时间线 -->
    <div class="learning-section">
      <h2 class="section-title">学习路径</h2>
      <p class="section-description">技术成长历程和重要里程碑</p>
      
      <div class="timeline">
        <div 
          v-for="(item, index) in learningPath" 
          :key="index"
          class="timeline-item"
        >
          <div class="timeline-marker">
            <div class="timeline-dot"></div>
            <div class="timeline-line" v-if="index < learningPath.length - 1"></div>
          </div>
          
          <div class="timeline-content">
            <div class="timeline-period">{{ item.period }}</div>
            <h3 class="timeline-title">{{ item.title }}</h3>
            <p class="timeline-description">{{ item.description }}</p>
            
            <div class="timeline-achievements">
              <h4 class="achievements-title">主要成就：</h4>
              <ul class="achievements-list">
                <li 
                  v-for="achievement in item.achievements" 
                  :key="achievement"
                  class="achievement-item"
                >
                  {{ achievement }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-layout {
  min-height: 100vh;
}

/* 个人基本信息区 */
.profile-section {
  margin-bottom: 48px;
  padding: 32px;
  background: var(--surface);
  border: 1px solid var(--border-soft);
  border-radius: 8px;
  text-align: center;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--accent-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 36px;
  font-weight: 600;
}

.profile-name {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: var(--text);
}

.profile-title {
  margin: 8px 0 16px 0;
  font-size: 18px;
  color: var(--accent);
  font-weight: 500;
}

.profile-bio {
  margin: 0 0 24px 0;
  color: var(--text-muted);
  font-size: 16px;
  line-height: 1.6;
  max-width: 600px;
}

.profile-meta {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  justify-content: center;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-subtle);
  font-size: 14px;
}

.meta-label {
  font-size: 16px;
}

.meta-value {
  font-weight: 500;
  color: var(--text);
}

.profile-links {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.profile-link {
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text-muted);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
}

.profile-link:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent);
}

/* 通用样式 */
.section-title {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
  color: var(--text);
}

.section-description {
  margin: 0 0 32px 0;
  color: var(--text-muted);
  font-size: 16px;
  line-height: 1.6;
}

/* 技术栈展示 */
.tech-stack-section {
  margin-bottom: 48px;
}

.tech-stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.tech-category {
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--border-soft);
  border-radius: 8px;
}

.category-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  padding: 4px 12px;
  background: var(--bg-soft);
  color: var(--text-muted);
  border-radius: 999px;
  font-size: 13px;
  transition: all 0.2s ease;
}

.skill-tag:hover {
  background: var(--accent-soft);
  color: var(--accent);
}

/* 技能卡片展示 */
.skills-section {
  margin-bottom: 48px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.skill-card {
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--border-soft);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.skill-card:hover {
  border-color: var(--accent);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.skill-card-title {
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
}

.skill-card-description {
  margin: 0 0 16px 0;
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.5;
}

.skill-level {
  margin-bottom: 16px;
}

.skill-level-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.skill-level-text {
  font-size: 12px;
  color: var(--text-subtle);
  font-weight: 500;
}

.skill-level-percentage {
  font-size: 12px;
  color: var(--text);
  font-weight: 600;
}

.skill-level-bar {
  width: 100%;
  height: 6px;
  background: var(--border-soft);
  border-radius: 3px;
  overflow: hidden;
}

.skill-level-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.skill-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-chip {
  padding: 2px 8px;
  background: var(--bg-soft);
  color: var(--text-muted);
  border-radius: 4px;
  font-size: 12px;
}

/* 学习路径时间线 */
.learning-section {
  margin-bottom: 48px;
}

.timeline {
  position: relative;
  padding-left: 32px;
}

.timeline-item {
  position: relative;
  margin-bottom: 32px;
}

.timeline-marker {
  position: absolute;
  left: -32px;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent);
  border: 3px solid var(--surface);
  z-index: 2;
}

.timeline-line {
  width: 2px;
  height: calc(100% + 32px);
  background: var(--border-soft);
  z-index: 1;
}

.timeline-content {
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--border-soft);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.timeline-content:hover {
  border-color: var(--accent);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.timeline-period {
  font-size: 14px;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 8px;
}

.timeline-title {
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
}

.timeline-description {
  margin: 0 0 16px 0;
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.5;
}

.timeline-achievements {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border-soft);
}

.achievements-title {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.achievements-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.achievement-item {
  margin-bottom: 4px;
  padding-left: 16px;
  position: relative;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.4;
}

.achievement-item:before {
  content: "▸";
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .profile-section {
    padding: 24px;
  }
  
  .profile-header {
    gap: 16px;
  }
  
  .profile-avatar {
    width: 80px;
    height: 80px;
  }
  
  .avatar-placeholder {
    width: 64px;
    height: 64px;
    font-size: 24px;
  }
  
  .profile-name {
    font-size: 24px;
  }
  
  .profile-title {
    font-size: 16px;
  }
  
  .profile-bio {
    font-size: 14px;
  }
  
  .profile-meta {
    flex-direction: column;
    gap: 12px;
  }
  
  .profile-links {
    flex-direction: column;
    width: 100%;
  }
  
  .profile-link {
    width: 100%;
    text-align: center;
  }
  
  .tech-stack-grid,
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .timeline {
    padding-left: 24px;
  }
  
  .timeline-marker {
    left: -24px;
  }
  
  .timeline-dot {
    width: 12px;
    height: 12px;
  }
  
  .timeline-line {
    height: calc(100% + 12px);
  }
  
  .timeline-content {
    padding: 16px;
  }
  
  .section-title {
    font-size: 20px;
  }
  
  .section-description {
    font-size: 14px;
  }
}
</style>