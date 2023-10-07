<script setup lang="ts">
defineProps<{
  msg: string
  action: string
  actionCallback: () => void
}>()
</script>

<template>
  <div class="ts-snackbar" style="position: fixed; top: 10px; right: 10px">
    <div class="content">{{ msg }}</div>
    <button class="action" @click="actionCallback">{{ action }}</button>
  </div>
</template>