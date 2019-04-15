const Static = () => import('../pages/Static.vue')

export const routes = [
  { name: 'page', path: '/info/:slug', component: Static }
]
