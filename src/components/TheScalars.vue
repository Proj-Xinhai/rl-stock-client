<script setup lang="ts">
import { onMounted, ref } from "vue";
import { template } from "@/ploty"
import { VuePlotly } from '@clalarco/vue3-plotly'
import Plotly from 'plotly.js-basic-dist'
import { type ScalarGroup, socket } from "@/socket"
import ThePlaceholder from "@/components/ThePlaceholder.vue"

const props = defineProps<{
  uuid: string
  timeline: string
  showOutliers: boolean
}>()

const scalars = ref<{ [index: string]: ScalarGroup[] }>({})
const onInitReady = ref<boolean>(false)
const scalarLoading = ref<boolean>(false)

const reloadScalar = () => {
  console.log('reload scalar')

  scalarLoading.value = true
  const args = {
    uuid: props.uuid,
    gets: [props.timeline]
  }

  socket.emit("get_scalar", args, (data: {}) => {
    scalars.value = <{ train: ScalarGroup[], test: ScalarGroup[] }>data
    onInitReady.value = true
    scalarLoading.value = false
  })
}

const removeOutliers = (data: number[]) => {
  const mean = data.reduce((a, b) => a + b) / data.length
  const std = Math.sqrt(data.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / data.length)
  return <[number[], number]>[data.map((value) => {
    return value > mean + std * 2 || value < mean - std * 2 ? undefined : value
  }), std]
}

const calculateMeans = (data: number[]) => {
  const [outliersRemoved, std] = removeOutliers(data)  // TODO: 到底要不要移除 outlier
  const means: number[] = []
  let sum = 0
  let count = 1
  outliersRemoved.forEach((value, index) => {
    if (value != undefined) {
      sum += value
      means.push(sum / count)
      count ++
    } else {
      means.push(undefined)
    }
  })
  return means
}

const generateScalar = (step: number[], data: number[], type: string = 'default') => {
  const datas = []
  datas.push({
    x: step,
    y: props.showOutliers ? data : removeOutliers(data)[0],
    mode: type == 'default' ? 'lines' : 'markers',
    name: 'value'
  })
  if (type == 'dot') {
    datas.push({
      x: step,
      y: calculateMeans(data),
      mode: 'lines',
      line: {
        color: 'red'
      },
      name: 'mean'
    })
  }
  return datas
}

onMounted(() => {
  reloadScalar()
})

</script>

<template>
  <ThePlaceholder :lines="3" v-if="!onInitReady" class="u-top-spaced" />
  <details class="ts-accordion u-top-spaced" v-for="group in scalars[timeline]" :key="group.group">
    <summary>{{ group.group }}</summary>
    <div class="ts-box u-top-spaced" v-for="scalar in group.data" :key="scalar.tag">
      <div class="ts-content is-fitted">
        <VuePlotly
          :data="generateScalar(group.step, scalar.value, scalar.tag.startsWith('env/roi') ? 'dot' : 'default')"
          :layout="{template: template, title: scalar.tag }"
          :config="{ modeBarButtonsToAdd: [
            {
              name: 'refresh',
              icon: Plotly.Icons.undo,
              click: reloadScalar
            }
          ] }"/>
        <div id="test"></div>
      </div>
      <div class="ts-mask has-cursor-not-allowed" v-if="scalarLoading">
        <div class="ts-center">
          <div class="ts-loading is-large"></div>
        </div>
      </div>
    </div>
  </details>
</template>
