<script setup lang="ts">
import { state, socket, type Algorithm, type DataLocator, type Environment } from '@/socket'
import { watch, ref, onMounted } from "vue"
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import TheTaskImporter from "@/components/TheTaskImporter.vue"

const route = useRoute()
const router = useRouter()

const algorithms = ref<Algorithm[]>([])
const data_locators = ref<DataLocator[]>([])
const environments = ref<Environment[]>([])

const name = ref<string>('')
const algorithm = ref<string>('')
const algorithm_args = ref<{[ key: string]: string }[]>([])
const learn_args = ref<{[ key: string]: string }[]>([])
const data_locator = ref<string>('')
const environment = ref<string>('')
const random_state = ref<string>('')

let leave_lock = true

const parentWrapper = {
  name: name,
  algorithm: algorithm,
  algorithm_args: algorithm_args,
  learn_args: learn_args,
  data_locator: data_locator,
  environment: environment,
  random_state: random_state
}

const createError = ref<string>('')

const loadOptions = () => {
  algorithms.value = state.algorithms
  data_locators.value = state.data_locators
  environments.value = state.environments
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
    data_locator: data_locator.value,
    environment: environment.value,
    random_state: random_state.value
  }, (status: boolean, msg: string, detail: string) => {
    state.loading = false
    if (status) {
      leave_lock = false
      router.push({ name: 'tasks' })
    } else {
      createError.value = `${msg}: ${detail}`
    }
  })
}

const copyTask = () => {
  // state.tasks
  const taskToCopy = state.tasks.find((task) => task.name == route.query.copy)
  if (taskToCopy) {
    name.value = taskToCopy.name
    algorithm.value = taskToCopy.args.algorithm
    algorithm_args.value = []
    for (const [key, value] of Object.entries(taskToCopy.args.algorithm_args)) {
      algorithm_args.value.push({key: key, value: value as unknown as string})
    }
    learn_args.value = []
    for (const [key, value] of Object.entries(taskToCopy.args.learn_args)) {
      learn_args.value.push({key: key, value: value as unknown as string})
    }
    data_locator.value = taskToCopy.args.data_locator
    environment.value = taskToCopy.args.environment
    random_state.value = taskToCopy.args.random_state

    // remove query
    router.replace({ query: {} })
  }
}

onMounted(() => {
  loadOptions()
  if (route.query.copy) copyTask()

  window.onbeforeunload = () => {
    return 'Are you sure you want to leave?'
  }
})

onBeforeRouteLeave((to, from, next) => {
  window.onbeforeunload = null
  if (!leave_lock || window.confirm('Are you sure you want to leave?')) {
    next()
  } else {
    next(false)
  }
})

watch (state, () => {
  loadOptions()
})
</script>

<template>
  <div class="ts-header is-huge u-bottom-spaced-big">Create Task <TheTaskImporter :parentWrapper="parentWrapper" /></div>
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
              <input type="text" v-model="arg.key" :key="i" :data-dropdown="i">
            </div>
            <div class="ts-dropdown"
                 v-show="algorithms.find((a) => a.name == algorithm) &&
                 algorithms.find((a) => a.name == algorithm)?.args.filter((item: string) => item.includes(arg.key)).length !== 0"
                 :data-name="i">
              <button class="item"
                      v-for="_arg in algorithms.find((a) => a.name == algorithm)?.args.filter((item: string) => item.includes(arg.key))"
                      :key="_arg" @click="arg.key = _arg">{{ _arg }}</button>
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
      <div class="label is-start-aligned">data_locator</div>
      <div class="content">
        <div class="ts-select is-fluid">
          <select class="ts-text is-secondary" v-model="data_locator">
            <option v-for="data_locator in data_locators" :value="data_locator.name" :key="data_locator.name">{{ data_locator.name }}: {{ data_locator.description }}</option>
            <option selected disabled hidden>Choose data_locator</option>
          </select>
        </div>
      </div>
    </div>
    <div class="ts-control">
      <div class="label is-start-aligned">environment</div>
      <div class="content">
        <div class="ts-select is-fluid">
          <select class="ts-text is-secondary" v-model="environment">
            <option v-for="environment in environments" :value="environment.name" :key="environment.name">{{ environment.name }}: {{ environment.description }}</option>
            <option selected disabled hidden>Choose environment</option>
          </select>
        </div>
      </div>
    </div>
    <div class="ts-control">
      <div class="label is-start-aligned">random_state</div>
      <div class="content">
        <div class="ts-input">
          <input type="number" v-model="random_state">
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