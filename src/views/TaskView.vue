<script setup lang="ts">
import { state, socket, type Task } from '@/socket'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Papa from 'papaparse'
import TheTaskExporter from "@/components/TheTaskExporter.vue"
import TheTaskCopier from "@/components/TheTaskCopier.vue"
import TheTaskRemover from "@/components/TheTaskRemover.vue"
import TheWorksList from "@/components/TheWorksList.vue"

const router = useRouter()

const task = ref<Task>({
  name: '',
  args: {
    name: '',
    algorithm: '',
    algorithm_args: {},
    learn_args: {},
    data_locator: '',
    random_state: ''
  },
  date: '',
  data_example: ''
})

const task_name = ref<string>('')
const algorithm = ref<string>('')
const algorithm_args = ref<string>('')
const learn_args = ref<string>('')
const data_example = ref<string[]>([])
const random_state = ref<string>('')

const loaded = ref<boolean>(true)

const num_work = ref<number>(1)
const view_modal = ref<boolean>(false)

const loadTask = () => {
  if (state.tasks.length != 0) {
    task.value = state.tasks.find(({name}) => name == router.currentRoute.value.params.name) as Task || task.value
    task_name.value = task.value.name
    algorithm.value = task.value.args.algorithm
    algorithm_args.value = task.value.args.algorithm_args as unknown as string
    learn_args.value = task.value.args.learn_args as unknown as string
    data_example.value = Papa.parse<string>(task.value.data_example, {skipEmptyLines: true}).data
    random_state.value = task.value.args.random_state
  }
  loaded.value = !state.loading && state.connected
  console.log(loaded.value)
}

const createWork = () => {
  socket.emit("create_work", {
    task_name: task_name.value,
    num_work: num_work.value
  }, (status: boolean, msg: string, detail: string) => {
    if (status) {
      // router.push({ name: 'works' })
      view_modal.value = false
    } else {
      alert(`create work failed: ${detail}`)
    }
  })
}

onMounted(() => {
  loadTask()
})

watch (state, () => {
  loadTask()
})
</script>

<template>
  <template v-if="task_name !== ''">
    <div class="ts-wrap is-middle-aligned">
      <div class="ts-header is-huge">{{ task_name }}</div>
      <div class="ts-wrap is-compact">
        <TheTaskRemover :task-name="task_name" wrapper="button" />
        <TheTaskExporter :task-name="task_name" wrapper="button" />
        <TheTaskCopier :task-name="task_name" wrapper="button" />
      </div>
    </div>
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
    <details class="ts-accordion" open>
      <summary>random_state</summary>
      <span class="ts-text is-secondary">{{ random_state ? random_state : "None" }}</span>
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
    <div class="ts-grid is-end-aligned u-top-spaced">
      <button class="ts-button" @click="view_modal = true">Create new work</button>
    </div>
    <TheWorksList :task="<string>router.currentRoute.value.params.name" />

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
  </template>
  <template v-else>
    <div class="ts-content is-center-aligned is-middle-aligned is-vertically-padded" v-show="loaded">
      <div class="ts-header is-icon has-bottom-spaced">
        <span class="ts-icon is-circle-exclamation-icon"></span>
        404 Not Found
      </div>
      The task you are looking for does not exist.
    </div>
  </template>

</template>