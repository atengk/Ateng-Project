<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import mediumZoom, { type Zoom } from 'medium-zoom'

const { Layout } = DefaultTheme
const route = useRoute()

let zoom: Zoom | null = null
let observer: MutationObserver | null = null

const createZoom = () => {
  if (!zoom) {
    zoom = mediumZoom({
      background: 'rgba(10, 10, 10, 0.75)',
      margin: 32,
      scrollOffset: 80
    })

    // 增强交互
    zoom.on('open', () => {
      document.body.style.overflow = 'hidden'
    })

    zoom.on('close', () => {
      document.body.style.overflow = ''
    })
  }
}

const attachImages = () => {
  const images = document.querySelectorAll(
      '.vp-doc img:not(.no-zoom):not([data-no-zoom])'
  )

  zoom?.detach()
  zoom?.attach(images)
}

const initZoom = async () => {
  if (typeof window === 'undefined') return

  await nextTick()

  createZoom()
  attachImages()

  // 监听 DOM 变化（适配 VitePress 动态渲染）
  observer?.disconnect()
  observer = new MutationObserver(() => {
    attachImages()
  })

  observer.observe(document.querySelector('.vp-doc')!, {
    childList: true,
    subtree: true
  })
}

onMounted(initZoom)

watch(
    () => route.path,
    async () => {
      await initZoom()
    }
)

onBeforeUnmount(() => {
  zoom?.detach()
  observer?.disconnect()
  zoom = null
})
</script>

<template>
  <Layout />
</template>