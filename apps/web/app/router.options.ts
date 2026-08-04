import type { RouterConfig } from '@nuxt/schema'

/**
 * Keep page navigation deterministic: a new page starts at the top immediately,
 * while browser back/forward keeps the position the user left on that page.
 */
export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'auto',
      }
    }

    return {
      top: 0,
      left: 0,
      behavior: 'auto',
    }
  },
}
