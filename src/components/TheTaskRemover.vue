<script setup lang="ts">
import { ref } from 'vue'
import TheConfirm from "@/components/TheConfirm.vue"
import { socket, state } from "@/socket";

const props = defineProps<{
  taskName: string
  wrapper: 'link' | 'button'
}>()

const confirm = ref<string>('')

const removeTask = () => {
  state.loading = true
  socket.emit('remove_task', props.taskName, (status: boolean, msg: string, detail: string) => {
    if (!status) alert(`${msg}: remove task ${props.taskName} failed: ${detail}`)
    confirm.value = ''
    state.loading = false
  })
}
</script>

<template>
  <div v-if="wrapper == 'button'">
    <button class="ts-button is-outlined has-start-spaced" @click="confirm = taskName">Remove</button>
  </div>
  <div v-else>
    <a class="ts-text is-link has-cursor-pointer" @click="confirm = taskName">Remove</a>
  </div>
  <TheConfirm title="Confirm removal"
              accent="negative"
              :message="`You are about to remove task \`${confirm}\``"
              :check="confirm"
              :confirm="() => removeTask()"
              :cancel="() => confirm = ''"
              v-if="confirm !== ''" />
</template>
