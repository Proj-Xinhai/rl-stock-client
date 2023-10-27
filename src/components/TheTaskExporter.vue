<script setup lang="ts">
import {socket, state, type Task} from "@/socket";

const props = defineProps<{
  taskName: string
  wrapper: 'link' | 'button'
}>()

const exporter = (taskNames: string[]) => {
  const taskName = taskNames.shift()
  socket.emit('export_task', taskName, (status: boolean, msg: string, data: string | Task) => {
    if (!status) {
      alert(`${msg}: ${data}`)
      state.loading = false
      return
    }
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    Object.assign(document.createElement('a'), {
      href: url,
      download: `${taskName}.rlstask`
    }).click()
    window.URL.revokeObjectURL(url)
    if (taskNames.length > 0) {
      exporter(taskNames)
    } else {
      state.loading = false
    }
  })
}

const exportTask = () => {
  state.loading = true
  exporter(props.taskName.split(","))
}
</script>

<template>
  <button v-if="wrapper == 'button'" class="ts-button is-outlined" @click="exportTask">Export</button>
  <button v-else class="item" @click="exportTask">Export</button>
</template>
