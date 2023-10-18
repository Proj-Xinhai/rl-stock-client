<script setup lang="ts">
import TheTaskRemover from "@/components/TheTaskRemover.vue"
import TheTaskExporter from "@/components/TheTaskExporter.vue"
import TheTaskCopier from "@/components/TheTaskCopier.vue"
import { onMounted, ref, watch } from "vue";
import { state, type Task } from "@/socket"
import { useRouter } from "vue-router"

const router = useRouter()

const tasks = ref<Task[]>([])
const sortBy = ref<string>('Create At')
const sortDirection = ref<number>(-1) // -1: desc, 1: asc

const sort = (col: string) => {
  // console.log('sort')
  if (col !== "Create At") sort("Create At") // if not sorted by Create At, sort by Create At first
  if (sortBy.value !== col) {
    sortDirection.value = -1
  }
  sortBy.value = col
  tasks.value = tasks.value.slice().sort((a, b) => {
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

onMounted(() => {
  tasks.value = state.tasks
  sort(sortBy.value)
})

watch (state, (newVal) => {
  tasks.value = newVal.tasks
  sort(sortBy.value)
})

</script>

<template>
  <div class="ts-box u-top-spaced">
    <table class="ts-table is-celled is-single-line">
      <thead>
      <tr class="has-cursor-pointer">
        <th v-for="col in ['Name', 'Algorithm', 'Create At']" @click="sortDirection *= -1; sort(col)">
          {{ col }} <span class="ts-icon" :class="{ 'is-sort-down-icon': sortDirection == -1, 'is-sort-up-icon': sortDirection == 1 }" v-if="sortBy == col"></span>
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-for="task in tasks" :key="task.name">
        <tr class="has-cursor-pointer" :data-toggle="task.name+':has-hidden'" @dblclick="router.push({ name: 'task', params: { name: task.name } })">
          <td>{{ task.name }}</td>
          <td class="is-collapsed">{{ task.args.algorithm }}</td>
          <td class="is-collapsed">{{ task.date }}</td>
        </tr>
        <tr class="has-hidden" :data-name="task.name">
          <td class="is-secondary is-padded is-insetted" colspan="3">
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
      </template>
      </tbody>
    </table>
  </div>
</template>
