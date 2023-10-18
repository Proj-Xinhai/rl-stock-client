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

const status: { [key: string]: string } = {
  '0': 'pending',
  '1': 'running',
  '2': 'complete',
  '-1': 'failed'
}

const load = () => {
  tasks.value = state.tasks
  tasks.value.sort((a, b) => {
    return a.date > b.date ? -1 : 1
  })
  works.value = state.works
  if (props.task != undefined) {
    works.value = works.value.filter(({task_name}) => task_name == props.task)
  }
  works.value.sort((a, b) => {
    return a.date > b.date ? -1 : 1
  })
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
        <th class="is-collapsed">id</th>
        <th>task_name</th>
        <th class="is-collapsed">Status</th>
        <th class="is-collapsed">Create At <span class="ts-icon is-sort-down-icon"></span></th>
      </tr>
      </thead>
      <tbody>
      <template v-for="work in works" :key="work.id">
        <tr class="has-cursor-pointer" @click="router.push({ name: 'work', params: { id: work.id } })">
          <td class="is-center-aligned">{{ work.id }}</td>
          <td>{{ work.task_name }}</td>
          <td class="is-center-aligned"
              :class="{ 'is-indicated': work.status !== 0,'is-positive': work.status == 2, 'is-negative': work.status == -1 }">
            {{ status[work.status] }}
          </td>
          <td class="is-center-aligned">{{ work.date }}</td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>
