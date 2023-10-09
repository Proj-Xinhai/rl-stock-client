import { reactive } from 'vue'
import { io } from 'socket.io-client'

export type Task = {
  name: string
  args: {
    name: string
    algorithm: string
    algorithm_args: string
    learn_args: string
    helper: string
  }
  date: string
  data_example: string
  preprocess_example: string
}

export type Timeline = {
  name: string
  from: number
  to: number
  status: number
  detail: string
}

export type Work = {
  id: string
  task_name: string
  status: number
  detail: string
  timeline: Timeline[]
  evaluation: { [key: string]: string }[]
  date: string
}

export type State = {
  connected: boolean
  ping: number
  loading: boolean
  tasks: Task[]
  works: Work[]
  algorithms: Algorithm[]
  helpers: Helper[]
}

export type Scalar = {
  tag: string
  step: number[]
  value: number[]
}

export type ScalarGroup = {
  group: string
  data: Scalar[]
}

export type Algorithm = {
  name: string
  description: string
}

export type Helper = {
  name: string
  description: string
}

export const state = reactive<State>({
  connected: false,
  ping: 0,
  loading: false,
  tasks: [],
  works: [],
  algorithms: [],
  helpers: []
})

const ping = () => {
  const start: number = Date.now()
  socket.emit('ping', () => {
    state.ping = Date.now() - start
  })
}

export const updateInterval = setInterval(() => {
  if (state.connected) {
    socket.emit('update_all')
  }

  if (state.connected && (Math.random() * 6 + 1) === 6) {
    ping()
  }

}, 10000)

export const socket = io( {
  transports: ['websocket']
}).disconnect()

socket.on('connect', () => {
  state.connected = true
  ping()
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('update_tasks', (tasks) => {
  state.tasks = tasks
})

socket.on('update_works', (works) => {
  state.works = works
})

socket.on('update_helper', (helpers) => {
  state.helpers = helpers
})

socket.on('update_algorithm', (algorithms) => {
  state.algorithms = algorithms
})
