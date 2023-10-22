<script setup lang="ts">
import { state, type Task, type Work } from "@/socket"
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  task?: string
}>()

const router = useRouter()

const tasks = ref<Task[]>([])
const works = ref<Work[]>([])
const sortBy = ref<string>('Create At')
const sortDirection = ref<number>(-1) // -1: desc, 1: asc

const worksSelected = ref<string[]>([])
const complexSelectedStatus = ref<boolean>(false)

const showEvaluations = ref<boolean>(false)
const evaluations = ref<{ [key: string]: string }[][]>([])
const evaluationsAvailability = ref<boolean>(false)

const updateEvaluations = () => {
  evaluationsAvailability.value = true
  evaluations.value = []
  worksSelected.value.forEach((id) => {
    const work = works.value.find(({id: _id}) => _id == id) as Work
    if (work.evaluation.length == 0) {
      evaluationsAvailability.value = false
    }
    evaluations.value.push(work.evaluation)
    console.log(evaluations.value)
  })
}

const complexSelected = async () => {
  if (worksSelected.value.length == works.value.length) {
    worksSelected.value = []
  } else {
    worksSelected.value = works.value.map(({id}) => id)
  }
  setTimeout(() => {
    complexSelectedStatus.value = worksSelected.value.length > 0
  }, 0)
}

const status: { [key: string]: string } = {
  '0': 'pending',
  '1': 'running',
  '2': 'complete',
  '-1': 'failed'
}

const sort = (col: string, force: boolean = false) => {
  if (force) {
    if (sortBy.value != col) sortDirection.value = -1 // if sort column changed, reset sort direction
    else sortDirection.value *= -1
    sortBy.value = col
  }
  works.value = works.value.slice().sort((a, b) => {
    return a.date > b.date ? sortDirection.value : -sortDirection.value
  }).slice().sort((a, b) => {
    if (sortBy.value == 'id') {
      return a.id > b.id ? sortDirection.value : -sortDirection.value
    } else if (sortBy.value == 'task_name') {
      return a.task_name > b.task_name ? sortDirection.value : -sortDirection.value
    } else if (sortBy.value == 'Status') {
      return a.status > b.status ? sortDirection.value : -sortDirection.value
    } else if (sortBy.value == 'Create At') {
      return a.date > b.date ? sortDirection.value : -sortDirection.value
    } else {
      return 0
    }
  })
}

const load = () => {
  tasks.value = state.tasks
  works.value = state.works
  if (props.task != undefined) {
    works.value = works.value.filter(({task_name}) => task_name == props.task)
  }
  sort(sortBy.value)
}

onMounted(() => {
  load()
})

watch (state, () => {
  load()
})

watch (worksSelected, () => {
  complexSelectedStatus.value = worksSelected.value.length > 0
  updateEvaluations()
})

</script>

<template>
  <div class="ts-wrap is-compact is-middle-aligned">
    <button class="ts-button is-outlined" :class="{ 'is-disabled': !evaluationsAvailability }" v-if="complexSelectedStatus" @click="showEvaluations = true">Evaluations</button>
    <button class="ts-button" style="visibility: hidden" @click="console.log('てへぺろ')"></button><!-- This is placeholder -->
  </div>
  <div class="ts-box u-top-spaced">
    <table class="ts-table is-celled is-single-line">
      <thead>
      <tr>
        <th class="is-collapsed is-compact">
          <label class="ts-checkbox is-solo" :class="{ 'is-indeterminate': worksSelected.length > 0 && worksSelected.length !== works.length }">
            <input type="checkbox" @click="complexSelected" v-model="complexSelectedStatus" />
          </label>
        </th>
        <th v-for="col in ['id', 'task_name', 'Status', 'Create At']" @click="sort(col, true)">
          {{ col }} <span class="ts-icon" :class="{ 'is-sort-down-icon': sortDirection == -1, 'is-sort-up-icon': sortDirection == 1 }" v-if="sortBy == col"></span>
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-for="work in works" :key="work.id">
        <tr class="has-cursor-pointer" @click="router.push({ name: 'work', params: { id: work.id } })">
          <td class="is-compact" @click.stop>
            <label class="ts-checkbox is-solo">
              <input type="checkbox" :id="work.id" :value="work.id" v-model="worksSelected" />
            </label>
          </td>
          <td class="is-center-aligned is-collapsed">{{ work.id }}</td>
          <td>{{ work.task_name }}</td>
          <td class="is-center-aligned is-collapsed"
              :class="{ 'is-indicated': work.status !== 0,'is-positive': work.status == 2, 'is-negative': work.status == -1 }">
            {{ status[work.status] }}
          </td>
          <td class="is-center-aligned is-collapsed">{{ work.date }}</td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>

  <div class="ts-modal is-big is-visible" v-if="showEvaluations">
    <div class="content">
      <div class="ts-content">
        <div class="ts-grid is-middle-aligned">
          <div class="column is-fluid">
            <div class="ts-header">Ev</div>
          </div>
          <div class="column">
            <button class="ts-close" @click="showEvaluations = false"></button>
          </div>
        </div>
      </div>
      <div class="ts-divider"></div>
      <div class="ts-content">
        <table class="ts-table is-single-line">
          <thead>
            <tr>
              <th>id</th>
              <th>a</th>
              <th>b</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>a</td>
              <td>a</td>
              <td>a</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
