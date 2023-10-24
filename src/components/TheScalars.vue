<script setup lang="ts">
import { onMounted, ref } from "vue";
import { template } from "@/ploty"
import { VuePlotly } from '@clalarco/vue3-plotly'
import Plotly from 'plotly.js-basic-dist'
import { type ScalarGroup, type Scalar, socket } from "@/socket"
import ThePlaceholder from "@/components/ThePlaceholder.vue"
import TheScalar from "@/components/TheScalar.vue";

const props = defineProps<{
  uuid: string
  timeline: string
  showOutliers: boolean
}>()

const scalars = ref<ScalarGroup[]>([])
const onInitReady = ref<boolean>(false)
const scalarLoading = ref<boolean>(false)

const reloadScalar = () => {
  console.log('reload scalar')

  scalarLoading.value = true
  const args = {
    uuid: props.uuid,
    gets: [props.timeline]
  }

  socket.emit("get_scalar", args, (data: { [index: string]: ScalarGroup[] }) => {
    if (data[props.timeline]) {
      scalars.value = data[props.timeline]
      // TODO: Update scalar
      // scalars.value.forEach((group: ScalarGroup) => {
      //   group.data.forEach((scalar: Scalar) => {
      //     scalar.scalar = generateScalar(group.step, scalar.value, scalar.tag.startsWith('env/roi') ? 'dot' : 'default')
      //   })
      // })
    }
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
  const means: number[] = []
  let sum = 0
  let count = 1
  data.forEach((value, index) => {
    if (value != undefined) {
      sum += value
      means.push(sum / count)
      count ++
    } else {
      means.push(NaN)
    }
  })
  return means
}

const generateScalar = (step: number[], data: number[], type: string = 'default') => {
  const datas = {
    showOutliers: <any>[],
    hideOutliers: <any>[]
  }
  const [outliersRemoved, std] = removeOutliers(data)
  datas.showOutliers.push({
    type: 'scattergl',
    x: step,
    y: data,
    mode: type == 'default' ? 'lines' : 'markers',
    name: 'value'
  })
  datas.hideOutliers.push({
    type: 'scattergl',
    x: step,
    y: outliersRemoved,
    mode: type == 'default' ? 'lines' : 'markers',
    name: 'value'
  })
  if (type == 'dot') {
    datas.showOutliers.push({
      type: 'scattergl',
      x: step,
      y: calculateMeans(data),
      mode: 'lines',
      line: {
        color: 'red'
      },
      name: 'mean'
    })
    datas.hideOutliers.push({
      type: 'scattergl',
      x: step,
      y: calculateMeans(outliersRemoved),
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
  <ThePlaceholder :lines="3" v-show="!onInitReady" class="u-top-spaced" />
  <div style="position: absolute; top: 50px; left: -145px; height: 100%" v-show="scalars.length > 0">
    <button class="ts-button is-circular is-outlined" style="position: sticky; top: 20px" @click="reloadScalar">refresh</button>
  </div>
  <template v-for="(group, index) in scalars" :key="index" v-show="scalars.length > 0">
    <details class="ts-accordion u-top-spaced">
      <summary>{{ group.group }}</summary>
      <div class="ts-box u-top-spaced" v-for="scalar in group.data" :key="scalar.tag">
        <div class="ts-content is-fitted">
          <TheScalar :timeline="timeline" :title="scalar.tag" :x="group.step" :y="scalar.value" />
          <div class="ts-mask has-cursor-not-allowed" v-show="scalarLoading">
            <div class="ts-center">
              <div class="ts-loading is-large"></div>
            </div>
          </div>
        </div>
      </div>
    </details>
  </template>
  <!--
  <ThePlaceholder :lines="3" v-show="!onInitReady" class="u-top-spaced" />
  <lazy-component v-for="(group, index) in scalars" :key="index" v-show="scalars.length > 0">
    <details class="ts-accordion u-top-spaced">
      <summary>{{ group.group }}</summary>
      <div class="ts-box u-top-spaced" v-for="scalar in group.data" :key="scalar.tag">
        <lazy-component class="ts-content is-fitted">
          <VuePlotly
              :data="scalar.scalar[props.showOutliers ? 'showOutliers' : 'hideOutliers']"
              :layout="{ template: template, title: scalar.tag }"
              :config="{ modeBarButtonsToAdd: [
            {
              name: 'refresh',
              icon: Plotly.Icons.undo,
              click: reloadScalar
            }
          ] }"/>
        </lazy-component>
        <div class="ts-mask has-cursor-not-allowed" v-show="scalarLoading">
          <div class="ts-center">
            <div class="ts-loading is-large"></div>
          </div>
        </div>
      </div>
    </details>
  </lazy-component>
  -->
</template>
