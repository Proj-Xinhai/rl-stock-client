<script setup lang="ts">
import { state } from "@/socket"
import { onMounted, ref, watch } from 'vue'
import TheTasksList from "@/components/TheTasksList.vue"

const taskCount = ref<number>(0)
const workCount = ref<number>(0)
const inProgressCount = ref<number>(0)
const completeCount = ref<number>(0)
const failedCount = ref<number>(0)

onMounted(() => {
  taskCount.value = state.tasks.length
  workCount.value = state.works.length
  inProgressCount.value = state.works.filter(({status}) => [0, 1].includes(status)).length
  completeCount.value = state.works.filter(({status}) => status == 2).length
  failedCount.value = state.works.filter(({status}) => status == -1).length
})

watch (state, (newVal) => {
  taskCount.value = newVal.tasks.length
  workCount.value = newVal.works.length
  inProgressCount.value = newVal.works.filter(({status}) => [0, 1].includes(status)).length
  completeCount.value = newVal.works.filter(({status}) => status == 2).length
  failedCount.value = newVal.works.filter(({status}) => status == -1).length
})
</script>

<template>
  <div class="ts-grid is-relaxed is-3-columns u-top-spaced-large u-bottom-spaced-big">
    <div class="column">
      <div class="ts-box">
        <div class="ts-content">
          <div class="ts-statistic">
            <div class="value" style="display: table-cell;">{{ taskCount }} <span class="ts-text is-secondary is-small">/{{ workCount }}</span></div>
          </div>
          tasks <span class="ts-text is-secondary">/works</span>
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
            <div class="value">{{ inProgressCount }}</div>
          </div>
          works in progress
        </div>
        <div class="symbol">
          <span class="ts-icon is-gears-icon"></span>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="ts-box">
        <div class="ts-content">
          <div class="ts-statistic">
            <div class="value" style="display: table-cell;">{{ completeCount }} <span class="ts-text is-secondary is-negative is-small">/{{ failedCount }}</span></div>
          </div>
          complete <span class="ts-text is-secondary is-negative">/failed</span>
        </div>
        <div class="symbol">
          <span class="ts-icon is-check-double-icon"></span>
        </div>
      </div>
    </div>
  </div>
  <div class="ts-grid has-full-width is-end-aligned" style="position: relative; z-index: 1">
    <router-link :to="{ name: 'task-create' }" style="position: absolute"><button class="ts-button">Create</button></router-link>
  </div>
  <TheTasksList />
</template>