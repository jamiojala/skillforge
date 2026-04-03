<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { formatNumber } from '../lib/catalog'

const props = withDefaults(
  defineProps<{
    value: number
    prefix?: string
    suffix?: string
  }>(),
  {
    prefix: '',
    suffix: ''
  }
)

const displayValue = ref(props.value)
const counterRef = ref<HTMLElement | null>(null)
const prefersReducedMotion =
  typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : true

const formatted = computed(() => `${props.prefix}${formatNumber(displayValue.value)}${props.suffix}`)

onMounted(() => {
  if (prefersReducedMotion || typeof window === 'undefined') {
    displayValue.value = props.value
    return
  }

  const animate = () => {
    const start = performance.now()
    const duration = 900

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      displayValue.value = Math.round(props.value * eased)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        animate()
        observer.disconnect()
      }
    },
    { threshold: 0.45 }
  )

  if (counterRef.value) {
    displayValue.value = 0
    observer.observe(counterRef.value)
  }
})
</script>

<template>
  <span ref="counterRef">{{ formatted }}</span>
</template>
