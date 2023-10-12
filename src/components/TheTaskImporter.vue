<script setup lang="ts">
import { type Ref } from 'vue'

const props = defineProps<{
  parentWrapper: {
    name: Ref<string>,
    algorithm: Ref<string>,
    algorithm_args: Ref<{[ key: string]: string }[]>,
    learn_args: Ref<{[ key: string]: string }[]>,
    helper: Ref<string>,
  }
}>()
const importTask = () => {
  const parentWrapper = props.parentWrapper
  Object.assign(document.createElement('input'), {
    type: 'file',
    accept: '.rlstockexport',
    onchange: (e: Event) => {
      const target = e.target as HTMLInputElement
      if (target.files) {
        const file = target.files[0]
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = () => {
          const data = JSON.parse(reader.result as string)
          parentWrapper.name.value = data.name
          parentWrapper.algorithm.value = data.algorithm
          parentWrapper.algorithm_args.value = []
          parentWrapper.learn_args.value = []
          for (const key in data.algorithm_args) {
            parentWrapper.algorithm_args.value.push({key: key, value: data.algorithm_args[key]})
          }
          for (const key in data.learn_args) {
            parentWrapper.learn_args.value.push({key: key, value: data.learn_args[key]})
          }
          parentWrapper.helper.value = data.helper
        }
      }
    }
  }).click()
}
</script>

<template>
  <button class="ts-button is-outlined has-start-spaced" @click="importTask">Import</button>
</template>
