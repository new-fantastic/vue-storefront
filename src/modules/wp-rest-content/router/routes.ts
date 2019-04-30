const lazyStaticPage = () => import('../pages/Static.vue')

interface PartialRoute {
  name: string
  path: string
  component: Promise<Object>
}

export const routes = [
  { name: 'page', path: '/informacje/:slug', component: lazyStaticPage },
  { name: 'page', path: '/info/:slug', component: lazyStaticPage }
]
