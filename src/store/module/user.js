import UserApi from '@/api/user'
import { setItem, getItem, removeItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: getItem('userInfo') || []
  },
  mutations: {
    setLogin(state, login) {
      state.token = login
      setItem('token', login)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      setItem('userInfo', userInfo)
    }
  },
  actions: {
    /**退出登录 */
    getLayOut({ commit }) {
      commit('setLogin', '')
      removeItem('token', '')
    },
    /**用户请求 */
    async getUserInfo({ commit }) {
      try {
        const user = await UserApi.userInfo()
        commit('setUserInfo', user)
        return user
      } catch (error) {
        console.log(error)
      }
    },
    /**登录请求 */
    async getLogin({ commit }, loginFrom) {
      try {
        const login = await UserApi.login(loginFrom)
        console.log(login)
        commit('setLogin', login)

        return login
      } catch (error) {
        console.log(error)
      }
    }
  }
}
