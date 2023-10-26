<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { state, socket } from '@/socket'

const stock = ref<string>("")
const start = ref<string>("")
const end = ref<string>("")
const model = ref<string>("")

const backtest = () => {
  if (stock.value == "" && start.value == "" && end.value == "" && model.value == "") return
  console.log(stock.value)
  console.log(start.value)
  console.log(end.value)
  console.log(model.value)
}

</script>

<template>
  <div class="ts-grid is-bottom-aligned">
    <div class="column is-fluid ts-grid is-evenly-divided">
      <div class="column ts-wrap is-vertical">
        <div class="ts-text is-label">stock</div>
        <div class="ts-input is-end-labeled">
          <input type="text" v-model="stock">
          <span class="label">.TW</span>
        </div>
      </div>
      <div class="column ts-wrap is-vertical">
        <div class="ts-text is-label">start</div>
        <div class="ts-input">
          <input type="date" :max="end" v-model="start">
        </div>
      </div>
      <div class="column ts-wrap is-vertical">
        <div class="ts-text is-label">end</div>
        <div class="ts-input">
          <input type="date" :min="start" v-model="end">
        </div>
      </div>
      <div class="column ts-wrap is-vertical">
        <div class="ts-text is-label">model</div>
        <div class="ts-select">
          <select v-model="model">
            <option v-for="work in state.works" :value="work.id">{{ work.task_name }}({{ work.id.slice(0, 7) }})</option>
          </select>
        </div>
      </div>
    </div>
    <div class="column ts-wrap is-vertical">
      <button class="ts-button" @click="backtest">backtest</button>
    </div>
  </div>
</template>
