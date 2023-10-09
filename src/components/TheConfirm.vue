<script setup lang="ts">
import { ref } from 'vue'
withDefaults(defineProps<{
  title: string
  message: string
  accent?: string
  check: string
  confirm: () => void
  cancel: () => void
}>(), {
  accent: 'positive'
})

const confirmInput = ref<string>('')

</script>

<template>
  <div class="ts-app-drawer is-right is-small is-visible">
    <div class="content">
      <div class="ts-content">
        <div class="ts-header is-large">{{ title }}</div>
        <div class="ts-text is-secondary has-top-spaced" :class="{ 'is-negative': accent == 'negative' }">
          {{ message }}
        </div>
        <div class="ts-input is-underlined has-top-spaced">
          <input type="text" :placeholder="check" v-model="confirmInput">
        </div>

        <div class="ts-wrap is-end-aligned has-top-spaced-big">
          <button class="ts-button is-outlined" @click="cancel">Cancel</button>
          <button class="ts-button" :class="{ 'is-disabled': check !== confirmInput }" @click="confirm">Ok</button>
        </div>
      </div>
    </div>
  </div>
</template>
