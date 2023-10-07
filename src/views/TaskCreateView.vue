<script setup lang="ts">
import { state, socket, type Algorithm, type Helper } from '@/socket'
import { watch, ref, onMounted } from "vue"
import { useRouter } from 'vue-router'

const route = useRouter()

const algorithms = ref<Algorithm[]>([])
const helpers = ref<Helper[]>([])

const name = ref<string>('')
const algorithm = ref<string>('')
const algorithm_args = ref<{[ key: string]: string }[]>([])
const learn_args = ref<{[ key: string]: string }[]>([])
const helper = ref<string>('')

const createError = ref<string>('')

const loadOptions = () => {
  algorithms.value = state.algorithms
  helpers.value = state.helpers
}

const addAlgorithmArg = () => {
  algorithm_args.value.push({key: '', value: ''})
}

const removeAlgorithmArg = (index: number) => {
  algorithm_args.value.splice(index, 1)
}

const addLearnArg = () => {
  learn_args.value.push({key: '', value: ''})
}

const removeLearnArg = (index: number) => {
  learn_args.value.splice(index, 1)
}

const createTask = () => {
  state.loading = true
  const temp_algorithm_args: { [key: string]: string } = {}
  const temp_learn_args: { [key: string]: string } = {}
  algorithm_args.value.forEach((arg: { [key: string]: string }) => {
    temp_algorithm_args[arg.key] = arg.value
  })
  learn_args.value.forEach((arg: { [key: string]: string }) => {
    temp_learn_args[arg.key] = arg.value
  })

  socket.emit('create_task', {
    name: name.value,
    algorithm: algorithm.value,
    algorithm_args: temp_algorithm_args,
    learn_args: temp_learn_args,
    helper: helper.value
  }, (status: boolean, msg: string, detail: string) => {
    state.loading = false
    if (status) {
      route.push({ name: 'tasks' })
    } else {
      createError.value = `${msg}: ${detail}`
    }
  })
}

onMounted(() => {
  loadOptions()
})

watch (state, () => {
  loadOptions()
})
</script>

<template>
  <div class="ts-header is-huge u-bottom-spaced-big">Create Task</div>
  <div class="ts-notice is-negative u-bottom-spaced" v-show="createError != ''">
    <div class="title">Error</div>
    <div class="content">{{ createError }}</div>
  </div>
  <div class="ts-wrap is-vertical">
    <div class="ts-control">
      <div class="label is-start-aligned">name</div>
      <div class="content">
        <div class="ts-input">
          <input type="text" v-model="name">
        </div>
      </div>
    </div>
    <div class="ts-control">
      <div class="label is-start-aligned">algorithm</div>
      <div class="content">
        <div class="ts-select is-fluid">
          <select class="ts-text is-secondary" v-model="algorithm">
            <option v-for="_algorithm in algorithms" :value="_algorithm.name" :key="_algorithm.name">{{ _algorithm.name }}: {{ _algorithm.description }}</option>
            <option selected disabled hidden>Choose algorithm</option>
          </select>
        </div>
      </div>
    </div>
    <div class="ts-control u-top-spaced-big">
      <div class="label is-start-aligned">algorithm_args</div>
      <div class="content">
        <div class="ts-grid is-middle-aligned">
          <div class="column is-5-wide">
            <span class="ts-text is-secondary">key</span>
          </div>
          <div class="column is-10-wide">
            <span class="ts-text is-secondary">value</span>
          </div>
          <div class="column is-1-wide">
            <span class="ts-icon is-plus-icon has-cursor-pointer" @click="addAlgorithmArg"></span>
          </div>
        </div>
        <div class="ts-grid is-middle-aligned u-top-spaced" v-for="(arg, i) in algorithm_args" :key="i">
          <div class="column is-5-wide">
            <div class="ts-input">
              <input type="text" v-model="arg.key" :key="i">
            </div>
          </div>
          <div class="column is-10-wide">
            <div class="ts-input">
              <input type="text" v-model="arg.value" :key="i">
            </div>
          </div>
          <div class="column is-1-wide">
            <span class="ts-icon is-minus-icon has-cursor-pointer" @click="removeAlgorithmArg(i)"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="ts-control u-top-spaced-big u-bottom-spaced-big">
      <div class="label is-start-aligned">learn_args</div>
      <div class="content">
        <div class="ts-grid is-middle-aligned">
          <div class="column is-5-wide">
            <span class="ts-text is-secondary">key</span>
          </div>
          <div class="column is-10-wide">
            <span class="ts-text is-secondary">value</span>
          </div>
          <div class="column is-1-wide">
            <span class="ts-icon is-plus-icon has-cursor-pointer" @click="addLearnArg"></span>
          </div>
        </div>
        <div class="ts-grid is-middle-aligned u-top-spaced" v-for="(arg, i) in learn_args" :key="i">
          <div class="column is-5-wide">
            <div class="ts-input">
              <input type="text" v-model="arg.key" :key="i">
            </div>
          </div>
          <div class="column is-10-wide">
            <div class="ts-input">
              <input type="text" v-model="arg.value" :key="i">
            </div>
          </div>
          <div class="column is-1-wide">
            <span class="ts-icon is-minus-icon has-cursor-pointer" @click="removeLearnArg(i)"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="ts-control">
      <div class="label is-start-aligned">helper</div>
      <div class="content">
        <div class="ts-select is-fluid">
          <select class="ts-text is-secondary" v-model="helper">
            <option v-for="helper in helpers" :value="helper.name" :key="helper.name">{{ helper.name }}: {{ helper.description }}</option>
            <option selected disabled hidden>Choose helper</option>
          </select>
        </div>
      </div>
    </div>
    <div class="ts-control">
      <div class="label is-start-aligned"></div>
      <div class="content">
        <div class="ts-content is-end-aligned">
          <button class="ts-button" @click="createTask">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>