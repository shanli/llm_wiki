import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 读取 sync 脚本生成的 sidebar.json
function loadSidebar() {
  const sidebarPath = path.resolve(__dirname, '../sidebar.json')
  if (!fs.existsSync(sidebarPath)) return {}
  const raw: Record<string, { text: string; link: string }[]> = JSON.parse(
    fs.readFileSync(sidebarPath, 'utf-8')
  )
  const result: Record<string, { text: string; link: string }[]> = {}
  for (const [category, items] of Object.entries(raw)) {
    result[`/${category}/`] = items
  }
  return result
}

export default defineConfig({
  title: 'LLM Wiki',
  description: '我的 AI 与 LLM 知识库',
  lang: 'zh-CN',
  appearance: 'dark',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'LLM 原理', link: '/LLM原理/' },
      { text: 'AI 工具', link: '/AI工具/' },
      { text: '前端 & Web3', link: '/前端与Web3/' },
    ],
    sidebar: loadSidebar(),
    search: {
      provider: 'local',
    },
    socialLinks: [],
    footer: {
      message: '持续更新中',
    },
  },

  markdown: {
    theme: {
      light: 'github-dark',
      dark: 'github-dark',
    },
  },
})
