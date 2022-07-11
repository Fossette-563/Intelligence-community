import UserApi from '@/api/user'
import { setItem, getItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: []
  },
  mutations: {
    setLogin(state, login) {
      state.token = login
    }
  },
  actions: {
    /**用户请求 */
    async getUserInfo() {
      try {
        const user = await UserApi.userInfo()
        return user
      } catch (error) {
        console.log(error)
      }
    },
    /**登录请求 */
    async getLogin({ commit }, loginFrom) {
      console.log(loginFrom, 'from')
      try {
        const login = await UserApi.login(loginFrom)
        commit('setLogin', login)
        setItem('token', login)
        return login
      } catch (error) {
        console.log(error)
      }
    }
  }
}
