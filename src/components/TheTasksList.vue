<script setup lang="ts">
import TheTaskRemover from "@/components/TheTaskRemover.vue"
import TheTaskExporter from "@/components/TheTaskExporter.vue"
import TheTaskCopier from "@/components/TheTaskCopier.vue"
import { onMounted, ref, watch } from "vue";
import { state, type Task } from "@/socket"
import { useRouter } from "vue-router"

const router = useRouter()

const tasksSelected = ref<string[]>([])
const complexSelectedStatus = ref<boolean>(false)

const complexSelected = async () => {
  if (tasksSelected.value.length == tasks.value.length) {
    tasksSelected.value = []
  } else {
    tasksSelected.value = tasks.value.map(({name}) => name)
  }
  setTimeout(() => {
    complexSelectedStatus.value = tasksSelected.value.length > 0
  }, 0)
}

const tasks = ref<Task[]>([])
const sortBy = ref<string>('Create At')
const sortDirection = ref<number>(-1) // -1: desc, 1: asc

const sort = (col: string, force: boolean = false) => {
  if (force) {
    if (sortBy.value != col) sortDirection.value = -1 // if sort column changed, reset sort direction
    else sortDirection.value *= -1
    sortBy.value = col
  }
  tasks.value = tasks.value.slice().sort((a, b) => {
    return a.date > b.date ? sortDirection.value : -sortDirection.value
  }).slice().sort((a, b) => {
    if (sortBy.value == 'Name') {
      return a.name > b.name ? sortDirection.value : -sortDirection.value
    } else if (sortBy.value == 'Algorithm') {
      return a.args.algorithm > b.args.algorithm ? sortDirection.value : -sortDirection.value
    } else if (sortBy.value == 'Create At') {
      return a.date > b.date ? sortDirection.value : -sortDirection.value
    } else {
      return 0
    }
  })
}

const load = () => {
  tasks.value = state.tasks
  sort(sortBy.value)
}

onMounted(() => {
  load()
})

watch (state, () => {
  load()
})

watch (tasksSelected, () => {
  complexSelectedStatus.value = tasksSelected.value.length > 0
})

watch (tasks, () => {
  // if tasks are removed, remove selected tasks
  tasksSelected.value = tasksSelected.value.filter((taskName) => tasks.value.map(({name}) => name).includes(taskName))
})

</script>

<template>
  <div class="ts-wrap is-compact is-middle-aligned">
    <TheTaskRemover :task-name="tasksSelected.join(',')" wrapper="button" v-if="complexSelectedStatus" />
    <TheTaskExporter :task-name="tasksSelected.join(',')" wrapper="button" v-if="complexSelectedStatus" />
    <span class="ts-text is-secondary u-start-spaced" v-if="tasksSelected.length > 0">{{ tasksSelected.length }} selected</span>
    <button class="ts-button" style="visibility: hidden" @click="console.log('てへぺろ')"></button><!-- This is placeholder -->
  </div>
  <div class="ts-box u-top-spaced">
    <table class="ts-table is-celled is-single-line">
      <thead>
      <tr class="has-cursor-pointer">
        <th class="is-collapsed is-compact">
          <label class="ts-checkbox is-solo" :class="{ 'is-indeterminate': tasksSelected.length > 0 && tasksSelected.length !== tasks.length }">
            <input type="checkbox" @click="complexSelected" v-model="complexSelectedStatus" />
          </label>
        </th>
        <th v-for="col in ['Name', 'Algorithm', 'Create At']" @click="sort(col, true)">
          {{ col }} <span class="ts-icon" :class="{ 'is-sort-down-icon': sortDirection == -1, 'is-sort-up-icon': sortDirection == 1 }" v-if="sortBy == col"></span>
        </th>
        <th class="is-collapsed"></th>
      </tr>
      </thead>
      <tbody>
      <template v-for="task in tasks" :key="task.name">
        <tr class="has-cursor-pointer"
            @click="router.push({ name: 'task', params: { name: task.name } })">
          <td class="is-compact" @click.stop @dblclick.stop>
            <label class="ts-checkbox is-solo">
              <input type="checkbox" :id="task.name" :value="task.name" v-model="tasksSelected" />
            </label>
          </td>
          <td>
            <span :data-tooltip="`algorithm: ${task.args.algorithm} ${JSON.stringify(task.args.algorithm_args)}
            learn: ${JSON.stringify(task.args.learn_args)}
            helper: ${task.args.helper}`">{{ task.name }}</span>
          </td>
          <td class="is-collapsed">{{ task.args.algorithm }}</td>
          <td class="is-collapsed">{{ task.date }}</td>
          <td colspan="is-compact" @click.stop>
            <span class="ts-icon is-ellipsis-icon" :data-dropdown="'dropdown-'+task.name"></span>
            <div class="ts-dropdown" :data-name="'dropdown-'+task.name">
              <TheTaskRemover :task-name="task.name" wrapper="link" />
              <TheTaskExporter :taskName="task.name" wrapper="link" />
              <TheTaskCopier :task-name="task.name" wrapper="link" />
            </div>
          </td>
        </tr>
        <!--
        <tr class="has-hidden" :data-name="task.name">
          <td class="is-secondary is-padded is-insetted" colspan="4">
            <div class="ts-grid">
              <div class="column">
                algorithm: {{ task.args.algorithm }} {{ task.args.algorithm_args }}<br />
                learn: {{ task.args.learn_args }}<br />
                helper: {{ task.args.helper }}<br />
              </div>
              <div class="column is-fluid is-end-aligned" style="white-space: initial !important">
                <router-link class="ts-text is-link" :to="{ name: 'task', params: { name: task.name }}">manage</router-link>
                <TheTaskRemover :task-name="task.name" wrapper="link" />
                <TheTaskExporter :taskName="task.name" wrapper="link" />
                <TheTaskCopier :task-name="task.name" wrapper="link" />
              </div>
            </div>
          </td>
        </tr>
        -->
      </template>
      </tbody>
    </table>
  </div>
</template>
