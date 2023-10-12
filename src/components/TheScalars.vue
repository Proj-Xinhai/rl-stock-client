<script setup lang="ts">
import { onMounted, ref } from "vue";
import { template } from "@/ploty"
import { VuePlotly } from '@clalarco/vue3-plotly'
import Plotly from 'plotly.js-basic-dist'
import { type ScalarGroup, socket } from "@/socket"
import ThePlaceholder from "@/components/ThePlaceholder.vue"

const props = defineProps<{
  uuid: string
  timeline: string
}>()

const scalars = ref<{ [index: string]: ScalarGroup[] }>({})
const onInitReady = ref<boolean>(false)
const scalarLoading = ref<boolean>(false)

const reloadScalar = () => {

  scalarLoading.value = true
  const args = {
    uuid: props.uuid,
  }

  socket.emit("get_scalar", args, (data: {}) => {
    scalars.value = <{ train: ScalarGroup[], test: ScalarGroup[] }>data
    onInitReady.value = true
    scalarLoading.value = false
  })
}

onMounted(() => {
  reloadScalar()
})

</script>

<template>
  <ThePlaceholder :lines="3" v-if="!onInitReady" class="u-top-spaced" />
  <details class="ts-accordion u-top-spaced" v-for="group in scalars[timeline]" :key="group.group">
    <summary>{{ group.group }}</summary>
    <div class="ts-box u-top-spaced" v-for="scalar in group.data" :key="scalar.tag">
      <div class="ts-content is-fitted">
        <VuePlotly
          :data="[{x: scalar.step, y: scalar.value}]"
          :layout="{template: template, title: scalar.tag }"
          :config="{ modeBarButtonsToAdd: [
            {
              name: 'refresh',
              icon: Plotly.Icons.undo,
              click: reloadScalar
            }
          ] }"/>
        <div id="test"></div>
      </div>
      <div class="ts-mask has-cursor-not-allowed" v-if="scalarLoading">
        <div class="ts-center">
          <div class="ts-loading is-large"></div>
        </div>
      </div>
    </div>
  </details>
</template>
