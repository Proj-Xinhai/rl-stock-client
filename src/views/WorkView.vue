<script setup lang="ts">
import { state, socket, type Task, type Work, type ScalarGroup } from '@/socket'
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
  evaluation: [],
  date: ''
})
const now = ref<number>(Date.now() / 1000)
const scalars = ref<{ [index: string]: ScalarGroup[] }>({})
const scalarLoading = ref<boolean>(false)

const updateNow = setInterval(() => {
  now.value = Date.now() / 1000
}, 1000)

const load = () => {
  if (state.tasks.length != 0 && state.works.length != 0) {
    task.value = state.tasks.find(({name}) => name == route.currentRoute.value.params.name) as Task
    work.value = state.works.find(({id}) => id == route.currentRoute.value.params.id) as Work
  }
}

const reloadScalar = () => {

  scalarLoading.value = true
  const args = {
    uuid: route.currentRoute.value.params.id,
    // ignores: <{ [ key: string ]: { [ key: string ]: number } }>{
    //   train: {},
    //   test: {}
    // }
  }

  /*
  if (scalars.value.train !== undefined) {
    for (let group of scalars.value.train) {
      for (let scalar of group.data) {
        args.ignores.train[scalar.tag] = <number>scalar.step.at(-1)
      }
    }
  }

  if (scalars.value.test !== undefined) {
    for (let group of scalars.value.test) {
      for (let scalar of group.data) {
        args.ignores.test[scalar.tag] = <number>scalar.step.at(-1)
      }
    }
  }
   */

  socket.emit("get_scalar", args, (data: {}) => {
    scalars.value = <{ train: ScalarGroup[], test: ScalarGroup[] }>data
    scalarLoading.value = false
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
  reloadScalar()
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
  <div class="ts-header is-huge">
    <span class="has-cursor-pointer" @click="route.push({ name: 'task', params: { name: work.task_name } })">{{ work.task_name }}</span>
  </div>
  <span class="ts-text is-code">#{{ work.id }}</span>

  <div class="ts-timeline u-top-spaced">
    <template v-for="timeline in work.timeline" :key="timeline.name">
      <div class="item" :class="{ 'is-negative': timeline.status == -1 }">
        <div class="aside" style="width: 100px">
          <div class="ts-text is-description" v-if="timeline.from !== 0">
            <span v-if="timeline.to == 0">{{ convertTime((now - timeline.from)) }}</span>
            <span v-else>{{ convertTime(timeline.to - timeline.from) }}</span>
          </div>
        </div>
        <div class="indicator">
          <span class="ts-icon"
                :class="{
            'is-xmark-icon': timeline.status == -1,
            'is-plus-icon': timeline.status == 0,
            'is-spinning is-spinner-icon': timeline.status == 1,
            'is-check-icon': timeline.status == 2 }"></span>
        </div>
        <div class="content">
          {{ timeline.name }} <span class="ts-icon is-arrows-rotate-icon has-cursor-pointer" :class="{ 'is-spinning': scalarLoading }" @click="reloadScalar"></span>
          <div class="ts-box u-top-spaced" v-if="timeline.status == -1">
            <div class="ts-content is-tertiary">
              <div class="ts-text is-negative">
                {{ timeline.detail }}
              </div>
            </div>
          </div>
          <details class="ts-accordion u-top-spaced" v-for="group in scalars[<string>timeline.name]" :key="group.group">
            <summary>{{ group.group }}</summary>
            <div class="ts-box u-top-spaced" v-for="scalar in group.data" :key="scalar.tag">
              <div class="ts-content is-fitted">
                <VuePlotly :data="[{x: scalar.step, y: scalar.value}]" :layout="{template: template, title: scalar.tag }" />
                <div id="test"></div>
              </div>
            </div>
          </details>
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
      <div class="content">
        <span class="ts-text" :class="{ 'is-negative': work.status == -1}">{{ work.detail }}</span>
        <div class="ts-box u-top-spaced" v-if="work.evaluation.length != 0">
          <table class="ts-table is-striped is-celled">
            <thead>
              <tr>
                <th colspan="2">evaluation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in work.evaluation" :key="item.name">
                <td class="is-collapsed">{{ item.name }}</td>
                <td>{{ item.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="ts-space is-big"></div>
</template>
