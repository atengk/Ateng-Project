// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// @ts-ignore
import Layout from './Layout.vue'
import './index.css'

export default {
    extends: DefaultTheme,
    Layout
} satisfies Theme