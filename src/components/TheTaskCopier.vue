<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  taskName: string
  wrapper: 'link' | 'button'
}>()

const route = useRouter()

const copyTask = () => {
  route.push({
    name: 'task-create',
    query: {
      copy: props.taskName
    }
  })
}
</script>

<template>
  <div v-if="wrapper == 'button'">
    <button class="ts-button is-outlined has-start-spaced" @click="copyTask">Copy</button>
  </div>
  <div v-else>
    <a class="ts-text is-link has-cursor-pointer" @click="copyTask">Copy</a>
  </div>
</template>
