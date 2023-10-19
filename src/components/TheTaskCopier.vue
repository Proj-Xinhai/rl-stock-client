<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  taskName: string
  wrapper: 'link' | 'button'
}>()

const router = useRouter()

const copyTask = () => {
  router.push({
    name: 'task-create',
    query: {
      copy: props.taskName
    }
  })
}
</script>

<template>
  <button v-if="wrapper == 'button'" class="ts-button is-outlined" @click="copyTask">Copy</button>
  <button v-else class="item" @click="copyTask">Copy</button>
</template>
