const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  nav: (state) => state.menu.menu
}

export default getters
