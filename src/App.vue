<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ThePlaceholder from './components/ThePlaceholder.vue'
import { onBeforeMount, onMounted, nextTick, ref, watch } from 'vue'
import { state, socket } from '@/socket'
import { io } from 'socket.io-client'

// data
const services = ref<{ name: string, server: string, port: number }[]>([])
const serviceError = ref<boolean>(false)
const currentService = ref<string>('')
const wsConnected = ref<boolean>(false)
const wsLoading = ref<boolean>(false)
const ping = ref<number>(0)

const tryPort = ref<number>(8000)

const index_service = io(`ws://rl-stock.local:8000/service`, {
  transports: ['websocket']
})

index_service.on('connect', () => {
  console.log('connected')
  index_service.emit('get_services', (data: { name: string, server: string, port: number }[]) => {
    // index_service.removeListener('connect_error')
    serviceError.value = false
    services.value = data
    index_service.disconnect()
  })
})

index_service.on('connect_error', (err) => {
  console.log('connect_error')
  console.log(err)
  index_service.disconnect()
  serviceError.value = true
  nextTick().then(() => {
    // @ts-ignore
    index_service.io.uri = `ws://rl-stock.local:${tryPort.value}/service`
    index_service.connect()
    tryPort.value += 1
  })
})

const reloadServices = () => {
  serviceError.value = false
  services.value = []
  tryPort.value = 8000
  nextTick().then(() => {
    // @ts-ignore
    index_service.io.uri = `ws://rl-stock.local:${tryPort.value}/service`
    index_service.connect()
  })
}

const setService = (service: string) => {
  currentService.value = service
  sessionStorage.setItem('currentService', service)
  console.log(currentService.value)
}

const clearService = () => {
  currentService.value = ''
  sessionStorage.removeItem('currentService')
}

onBeforeMount(() => {
  if (sessionStorage.getItem('currentService') != null) {
    currentService.value = sessionStorage.getItem('currentService') as string
  }
})

onMounted(() => {
  if (currentService.value == '' || !wsConnected.value) {
    reloadServices()
  }
  ping.value = state.ping
})

watch(currentService, (newVal: string) => {
  if (newVal !== '') {
    // @ts-ignore
    socket.io.uri = `ws://${newVal}/`
    socket.connect()
  } else {
    reloadServices()
    socket.disconnect()
    // socket = null
  }
})

watch(state, (newVal) => {
  wsConnected.value = newVal.connected
  wsLoading.value = newVal.loading
  ping.value = newVal.ping
})
</script>

<template>
  <div class="ts-app-layout is-full is-horizontal" v-if="currentService != ''">
    <div class="cell" style="width: 360px; color: var(--ts-white)">
      <div class="ts-content is-center-aligned">
        <div class="ts-wrap is-vertical is-compact is-middle-aligned">
          <div class="ts-grid is-middle-aligned">
            <div class="column is-fluid">
              <div class="ts-header">RL Stock ({{ currentService }})</div>
            </div>
            <div class="column">
              <button class="ts-icon is-eject-icon" v-on:click="clearService"></button>
            </div>
          </div>
        </div>
      </div>
      <div class="ts-divider"></div>
      <div class="ts-content is-dense">
        <div class="ts-grid">
          <div class="column is-fluid">
            <div class="ts-text is-bold">Experiment</div>
          </div>
          <div class="column">
            <span class="ts-icon is-diagram-project-icon"></span>
          </div>
        </div>
      </div>
      <div class="ts-menu is-dense is-small" style="opacity: 0.8">
        <router-link :to="{ name: 'tasks' }" v-slot="{ isActive, isExactActive }">
          <a class="item" :class="[isActive && 'is-active', isExactActive && 'is-active']">tasks</a>
        </router-link>
        <router-link :to="{ name: 'works' }" v-slot="{ isActive, isExactActive }">
          <a class="item" :class="[isActive && 'is-active', isExactActive && 'is-active']">works</a>
        </router-link>
      </div>
      <div class="ts-divider"></div>
      <div class="ts-content is-dense">
        <div class="ts-grid">
          <div class="column is-fluid">
            <div class="ts-text is-bold">Result</div>
          </div>
          <div class="column">
            <span class="ts-icon is-backward-icon"></span>
          </div>
        </div>
      </div>
      <div class="ts-menu is-dense is-small" style="opacity: 0.8">
        <router-link :to="{ name: 'backtest' }" v-slot="{ isActive, isExactActive }">
          <a class="item" :class="[isActive && 'is-active', isExactActive && 'is-active']">backtest</a>
        </router-link>
      </div>
      <div class="ts-divider has-top-spaced-small"></div>
      <div class="ts-divider"></div>
      <router-link :to="{ name: 'terminal' }" v-slot="{ isActive, isExactActive }">
        <a class="ts-content is-interactive is-dense" :class="[isActive && 'is-active', isExactActive && 'is-active']">
          <div class="ts-grid">
            <div class="column is-fluid">
              <div class="ts-text is-bold">Hello World!</div>
            </div>
            <div class="column">
              <span class="ts-icon is-terminal-icon"></span>
            </div>
          </div>
        </a>
      </router-link>
      <div class="ts-divider"></div>
      <div class="ts-content is-dense is-bottom-aligned">
        <div class="ts-grid">
          <div class="column">
            <div class="ts-text is-secondary">socket healthiness</div>
          </div>
          <div class="column is-fluid is-end-aligned">
            <div class="ts-text is-secondary is-bold" v-show="wsConnected" :data-tooltip="ping+' ms'">health</div>
            <div class="ts-text is-secondary is-bold is-negative" v-show="!wsConnected" data-tooltip="-1 ms">sick</div>
          </div>
        </div>
      </div>
      <div class="ts-content is-center-aligned">
        <div class="ts-text is-secondary">version: {{ state.git.hash.slice(0, 7) }}</div>
        <div class="ts-text is-secondary">branch: {{ state.git.branch }}</div>
      </div>
    </div>
    <div class="cell is-fluid is-secondary is-scrollable" style="color: var(--ts-white)">
      <div class="ts-container is-narrow has-vertically-padded-large">
        <RouterView />
      </div>
    </div>
    <div class="ts-mask has-cursor-not-allowed" v-show="!wsConnected || wsLoading">
      <div class="ts-center">
        <div class="ts-loading is-large"></div>
      </div>
    </div>
  </div>
  <div class="ts-modal is-visible" style="color: var(--ts-white)" v-if="currentService == '' || !wsConnected">
    <div class="content">
      <div class="ts-content">
        <div class="ts-grid is-middle-aligned">
          <div class="column is-fluid">
            <div class="ts-header">Search in local network</div>
          </div>
          <div class="column" v-show="services.length !== 0 || serviceError">
            <button class="ts-icon is-arrow-rotate-left-icon" v-on:click="reloadServices()"></button>
          </div>
        </div>
      </div>
      <div class="ts-divider"></div>
      <div class="ts-content is-center-aligned">
        <div
          class="ts-image is-rounded has-cursor-pointer has-spaced-small"
          style="max-width: 150px"
          v-show="services.length !== 0 && !serviceError"
          v-for="service in services"
          :key="service.name"
          v-on:click="setService(`${service.server}:${service.port}`)"
        >
          <img src="./assets/placeholder.png" alt="" />
          <div class="ts-mask is-secondary is-bottom">
            <div class="ts-content is-compact is-start-aligned">
              <div class="ts-badge is-secondary">{{ service.name.split('.')[0] }}</div>
            </div>
          </div>
          <div class="ts-mask has-cursor-not-allowed" v-show="currentService == `${service.server}:${service.port}`">
            <div class="ts-center">
              <div class="ts-loading is-large"></div>
            </div>
          </div>
        </div>
        <span class="ts-text is-negative" v-show="serviceError">No services detected, still trying another port...</span>
        <ThePlaceholder :lines="3" v-show="services.length == 0" />
      </div>
    </div>
  </div>
</template>
