<script setup lang="ts">
import { state, type Task } from "@/socket"
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import TheTaskExporter from "@/components/TheTaskExporter.vue"
import TheTaskCopier from "@/components/TheTaskCopier.vue"
import TheTaskRemover from "@/components/TheTaskRemover.vue";

const router = useRouter()

const tasks = ref<Task[]>([])
const sortBy = ref<string>('Create At')
const sortDirection = ref<number>(-1) // -1: desc, 1: asc

const sort = () => {
  console.log('sort')
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
  sort()
})

watch (state, (newVal) => {
  tasks.value = newVal.tasks
  sort()
})
</script>

<template>
  <div class="ts-grid is-relaxed is-3-columns u-top-spaced-large u-bottom-spaced-big">
    <div class="column">
      <div class="ts-box">
        <div class="ts-content">
          <div class="ts-statistic">
            <div class="value">{{ tasks.length }}</div>
          </div>
          tasks
        </div>
        <div class="symbol">
          <span class="ts-icon is-bars-progress-icon"></span>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="ts-box">
        <div class="ts-content">
          <div class="ts-statistic">
            <div class="value">0</div>
          </div>
          complete
        </div>
        <div class="symbol">
          <span class="ts-icon is-check-double-icon"></span>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="ts-box">
        <div class="ts-content">
          <div class="ts-statistic">
            <div class="value">0</div>
          </div>
          failed
        </div>
        <div class="symbol">
          <span class="ts-icon is-circle-exclamation-icon"></span>
        </div>
      </div>
    </div>
  </div>
  <div class="ts-grid is-end-aligned">
    <router-link :to="{ name: 'task-create' }"><button class="ts-button">Create</button></router-link>
  </div>
  <div class="ts-box u-top-spaced">
    <table class="ts-table is-celled is-single-line">
      <thead>
      <tr class="has-cursor-pointer">
        <th v-for="col in ['Name', 'Algorithm', 'Create At']" @click="sortBy = col; sortDirection *= -1; sort()">
          {{ col }} <span class="ts-icon" :class="{ 'is-sort-down-icon': sortDirection == -1, 'is-sort-up-icon': sortDirection == 1 }" v-if="sortBy == col"></span>
        </th>
        <!--
        <th @click="sortBy = 'name'; sortDirection *= -1; sort()">
          Name <span class="ts-icon" :class="{ 'is-sort-down-icon': sortDirection == -1, 'is-sort-up-icon': sortDirection == 1 }" v-if="sortBy == 'name'"></span>
        </th>
        <th @click="sortBy = 'algorithm'; sortDirection *= -1; sort()">
          Algorithm <span class="ts-icon" :class="{ 'is-sort-down-icon': sortDirection == -1, 'is-sort-up-icon': sortDirection == 1 }" v-if="sortBy == 'algorithm'"></span>
        </th>
        <th @click="sortBy = 'date'; sortDirection *= -1; sort()">
          Create At <span class="ts-icon" :class="{ 'is-sort-down-icon': sortDirection == -1, 'is-sort-up-icon': sortDirection == 1 }" v-if="sortBy == 'date'"></span>
        </th>
        -->
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