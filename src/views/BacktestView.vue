<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { state, socket } from '@/socket'

const stock = ref<string>("")
const start = ref<string>("")
const end = ref<string>("")
const model = ref<string>("")
const defaultBalance = ref<number>(<number><unknown>null)
const mouseInTooltip = ref<boolean>(false)

const backtest = () => {
  if (stock.value == "" || start.value == "" || end.value == "" || model.value == "" || !defaultBalance.value) return
  console.log(stock.value)
  console.log(start.value)
  console.log(end.value)
  console.log(model.value)
  console.log(defaultBalance.value)
}

</script>

<template>

  <div class="ts-wrap is-vertical" @mouseenter="mouseInTooltip = true" @mouseleave="mouseInTooltip = false">
    <div class="ts-grid is-evenly-divided">
      <div class="column ts-wrap is-vertical">
        <div class="ts-text is-label">
          <Transition>
            <span v-show="mouseInTooltip">stock</span>
          </Transition>
          &#8203
        </div>
        <div class="ts-input is-end-labeled">
          <input type="text" v-model="stock">
          <span class="label">.TW</span>
        </div>
      </div>
      <div class="column ts-wrap is-vertical">
        <div class="ts-text is-label">
          <Transition>
            <span v-show="mouseInTooltip">model</span>
          </Transition>
          &#8203
        </div>
        <div class="ts-select">
          <select v-model="model">
            <option v-for="work in state.works" :value="work.id">{{ work.task_name }}({{ work.id.slice(0, 7) }})</option>
          </select>
        </div>
      </div>
      <div class="column ts-wrap is-vertical">
        <div class="ts-text is-label">
          <Transition>
            <span v-show="mouseInTooltip">default balance</span>
          </Transition>
          &#8203</div>
        <div class="ts-input is-start-labeled">
          <span class="label">$</span>
          <input type="number" min="0" v-model="defaultBalance" @focusout="defaultBalance <= 0 ? defaultBalance = <number><unknown>null : null">
        </div>
      </div>
    </div>
    <div class="ts-grid is-evenly-divided">
      <div class="column ts-wrap is-vertical">
        <div class="ts-input">
          <input type="date" :max="end" v-model="start">
        </div>
        <div class="ts-text is-label">
          <Transition>
            <span v-show="mouseInTooltip">start</span>
          </Transition>
          &#8203
          </div>
      </div>
      <div class="column ts-wrap is-vertical">
        <div class="ts-input">
          <input type="date" :min="start" v-model="end">
        </div>
        <div class="ts-text is-label">
          <Transition>
            <span v-show="mouseInTooltip">end</span>
          </Transition>
          &#8203
        </div>
      </div>
      <div class="ts-grid is-top-aligned">
        <div class="column ts-wrap">
          <button class="ts-button is-outlined" @click="">preload</button>
          <button class="ts-button" @click="backtest">backtest</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.v-enter-active {
  transition: opacity 0.1s ease;
}

.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
