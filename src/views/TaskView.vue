<script setup lang="ts">
import { state, socket, type Task, type Work } from '@/socket'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Papa from 'papaparse'

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
const works = ref<Work[]>([])

const task_name = ref<string>('')
const algorithm = ref<string>('')
const algorithm_args = ref<string>('')
const learn_args = ref<string>('')
const data_example = ref<string[]>([])
const preprocess_example = ref<string[]>([])

const num_work = ref<number>(1)
const view_modal = ref<boolean>(false)

const status: { [key: string]: string } = {
  '0': 'pending',
  '1': 'running',
  '2': 'complete',
  '-1': 'failed'
}

const loadTask = () => {
  if (state.tasks.length != 0) {
    task.value = state.tasks.find(({name}) => name == route.currentRoute.value.params.name) as Task
    task_name.value = task.value.name
    algorithm.value = task.value.args.algorithm
    algorithm_args.value = task.value.args.algorithm_args
    learn_args.value = task.value.args.learn_args
    data_example.value = Papa.parse<string>(task.value.data_example, {skipEmptyLines: true}).data
    preprocess_example.value = Papa.parse<string>(task.value.preprocess_example, {skipEmptyLines: true}).data
  }
}

const loadWork = () => {
  works.value = state.works
  works.value.sort((a, b) => {
    return a.date > b.date ? -1 : 1
  })
  works.value = works.value.filter((work) => work.task_name == task_name.value)
}

const createWork = () => {
  socket.emit("create_work", {
    task_name: task_name.value,
    num_work: num_work.value
  }, (status: boolean, msg: string, detail: string) => {
    if (status) {
      // route.push({ name: 'works' })
      view_modal.value = false
    } else {
      alert(`create work failed: ${detail}`)
    }
  })
}

onMounted(() => {
  loadTask()
  loadWork()
})

watch (state, () => {
  loadTask()
  loadWork()
})
</script>

<template>
  <div class="ts-header is-huge">{{ task_name }}</div>
  <div class="ts-space"></div>
  <details class="ts-accordion" open>
    <summary>algorithm: {{ algorithm }}</summary>
    <span class="ts-text is-secondary">{{ algorithm_args }}</span>
  </details>
  <div class="ts-space"></div>
  <details class="ts-accordion" open>
    <summary>learn</summary>
    <span class="ts-text is-secondary">{{ learn_args }}</span>
  </details>
  <div class="ts-space"></div>
  <details class="ts-accordion">
    <summary>data</summary>
    <div class="ts-box">
      <table class="ts-table is-definition" style="display: block; overflow-x: auto">
        <thead>
          <tr>
            <th v-for="(col, i) in data_example[0]" :key="i">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="(row, i) in data_example.slice(1)" :key="i">
          <td class="is-center-aligned is-middle-aligned" v-for="(col, j) in row" :key="j">{{ col }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </details>
  <div class="ts-space"></div>
  <details class="ts-accordion">
    <summary>preprocess</summary>
    <div class="ts-box">
      <table class="ts-table is-definition" style="display: block; overflow-x: auto">
        <thead>
        <tr>
          <th v-for="(col, i) in preprocess_example[0]" :key="i">{{ col }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, i) in preprocess_example.slice(1)" :key="i">
          <td class="is-center-aligned is-middle-aligned" v-for="(col, j) in row" :key="j">{{ col }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </details>
  <div class="ts-space"></div>
  <div class="ts-grid is-end-aligned u-top-spaced">
    <button class="ts-button" @click="view_modal = true">Create new work</button>
  </div>
  <div class="ts-box u-top-spaced">
    <table class="ts-table is-celled is-single-line">
      <thead>
      <tr>
        <th class="is-collapsed">id</th>
        <th>task_name</th>
        <th class="is-collapsed">Status</th>
        <th class="is-collapsed">Create At <span class="ts-icon is-sort-down-icon"></span></th>
      </tr>
      </thead>
      <tbody>
      <template v-for="work in works" :key="work.id">
        <tr class="has-cursor-pointer" @click="route.push({ name: 'work', params: { id: work.id } })">
          <td class="is-center-aligned">{{ work.id }}</td>
          <td>{{ work.task_name }}</td>
          <td class="is-center-aligned"
              :class="{ 'is-indicated': work.status !== 0,'is-positive': work.status == 2, 'is-negative': work.status == -1 }"
              :data-tooltip="work.detail">
            {{ status[work.status] }}
          </td>
          <td class="is-center-aligned">{{ work.date }}</td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>

  <div class="ts-app-drawer is-right is-small" :class="{ 'is-visible': view_modal }">
    <div class="content">
      <div class="ts-content">
        <div class="ts-header is-large">Create new work</div>
        <div class="ts-text is-secondary has-top-spaced">num_work</div>
        <div class="ts-input is-underlined has-top-spaced">
          <input type="number" min="1" v-model="num_work">
        </div>
        <div class="ts-wrap is-end-aligned has-top-spaced-big">
          <button class="ts-button is-outlined" @click="view_modal = false">Cancel</button>
          <button class="ts-button" @click="createWork">Create</button>
        </div>
      </div>
    </div>
  </div>
  <!--
  <div class="ts-modal" :class="{ 'is-visible': view_modal }">
    <div class="content">
      <div class="ts-content">
        <div class="ts-header">Create {{ num_work }} work of {{ task_name }}</div>
      </div>
      <div class="ts-divider"></div>
      <div class="ts-content">
        <div class="ts-input">
          <input type="number" min="1" v-model="num_work">
        </div>
      </div>
      <div class="ts-divider"></div>
      <div class="ts-content is-tertiary">
        <div class="ts-wrap is-end-aligned">
          <button class="ts-button is-outlined" @click="view_modal = false">Cancel</button>
          <button class="ts-button" @click="createWork">Create</button>
        </div>
      </div>
    </div>
  </div>
  -->
</template>