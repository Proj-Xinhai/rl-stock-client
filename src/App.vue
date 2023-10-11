<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ThePlaceholder from './components/ThePlaceholder.vue'
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { state, socket } from '@/socket'
import { io } from 'socket.io-client'

// data
const services = ref<string[]>([])
const serviceError = ref<boolean>(false)
const currentService = ref<string>('')
const wsConnected = ref<boolean>(false)
const wsLoading = ref<boolean>(false)
const ping = ref<number>(0)

const reloadServices = () => {
  serviceError.value = false
  services.value = []

  // namespace /service
  const temp_socket = io('ws://rl-stock.local:8000/service', {
    transports: ['websocket'],
  })

  temp_socket.on('connect', () => {
    console.log('connected')
    temp_socket.emit('get_services', (data: string[]) => {
      console.log(data)
      services.value = data
      temp_socket.disconnect()
    })
  })

  temp_socket.on('connect_error', (err) => {
    console.log('connect_error')
    console.log(err)
    serviceError.value = true
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
  // force http
  if (location.protocol !== 'http:') {
    location.replace(`http:${location.href.substring(location.protocol.length)}`)
  }

  if (currentService.value == '') {
    reloadServices()
  }
  ping.value = state.ping
})

watch(currentService, (newVal: string) => {
  if (newVal !== '') {
    // @ts-ignore
    socket.io.uri = `ws://${newVal}:8000/`
    socket.connect()
  } else {
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
    </div>
    <div class="cell is-fluid is-secondary is-scrollable" style="color: var(--ts-white)">
      <div class="ts-container is-narrow has-vertically-padded-large">
        <RouterView />
      </div>
      <div class="ts-mask has-cursor-not-allowed" v-show="!wsConnected || wsLoading">
        <div class="ts-center">
          <div class="ts-loading is-large"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="ts-modal" style="color: var(--ts-white)" v-bind:class="currentService == '' ? 'is-visible' : ''">
    <div class="content">
      <div class="ts-content">
        <div class="ts-grid is-middle-aligned">
          <div class="column is-fluid">
            <div class="ts-header">Search in local network</div>
          </div>
          <div class="column" v-show="services.length !== 0 || serviceError">
            <button class="ts-icon is-arrow-rotate-left-icon" v-on:click="reloadServices"></button>
          </div>
        </div>
      </div>
      <div class="ts-divider"></div>
      <div class="ts-content is-center-aligned">
        <ThePlaceholder :lines="3" v-show="services.length == 0 && !serviceError" />
        <div
          class="ts-image is-rounded has-cursor-pointer"
          style="max-width: 150px"
          v-show="services.length !== 0 && !serviceError"
          v-for="service in services"
          :key="service"
          v-on:click="setService(service)"
        >
          <img src="./assets/placeholder.png" alt="" />
          <div class="ts-mask is-secondary is-bottom">
            <div class="ts-content is-compact is-start-aligned">
              <div class="ts-badge is-secondary">{{ service }}</div>
            </div>
          </div>
        </div>
        <span class="ts-text is-negative" v-show="serviceError">No services detected</span>
      </div>
    </div>
  </div>
</template>
