<script setup lang="ts">
import {socket, state, type Task} from "@/socket";

const props = defineProps<{
  taskName: string
  wrapper: 'link' | 'button'
}>()

const exportTask = () => {
  state.loading = true
  socket.emit('export_task', props.taskName, (data: Task) => {
    state.loading = false
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    Object.assign(document.createElement('a'), {
      href: url,
      download: `${props.taskName}.rlstask`
    }).click()
    window.URL.revokeObjectURL(url)
    state.loading = false
  })
}
</script>

<template>
  <div v-if="wrapper == 'button'">
    <button class="ts-button is-outlined" @click="exportTask">Export</button>
  </div>
  <div v-else>
    <a class="ts-text is-link has-cursor-pointer" @click="exportTask">Export</a>
  </div>
</template>
