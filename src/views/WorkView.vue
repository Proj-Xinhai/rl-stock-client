<script setup lang="ts">
import { state, socket, type Task, type Work, type ScalerGroup } from '@/socket'
import { onMounted, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRouter } from "vue-router"
import { template } from "@/ploty"
import { VuePlotly } from '@clalarco/vue3-plotly'


const route = useRouter()

const task = ref<Task>({
  name: '',
  args: {
    name: '',
    algorithm: '',
    algorithm_args: '',
    learn_args: '',
    helper: ''
  },
  date: '',
  data_example: '',
  preprocess_example: ''
})
const work = ref<Work>({
  id: '',
  task_name: '',
  status: 0,
  detail: '',
  timeline: [],
  date: ''
})
const now = ref<number>(Date.now() / 1000)
const scalers = ref<{ [index: string]: ScalerGroup[] }>({})
const scalerLoading = ref<boolean>(false)

const updateNow = setInterval(() => {
  now.value = Date.now() / 1000
}, 1000)

const load = () => {
  if (state.tasks.length != 0 && state.works.length != 0) {
    task.value = state.tasks.find(({name}) => name == route.currentRoute.value.params.name) as Task
    work.value = state.works.find(({id}) => id == route.currentRoute.value.params.id) as Work
  }
}

const reloadScaler = () => {
  scalerLoading.value = true
  socket.emit("get_scaler", route.currentRoute.value.params.id, (data: {}) => {
    scalers.value = <{ train: ScalerGroup[], test: ScalerGroup[] }>data
    scalerLoading.value = false
  })
}

const convertTime = (seconds: number) => {
  const sec = Math.floor(seconds % 60)
  const min = Math.floor((seconds / 60) % 60)
  const hour = Math.floor((seconds / 60 / 60) % 24)

  return `${hour}h ${min}m ${sec}s`
}

onMounted(() => {
  load()
  reloadScaler()
})

onBeforeRouteLeave((to, from, next) => {
  clearInterval(updateNow)
  next()
})

watch (state, () => {
  load()
})
</script>

<template>
  <div class="ts-header is-huge has-cursor-pointer" @click="route.push({ name: 'task', params: { name: work.task_name } })">{{ work.task_name }}</div>
  <span class="ts-text is-code">#{{ work.id }}</span>

  <div class="ts-timeline u-top-spaced">
    <template v-for="timeline in work.timeline" :key="timeline.name">
      <div class="item" :class="{ 'is-negative': timeline.status == -1 || (timeline.status == 1 && work.status == -1)}">
        <div class="aside" style="width: 100px">
          <div class="ts-text is-description" v-if="timeline.from !== 0 && !(timeline.status == 1 && work.status == -1)">
            <span v-if="timeline.to == 0">{{ convertTime((now - timeline.from)) }}</span>
            <span v-else>{{ convertTime(timeline.to - timeline.from) }}</span>
          </div>
        </div>
        <div class="indicator">
          <span class="ts-icon"
                :class="{
            'is-xmark-icon': timeline.status == -1 || (timeline.status == 1 && work.status == -1),
            'is-plus-icon': timeline.status == 0,
            'is-spinning is-spinner-icon': timeline.status == 1 && work.status !== -1,
            'is-check-icon': timeline.status == 2 }"></span>
        </div>
        <div class="content">
          {{ timeline.name }} <span class="ts-icon is-arrows-rotate-icon has-cursor-pointer" :class="{ 'is-spinning': scalerLoading }" @click="reloadScaler"></span>
          <div class="ts-box u-top-spaced" v-if="timeline.status == 1 && work.status == -1">
            <div class="ts-content is-tertiary">
              <div class="ts-text is-negative">
                {{ timeline.detail }}
                {{ work.detail }}
              </div>
            </div>
          </div>
          <details class="ts-accordion u-top-spaced" v-for="group in scalers[<string>timeline.name]" :key="group.group">
            <summary>{{ group.group }}</summary>
            <div class="ts-box u-top-spaced" v-for="scaler in group.data" :key="scaler.tag">
              <div class="ts-content is-fitted">
                <VuePlotly :data="[{x: scaler.step, y: scaler.value}]" :layout="{template: template, title: scaler.tag }" />
                <div id="test"></div>
              </div>
            </div>
          </details>
          <div class="ts-content is-rounded is-secondary has-top-spaced" v-if="timeline.detail != ''">
            {{ timeline.detail }}
          </div>
        </div>
      </div>
    </template>
    <div class="item" :class="{ 'is-negative': work.status == -1}">
      <div class="aside"></div>
      <div class="indicator">
        <span class="ts-icon"
              :class="{
            'is-xmark-icon': work.status == -1,
            'is-plus-icon': work.status == 0,
            'is-spinning is-spinner-icon': work.status == 1,
            'is-check-icon': work.status == 2 }"></span>
      </div>
      <div class="content"><span class="ts-text" :class="{ 'is-negative': work.status == -1}">{{ work.detail }}</span></div>
    </div>
  </div>
  <div class="ts-space is-big"></div>
</template>
