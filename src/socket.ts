import { reactive } from 'vue'
import { io } from 'socket.io-client'
import Axios from 'axios'

export type Task = {
  name: string
  args: {
    name: string
    algorithm: string
    algorithm_args: { [ key: string]: string }
    learn_args: { [ key: string]: string }
    data_locator: string
    random_state: string
  }
  date: string
  data_example: string
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
  data_locators: DataLocator[]
}

export type Scalar = {
  tag: string
  value: number[]
}

export type ScalarGroup = {
  group: string
  step: number[]
  data: Scalar[]
}

export type Algorithm = {
  name: string
  description: string
  args: []
}

export type DataLocator = {
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
  data_locators: []
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

socket.on('git_version', (hash: string, branch: string) => {
  console.log('Server branch: ' + branch)
  console.log('Server version: ' + hash)

  if (branch == undefined) {
    branch = 'main'
    console.log('Warning: The server branch is undefined, default to main.')
  }

  if (hash !== undefined) {
    Axios.get(`https://api.github.com/repos/Proj-Xinhai/rl-stock/branches/${branch}`).then((res: { data: { commit: { sha: string } } }) => {
      if (res.data.commit.sha !== hash) {
        alert('Warning: The server has been updated, please update it to the latest version.')
      } else {
        console.log('Server is up to date.')
      }
    })
  }
})

socket.on('update_tasks', (tasks) => {
  state.tasks = tasks
})

socket.on('update_works', (works) => {
  state.works = works
})

socket.on('update_data_locator', (data_locators) => {
  state.data_locators = data_locators
})

socket.on('update_algorithm', (algorithms) => {
  state.algorithms = algorithms
})
