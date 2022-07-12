import UserApi from '@/api/user'
import { getItem, setItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: {
    menu: getItem('menus') || []
  },
  mutations: {
    setNav(state, menu) {
      state.menu = menu
      setItem('menus', menu)
    }
  },
  actions: {
    async getNav({ commit }) {
      try {
        const { menus } = await UserApi.nav()
        console.log(menus, 'nav')
        commit('setNav', menus)
        return menus
      } catch (error) {
        console.log(error)
      }
    }
  }
}
