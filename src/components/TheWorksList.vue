<script setup lang="ts">
import { state, type Task, type Work } from "@/socket"
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  task?: string
}>()

const router = useRouter()

const tasks = ref<Task[]>([])
const works = ref<Work[]>([])
const sortBy = ref<string>('Create At')
const sortDirection = ref<number>(-1) // -1: desc, 1: asc

const status: { [key: string]: string } = {
  '0': 'pending',
  '1': 'running',
  '2': 'complete',
  '-1': 'failed'
}

const sort = (col: string, force: boolean = false) => {
  if (force) {
    if (sortBy.value != col) sortDirection.value = -1 // if sort column changed, reset sort direction
    else sortDirection.value *= -1
    sortBy.value = col
  }
  works.value = works.value.slice().sort((a, b) => {
    return a.date > b.date ? sortDirection.value : -sortDirection.value
  }).slice().sort((a, b) => {
    if (sortBy.value == 'id') {
      return a.id > b.id ? sortDirection.value : -sortDirection.value
    } else if (sortBy.value == 'task_name') {
      return a.task_name > b.task_name ? sortDirection.value : -sortDirection.value
    } else if (sortBy.value == 'Status') {
      return a.status > b.status ? sortDirection.value : -sortDirection.value
    } else if (sortBy.value == 'Create At') {
      return a.date > b.date ? sortDirection.value : -sortDirection.value
    } else {
      return 0
    }
  })
}

const load = () => {
  tasks.value = state.tasks
  works.value = state.works
  if (props.task != undefined) {
    works.value = works.value.filter(({task_name}) => task_name == props.task)
  }
  sort(sortBy.value)
}

onMounted(() => {
  load()
})

watch (state, () => {
  load()
})
</script>

<template>
  <div class="ts-box u-top-spaced">
    <table class="ts-table is-celled is-single-line">
      <thead>
      <tr>
        <th v-for="col in ['id', 'task_name', 'Status', 'Create At']" @click="sort(col, true)">
          {{ col }} <span class="ts-icon" :class="{ 'is-sort-down-icon': sortDirection == -1, 'is-sort-up-icon': sortDirection == 1 }" v-if="sortBy == col"></span>
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-for="work in works" :key="work.id">
        <tr class="has-cursor-pointer" @click="router.push({ name: 'work', params: { id: work.id } })">
          <td class="is-center-aligned is-collapsed">{{ work.id }}</td>
          <td>{{ work.task_name }}</td>
          <td class="is-center-aligned is-collapsed"
              :class="{ 'is-indicated': work.status !== 0,'is-positive': work.status == 2, 'is-negative': work.status == -1 }">
            {{ status[work.status] }}
          </td>
          <td class="is-center-aligned is-collapsed">{{ work.date }}</td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>
