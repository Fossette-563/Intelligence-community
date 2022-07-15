import { publicRoutes, privateRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    permiss: publicRoutes
  },
  mutations: {
    setPermiss(state, arr) {
      state.permiss.push(...privateRoutes)
    }
  },
  actions: {
    getPermiss({ commit }, navlist) {
      const arr = []
      navlist.forEach((name) => {
        arr.push(...privateRoutes.filter((item) => item.name === name))
      })
      arr.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      commit('setPermiss', arr)
      return arr
    }
  }
}
