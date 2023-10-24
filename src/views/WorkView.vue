<script setup lang="ts">
import { state, type Task, type Work } from '@/socket'
import { onMounted, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRouter } from "vue-router"
import TheScalars from "@/components/TheScalars.vue"
import TheWorkExporter from "@/components/TheWorkExporter.vue"

const router = useRouter()

const task = ref<Task>({
  name: '',
  args: {
    name: '',
    algorithm: '',
    algorithm_args: {},
    learn_args: {},
    data_locator: '',
    environment: '',
    random_state: ''
  },
  date: '',
  data_example: '',
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
const loaded = ref<boolean>(true)
const showOutlier = ref<boolean>(false)

const load = () => {
  if (state.tasks.length != 0 && state.works.length != 0) {
    task.value = state.tasks.find(({name}) => name == router.currentRoute.value.params.name) as Task || task.value
    work.value = state.works.find(({id}) => id == router.currentRoute.value.params.id) as Work || work.value
  }
  loaded.value = !state.loading && state.connected
}

const updateNow = setInterval(() => {
  now.value = Date.now() / 1000
}, 1000)

const convertTime = (seconds: number) => {
  const zeroPad = (num: number) => String(num).padStart(2, '0')

  const sec = Math.floor(seconds % 60)
  const min = Math.floor((seconds / 60) % 60)
  const hour = Math.floor((seconds / 60 / 60) % 24)

  return `${zeroPad(hour)}h ${zeroPad(min)}m ${zeroPad(sec)}s`
}

onMounted(() => {
  load()
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
  <template v-if="work.id !== ''">
    <div class="ts-wrap is-middle-aligned">
      <div>
        <div class="ts-header is-huge">
          <span class="has-cursor-pointer" @click="router.push({ name: 'task', params: { name: work.task_name } })">{{ work.task_name }}</span>
        </div>
        <span class="ts-text is-code">#{{ work.id }}</span>
      </div>
      <TheWorkExporter wrapper="button" :work-id="work.id" :disabled="work.status !== 2" />
    </div>

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
            {{ timeline.name }}
            <div class="ts-box u-top-spaced" v-if="timeline.status == -1">
              <div class="ts-content is-tertiary">
                <div class="ts-text is-negative">
                  {{ timeline.detail }}
                </div>
              </div>
            </div>
            <TheScalars :uuid="<string>router.currentRoute.value.params.id" :timeline="timeline.name" :timeline-status="timeline.status" />
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
  </template>
  <template v-else>
    <div class="ts-content is-center-aligned is-middle-aligned is-vertically-padded" v-show="loaded">
      <div class="ts-header is-icon has-bottom-spaced">
        <span class="ts-icon is-circle-exclamation-icon"></span>
        404 Not Found
      </div>
      The work you are looking for does not exist.
    </div>
  </template>
</template>
