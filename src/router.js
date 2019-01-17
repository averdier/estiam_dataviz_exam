import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Graph01 from './views/Graph01.vue'
import Graph02 from './views/Graph02.vue'
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
      path: '/graph01',
      name: 'Graph01', 
      component: Graph01
    },
    {
      path: '/graph02',
      name: 'Graph02',
      component: Graph02
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
