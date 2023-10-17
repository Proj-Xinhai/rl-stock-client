<script setup lang="ts">
import {socket, state} from "@/socket";

const props = defineProps<{
  workId: string
  wrapper: 'link' | 'button'
  disabled?: boolean
}>()

const exportWork = () => {
  state.loading = true
  socket.emit("export_work", props.workId, (status: boolean, msg: string, zip: string | ArrayBuffer) => {
    console.log("exported")
    if (status) {
      const blob = new Blob([zip], { type: 'application/zip' })
      const url = window.URL.createObjectURL(blob)
      Object.assign(document.createElement('a'), {
        href: url,
        download: `${props.workId}.rlswork`
      }).click()
      window.URL.revokeObjectURL(url)
    } else {
      alert(`${msg}: ${zip}`)
    }
    state.loading = false
  })
}
</script>

<template>
  <div :class="{ 'has-cursor-not-allowed': disabled }" v-if="wrapper == 'button'">
    <button class="ts-button is-outlined"
            :class="{ 'is-disabled': disabled }"
            @click="exportWork">Export</button>
  </div>
  <div :class="{ 'has-cursor-not-allowed': disabled }" @click.stop="console.log('テヘペロ')" v-else>
    <a class="ts-text is-link has-cursor-pointer"
       :class="{ 'is-disabled': disabled }"
       @click.stop="exportWork">Export</a>
  </div>
</template>
