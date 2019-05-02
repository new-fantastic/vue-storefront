import config from 'config'

const lazyStaticPage = () => import('../pages/Static.vue')

interface PartialRoute {
  name: string
  path: string
  component: Promise<Object>
}

const pagePrefix = config.wordpressCms.staticPagePrefix 
  ? config.wordpressCms.staticPagePrefix 
  : 'info'

const pageName = config.wordpressCms.staticPageName 
  ? config.wordpressCms.staticPageName 
  : 'info'

export const routes = [
  { name: pageName, path: `/${pagePrefix}/:slug`, component: lazyStaticPage }
]
