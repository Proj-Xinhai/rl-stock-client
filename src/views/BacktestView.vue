<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { state, socket } from '@/socket'
import Plotly from 'plotly.js-dist-min'
import { template } from "@/ploty"

const stock = ref<string>("")
const start = ref<string>("")
const end = ref<string>("")
const model = ref<string>("")
const defaultBalance = ref<number>(<number><unknown>null)
const mouseInTooltip = ref<boolean>(false)

const roi = ref<number>(NaN)
const actions = ref<{
  date: string
  original_action: number
  action: string
  trade: number
  balance: number
  hold: number
  net: number
  reward: number
}[]>([])

const backtest = () => {
  if (stock.value == "" || start.value == "" || end.value == "" || model.value == "" || !defaultBalance.value) return
  console.log(stock.value)
  console.log(start.value)
  console.log(end.value)
  console.log(model.value)
  console.log(defaultBalance.value)
  //stock: str, model: str, default_balance: int, start: str, end: str
  socket.emit("backtesting", {
    stock: stock.value,
    model: model.value,
    default_balance: defaultBalance.value,
    start: start.value,
    end: end.value
  }, (status: boolean, msg: string, data: { name: string, value: number, actions: [] }) => {
    if (!status) {
      alert(`${msg}: ${data}`)
      return
    }
    roi.value = data.value
    actions.value = data.actions
    Plotly.react("backtest", [{
      // type: "scattergl", // too many webgl context
      x: actions.value.map(action => action.date),
      y: actions.value.map(action => action.net),
      mode: "lines"
    }], {
      title: data.name,
      template: template
    }, {})
  })
}

onMounted(() => {
  Plotly.react("backtest", [{
    // type: "scattergl", // too many webgl context
    x: [],
    y: [],
    mode: "lines"
  }], {
    title: "?",
    template: template
  }, {})
})

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
            <option v-for="work in state.works.filter(_work => _work.status == 2 && state.tasks.find(task => task.name == _work.task_name))"
                    :key="work.id" :value="work.id">{{ work.task_name }}({{ work.id.slice(0, 7) }})</option>
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

  <div class="ts-box u-top-spaced">
    <div id="backtest"></div>
  </div>

  <div class="ts-box u-top-spaced">
    <table class="ts-table">
      <thead>
        <tr>
          <th>#</th>
          <th>action</th>
          <th>trade</th>
          <th>balance</th>
          <th>hold</th>
          <th>net</th>
          <th>reward</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="action in actions" :key="action.date">
          <td>{{ action.date }}</td>
          <td>
            <span v-if="action.trade == 0">
              <span :data-tooltip="action.original_action">hold </span>
              <del class="ts-text is-negative">({{ action.action }})</del>
            </span>
            <span :data-tooltip="action.original_action" v-else>{{ action.action }}</span>
          </td>
          <td>{{ action.trade }}</td>
          <td>{{ action.balance }}</td>
          <td>{{ action.hold }}</td>
          <td>{{ action.net }}</td>
          <td>{{ action.reward }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="7">roi: {{ isNaN(roi) ? "-" : roi }}, net: {{ isNaN(roi) ? "-" : actions[actions.length - 1].net }}</th>
        </tr>
      </tfoot>
    </table>
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
