<script setup lang="ts">
defineProps<{
  lines: number
}>()
</script>

<template>
  <div class="ts-placeholder is-loading">
    <div class="text" v-for="i in lines" :key="i"></div>
  </div>
</template>