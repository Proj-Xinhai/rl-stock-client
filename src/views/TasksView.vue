<script setup lang="ts">
import { state, socket, type Task } from "@/socket"
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import TheConfirm from "@/components/TheConfirm.vue"

const route = useRouter()

const tasks = ref<Task[]>([])
const confirm = ref<string>('')

const removeTask = (name: string) => {
  state.loading = true
  socket.emit('remove_task', name, (status: boolean, msg: string, detail: string) => {
    if (!status) alert(`${msg}: remove task ${name} failed: ${detail}`)
    confirm.value = ''
    state.loading = false
  })
}

onMounted(() => {
  tasks.value = state.tasks
  tasks.value.sort((a, b) => {
    return a.date > b.date ? -1 : 1
  })
})

watch (state, (newVal) => {
  tasks.value = newVal.tasks
  tasks.value.sort((a, b) => {
    return a.date > b.date ? -1 : 1
  })
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
      <tr>
        <th>Name</th>
        <th class="is-collapsed">Algorithm</th>
        <th class="is-collapsed">Create At <span class="ts-icon is-sort-down-icon"></span></th>
      </tr>
      </thead>
      <tbody>
      <template v-for="task in tasks" :key="task.name">
        <tr class="has-cursor-pointer" :data-toggle="task.name+':has-hidden'" @dblclick="route.push({ name: 'task', params: { name: task.name } })">
          <td>{{ task.name }}</td>
          <td>{{ task.args.algorithm }}</td>
          <td>{{ task.date }}</td>
        </tr>
        <tr class="has-hidden" :data-name="task.name">
          <td class="is-secondary is-padded is-insetted" colspan="3">
            <div class="ts-grid">
              <div class="column">
                algorithm: {{ task.args.algorithm }} {{ task.args.algorithm_args }}<br />
                learn: {{ task.args.learn_args }}<br />
                helper: {{ task.args.helper }}<br />
              </div>
              <div class="column is-fluid is-end-aligned">
                <router-link class="ts-text is-link" :to="{ name: 'task', params: { name: task.name }}">manage</router-link>
                <a class="ts-text is-link has-cursor-pointer" @click="confirm = task.name">remove</a>
              </div>
            </div>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
  <TheConfirm title="Confirm removal"
              accent="negative"
              :message="`You are about to remove task \`${confirm}\``"
              :check="confirm"
              :confirm="() => removeTask(confirm)"
              :cancel="() => confirm = ''"
              v-if="confirm !== ''" />
</template>