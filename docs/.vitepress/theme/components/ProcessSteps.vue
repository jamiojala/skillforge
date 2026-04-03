<script setup lang="ts">
defineProps<{
  steps: Array<{
    title: string
    body: string
  }>
  codeExample?: string
}>()
</script>

<template>
  <div class="sf-process">
    <div class="sf-process__steps">
      <article v-for="(step, index) in steps" :key="step.title" class="sf-process__item">
        <span class="sf-process__index">{{ index + 1 }}</span>
        <div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.body }}</p>
        </div>
      </article>
    </div>

    <aside v-if="codeExample" class="sf-process__code">
      <p class="sf-kicker">Install surface</p>
      <pre><code>{{ codeExample }}</code></pre>
    </aside>
  </div>
</template>
