import DefaultTheme from 'vitepress/theme'
import PostList from './PostList.vue'
import './style.css'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PostList', PostList)
  },
} satisfies Theme
