<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TheConfirm from "@/components/TheConfirm.vue"
import { socket, state } from "@/socket";

const router = useRouter()

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
    router.push({ name: 'tasks' })
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
  <button v-if="wrapper == 'button'" class="ts-button is-outlined is-negative" @click="setConfirm">Remove</button>
  <button v-else class="item" @click="setConfirm">Remove</button>
  <teleport to="#app">
    <TheConfirm title="Confirm removal"
                accent="negative"
                :message="message"
                :check="confirm"
                :confirm="() => removeTask()"
                :cancel="() => confirm = ''"
                v-if="confirm !== ''" />
  </teleport>
</template>
