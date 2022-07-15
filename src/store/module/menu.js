import UserApi from '@/api/user'
import { getItem, setItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: {
    menu: [],
    foldedstatus: false
  },
  mutations: {
    setfolded(state) {
      state.foldedstatus = !state.foldedstatus
    },
    // 侧边栏
    setNav(state, menu) {
      state.menu = menu
    }
  },
  actions: {
    // 获取左侧菜单数据
    async getNav({ commit }) {
      try {
        const { menus, authoritys } = await UserApi.nav()
        commit('setNav', menus)
        return { menus, authoritys }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
