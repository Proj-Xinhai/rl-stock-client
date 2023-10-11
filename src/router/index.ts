import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/tasks'
    },
    {
      path: '/terminal',
      name: 'terminal',
      component: () => import('../views/TerminalView.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../views/TasksView.vue')
    },
    {
      path: '/task/:name',
      name: 'task',
      component: () => import('../views/TaskView.vue')
    },
    {
      path: '/task/create',
      name: 'task-create',
      component: () => import('../views/TaskCreateView.vue')
    },
    {
      path: '/task/works',
      name: 'works',
      component: () => import('../views/WorksView.vue')
    },
    {
      path: '/task/work/:id',
      name: 'work',
      component: () => import('../views/WorkView.vue')
    },
    {
      path: '/task/work/create',
      name: 'work-create',
      component: () => import('../views/WorkCreateView.vue')
    }
  ]
})

export default router
