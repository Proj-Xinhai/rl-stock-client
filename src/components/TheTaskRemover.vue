<script setup lang="ts">
import { ref } from 'vue'
import TheConfirm from "@/components/TheConfirm.vue"
import { socket, state } from "@/socket";

const props = defineProps<{
  taskName: string
  wrapper: 'link' | 'button'
}>()

const confirm = ref<string>('')
const message = ref<string>('')

const remover = (taskNames: string[]) => {
  const taskName = taskNames.shift()
  socket.emit('remove_task', taskName, (status: boolean, msg: string, detail: string) => {
    if (!status) alert(`${msg}: remove task ${taskName} failed: ${detail}`)
    if (taskNames.length > 0) {
      remover(taskNames)
    } else {
      state.loading = false
      confirm.value = ''
    }
  })
}

const removeTask = () => {
  state.loading = true
  remover(props.taskName.split(","))
}

const setConfirm = () => {
  const toConfirm = props.taskName.split(",")
  if (toConfirm.length == 1) {
    confirm.value = toConfirm[0]
    message.value = `You are about to remove task \`${toConfirm[0]}\``
  } else {
    confirm.value = `remove ${toConfirm.length} tasks`
    message.value = `You are about to remove ${toConfirm.length} tasks: \`${toConfirm.join(", ")}\``
  }
}
</script>

<template>
  <div v-if="wrapper == 'button'">
    <button class="ts-button is-outlined is-negative" @click="setConfirm">Remove</button>
  </div>
  <div v-else>
    <a class="ts-text is-link has-cursor-pointer" @click="setConfirm">Remove</a>
  </div>
  <TheConfirm title="Confirm removal"
              accent="negative"
              :message="message"
              :check="confirm"
              :confirm="() => removeTask()"
              :cancel="() => confirm = ''"
              v-if="confirm !== ''" />
</template>
