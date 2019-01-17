import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Graph02 from './views/Graph02.vue'
import Graph03 from './views/Graph03.vue'
import Graph04 from './views/Graph04.vue'
import MapPollution from './views/MapPollution.vue'
import MapEvents from './views/MapEvents.vue'
import PeriodManifestations from './views/PeriodManifestations.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/graph02',
      name: 'Graph02',
      component: Graph02
    },
    {
      path: '/graph03',
      name: 'Graph03',
      component: Graph03
    },
    {
      path: '/graph04',
      name: 'Graph04',
      component: Graph04
    },
    {
      path: '/mappollution',
      name: 'Map Pollution',
      component: MapPollution
    },
    {
      path: '/mapevents',
      name: 'Map événements',
      component: MapEvents
    },
    {
      path: '/period-manifestations',
      name: 'PeriodManifestations',
      component: PeriodManifestations
    }
  ]
})
