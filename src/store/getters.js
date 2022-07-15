const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  nav: (state) => state.menu.menu,
  tag: (state) => state.TagView.tag,
  permission: (state) => state.permission.permiss,
  authoritys: (state) => state.menu.actions
}

export default getters
