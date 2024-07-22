import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import UnoCSS from 'unocss/vite'
import { alias } from '../../alias'

const Guides: DefaultTheme.NavItemWithLink[] = [
  { text: 'Getting Started', link: '/guide/' },
]

const VueComponents: DefaultTheme.NavItemWithLink[] = [
  { text: 'Virtual list', link: '/vue/virtual-list' },
]

const SolidComponents: DefaultTheme.NavItemWithLink[] = [
  { text: 'Virtual list', link: '/solid/virtual-list' },
]

const SidebarGuide: DefaultTheme.SidebarItem[] = [
  {
    text: 'Guides',
    items: Guides,
  },
  {
    text: 'Vue components',
    items: VueComponents,
  },
  {
    text: 'Solid components',
    items: SolidComponents,
  },
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  outDir: './dist',
  title: 'Virtual View',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'docs', link: '/guide/' },
    ],

    sidebar: {
      '/guide/': SidebarGuide,
      '/vue/': SidebarGuide,
      '/solid/': SidebarGuide,
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  vite: {
    plugins: [UnoCSS()],
    resolve: {
      alias,
    },
  },
})
