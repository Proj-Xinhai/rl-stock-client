<script setup lang="ts">
import Plotly from 'plotly.js-dist-min'
import { onMounted, ref } from 'vue'
import { template } from "@/ploty"

const props = defineProps<{
  timeline: string
  title: string
  x: number[]
  y: number[]
}>()

onMounted(() => {
  const data = [{
    x: props.x,
    y: props.y,
    mode: props.title.startsWith("env/roi") ? "markers" : "lines"
  }]
  const layout = {
    title: props.title,
    template: template
  }
  const config = { modeBarButtonsToAdd: [{
    name: 'refresh',
    icon: Plotly.Icons.undo,
    click: () => {}
  } ]}
  Plotly.react(`${props.title}_${props.timeline}`, data, layout, config)
})
</script>

<template>
  <div :id="`${props.title}_${props.timeline}`"></div>
</template>