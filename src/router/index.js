import { createRouter, createWebHistory } from 'vue-router'
import SetData from '../views/setData.vue'
import Map from '../views/Map.vue'
import AdminPanel from '../views/admin-panel.vue'
import Instruction from '../views/instruction.vue'
const routes = [
  {
    path: '/',
    name: 'setData',
    component: SetData,
    props: true
  },
  {
    path: '/map',
    name: 'map',
    component: Map,
    props: true
  },

  {
    path: '/admin-panel',
    name: 'admin-panel',
    component: AdminPanel,
    props: true
  },

  {
    path: '/instruction',
    name: 'instruction',
    component: Instruction,
    props: true

  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
