<script setup lang="ts">
import { onMounted, watch, ref } from "vue"
import { type ScalarGroup, socket } from "@/socket"
import ThePlaceholder from "@/components/ThePlaceholder.vue"
import TheScalar from "@/components/TheScalar.vue"

const props = defineProps<{
  uuid: string
  timeline: string
  timelineStatus: number
}>()

const scalars = ref<ScalarGroup[]>([])
const onInitReady = ref<boolean>(false)
const scalarLoading = ref<boolean>(false)
const showOutlier = ref<boolean>(false)

const reloadScalar = () => {
  console.log('reload scalar')

  scalarLoading.value = true
  const args = {
    uuid: props.uuid,
    gets: [props.timeline]
  }

  socket.emit("get_scalar", args, (data: { [index: string]: ScalarGroup[] }) => {
    if (data[props.timeline]) {
      scalars.value = data[props.timeline]
    }
    onInitReady.value = true
    scalarLoading.value = false
  })
}

onMounted(() => {
  reloadScalar()
})

watch(() => props.timelineStatus, () => {
  reloadScalar()
})

</script>

<template>
  <ThePlaceholder :lines="3" v-show="!onInitReady" class="u-top-spaced" />
  <div style="position: absolute; top: 30px; left: -145px; height: calc(100% - 30px)" v-show="scalars.length > 0">
    <div class="ts-wrap is-vertical" style="position: sticky; top: 20px">
      <button class="ts-button is-circular is-outlined"
              @click="reloadScalar">refresh</button>
      <button class="ts-button is-circular"
              :class="{ 'is-outlined': !showOutlier }"
              @click="showOutlier = !showOutlier">outlier</button>
    </div>
  </div>
  <template v-for="group in scalars" :key="group.group" v-show="scalars.length > 0">
    <details class="ts-accordion u-top-spaced">
      <summary>{{ group.group }}</summary>
      <div class="ts-box u-top-spaced" v-for="scalar in group.data" :key="scalar.tag">
        <div class="ts-content is-fitted">
          <lazy-component>
            <TheScalar :timeline="timeline" :title="scalar.tag" :x="group.step" :y="scalar.value" :show-outlier="showOutlier" />
          </lazy-component>
          <div class="ts-mask has-cursor-not-allowed" v-show="scalarLoading">
            <div class="ts-center">
              <div class="ts-loading is-large"></div>
            </div>
          </div>
        </div>
      </div>
    </details>
  </template>
</template>
