<!-- ~/Documents/llm-wiki/.vitepress/theme/PostList.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'

interface Post {
  title: string
  category: string
  date: string
  slug: string
  summary?: string
}

// posts.json 由 sync.ts 生成，放在 docs/posts.json
const allPosts = ref<Post[]>([])

// 在客户端加载 posts.json
if (typeof window !== 'undefined') {
  fetch('/posts.json')
    .then(r => r.json())
    .then((data: Post[]) => { allPosts.value = data })
    .catch(() => {})
}

const activeTag = ref<string | null>(null)

const categories = computed(() => {
  const cats = new Set(allPosts.value.map(p => p.category))
  return ['全部', ...cats]
})

const filtered = computed(() => {
  if (!activeTag.value || activeTag.value === '全部') return allPosts.value
  return allPosts.value.filter(p => p.category === activeTag.value)
})

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <div class="post-list">
    <div class="tags">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="['tag', { active: activeTag === cat || (!activeTag && cat === '全部') }]"
        @click="activeTag = cat === '全部' ? null : cat"
      >
        {{ cat }}
      </button>
    </div>

    <div v-if="filtered.length === 0" class="empty">暂无文章</div>

    <a
      v-for="post in filtered"
      :key="post.slug"
      :href="`/${post.category}/${post.slug}`"
      class="post-item"
    >
      <div class="post-meta">
        <span class="post-category">{{ post.category }}</span>
        <span class="post-date">{{ formatDate(post.date) }}</span>
      </div>
      <div class="post-title">{{ post.title }}</div>
      <div v-if="post.summary" class="post-summary">{{ post.summary }}</div>
    </a>
  </div>
</template>

<style scoped>
.post-list {
  max-width: 680px;
  margin: 0 auto;
  padding: 2rem 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 2rem;
}

.tag {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 13px;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.tag.active,
.tag:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.post-item {
  display: block;
  padding: 1.2rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
  text-decoration: none;
  transition: opacity 0.2s;
}

.post-item:hover { opacity: 0.75; }

.post-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}

.post-category {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.post-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.post-summary {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.empty {
  color: var(--vp-c-text-3);
  text-align: center;
  padding: 3rem 0;
}
</style>
