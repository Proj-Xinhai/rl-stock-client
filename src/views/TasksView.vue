<script setup lang="ts">
import { state, type Task } from "@/socket"
import { onMounted, ref, watch } from 'vue'
import TheTasksList from "@/components/TheTasksList.vue"

const tasks = ref<Task[]>([])

onMounted(() => {
  tasks.value = state.tasks
})

watch (state, (newVal) => {
  tasks.value = newVal.tasks
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
  <TheTasksList />
</template>