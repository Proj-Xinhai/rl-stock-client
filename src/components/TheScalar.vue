<script setup lang="ts">
import Plotly from 'plotly.js-dist-min'
import { onMounted, watch, ref } from 'vue'
import { template } from "@/ploty"

const props = defineProps<{
  timeline: string
  title: string
  x: number[]
  y: number[]
  showOutlier: boolean
}>()

const data = ref<Plotly.Data[]>([])
const layout = ref<Partial<Plotly.Layout>>({
  title: props.title,
  template: template
})
const config = ref<Partial<Plotly.Config>>({})

const outlierFilter = (data: number[]) => {
  const mean = data.reduce((a, b) => a + b) / data.length
  const std = Math.sqrt(data.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / data.length)
  return data.map((value) => {
    return (value > mean + std * 3 || value < mean - std * 3) && !props.showOutlier ? NaN : value
  })
}

const drawMeans = (data: number[]) => {
  const means: number[] = []
  let sum = 0
  let count = 0
  data.forEach(value => {
    if (!isNaN(value)) {
      sum += value
      count += 1
      means.push(sum / count)
    } else {
     means.push(NaN)
    }
  })
  return means
}

const updatePlot = () => {
  const y = outlierFilter(props.y)
  data.value = [{
    // type: "scattergl", // too many webgl context
    x: props.x,
    y: y,
    mode: props.title.startsWith("env/roi") ? "markers" : "lines"
  }]
  if (props.title.startsWith("env/roi")) {
    data.value.push({
      x: props.x,
      y: drawMeans(y),
      mode: "lines",
      line: {
        color: "red",
        width: 1
      }
    })
  }
  setTimeout(() => Plotly.react(`${props.title}_${props.timeline}`, data.value, layout.value, config.value), 0)
}

onMounted(() => {
  updatePlot()
})

watch(props, () => {
  updatePlot()
})
</script>

<template>
  <div :id="`${props.title}_${props.timeline}`"></div>
</template>